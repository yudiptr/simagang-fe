import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '@/components';
import UserHoc from '@/components/hoc/authHoc';
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

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/my-registration`, { headers });
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
      <section className="flex-1 md:p-10 mt-20 md:mt-1">
        <div className="relative mb-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-1000">Status Permohonan</h1>
          </div>
          <main className="flex-1 md:p-6 flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-blue-1000 text-white">
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
                      <td className="p-4">{entry.fullname}</td>
                      <td className="p-4">{entry.division_name}</td>
                      <td className="p-4">{new Date(entry.created_at).toLocaleDateString()}</td>
                      <td className="p-4">{entry.duration}</td>
                      <td className="p-4">{entry.status}</td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => handleViewClick(entry)}
                          className="px-4 py-1 bg-orange-60 rounded-md hover:bg-orange-1000 text-white hover:text-white transition-colors"
                        >
                          Lihat
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
          fetchRegistrationList={()=>{}}
        />
      )}
    </div>
  );
};

export default UserHoc(Index);
