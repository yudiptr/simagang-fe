import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaUserEdit } from 'react-icons/fa';
import { Navbar } from '@/components';
import { useSnackbar } from 'notistack'; 
import AdminHoc from '@/components/hoc/adminHoc';
import UserHoc from '@/components/hoc/authHoc';

const Register: React.FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar(); // Hook to display notifications
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [divisions, setDivisions] = useState<{ id: number; division_name: string }[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [quotas, setQuotas] = useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = useState(false); // Loading state
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility

  const watchedDivisionName = watch('division_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch divisions
        const divisionResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/division`);
        const divisionResult = divisionResponse.data;

        if (divisionResult.code === 200) {
          setDivisions(divisionResult.data);
        }

        // Fetch quotas
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
      setDurations([...new Set(Object.keys(divisionDurations))]); // Update durations based on selected division
      setValue('intern_duration', ''); // Reset duration field
    }
  }, [watchedDivisionName, quotas, divisions, setValue]);

  const onSubmit = async (data: any) => {
    setLoading(true); // Start loading
    try {
      // Define a type for the file types
      type FileTypes = 'cv' | 'cover_letter' | 'student_card' | 'photo' | 'proposal';

      // Create FormData object
      const formData = new FormData();

      // Append non-file form data
      formData.append('division_id', data.division_id);
      formData.append('intern_duration', data.intern_duration);

      // Define the file objects with explicit types
      const files: Record<FileTypes, File | undefined> = {
        cv: data.cv[0],
        cover_letter: data.cover_letter[0],
        student_card: data.student_card[0],
        photo: data.photo[0],
        proposal: data.proposal[0]
      };

      // Define the file types mapping
      const fileTypes: Record<FileTypes, string> = {
        cv: 'pdf',
        cover_letter: 'pdf',
        student_card: 'pdf',
        photo: 'png',
        proposal: 'pdf'
      };

      // Append files to FormData
      for (const [key, file] of Object.entries(files) as [FileTypes, File | undefined][]) {
        if (file) {
          if (validateFile(file, fileTypes[key])) {
            formData.append(key, file);
          } else {
            setLoading(false); // Stop loading if file validation fails
            return; // If file validation fails, stop the submission
          }
        }
      }

      // Submit FormData using axios
      const token = localStorage.getItem('at'); // Retrieve token from local storage
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers
        }
      });

      if (response.data.code === 200) {
        reset();
        setModalOpen(true); // Open the modal on success
      } else {
        // Handle error response
        enqueueSnackbar('Registration failed. Please try again.', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const validateFile = (file: File, fileType: string) => {
    const maxSize = 3 * 1024 * 1024; // 3 MB
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

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen min-w-screen flex">
      <Navbar />
      <section className="flex-1 p-10">
        <div className="relative">
          <div className="flex flex-col items-center">
            <i className="fas fa-user-cog text-3xl text-gray-600"></i>
            <h1 className="text-3xl font-bold mt-4 text-blue-1000 mt-8 md:mt-1">Daftar Magang</h1>
            <p className="mt-2 mb-4">Masukkan data diri Anda!</p>
          </div>
        </div>

        <main className="flex md:p-8 justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/2">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                  <span className="visually-hidden"></span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Division Dropdown */}
                <div className="mb-4">
                  <label htmlFor="division_id" className="block text-sm font-semibold text-blue-1000">Divisi</label>
                  <select
                    id="division_id"
                    {...register('division_id')}
                    className="w-full p-2 mt-1 border border-orange-1000 rounded-md"
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

                {/* Duration Dropdown */}
                <div className="mb-4">
                  <label htmlFor="intern_duration" className="block text-sm font-semibold text-blue-1000">Durasi</label>
                  <select
                    id="intern_duration"
                    {...register('intern_duration')}
                    className="w-full p-2 mt-1 border border-orange-1000 rounded-md"
                    required
                    value={watch('intern_duration')} // Control selected value
                  >
                    <option value="">Pilih...</option>
                    {durations.map(duration => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Inputs */}
                {[
                  { id: 'cv', label: 'CV', type: 'file', accept: '.pdf', placeholder: 'Upload PDF file, max 3MB' },
                  { id: 'cover_letter', label: 'Surat Pengantar Magang', type: 'file', accept: '.pdf', placeholder: 'Upload PDF file, max 3MB' },
                  { id: 'student_card', label: 'KTM', type: 'file', accept: '.pdf', placeholder: 'Upload PDF file, max 3MB' },
                  { id: 'photo', label: 'Pas Foto', type: 'file', accept: '.png', placeholder: 'Upload PNG file, max 3MB' },
                  { id: 'proposal', label: 'Proposal Magang', type: 'file', accept: '.pdf', placeholder: 'Upload PDF file, max 3MB' },
                ].map(({ id, label, type, accept, placeholder }) => (
                  <div className="mb-4" key={id}>
                    <label htmlFor={id} className="block text-sm font-semibold text-blue-1000">{label}</label>
                    <input
                      type={type}
                      id={id}
                      {...register(id)}
                      accept={accept}
                      className="mt-1 border border-orange-1000 rounded-md p-2"
                      placeholder={placeholder}
                      required
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-blue-1000 text-white font-bold py-2 px-4 rounded hover:bg-blue-800"
                >
                  Daftar
                </button>
              </form>
            )}
          </div>
        </main>

        {/* Modal for Success Message */}
        {modalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 flex flex-col">
              <h2 className="text-lg font-bold mb-4">Pendaftaran Berhasil</h2>
              <p className="text-justify my-4">
                Terima kasih telah mendaftar melalui website ini. Untuk mengetahui hasil lamaran, anda dapat melakukan cek status permohonan secara berkala melalui menu <strong>Permohonan Saya</strong>. 
                Untuk informasi lebih lanjut terkait sistem magang, dapat menghubungi narahubung di bawah ini:
              </p>
              <span>0857-2667-2212 (Satria Dirgantara - multimedia)</span>
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-blue-1000 text-white font-bold py-2 px-4 rounded hover:bg-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserHoc(Register);
