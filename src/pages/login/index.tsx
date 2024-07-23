import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Link from 'next/link'; // Import Link from next/link

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
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-96 text-center">
        <h1 className="text-green-600 text-2xl mb-4">MAGANG KAI DAOP 4</h1>
        <h3 className="mb-6">Masukkan data Anda</h3>
        <form>
          <label htmlFor="first" className="block text-left mb-2 font-bold text-gray-600">
            Username:
          </label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Masukkan Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <label htmlFor="password" className="block text-left mb-2 font-bold text-gray-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <div className="flex justify-center">
            <button
              type="button"
              onClick={solve}
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
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
          Belum Terdaftar?{' '}
          <Link className="text-blue-700" href="/register">
            Buat Akun
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
