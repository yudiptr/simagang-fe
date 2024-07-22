import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaUserEdit } from 'react-icons/fa';
import { Navbar } from '@/components';

const Register: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [divisions, setDivisions] = useState<Record<string, Record<string, number>> | null>(null);
  const [durations, setDurations] = useState<string[]>([]);

  const watchedDivision = watch('division_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/quota`);
        const result = response.data;

        if (result.code === 200) {
          const data = result.data;
          setDivisions(data);

          if (Object.keys(data).length > 0) {
            const firstDivision = Object.keys(data)[0];
            const initialDurations = Object.keys(data[firstDivision]);
            setDurations([...new Set(initialDurations)]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (divisions && watchedDivision) {
      const divisionDurations = divisions[watchedDivision] || {};
      setDurations([...new Set(Object.keys(divisionDurations))]); // Update durations based on selected division
      setValue('intern_duration', ''); // Reset duration field
    }
  }, [watchedDivision, divisions, setValue]);

  const onSubmit = async (data: any) => {
    try {
      console.log(data); // Replace this with your desired action
      // You can perform a POST request or other actions here

      // Example POST request:
      // const response = await axios.post('/api/register', data);
      // if (response.status === 200) {
      //   alert('Registration successful!');
      //   router.push('/main');
      //   reset(); // Reset form fields after successful submission
      // } else {
      //   alert('Registration failed. Please try again.');
      // }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex">
      <Navbar />

      <section className="flex-1 p-10">
        <div className="relative mb-10">
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <FaUserEdit className="text-2xl text-gray-600" />
          </div>
          <div className="flex flex-col items-center">
            <i className="fas fa-user-cog text-3xl text-gray-600"></i>
            <h1 className="text-3xl font-bold mt-4">Daftar Magang</h1>
            <p className="mt-2">Masukkan data diri Anda!</p>
          </div>
        </div>

        <main className="flex p-8 justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-1/2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Division Dropdown */}
              <div className="mb-4">
                <label htmlFor="division_id" className="block text-sm font-medium text-gray-700">Divisi</label>
                <select
                  id="division_id"
                  {...register('division_id')}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Pilih...</option>
                  {divisions && Object.keys(divisions).map(division => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Dropdown */}
              <div className="mb-4">
                <label htmlFor="intern_duration" className="block text-sm font-medium text-gray-700">Durasi</label>
                <select
                  id="intern_duration"
                  {...register('intern_duration')}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
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
                { id: 'cv', label: 'CV', type: 'file' },
                { id: 'cover_letter', label: 'Surat Pengantar Magang', type: 'file' },
                { id: 'student_card', label: 'KTM', type: 'file' },
                { id: 'photo', label: 'Pas Foto', type: 'file' },
                { id: 'proposal', label: 'Proposal Magang', type: 'file' },
              ].map(({ id, label, type }) => (
                <div key={id} className="mb-4">
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    {...register(id)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              ))}
              <button type="submit" className="w-full p-2 mt-4 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors">
                Daftar
              </button>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Register;
