import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import AuthHoc from '@/components/hoc/authHoc';
import { Navbar } from '@/components';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen flex">
      <Navbar />
      <section className="flex-1 p-10">
        <div className="relative mb-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Status Permohonan</h1>
          </div>
          <main className="flex-1 p-6 flex flex-col items-center">
              
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-green-500 text-white">
                    <th className="p-4 text-left">Nama Lengkap</th>
                    <th className="p-4 text-left">Tanggal Daftar</th>
                    <th className="p-4 text-left">Durasi Magang</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {[ 
                    { name: 'Muhammad Abdul', date: '03-24-22', duration: '2 Bulan', status: 'Ditolak' },
                    { name: 'Cristiano Ronaldo', date: '03-24-22', duration: '4 Bulan', status: 'Diterima' },
                    { name: 'Lionel Messi', date: '03-24-22', duration: '4 Bulan', status: 'Diproses' },
                    { name: 'Alex Scott', date: '03-24-22', duration: '2 Bulan', status: 'Ditolak' }
                  ].map((entry, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-b border-gray-200`}>
                      <td className="p-4">{entry.name}</td>
                      <td className="p-4">{entry.date}</td>
                      <td className="p-4">{entry.duration}</td>
                      <td className="p-4">{entry.status}</td>
                      <td className="p-4 text-center">
                        <button className="px-4 py-2 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition-colors">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default AuthHoc(Index);
