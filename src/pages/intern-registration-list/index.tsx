import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '@/components';
import AdminHoc from '@/components/hoc/authHoc';
import Modal from '@/components/elements/Modal';

interface Registration {
  id: number;
  created_at: string;
  updated_at: string;
  status: string;
  cv: string;
  cover_letter: string;
  student_card: string;
  photo: string;
  proposal: string;
  duration: string;
  division_id: number;
  division_name: string;
  fullname: string;
}

const Index: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegistrations, setSelectedRegistrations] = useState<number[]>([]);

  const fetchRegistrationList = async () => {
    try {
      const token = localStorage.getItem('at');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/registration-list`, { headers });
      if (response.data.code === 200) {
        setRegistrations(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching registration list:', error);
    }
  };

  useEffect(() => {
    fetchRegistrationList();
  }, []);

  const handleViewClick = (registration: Registration) => {
    setSelectedRegistration(registration);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRegistration(null);
  };

  const handleBulkAccept = async () => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/accept`, { registration_ids: selectedRegistrations }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('at')}` }
      });
      setSelectedRegistrations([]);
      fetchRegistrationList(); // Refresh the list
    } catch (error) {
      console.error('Error accepting registrations:', error);
    }
  };

  const handleBulkReject = async () => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/reject`, { registration_ids: selectedRegistrations }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('at')}` }
      });
      setSelectedRegistrations([]);
      fetchRegistrationList(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting registrations:', error);
    }
  };

  const handleCheckboxChange = (registrationId: number) => {
    setSelectedRegistrations((prevSelected) =>
      prevSelected.includes(registrationId)
        ? prevSelected.filter((id) => id !== registrationId)
        : [...prevSelected, registrationId]
    );
  };

  const isAllSelected = registrations.filter(r => r.status === 'Diproses').length === selectedRegistrations.length;

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      setSelectedRegistrations([]);
    } else {
      setSelectedRegistrations(
        registrations.filter((r) => r.status === 'Diproses').map((r) => r.id)
      );
    }
  };

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
              <div className="flex justify-between mb-4">
                <div>
                  <button 
                    onClick={handleBulkAccept} 
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                    disabled={selectedRegistrations.length === 0}
                  >
                    Accept Selected
                  </button>
                  <button 
                    onClick={handleBulkReject} 
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    disabled={selectedRegistrations.length === 0}
                  >
                    Reject Selected
                  </button>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAllChange}
                    className="mr-2"
                  />
                  <span>Select All</span>
                </div>
              </div>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-green-500 text-white">
                    <th className="p-4 text-left">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleSelectAllChange}
                      />
                    </th>
                    <th className="p-4 text-left">Nama Lengkap</th>
                    <th className="p-4 text-left">Divisi</th>
                    <th className="p-4 text-left">Tanggal Daftar</th>
                    <th className="p-4 text-left">Durasi Magang</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((entry, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-b border-gray-200`}>
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedRegistrations.includes(entry.id)}
                          onChange={() => handleCheckboxChange(entry.id)}
                          disabled={entry.status !== 'Diproses'}
                        />
                      </td>
                      <td className="p-4">{entry.fullname}</td>
                      <td className="p-4">{entry.division_name}</td>
                      <td className="p-4">{new Date(entry.created_at).toLocaleDateString()}</td>
                      <td className="p-4">{entry.duration}</td>
                      <td className="p-4">{entry.status}</td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => handleViewClick(entry)}
                          className="px-4 py-2 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </section>

      {/* Modal Display */}
      {isModalOpen && (
        <Modal 
          registration={selectedRegistration}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AdminHoc(Index);
