import React, { useRef } from 'react';
import axios from 'axios';

interface Registration {
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
}

const Modal: React.FC<ModalProps> = ({ registration, onClose }) => {
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
                className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl relative"
                ref={modalRef}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    X
                </button>
                <h2 className="text-2xl font-bold mb-4">Details</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span>CV:</span>
                        <button
                            onClick={() => handleDownload(registration.cv)}
                            className="text-blue-500"
                        >
                            Download
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Cover Letter:</span>
                        <button
                            onClick={() => handleDownload(registration.cover_letter)}
                            className="text-blue-500"
                        >
                            Download
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Student Card:</span>
                        <button
                            onClick={() => handleDownload(registration.student_card)}
                            className="text-blue-500"
                        >
                            Download
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Photo:</span>
                        <button
                            onClick={() => handleDownload(registration.photo)}
                            className="text-blue-500"
                        >
                            Download
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Proposal:</span>
                        <button
                            onClick={() => handleDownload(registration.proposal)}
                            className="text-blue-500"
                        >
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
