import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Link from 'next/link'; // Import Link from next/link
import Image from 'next/image';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar(); // Hook to display notifications

  const router = useRouter(); // Initialize useRouter

  // Function to validate username and password
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
    setError(null); // Reset error before each attempt
    setValidationError(null); // Reset validation error before each attempt

    const validationError = validateInputs();
    if (validationError) {
      setValidationError(validationError);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem('at', response.data.data.access_token);
      enqueueSnackbar('Login success!', { variant: 'success' });
      // Redirect to the main page upon successful login
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setError('Wrong username or password.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center bg-cover bg-center justify-end"
      style={{ backgroundImage: "url('/bg-login.png')" }} 
    >
      <div className='flex-end justify-end'>
      <div className="bg-white rounded-2xl shadow-lg p-8 pl-12 pr-12 w-9/12">
        <h1 className="text-orange-1000 text-2xl mb-4 font-semibold">Welcome to</h1>
        <h3 className="mb-6 text-blue-1000 text-2xl font-semibold">Sistem Penerimaan Magang
        KAI DAOP 4 Semarang</h3>
        
        <form>
          <label htmlFor="first" className="block text-left mb-2 font-bold text-black">
            Username
          </label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Masukkan Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-1 border border-orange-1000 rounded"
          />

          <label htmlFor="password" className="block text-left mb-2 font-bold text-black">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-1 border border-orange-1000 rounded"
          />

          <div className="flex justify-center">
            <button
              type="button"
              onClick={solve}
              className="w-full bg-orange-60 text-white p-3 rounded-lg hover:bg-orange-1000"
            >
              Login
            </button>
          </div>
          {validationError && (
            <div className="text-orange-500 mt-4 font-bold">{validationError}</div>
          )}
          {error && <div className="text-red-500 mt-4 font-bold">{error}</div>}
        </form>
        <p className="mt-4">
          Belum punya akun?{' '}
          <Link className="text-orange-60 hover:text-orange-1000 hover:cursor-pointer" href="/register">
            Daftar Di sini
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Login;
