import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaUserEdit } from 'react-icons/fa';
import { Navbar } from '@/components';
import { useSnackbar } from 'notistack';
import UseHoc from '@/components/hoc/authHoc';

const Report: React.FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [divisions, setDivisions] = useState<{ id: number; division_name: string }[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [quotas, setQuotas] = useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = useState(false);

  const watchedDivisionName = watch('division_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const divisionResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/division`);
        const divisionResult = divisionResponse.data;

        if (divisionResult.code === 200) {
          setDivisions(divisionResult.data);
        }

        const quotaResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/quota`);
        const quotaResult = quotaResponse.data;

        if (quotaResult.code === 200) {
          setQuotas(quotaResult.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (watchedDivisionName && quotas) {
      const division = divisions.find(d => d.id === parseInt(watchedDivisionName));
      const divisionName = division ? division.division_name : '';
      const divisionDurations = quotas[divisionName] || {};
      setDurations([...new Set(Object.keys(divisionDurations))]);
    }
  }, [watchedDivisionName, quotas, divisions, setValue]);

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      type FileTypes = 'intern_certificate';

      const formData = new FormData();
      formData.append('division_id', data.division_id);
      formData.append('start_date', formatDate(data.start_date));
      formData.append('end_date', formatDate(data.end_date));

      const files: Record<FileTypes, File | undefined> = {
        intern_certificate: data.intern_certificate[0]
      };

      const fileTypes: Record<FileTypes, string> = {
        intern_certificate: 'pdf'
      };

      for (const [key, file] of Object.entries(files) as [FileTypes, File | undefined][]) {
        if (file) {
          if (validateFile(file, fileTypes[key])) {
            formData.append(key, file);
          } else {
            setLoading(false);
            return;
          }
        }
      }

      const token = localStorage.getItem('at');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/final-report`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers
        }
      });

      if (response.data.code === 200) {
        reset();
        enqueueSnackbar('Report Success.', { variant: 'success' });
      } else {
        enqueueSnackbar('Report failed. Please try again.', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      enqueueSnackbar('An unexpected error occurred. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const validateFile = (file: File, fileType: string) => {
    const maxSize = 3 * 1024 * 1024;
    const validType = fileType === 'png' ? 'image/png' : 'application/pdf';

    if (file.size > maxSize) {
      enqueueSnackbar('File size exceeds 3 MB.', { variant: 'error' });
      return false;
    }
    if (file.type !== validType) {
      enqueueSnackbar(`Invalid file type. Please upload a ${fileType} file.`, { variant: 'error' });
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen min-w-screen flex">
      <Navbar />
      <section className="flex-1 md:p-10 mt-16 md:mt-1">
        <div className="relative ">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-4 text-blue-1000">Lapor Selesai Magang</h1>
            <p className="mt-2">Masukkan data magang Anda!</p>
          </div>
        </div>

        <main className="flex p-8 justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/2">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="division_id" className="block text-sm font-semibold text-blue-1000">Divisi</label>
                  <select
                    id="division_id"
                    {...register('division_id')}
                    className="w-full p-2 mt-1 border border-orange-80 rounded-md"
                    required
                  >
                    <option value="">Pilih...</option>
                    {divisions.map(division => (
                      <option key={division.id} value={division.id}>
                        {division.division_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="start_date" className="block text-sm font-semibold text-blue-1000">Start Date</label>
                  <input
                    type="date"
                    id="start_date"
                    {...register('start_date')}
                    className="w-full p-2 mt-1 border border-orange-80 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="end_date" className="block text-sm font-semibold text-blue-1000">End Date</label>
                  <input
                    type="date"
                    id="end_date"
                    {...register('end_date')}
                    className="w-full p-2 mt-1 border border-orange-80 rounded-md"
                    required
                  />
                </div>

                {[
                  { id: 'intern_certificate', label: 'Sertifikat Magang', type: 'file', accept: '.pdf', placeholder: 'Upload PDF file, max 3MB' },
                ].map(({ id, label, type, accept, placeholder }) => (
                  <div key={id} className="mb-4">
                    <label htmlFor={id} className="block text-sm font-semibold text-blue-1000">
                      {label}
                    </label>
                    <input
                      type={type}
                      id={id}
                      accept={accept}
                      placeholder={placeholder}
                      {...register(id, {
                        required: true,
                      })}
                      className="w-full p-2 mt-1 border border-orange-1000 rounded-md"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && !validateFile(file, accept.slice(1))) {
                          e.target.value = '';
                        }
                      }}
                    />
                    <p className="text-sm text-orange-80">{placeholder}</p>
                  </div>
                ))}

                <button type="submit" className="w-full p-2 mt-4 font-semibold text-white bg-orange-60 rounded-md hover:bg-orange-1000 transition-colors">
                  Lapor
                </button>
              </form>
            )}
          </div>
        </main>
      </section>
    </div>
  );
};

export default UseHoc(Report);
