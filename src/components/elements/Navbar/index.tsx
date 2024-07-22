import React from "react";
import Image from 'next/image';
import { FaHome, FaUsers, FaSignInAlt, FaNewspaper, FaLaptopHouse, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Link from "next/link";
export const Navbar: React.FC = () => {
    return (
        <nav className="sticky top-0 w-24 bg-white h-screen overflow-hidden transition-width duration-500 hover:w-80 group">
          <div className="flex items-center px-4 py-6">
              <Image src="/kai.png" alt="Logo" width={45} height={45} className="rounded-full" />
              <span className="font-bold text-lg ml-4 text-transparent transition-opacity duration-500 group-hover:text-black">Magang KAI DAOP 4</span>
          </div>
          <ul className=''>
              <li>
              <Link href="/main" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaHome className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Beranda</span>
              </Link>
              </li>
              <li>
              <Link href="/kuota" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaUsers className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Kuota Magang</span>
              </Link>
              </li>
              <li>
              <Link href="/daftar" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
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
              <Link href="/lapor" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaLaptopHouse className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Lapor Selesai Magang</span>
              </Link>
              </li>
              <li>
              <Link href="/pengaturan" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaCog className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Pengaturan</span>
              </Link>
              </li>
              <li className="absolute bottom-0 w-full">
              <Link href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 group">
                  <FaSignOutAlt className="text-2xl flex-shrink-0" /> {/* Ensures fixed size */}
                  <span className="ml-4 text-transparent group-hover:text-black transition-opacity duration-500">Log out</span>
              </Link>
              </li>
          </ul>
        </nav>
    )
}