import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaUserCog } from 'react-icons/fa';
import AuthHoc from '@/components/hoc/authHoc';
import { Navbar } from '@/components/';
import { useSnackbar } from 'notistack'; // Import useSnackbar from notistack

interface DivisionData {
  [key: string]: any; // Adjust according to the structure of the division data
}

const Index: React.FC = () => {
  const [divisionData, setDivisionData] = useState<DivisionData | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newDivision, setNewDivision] = useState<string>('');
  const [modalAnimation, setModalAnimation] = useState<'enter' | 'leave' | 'none'>('none');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
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
    }, 300); // Matches the duration of the animation
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDivision(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/division`, {
        division_name: newDivision
      });
      // Refetch data to update the list with the new division
      await fetchDivisionData();
      enqueueSnackbar('Division added successfully!', { variant: 'success' });
      handleModalClose(); // Close the modal after successful submission
    } catch (error) {
      enqueueSnackbar('Error adding division: ' + (error as Error).message, { variant: 'error' });
      console.error('Error adding division:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Navbar />
      <section className="flex-1 p-10">
        <div className="relative mb-10">
          <div className="absolute top-0 right-0 mt-4 mr-4 flex gap-4">
            <div className="relative">
              <FaEdit className="text-2xl text-gray-600 cursor-pointer" onClick={handleEditClick} />
              {showMenu && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleAddDivisionClick}>Add Division</li>
                  </ul>
                </div>
              )}
            </div>
            <FaUserCog className="text-2xl text-gray-600" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Divisi Magang</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisionData ? (
            Object.entries(divisionData).map(([division, details]) => (
              <div key={division} className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-4">
                <h3 className="text-xl font-bold text-center mb-4">{details.division_name}</h3>
                {/* Render division details here if applicable */}
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </section>

      {/* Modal for Adding Division */}
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
                minLength={6} // Add minLength attribute
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
