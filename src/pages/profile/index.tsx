import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Navbar } from '@/components';

// Define the validation schema using yup
const schema = yup.object().shape({
  fullname: yup.string().required('Full name is required').min(1, 'Full name cannot be empty'),
  student_number: yup.string().required('Student number is required').matches(/^[0-9]+$/, 'Student number must be numeric'),
  ipk: yup.number().required('IPK is required').min(0, 'IPK must be between 0 and 4').max(4, 'IPK must be between 0 and 4').typeError('IPK must be a number'),
  phone_number: yup.string().required('Phone number is required').matches(/^\+?[0-9]+$/, 'Phone number must be numeric and can start with +'),
  university: yup.string().required('University is required').min(1, 'University cannot be empty'),
  semester: yup.number().required('Semester is required').min(1, 'Semester must be between 1 and 12').max(12, 'Semester must be between 1 and 12'),
  gender: yup.string().required('Gender is required').oneOf(['Laki - Laki', 'Perempuan', 'Lainnya'], 'Invalid gender'),
  email: yup.string().required('Email is required').email('Invalid email address'),
});

const EditProfile: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('at'); // Retrieve token from local storage
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
          headers
        });
    
        setProfileData(response.data.data); // Extracting `data` from response
        reset(response.data.data); // Setting form values with the fetched data
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, [reset]);

  const onSubmit = async (data: any) => {
    // Remove fields that should not be included in the request payload
    const { updated_at, created_at, id, ...filteredData } = data;
  
    try {
      const token = localStorage.getItem('at'); // Retrieve token from local storage
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, filteredData, {
        headers
      });
  
      if (response.data.code === 200) {
        enqueueSnackbar('Profil berhasil diperbarui!', { variant: 'success' });
        
        if (response.data.data.access_token){
          console.log(response.data.data)
          localStorage.setItem('at', response.data.data.access_token)
        }
      } else {
        enqueueSnackbar('Gagal memperbarui profile, silakan coba lagi!', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      enqueueSnackbar('Terdapat error internal, silakan coba lagi!', { variant: 'error' });
    }
  };
  

  return (
    <div className="min-h-screen flex">
      <Navbar />

      <section className="flex-1 md:p-10 mt-16 md:mt-1">
        <div className="relative">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-4 text-blue-1000">Ubah Profil</h1>
            <span>Masukkan data lengkap Anda di sini</span>
          </div>
        </div>

        <main className="flex md:p-8 py-8 justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div className="mb-4">
                <label htmlFor="fullname" className="block text-sm font-semibold text-blue-1000">Nama Lengkap</label>
                <input
                  id="fullname"
                  type="text"
                  {...register('fullname')}
                  className={`w-full p-2 mt-1 border ${errors.fullname ? 'border-red-500' : 'border-orange-1000'} rounded-md`}
                />
                {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
              </div>

              {/* Student Number */}
              <div className="mb-4">
                <label htmlFor="student_number" className="block text-sm font-semibold text-blue-1000">Nomor Mahasiswa</label>
                <input
                  id="student_number"
                  type="text"
                  {...register('student_number')}
                  className={`w-full p-2 mt-1 border ${errors.student_number ? 'border-red-500' : 'border-orange-1000'} rounded-md`}
                />
                {errors.student_number && <p className="text-red-500 text-sm">{errors.student_number.message}</p>}
              </div>

              {/* IPK */}
              <div className="mb-4">
                <label htmlFor="ipk" className="block text-sm font-semibold text-blue-1000">IPK</label>
                <input
                  id="ipk"
                  type="number"
                  step="0.1" // Allow decimal values
                  {...register('ipk')}
                  className={`w-full p-2 mt-1 border ${errors.ipk ? 'border-red-500' : 'border-orange-1000'} rounded-md`}
                />
                {errors.ipk && <p className="text-red-500 text-sm">{errors.ipk.message}</p>}
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label htmlFor="phone_number" className="block text-sm font-semibold text-blue-1000">Nomor Telepon</label>
                <input
                  id="phone_number"
                  type="text"
                  {...register('phone_number')}
                  className={`w-full p-2 mt-1 border ${errors.phone_number ? 'border-red-500' : 'border-orange-1000'} rounded-md`}
                />
                {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
              </div>

              {/* University */}
              <div className="mb-4">
                <label htmlFor="university" className="block text-sm font-semibold text-blue-1000">Universitas</label>
                <input
                  id="university"
                  type="text"
                  {...register('university')}
                  className={`w-full p-2 mt-1 border ${errors.university ? 'border-red-500' : 'border-orange-1000'} rounded-md`}
                />
                {errors.university && <p className="text-red-500 text-sm">{errors.university.message}</p>}
              </div>

              {/* Semester */}
              <div className="mb-4">
                <label htmlFor="semester" className="block text-sm font-semibold text-blue-1000">Semester</label>
                <input
                  id="semester"
                  type="number"
                  {...register('semester')}
                  className={`w-full p-2 mt-1 border ${errors.semester ? 'border-red-500' : 'border-orange-1000'} rounded-md`}
                />
                {errors.semester && <p className="text-red-500 text-sm">{errors.semester.message}</p>}
              </div>

              {/* Gender */}
              <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-semibold text-blue-1000">Jenis Kelamin</label>
                <select
                  id="gender"
                  {...register('gender')}
                  className={`w-full p-2 mt-1 border ${errors.gender ? 'border-red-500' : 'border-orange-1000'} rounded-md`}
                >
                  <option value="">Select...</option>
                  <option value="Laki - Laki">Laki - Laki</option>
                  <option value="Perempuan">Perempuan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm ffont-semibold text-blue-1000">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`w-full p-2 mt-1 border ${errors.email ? 'border-red-500' : 'border-orange-1000'} rounded-md`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full p-2 mt-4 font-semibold text-white bg-orange-60 rounded-md hover:bg-orange-1000 transition-colors"
              >
                Perbarui Profile
              </button>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
};

export default EditProfile;
