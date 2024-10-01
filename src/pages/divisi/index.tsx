import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa6";
import AuthHoc from '@/components/hoc/authHoc';
import { Navbar } from '@/components/';
import { useSnackbar } from 'notistack';
import { parseUser } from '@/utils';
import Footer from '@/components/elements/Footer';

interface QuotaData {
  [key: string]: {
    [key: string]: number;
  };
}

interface DivisionData {
  [key: string]: { id: number; division_name: string };
}

const Index: React.FC = () => {
  const [quotaData, setQuotaData] = useState<QuotaData | null>(null);
  const [divisionData, setDivisionData] = useState<DivisionData | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showMenuTambah, setShowMenuTambah] = useState<boolean>(false);
  const [showSetQuotaModal, setShowSetQuotaModal] = useState<boolean>(false);
  const [selectedDivision, setSelectedDivision] = useState<number | string>(''); // Ensure it's a number or string
  const [duration, setDuration] = useState<string>('');
  const [quota, setQuota] = useState<number | string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [role, setRole] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalAnimation, setModalAnimation] = useState<'enter' | 'leave' | 'none'>('none');
  const [newDivision, setNewDivision] = useState<string>('');

  useEffect(() => {
    const getUserRole = async () => {
      const user = await parseUser();
      if (user) {
        setRole(user.role);
      }
    };

    getUserRole();
    fetchQuotaData();
    fetchDivisionData();
  }, []);

  useEffect(() => {
    if (showModal) {
      setModalAnimation('enter');
    } else if (modalAnimation === 'enter') {
      setModalAnimation('leave');
    }
  }, [showModal]);

  const handleTambahClick = () => {
    setShowMenuTambah(!showMenu);
  };

  const handleAddDivisionClick = () => {
    setShowModal(true);
    setShowMenuTambah(false);
  };

  const handleModalTambahClose = () => {
    setModalAnimation('leave');
    setTimeout(() => {
      setShowModal(false);
      setNewDivision('');
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDivision(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('at');
      const header = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/division`, {
        division_name: newDivision
      }, {
        headers : {
          'Content-Type': 'application/json',
          ...header
        }
      });
      await fetchDivisionData();
      enqueueSnackbar('Division added successfully!', { variant: 'success' });
      handleModalClose();
    } catch (error) {
      enqueueSnackbar('Error adding division: ' + (error as Error).message, { variant: 'error' });
      console.error('Error adding division:', error);
    }
  };

  const fetchQuotaData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/quota`);
      setQuotaData(response.data.data);
    } catch (error) {
      console.error('Error fetching quota data:', error);
    }
  };

  const fetchDivisionData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/division`);
      setDivisionData(response.data.data.reduce((acc: DivisionData, division: any) => {
        acc[division.division_name] = {
          id: division.id,
          division_name: division.division_name,
        };
        return acc;
      }, {}));
    } catch (error) {
      console.error('Error fetching division data:', error);
    }
  };

  const handleEditClick = () => {
    setShowMenu(!showMenu);
  };

  const handleSetQuotaClick = () => {
    setModalVisible(true);
    setShowMenu(false);
    setTimeout(() => setShowSetQuotaModal(true), 10); // Small delay to trigger animation
  };

  const handleModalClose = () => {
    setShowSetQuotaModal(false);
    setTimeout(() => setModalVisible(false), 300); // Delay to allow animation to complete
    setSelectedDivision('');
    setDuration('');
    setQuota('');
  };

  const handleDeleteDivision = async (divisionId: string) => {
    try {
      const token = localStorage.getItem('at');
      const header = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/division/delete`, {
        division_id : divisionId
      }, {
        headers: {
          ...header
        }
      });
      fetchDivisionData();
      fetchQuotaData();
      enqueueSnackbar('Division deleted successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error deleting division: ' + (error as Error).message, { variant: 'error' });
      console.error('Error deleting division:', error);
    }
  };

  const handleSetQuotaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/quota`, {
        division_id: parseInt(selectedDivision as string, 10), // Ensure division_id is an integer
        duration,
        quota: parseInt(quota as string, 10),
      });
      // Refetch data to update the list with the new quota
      await fetchQuotaData();
      enqueueSnackbar('Quota set successfully!', { variant: 'success' });
      handleModalClose();
    } catch (error) {
      enqueueSnackbar('Error setting quota: ' + (error as Error).message, { variant: 'error' });
      console.error('Error setting quota:', error);
    }
  };

  const handleDeleteQuota = async (divisionName: string, duration: string) => {
    const division = divisionData ? divisionData[divisionName] : null;
    if (!division) {
      enqueueSnackbar('Division not found', { variant: 'error' });
      return;
    }

    try {
      const token = localStorage.getItem('at');
      const header = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/quota/delete`, {
        division_id: division.id,
        duration,
      }, {
        headers : {
        ...header
        }
      });
      // Refetch data to update the list after deletion
      await fetchQuotaData();
      enqueueSnackbar('Quota deleted successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error deleting quota: ' + (error as Error).message, { variant: 'error' });
      console.error('Error deleting quota:', error);
    }
  };

  return (
    <div className="">
      <div className="min-h-screen flex">
      <Navbar />
      <section className="flex-1 mt-20 md:mt-1">
        <div className='md:p-10 pr-4 pl-3'>
        <div className="relative mb-10">
          {role === 'Admin' && (
            <div className="absolute top-0 md:right-0 mt-4 mr-4 flex gap-4">
              <div className="relative">
                <div className='flex mt-6 md:mt-1 justify-center ml-16 mb-8'>
                <button className={`flex hover:bg-orange-1000 hover:text-white hover:rounded-lg group md:pl-3 pt-1 pb-1`} onClick={handleSetQuotaClick}>
                  <FaEdit className="text-2xl text-orange-1000 cursor-pointer mr-1 group-hover:text-white"/>
                  <p className='text-blue-1000 font-semibold mr-3 group-hover:text-white'>Edit</p>
                </button>
                <button className={`flex hover:bg-orange-1000 hover:text-white hover:rounded-lg group pl-3 pt-1 pb-1`} onClick={handleAddDivisionClick}>
                  <FaPlus className="text-2xl text-orange-1000 cursor-pointer mr-1 group-hover:text-white"/>
                  <p className='text-blue-1000 font-semibold mr-3 group-hover:text-white'>Tambah Baru</p>
                </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-1000">Divisi Magang</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
        {quotaData ? (
  Object.entries(quotaData).map(([department, quotas]) => (
    <div key={department} className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-4 min-w-[350px]">
      <h3 className="text-xl font-bold text-center mb-4">{department}</h3>
      {role === 'Admin' && divisionData?.[department] && (
        <button 
          onClick={() => handleDeleteDivision(String(divisionData[department]?.id))} 
          className="text-white font-bold bg-red-600 p-2 rounded-xl hover:bg-red-800"
        >
          Hapus Divisi
        </button>
      )}
      {Object.entries(quotas).map(([duration, count], index) => (
        <div key={index}>
          <h2 className="text-base flex justify-center font-semibold text-center text-blue-1000">Durasi Magang</h2>
          <div className='w-full justify-center items-center text-center flex'>
            <p className='justify-center flex bg-blue-1000 text-white text-semibold py-1 px-4 text-center rounded-lg font-semibold mb-1'>{duration}</p>
          </div>
          <h2 className="text-base flex justify-center font-semibold text-center text-orange-1000">Kuota</h2>
          <div className='w-full justify-center items-center text-center flex'>
            <p className='justify-center flex bg-orange-1000 text-white text-semibold py-1 px-4 text-center rounded-lg font-semibold'>{count} orang</p>
          </div>
          {role === "Admin" && (
            <div className='flex w-full justify-center mt-4'>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-md"
                onClick={() => handleDeleteQuota(department, duration)}
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  ))
) : (
  <div>Loading...</div>
)}
          {(showModal || modalAnimation === 'leave') && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity duration-300 ease-in-out ${modalAnimation === 'enter' ? 'opacity-100' : 'opacity-0'} ${!showModal ? 'pointer-events-none' : ''}`}
          style={{ zIndex: 1000 }}
        >
          <div
            className={`bg-white p-6 rounded-lg shadow-lg w-1/3 transform transition-transform duration-300 ease-in-out ${modalAnimation === 'enter' ? 'scale-100' : 'scale-95'}`}
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-1000">Tambah Divisi</h2>
            <form onSubmit={handleFormSubmit}>
              <label className="block mb-2 text-sm font-medium text-black">Nama Divisi</label>
              <input
                type="text"
                value={newDivision}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-orange-1000 rounded-md"
                required
                minLength={6}
                placeholder="Enter division name (min 6 characters)"
              />
              <div className="mt-4 flex gap-4 justify-center text-center">
                <button type="button" onClick={handleModalTambahClose} className="px-5 py-1 bg-white border border-orange-80 text-orange-1000 hover:bg-orange-1000 hover:text-white rounded-md">Close</button>
                <button type="submit" className="px-5 py-1 bg-orange-60 hover:bg-orange-1000 text-white rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
        </div>
        </div>
      </section>
      </div>
      <div className='z-0'>
          <Footer />
      </div>

      {/* Modal for Setting Quota */}
      {modalVisible && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity duration-300 ease-in-out ${showSetQuotaModal ? 'opacity-100' : 'opacity-0'}`}
          style={{ pointerEvents: showSetQuotaModal ? 'auto' : 'none' }}
        >
          <div
            className={`bg-white p-6 rounded-lg shadow-lg w-1/3 transform transition-transform duration-300 ease-in-out ${showSetQuotaModal ? 'scale-100' : 'scale-95'}`}
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-1000">Edit Divisi</h2>
            <form onSubmit={handleSetQuotaSubmit}>
              <label className="block mb-2 text-sm font-medium text-black">Nama Divisi</label>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full px-3 py-2 border border-orange-80 rounded-md"
                required
              >
                <option value="" disabled>Pilih...</option>
                {divisionData && Object.values(divisionData).map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.division_name}
                  </option>
                ))}
              </select>
              <label className="block mt-4 mb-2 text-sm font-medium text-black">Durasi</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-orange-80 rounded-md"
                required
              />
              <label className="block mt-4 mb-2 text-sm font-medium text-black">Kuota</label>
              <input
                type="number"
                value={quota}
                onChange={(e) => setQuota(e.target.value)}
                className="w-full px-3 py-2 border border-orange-80 rounded-md"
                required
              />
              <div className="mt-4 flex gap-4 justify-center">
                <button type="button" onClick={handleModalClose} className="px-6 py-1 text-orange-80 border border-orange-80 hover:bg-orange-1000 hover:text-white rounded-md">Close</button>
                <button type="submit" className="px-6 py-1 bg-orange-60 hover:bg-orange-1000 text-white rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthHoc(Index);
