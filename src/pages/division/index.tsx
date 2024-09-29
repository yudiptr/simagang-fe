import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaUserCog } from 'react-icons/fa';
import AuthHoc from '@/components/hoc/authHoc';
import { Navbar } from '@/components/';
import { useSnackbar } from 'notistack';
import { parseUser } from '@/utils';
import Footer from '@/components/elements/Footer';

interface DivisionData {
  [key: string]: any;
}

const Index: React.FC = () => {
  const [divisionData, setDivisionData] = useState<DivisionData | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newDivision, setNewDivision] = useState<string>('');
  const [modalAnimation, setModalAnimation] = useState<'enter' | 'leave' | 'none'>('none');
  const { enqueueSnackbar } = useSnackbar();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      const user = await parseUser();
      if (user) {
        setRole(user.role);
      }
    };

    getUserRole();
    fetchDivisionData();
  }, []);

  useEffect(() => {
    if (showModal) {
      setModalAnimation('enter');
    } else if (modalAnimation === 'enter') {
      setModalAnimation('leave');
    }
  }, [showModal]);

  const fetchDivisionData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/division`);
      setDivisionData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = () => {
    setShowMenu(!showMenu);
  };

  const handleAddDivisionClick = () => {
    setShowModal(true);
    setShowMenu(false);
  };

  const handleModalClose = () => {
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
      await fetchDivisionData();
      enqueueSnackbar('Division deleted successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error deleting division: ' + (error as Error).message, { variant: 'error' });
      console.error('Error deleting division:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Navbar />
      <section className="flex-1">
        <div className='p-10 min-h-screen'>
        <div className="relative mb-10">
          {role === 'Admin' && (
            <div className="absolute top-0 right-0 mt-4 mr-4 flex gap-4">
              <div className="relative">
                <button className={`flex`} onClick={handleEditClick}>
                  <FaEdit className="text-2xl text-orange-1000 cursor-pointer mr-1"/>
                  <p className='text-blue-1000 font-semibold'>Edit</p>
                </button>
                {showMenu && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleAddDivisionClick}>Tambah Divisi</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-1000">Divisi Magang</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisionData ? (
            Object.entries(divisionData).map(([division, details]) => (
              <div key={division} className="bg-white p-4 rounded-2xl max-w-[500px] shadow-md flex flex-col gap-4 min-w-[250px]">
                <div className="justify-center items-center">
                  <h3 className="text-lg flex justify-center font-bold text-center text-blue-1000 mb-4">{details.division_name}</h3>
                  <h2 className="text-base flex justify-center font-semibold text-center text-blue-1000">Durasi Magang</h2>
                  <div className='w-full justify-center items-center text-center flex'>
                    <p className='justify-center flex bg-blue-1000 text-white text-semibold py-1 px-4 text-center rounded-lg font-semibold mb-2'>100 orang</p>
                  </div>
                  <h2 className="text-base flex justify-center font-semibold text-center text-orange-1000">Kuota</h2>
                  <div className='w-full justify-center items-center text-center flex'>
                    <p className='justify-center flex bg-orange-1000 text-white text-semibold py-1 px-4 text-center rounded-lg font-semibold'>100 orang</p>
                  </div>
                  <div className='w-full justify-center flex mt-8 mb-2'>
                  {role === 'Admin' && (
                    <button 
                      onClick={() => handleDeleteDivision(details.id)} 
                      className="text-white font-bold bg-red-600 px-2 py-1 rounded-lg hover:bg-red-800"
                    >
                      Hapus
                    </button>
                  )}
                  </div>
                </div>
              </div>

            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        </div>
        <div>
          <Footer />
        </div>
      </section>
  
      {(showModal || modalAnimation === 'leave') && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity duration-300 ease-in-out ${modalAnimation === 'enter' ? 'opacity-100' : 'opacity-0'} ${!showModal ? 'pointer-events-none' : ''}`}
          style={{ zIndex: 1000 }}
        >
          <div
            className={`bg-white p-6 rounded-lg shadow-lg w-1/3 transform transition-transform duration-300 ease-in-out ${modalAnimation === 'enter' ? 'scale-100' : 'scale-95'}`}
          >
            <h2 className="text-xl font-semibold mb-4">Add Division</h2>
            <form onSubmit={handleFormSubmit}>
              <label className="block mb-2 text-sm font-medium text-gray-700">Division Name</label>
              <input
                type="text"
                value={newDivision}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                minLength={6}
                placeholder="Enter division name (min 6 characters)"
              />
              <div className="mt-4 flex gap-4">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add</button>
                <button type="button" onClick={handleModalClose} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthHoc(Index);
