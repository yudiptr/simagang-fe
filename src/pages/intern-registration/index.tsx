// pages/Register.tsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';
import { FaHome, FaUsers, FaSignInAlt, FaNewspaper, FaLaptopHouse, FaCog, FaSignOutAlt, FaUserCog } from 'react-icons/fa';
import { Navbar } from '@/components';

const Register: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Registration successful!');
        router.push('/main');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex">
      
      <Navbar></Navbar>

      <main className="flex-1 p-8">
        <div className="text-center mb-8">
          <i className="fas fa-user-cog text-3xl text-gray-600"></i>
          <h1 className="text-3xl font-bold mt-4">Daftar Magang</h1>
          <p className="mt-2">Masukkan data diri Anda!</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit}>
            {[
              { id: 'namalengkap', label: 'Nama Lengkap', type: 'text' },
              { id: 'nim', label: 'NIM', type: 'text' },
              { id: 'jurusan', label: 'Jurusan', type: 'text' },
              { id: 'ipk', label: 'IPK Terbaru', type: 'text' },
              { id: 'notelp', label: 'Nomor Telepon (Whatsapp)', type: 'text' },
              { id: 'universitas', label: 'Universitas', type: 'text' },
              { id: 'semester', label: 'Semester', type: 'text' },
              { id: 'cv', label: 'CV', type: 'file' },
              { id: 'surat', label: 'Surat Pengantar Magang', type: 'file' },
              { id: 'ktm', label: 'KTM', type: 'file' },
              { id: 'foto', label: 'Pas Foto', type: 'file' },
              { id: 'proposal', label: 'Proposal Magang', type: 'file' },
            ].map(({ id, label, type }) => (
              <div key={id} className="mb-4">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input type={type} id={id} name={id} className="w-full p-2 mt-1 border border-gray-300 rounded-md" required />
              </div>
            ))}

            <div className="mb-4">
              <label htmlFor="divisi" className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <select id="divisi" name="divisi" className="w-full p-2 mt-1 border border-gray-300 rounded-md" required>
                <option disabled selected>Pilih...</option>
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>

            <button type="submit" className="w-full p-2 mt-4 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors">
              Daftar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
