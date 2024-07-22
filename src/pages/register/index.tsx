import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const router = useRouter(); // Initialize useRouter

  const { enqueueSnackbar } = useSnackbar(); // Hook to display notifications


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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_URL}/auth/register`, {
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
    <div className='min-h-screen min-w-screen flex flex-col items-center justify-center'>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          outline: none;
          border: none;
          text-decoration: none;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          background: rgb(226, 226, 226);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: sans-serif;
          line-height: 1.5;
          min-height: 100vh;
          flex-direction: column;
          margin: 0;
        }

        .main {
          background-color: #fff;
          border-radius: 15px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
          padding: 10px 20px;
          transition: transform 0.2s;
          width: 500px;
          text-align: center;
        }

        h1 {
          color: #4caf50;
        }

        label {
          display: block;
          width: 100%;
          margin-top: 10px;
          margin-bottom: 5px;
          text-align: left;
          color: #555;
          font-weight: bold;
        }

        input {
          display: block;
          width: 100%;
          margin-bottom: 15px;
          padding: 10px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        button {
          padding: 15px;
          border-radius: 10px;
          margin-top: 15px;
          margin-bottom: 15px;
          border: none;
          color: white;
          cursor: pointer;
          background-color: #4caf50;
          width: 100%;
          font-size: 16px;
        }

        .wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          text-decoration: none;
        }

        .error-message {
          color: red;
          margin-top: 10px;
          font-weight: bold;
        }

        .validation-error {
          color: orange;
          margin-top: 10px;
          font-weight: bold;
        }

        .redirect-button {
          margin-top: 15px;
          color: #4caf50;
          cursor: pointer;
          text-decoration: underline;
          background: none;
          border: none;
          font-size: 16px;
        }
      `}</style>

      <div className="main">
        <h1>MAGANG KAI DAOP 4</h1>
        <h3>Daftarkan data Anda</h3>
        <form>
          <label htmlFor="first">Username:</label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Masukkan Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="wrap">
            <button type="button" onClick={solve}>
              Register
            </button>
          </div>
          {validationError && <div className="validation-error">{validationError}</div>}
          {error && <div className="error-message">{error}</div>}
        </form>
        <button className="redirect-button" onClick={() => router.push('/login')}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;
