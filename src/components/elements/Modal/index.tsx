import React, { useRef } from 'react';
import axios from 'axios';

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

interface ModalProps {
    registration: Registration | null;
    onClose: () => void;
    fetchRegistrationList: () => void;
}

const Modal: React.FC<ModalProps> = ({ registration, onClose, fetchRegistrationList }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    if (!registration) return null;

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

    const handleDeleteApplication = async () => {
        try {
            const token = localStorage.getItem('at');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/intern/delete-registration`,
                {
                    registration_id: registration.id
                }
                ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers
                    }
                }
            );
            fetchRegistrationList();
            onClose(); // Close modal after deleting
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg relative pb-20 pr-8 pl-8"
                ref={modalRef}
            >
                <h2 className="text-2xl font-bold mb-4 text-blue-60">Detail</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <button
                            onClick={() => handleDownload(registration.cv)}
                            className="text-white bg-orange-60 hover:bg-orange-1000 px-4 py-1 rounded-lg mr-4"
                        >
                            Download
                        </button>
                        <span>CV</span>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => handleDownload(registration.cover_letter)}
                            className="text-white bg-orange-60 hover:bg-orange-1000 px-4 py-1 rounded-lg mr-4"
                        >
                            Download
                        </button>
                        <span>Surat Pengantar Magang</span>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => handleDownload(registration.student_card)}
                            className="text-white bg-orange-60 hover:bg-orange-1000 px-4 py-1 rounded-lg mr-4"
                        >
                            Download
                        </button>
                        <span>KTM</span>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => handleDownload(registration.photo)}
                            className="text-white bg-orange-60 hover:bg-orange-1000 px-4 py-1 rounded-lg mr-4"
                        >
                            Download
                        </button>
                        <span>Pas Foto</span>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => handleDownload(registration.proposal)}
                            className="text-white bg-orange-60 hover:bg-orange-1000 px-4 py-1 rounded-lg mr-4"
                        >
                            Download
                        </button>
                        <span>Proposal Magang</span>
                    </div>

                    {/* Conditionally render the delete button if status is "Ditolak" */}
                    {registration.status === 'Ditolak' && (
                        <div className="flex items-center justify-center mt-4">
                            <button
                                onClick={handleDeleteApplication}
                                className="text-white bg-red-600 hover:bg-red-800 px-4 py-1 rounded-lg"
                            >
                                Hapus Lamaran
                            </button>
                        </div>
                    )}

                    <div className='w-full flex justify-center'>
                        <button
                            onClick={onClose}
                            className="absolute text-gray-600 bg-blue-60 hover:bg-blue-1000 rounded-lg px-6 py-1 text-white justify-center flex items-center text-center mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
