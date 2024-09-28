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
      enqueueSnackbar('Registration successful! Please log in.', { variant: 'success' });
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setError('Username has been used.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center bg-cover bg-center justify-end"
      style={{ backgroundImage: "url('/bg-register.png')" }} 
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 pl-12 pr-12 w-4/12 mr-36">
        <h1 className="text-orange-1000 text-2xl mb-4 font-semibold">Welcome to</h1>
        <h3 className="mb-6 text-blue-1000 text-2xl font-semibold">Sistem Penerimaan Magang
        KAI DAOP 4 Semarang</h3>
        <form>
          <div className="mb-4">
          <label htmlFor="first" className="block text-left mb-2 font-bold text-black">
            Username
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
            <label htmlFor="password" className="block text-left font-semibold mb-2">Password:</label>
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
              Register
            </button>
          </div>
          {validationError && <div className="text-orange-500 mt-4 font-semibold">{validationError}</div>}
          {error && <div className="text-red-500 mt-4 font-semibold">{error}</div>}
        </form>
        <button
          className="mt-6 text-black transition duration-200"
          onClick={() => router.push('/login')}
        >
          Sudah Punya Akun? 
          <span className='text-orange-60 hover:text-orange-1000 hover:cursor-pointer'> Masuk</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
