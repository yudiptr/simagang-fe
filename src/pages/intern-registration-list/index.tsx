import React from 'react';
import Image from 'next/image';
import { FaHome, FaUsers, FaSignInAlt, FaNewspaper, FaLaptopHouse, FaCog, FaSignOutAlt, FaUserCog } from 'react-icons/fa';

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen">
        <nav className="sticky top-0 w-24 bg-white h-screen overflow-hidden transition-width duration-500 hover:w-80 group">
        <div className="flex items-center px-4 py-6">
            <Image src="/kai.png" alt="Logo" width={45} height={45} className="rounded-full" />
            <span className="font-bold text-lg ml-4 text-transparent transition-opacity duration-500 group-hover:text-black">Magang KAI DAOP 4</span>
        </div>
        <ul className=''>
            <li>
            <a href="/beranda" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                <FaHome className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Beranda</span>
            </a>
            </li>
            <li>
            <a href="/kuota" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                <FaUsers className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Kuota Magang</span>
            </a>
            </li>
            <li>
            <a href="/daftar" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                <FaSignInAlt className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Daftar Magang</span>
            </a>
            </li>
            <li>
            <a href="/status" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                <FaNewspaper className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Status Permohonan</span>
            </a>
            </li>
            <li>
            <a href="/lapor" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                <FaLaptopHouse className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Lapor Selesai Magang</span>
            </a>
            </li>
            <li>
            <a href="/pengaturan" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                <FaCog className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Pengaturan</span>
            </a>
            </li>
            <li className="absolute bottom-0 w-full">
            <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                <FaSignOutAlt className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Log out</span>
            </a>
            </li>
        </ul>
        </nav>


      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <FaUserCog className="text-2xl text-gray-600" />
        </div>
        <h1 className="text-center text-2xl font-bold mb-4">Status Permohonan</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
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
  );
};

export default Index;
