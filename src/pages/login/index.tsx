// pages/index.tsx

import React from 'react';

const Login: React.FC = () => {
  const solve = () => {
    // Your logic here
  };

  return (
    <div className=' min-h-screen min-w-screen flex flex-col items-center justify-center'>
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
      `}</style>

      <div className="main">
        <h1>MAGANG KAI DAOP 4</h1>
        <h3>Masukkan data Anda</h3>
        <form>
          <label htmlFor="first">Username:</label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Masukkan Username"
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Masukkan Password"
          />

          <div className="wrap">
            <button type="button" onClick={solve}>
              Login
            </button>
          </div>
        </form>
        <p>
          Belum Terdaftar?{' '}
          <a href="#" style={{ textDecoration: 'none', color:'blue' }}>
            Buat Akun
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
