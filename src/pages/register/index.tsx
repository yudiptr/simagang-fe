import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const validateInputs = () => {
    if (username.length <= 6) {
      return 'Username must be more than 6 characters.';
    }
    if (password.length <= 6) {
      return 'Password must be more than 6 characters.';
    }
    return null;
  };

  const solve = async () => {
    setError(null);
    setValidationError(null);

    const validationError = validateInputs();
    if (validationError) {
      setValidationError(validationError);
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        username,
        password,
      });
      enqueueSnackbar('Berhasil registrasi, silakan masuk', { variant: 'success' });
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setError('Pengguna sudah digunakan');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center bg-cover bg-center justify-center md:justify-end"
      style={{ backgroundImage: "url('/bg-register.png')" }} 
    >
      <div className="w-full max-w-md px-4 md:w-4/12 md:max-w-none md:mr-8 lg:mr-36">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-orange-1000 text-xl md:text-2xl mb-2 md:mb-4 font-semibold">Selamat datang di</h1>
          <h3 className="mb-4 md:mb-6 text-blue-1000 text-xl md:text-2xl font-semibold">
            Sistem Penerimaan Magang PT. Kereta Api Indonesia (Persero) Daerah Operasi 4 Semarang
          </h3>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-left mb-2 font-bold text-black">
                Pengguna
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Masukkan Username"
                className="w-full px-3 py-2 border border-orange-1000 rounded-md focus:outline-none focus:ring-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-left font-semibold mb-2">Kata Sandi</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Masukkan Password"
                className="w-full px-3 py-2 border border-orange-1000 rounded-md focus:outline-none focus:ring-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="wrap">
              <button
                type="button"
                className="w-full bg-orange-60 text-white p-3 rounded-lg hover:bg-orange-1000"
                onClick={solve}
              >
                Daftar
              </button>
            </div>
            {validationError && <div className="text-orange-500 mt-4 font-semibold text-sm md:text-base">{validationError}</div>}
            {error && <div className="text-red-500 mt-4 font-semibold text-sm md:text-base">{error}</div>}
          </form>
          <button
            className="mt-6 text-black transition duration-200 text-sm md:text-base"
            onClick={() => router.push('/login')}
          >
            Sudah Punya Akun? 
            <span className='text-orange-60 hover:text-orange-1000 hover:cursor-pointer'> Masuk</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;