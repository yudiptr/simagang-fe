import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '@/components';
import AdminHoc from '@/components/hoc/authHoc';

interface Report {
  start_date: string;
  end_date: string;
  intern_certification: string;
  division_name: string;
  fullname: string;
}

const Index: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  const fetchReportList = async () => {
    try {
      const token = localStorage.getItem('at');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/report`, { headers });
      if (response.data.code === 200) {
        setReports(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching report list:', error);
    }
  };

  useEffect(() => {
    fetchReportList();
  }, []);

  const handleDownload = async (filename: string) => {
    try {
      const token = localStorage.getItem('at'); // Retrieve token from local storage
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-download-link`,
        { filename },
        {
          headers: {
            'Content-Type': 'application/json',
            ...headers
          }
        }
      );

      const link = document.createElement('a');
      link.href = response.data.url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="min-h-screen min-w-screen flex">
      <Navbar />
      <section className="flex-1 p-10">
        <div className="relative mb-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-1000">Rekap Peserta Magang</h1>
          </div>
          <main className="flex-1 p-6 flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-blue-1000 text-white rounded-lg">
                    <th className="p-4 text-left">Nama Lengkap</th>
                    <th className="p-4 text-left">Divisi</th>
                    <th className="p-4 text-left">Tanggal Mulai</th>
                    <th className="p-4 text-left">Tanggal Selesai</th>
                    <th className="p-4 text-left">SK Magang</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-b border-gray-200`}>
                      <td className="p-4">{report.fullname}</td>
                      <td className="p-4">{report.division_name}</td>
                      <td className="p-4">{formatDate(report.start_date)}</td>
                      <td className="p-4">{formatDate(report.end_date)}</td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => handleDownload(report.intern_certification)}
                          className="px-6 py-2 text-white text-sm bg-orange-60 rounded-md hover:bg-orange-1000 hover:text-white transition-colors"
                        >
                          Download
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
    </div>
  );
};

export default AdminHoc(Index);
