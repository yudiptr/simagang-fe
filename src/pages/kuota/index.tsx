import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import AuthHoc from '@/components/hoc/authHoc';
import { Navbar } from '@/components/';
import { useSnackbar } from 'notistack';
import { parseUser } from '@/utils';

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
  const [showSetQuotaModal, setShowSetQuotaModal] = useState<boolean>(false);
  const [selectedDivision, setSelectedDivision] = useState<number | string>(''); // Ensure it's a number or string
  const [duration, setDuration] = useState<string>('');
  const [quota, setQuota] = useState<number | string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
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
    fetchQuotaData();
    fetchDivisionData();
  }, []);

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
        acc[division.id] = {
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

  return (
    <div className="min-h-screen flex">
      <Navbar />
      <section className="flex-1 p-10">
        <div className="relative mb-10">
          {role === 'Admin' && (
            <div className="absolute top-0 right-0 mt-4 mr-4 flex gap-4">
              <div className="relative">
                <FaEdit className="text-2xl text-gray-600 cursor-pointer" onClick={handleEditClick} />
                {showMenu && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleSetQuotaClick}>Set Quota</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Kuota Magang</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotaData ? (
            Object.entries(quotaData).map(([department, quotas]) => (
              <div key={department} className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-4">
                <h3 className="text-xl font-bold text-center mb-4">{department}</h3>
                {Object.entries(quotas).map(([duration, count], index) => (
                  <div key={index}>
                    <div className="flex items-center justify-center align-middle">
                      <div className="flex flex-col items-center justify-center h-20 bg-slate-200 p-4 w-1/2 rounded-full shadow-md">
                        <span className="block text-xl font-semibold flex items-center">{duration}</span>
                        <span>{count} orang</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </section>

      {/* Modal for Setting Quota */}
      {modalVisible && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity duration-300 ease-in-out ${showSetQuotaModal ? 'opacity-100' : 'opacity-0'}`}
          style={{ pointerEvents: showSetQuotaModal ? 'auto' : 'none' }}
        >
          <div
            className={`bg-white p-6 rounded-lg shadow-lg w-1/3 transform transition-transform duration-300 ease-in-out ${showSetQuotaModal ? 'scale-100' : 'scale-95'}`}
          >
            <h2 className="text-xl font-semibold mb-4">Set Quota</h2>
            <form onSubmit={handleSetQuotaSubmit}>
              <label className="block mb-2 text-sm font-medium text-gray-700">Division</label>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>Select a division</option>
                {divisionData && Object.values(divisionData).map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.division_name}
                  </option>
                ))}
              </select>
              <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Quota</label>
              <input
                type="number"
                value={quota}
                onChange={(e) => setQuota(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              <div className="mt-4 flex gap-4">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
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
