import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { FaHome, FaUsers, FaSignInAlt, FaNewspaper, FaLaptopHouse, FaSignOutAlt, FaPeopleArrows, FaUserEdit } from 'react-icons/fa';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseUser } from "@/utils";

export const Navbar: React.FC = () => {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const getUserRole = async () => {
            const user = await parseUser();
            if (user) {
                setRole(user.role);
            }
        };
        getUserRole();
    }, []);

    return (
        <nav className="sticky top-0 w-16 bg-white h-screen overflow-hidden transition-width duration-500 hover:w-60 group">
            <div className="flex items-center px-4 py-6">
                <Image src="/LOGO.png" alt="Logo" width={80} height={80} className="rounded-full" />
                <span className="font-bold text-lg ml-4 text-transparent transition-opacity duration-500 group-hover:text-black">Magang KAI DAOP 4</span>
            </div>
            <ul className='space-y-2'>
                <li>
                    <Link href="/" className="relative flex flex-col gap-2 group-hover:flex-row justify-center group-hover:justify-start items-center p-2 text-gray-600 hover:bg-gray-200 group">
                        <FaHome className="text-2xl flex-shrink-0" />
                        <span className="absolute text-transparent group-hover:text-black group-hover:relative transition-opacity duration-500">Beranda</span>
                    </Link>
                </li>
                <li>
                    <Link href="/division" className="relative flex flex-col gap-2 group-hover:flex-row justify-center group-hover:justify-start items-center p-2 text-gray-600 hover:bg-gray-200 group">
                        <FaPeopleArrows className="text-2xl flex-shrink-0" />
                        <span className="absolute text-transparent group-hover:text-black group-hover:relative transition-opacity duration-500">Divisi Magang</span>
                    </Link>
                </li>
                <li>
                    <Link href="/kuota" className="relative flex flex-col gap-2 group-hover:flex-row justify-center group-hover:justify-start items-center p-2 text-gray-600 hover:bg-gray-200 group">
                        <FaUsers className="text-2xl flex-shrink-0" />
                        <span className="absolute text-transparent group-hover:text-black group-hover:relative transition-opacity duration-500">Kuota Magang</span>
                    </Link>
                </li>
                {role === 'Admin' && (
                    <>
                        <li>
                            <Link href="/intern-registration-list" className="relative flex flex-col gap-2 group-hover:flex-row justify-center group-hover:justify-start items-center p-2 text-gray-600 hover:bg-gray-200 group">
                                <FaNewspaper className="text-2xl flex-shrink-0" />
                                <span className="absolute text-transparent group-hover:text-black group-hover:relative transition-opacity duration-500">Status Permohonan</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/daftar-laporan" className="relative flex flex-col gap-2 group-hover:flex-row justify-center group-hover:justify-start items-center p-2 text-gray-600 hover:bg-gray-200 group">
                                <FaNewspaper className="text-2xl flex-shrink-0" />
                                <span className="absolute text-transparent group-hover:text-black group-hover:relative transition-opacity duration-500">Rekap Peserta Magang</span>
                            </Link>
                        </li>
                    </>
                )}
                {role === 'USER' && (
                    <>
                        <li>
                            <Link href="/intern-registration" className="relative flex flex-col gap-2 group-hover:flex-row justify-center group-hover:justify-start items-center p-2 text-gray-600 hover:bg-gray-200 group">
                                <FaSignInAlt className="text-2xl flex-shrink-0" />
                                <span className="absolute text-transparent group-hover:text-black group-hover:relative transition-opacity duration-500">Daftar Magang</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/my-registration" className="relative flex flex-col gap-2 group-hover:flex-row justify-center group-hover:justify-start items-center p-2 text-gray-600 hover:bg-gray-200 group">
                                <FaNewspaper className="text-2xl flex-shrink-0" />
                                <span className="absolute text-transparent group-hover:text-black group-hover:relative transition-opacity duration-500">Permohonan Saya</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/lapor" className="relative flex flex-col gap-2 group-hover:flex-row justify-center group-hover:justify-start items-center p-2 text-gray-600 hover:bg-gray-200 group">
                                <FaLaptopHouse className="text-2xl flex-shrink-0" />
                                <span className="absolute text-transparent group-hover:text-black group-hover:relative transition-opacity duration-500">Lapor Selesai Magang</span>
                            </Link>
                        </li>
                    </>
                )}
                <li className="absolute bottom-0 w-full">
                {role !== 'Admin' && (
                        <div onClick={
                            () => {
                                router.replace('/profile')
                            }
                        } className="relative flex flex-col gap-2 group-hover:flex-row justify-center group-hover:justify-start items-center p-2 text-gray-600 hover:bg-gray-200 group cursor-pointer">
                            <FaUserEdit className="text-2xl flex-shrink-0" />
                            <span className="absolute text-transparent group-hover:text-black group-hover:relative transition-opacity duration-500">Edit Profile</span>
                        </div>
                )}
                    <div onClick={
                        () => {
                            localStorage.removeItem('at')
                            router.replace('/login')
                        }
                    } className="relative flex flex-col gap-2 group-hover:flex-row justify-center group-hover:justify-start items-center p-2 text-gray-600 hover:bg-gray-200 group cursor-pointer">
                        <FaSignOutAlt className="text-2xl flex-shrink-0" />
                        <span className="absolute text-transparent group-hover:text-black group-hover:relative transition-opacity duration-500">Log out</span>
                    </div>
                </li>
            </ul>
        </nav>
    );
};
