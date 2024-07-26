import React from "react";
import Image from 'next/image';
import { FaHome, FaUsers, FaSignInAlt, FaNewspaper, FaLaptopHouse, FaCog, FaSignOutAlt, FaAviato, FaPeopleArrows, FaUserEdit } from 'react-icons/fa';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaOrcid } from "react-icons/fa6";

export const Navbar: React.FC = () => {
    const router = useRouter();

    return (
        <nav className="sticky top-0 w-24 bg-white h-screen overflow-hidden transition-width duration-500 hover:w-80 group">
          <div className="flex items-center px-4 py-6">
              <Image src="/kai.png" alt="Logo" width={45} height={45} className="rounded-full" />
              <span className="font-bold text-lg ml-4 text-transparent transition-opacity duration-500 group-hover:text-black">Magang KAI DAOP 4</span>
          </div>
          <ul className=''>
              <li>
              <Link href="/" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaHome className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Beranda</span>
              </Link>
              </li>
              <li>
              <Link href="/division" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaPeopleArrows className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Divisi Magang</span>
              </Link>
              </li>
              <li>
              <Link href="/kuota" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaUsers className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Kuota Magang</span>
              </Link>
              </li>
              <li>
              <Link href="/intern-registration" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaSignInAlt className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Daftar Magang</span>
              </Link>
              </li>
              <li>
              <Link href="/intern-registration-list" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaNewspaper className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Status Permohonan</span>
              </Link>
              </li>
              <li>
              <Link href="/my-registration" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaNewspaper className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Permohonan Saya</span>
              </Link>
              </li>
              <li>
              <Link href="/lapor" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaLaptopHouse className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Lapor Selesai Magang</span>
              </Link>
              </li>
              <li>
              <Link href="daftar-laporan" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaNewspaper className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Laporan Magang</span>
              </Link>
              </li>
              <li>
              <Link href="/pengaturan" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaCog className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Pengaturan</span>
              </Link>
              </li>
              <li className="absolute bottom-0 w-full">
              <div onClick={
                () => {
                    router.replace('/profile')
                }
              } className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group cursor-pointer">
                  <FaUserEdit className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Edit Profile</span>
              </div>
              <div onClick={
                () => {
                    localStorage.removeItem('at')
                    router.replace('/login')
                }
              } className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group cursor-pointer">
                  <FaSignOutAlt className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Log out</span>
              </div>
              </li>
          </ul>
        </nav>
    )
}