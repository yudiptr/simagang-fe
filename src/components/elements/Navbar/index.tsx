import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { FaHome, FaUsers, FaSignInAlt, FaNewspaper, FaLaptopHouse, FaSignOutAlt, FaPeopleArrows, FaUserEdit } from 'react-icons/fa';
import { MdWorkHistory } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseUser } from "@/utils";

export const Navbar: React.FC = () => {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const getUserRole = async () => {
            const user = await parseUser();
            if (user) {
                setRole(user.role);
            }
        };
        getUserRole();
    }, []);

    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
      }, [sidebarOpen]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <nav className={`sticky top-0 bg-white h-screen overflow-hidden transition-width duration-500 bg-blue-1000 ${sidebarOpen ? 'w-60' : 'w-24'}`}>
            <div className="flex items-center px-4 py-6">
                <div>
                    <Image 
                        src="/kai3.png" 
                        alt="Logo" 
                        width={sidebarOpen ? 91 : 59} 
                        height={sidebarOpen ? 46 : 30} 
                        className={`${sidebarOpen ? 'ml-2 mb-2' : 'items-center'} transition-width duration-500`} />
                    <h2 className={`font-bold text-xl ml-2 text-transparent transition-opacity duration-500 ${sidebarOpen ? "text-white" : "hidden"}`}>Magang KAI DAOP 4</h2>
                </div>
                <Image 
                    src="/close-bar.png" 
                    alt="Close Bar" 
                    width={34} 
                    height={34}
                    onClick={toggleSidebar}
                    className={`${sidebarOpen ? "show items-center flex align-cente ml-4" : "hidden"}`}
                />
            </div>
            <div className={`flex items-center px-4 py-6 ${sidebarOpen ? "hidden" : "show show items-center flex align-center ml-3"}`}>
                <Image 
                    src="/open-bar.png" 
                    alt="Open Bar" 
                    width={34} 
                    height={34}
                    onClick={toggleSidebar}
                />
            </div>
            <ul className='space-y-2'>
                <li>
                    <Link href="/" className={`flex flex-row gap-2 p-2 text-gray-600 group ${sidebarOpen ? "hover:bg-orange-1000 ml-2" : "justify-center items-center"} hover:rounded-lg`}>
                        <FaHome className="text-2xl flex-shrink-0 text-orange-1000 group-hover:text-white hover:text-white hover:bg-orange-1000 hover:rounded-lg hover:p-1 hover:scale-150" />
                        <span>
                            <p className={`relative ${sidebarOpen ? 'relative text-white font-semibold flex' : 'hidden'} transition-opacity duration-500`}> Beranda </p>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href="/division" className={`flex flex-row gap-2 p-2 text-gray-600 group ${sidebarOpen ? "hover:bg-orange-1000 ml-2" : "justify-center items-center"} hover:rounded-lg`}>
                        <FaPeopleArrows className="text-2xl flex-shrink-0 text-orange-1000 group-hover:text-white hover:text-white hover:bg-orange-1000 hover:rounded-lg hover:p-1 hover:scale-150" />
                        <span>
                            <p className={`relative ${sidebarOpen ? 'relative text-white font-semibold flex' : 'hidden'} transition-opacity duration-500`}>Divisi Magang</p>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href="/kuota" className={`flex flex-row gap-2 p-2 text-gray-600 group ${sidebarOpen ? "hover:bg-orange-1000 ml-2" : "justify-center items-center"} hover:rounded-lg`}>
                        <FaUsers className="text-2xl flex-shrink-0 text-orange-1000 group-hover:text-white hover:text-white hover:bg-orange-1000 hover:rounded-lg hover:p-1 hover:scale-150" />
                        <span>
                            <p className={`relative ${sidebarOpen ? 'relative text-white font-semibold flex' : 'hidden'} transition-opacity duration-500`}>Kuota Magang</p>
                        </span>
                    </Link>
                </li>
                {role === 'Admin' && (
                    <>

                        <li>
                            <Link href="/intern-registration-list" className={`flex flex-row gap-2 p-2 text-gray-600 group ${sidebarOpen ? "hover:bg-orange-1000 ml-2" : "justify-center items-center"} hover:rounded-lg`}>
                                <MdWorkHistory className="text-2xl flex-shrink-0 text-orange-1000 group-hover:text-white hover:text-white hover:bg-orange-1000 hover:rounded-lg hover:p-1 hover:scale-150" />
                                <span>
                                    <p className={`relative ${sidebarOpen ? 'relative text-white font-semibold flex' : 'hidden'} transition-opacity duration-500`}>Status Permohonan</p>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/daftar-laporan" className={`flex flex-row gap-2 p-2 text-gray-600 group ${sidebarOpen ? "hover:bg-orange-1000 ml-2" : "justify-center items-center"} hover:rounded-lg`}>
                                <FaNewspaper className="text-2xl flex-shrink-0 text-orange-1000 group-hover:text-white hover:text-white hover:bg-orange-1000 hover:rounded-lg hover:p-1 hover:scale-150" />
                                <span>
                                    <p className={`relative ${sidebarOpen ? 'relative text-white font-semibold flex' : 'hidden'} transition-opacity duration-500`}>Rekap Peserta Magang</p>
                                </span>
                            </Link>
                        </li>
                    </>
                )}
                {role === 'USER' && (
                    <>
                        <li>
                            <Link href="/intern-registration" className={`flex flex-row gap-2 p-2 text-gray-600 group ${sidebarOpen ? "hover:bg-orange-1000 ml-2" : "justify-center items-center"} hover:rounded-lg`}>
                                <FaSignInAlt className="text-2xl flex-shrink-0 text-orange-1000 group-hover:text-white hover:text-white hover:bg-orange-1000 hover:rounded-lg hover:p-1 hover:scale-150" />
                                <span>
                                    <p className={`relative ${sidebarOpen ? 'relative text-white font-semibold flex' : 'hidden'} transition-opacity duration-500`}>Daftar Magang</p>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/my-registration" className={`flex flex-row gap-2 p-2 text-gray-600 group ${sidebarOpen ? "hover:bg-orange-1000 ml-2" : "justify-center items-center"} hover:rounded-lg`}>
                                <FaNewspaper className="text-2xl flex-shrink-0 text-orange-1000 group-hover:text-white hover:text-white hover:bg-orange-1000 hover:rounded-lg hover:p-1 hover:scale-150" />
                                <span>
                                    <p className={`relative ${sidebarOpen ? 'relative text-white font-semibold flex' : 'hidden'} transition-opacity duration-500`}>Permohonan Saya</p>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/lapor" className={`flex flex-row gap-2 p-2 text-gray-600 group ${sidebarOpen ? "hover:bg-orange-1000 ml-2" : "justify-center items-center"} hover:rounded-lg`}>
                                <FaLaptopHouse className="text-2xl flex-shrink-0 text-orange-1000 group-hover:text-white hover:text-white hover:bg-orange-1000 hover:rounded-lg hover:p-1 hover:scale-150" />
                                <span>
                                    <p className={`relative ${sidebarOpen ? 'relative text-white font-semibold flex' : 'hidden'} transition-opacity duration-500`}>Lapor Selesai Magang</p>
                                </span>
                            </Link>
                        </li>
                    </>
                )}
                <li className={`absolute bottom-0 m-2 ${sidebarOpen ? "ml-2 w-full" : "ml-5 p-2"}`}>
                {role !== 'Admin' && (
                        <div onClick={
                            () => {
                                router.replace('/profile')
                            }
                        } className={`flex flex-row gap-2 p-2 text-gray-600 group hover:cursor-pointer ${sidebarOpen ? "hover:bg-orange-1000 ml-2" : "justify-center items-center"} hover:rounded-lg`}>
                        <FaUserEdit  className="text-2xl flex-shrink-0 text-orange-1000 group-hover:text-white hover:text-white hover:bg-orange-1000 hover:rounded-lg hover:p-1 hover:scale-150" />
                        <span>
                            <p className={`relative ${sidebarOpen ? 'relative text-white font-semibold flex' : 'hidden'} transition-opacity duration-500`}>Edit Profile</p>
                        </span>
                        </div>
                )}
                    <div onClick={
                        () => {
                            localStorage.removeItem('at')
                            router.replace('/login')
                        }
                    } className={`flex flex-row gap-2 p-2 text-gray-600 group hover:cursor-pointer ${sidebarOpen ? "hover:bg-orange-1000 ml-2" : "justify-center items-center"} hover:rounded-lg`}>
                        <FaSignOutAlt  className="text-2xl flex-shrink-0 text-orange-1000 group-hover:text-white hover:text-white hover:bg-orange-1000 hover:rounded-lg hover:p-1 hover:scale-150" />
                        <span>
                            <p className={`relative ${sidebarOpen ? 'relative text-white font-semibold flex' : 'hidden'} transition-opacity duration-500`}>Logout</p>
                        </span>
                    </div>
                </li>
            </ul>
        </nav>
    );
};
