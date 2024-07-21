import React from 'react';
import Image from 'next/image';

const Home: React.FC = () => {
  return (
    <div className='min-h-screen min-w-screen'>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          background: rgb(226, 226, 226);
          margin: 0;
        }

        nav {
          padding-left: 10px;
          position: sticky;
          top: 0;
          height: 100vh;
          width: 80px;
          background: #fff;
          overflow: hidden;
          transition: width 0.5s;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        nav:hover {
          width: 340px;
        }

        .logo {
          display: flex;
          align-items: center;
          margin: 20px 0;
        }

        .logo span {
          font-weight: bold;
          font-size: 17px;
          text-transform: uppercase;
          color: transparent;
          transition: color 0.5s;
        }

        nav:hover .logo span {
          color: #000;
        }

        ul {
          list-style: none;
          padding: 0;
          width: 100%;
          margin-top: 20px;
        }

        li {
          margin: 10px 0;
          display: flex;
          align-items: center;
        }

        a {
          display: flex;
          align-items: center;
          padding: 10px;
          color: rgb(85, 83, 83);
          font-size: 14px;
          transition: background 0.5s, color 0.5s;
          text-align: center;
          width: 100%;
          overflow: hidden;
        }

        a span {
          opacity: 0;
          transition: opacity 0.5s;
        }

        nav:hover a span {
          opacity: 1;
        }

        a:hover {
          background: #eee;
          color: #34af6d;
        }

        a:hover i, a:hover span {
          color: #34af6d;
        }

        i {
          font-size: 30px; /* Increase icon size */
          margin-right: 15px;
          transition: color 0.5s;
        }

        .logout {
          position: absolute;
          bottom: 10px;
          width: 100%;
          text-align: center;
        }

        .container {
          display: flex;
        }

        .main {
          padding: 20px;
          width: 100%;
        }

        .users {
          display: flex;
          flex-wrap: wrap;
        }

        .card {
          width: 50%;
          margin: 10px;
          background: #fff;
          text-align: center;
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
        }

        .card img {
          width: 100%;
          height: auto;
          border-radius: 5%;
        }

        .card h3 {
          text-transform: uppercase;
        }

        .card p {
          font-size: 12px;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .card button {
          width: 100%;
          margin-top: 8px;
          padding: 7px;
          cursor: pointer;
          border-radius: 10px;
          background: transparent;
          border: 1px solid #4ad489;
        }

        .card button:hover {
          background: #4ad489;
          color: #fff;
        }
      `}</style>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

      <div className="container">
        <nav>
          <div className="logo">
            <Image src="/kai.png" alt="Logo" width={45} height={45} />
            <span>Magang KAI DAOP 4</span>
          </div>
          <ul>
            <li>
              <a href="./beranda.html">
                <i className="fas fa-home"></i>
                <span>Beranda</span>
              </a>
            </li>
            <li>
              <a href="./kuota.html">
                <i className="fas fa-users"></i>
                <span>Kuota Magang</span>
              </a>
            </li>
            <li>
              <a href="./daftar.html">
                <i className="fas fa-sign-in-alt"></i>
                <span>Daftar Magang</span>
              </a>
            </li>
            <li>
              <a href="./status.html">
                <i className="fas fa-newspaper"></i>
                <span>Status Permohonan</span>
              </a>
            </li>
            <li>
              <a href="./lapor.html">
                <i className="fas fa-laptop-house"></i>
                <span>Lapor Selesai Magang</span>
              </a>
            </li>
            <li>
              <a href="./pengaturan.html">
                <i className="fas fa-cog"></i>
                <span>Pengaturan</span>
              </a>
            </li>
            <li>
              <a href="#" className="logout">
                <i className="fas fa-sign-out-alt"></i>
                <span>Log out</span>
              </a>
            </li>
          </ul>
        </nav>

        <section className="main">
        <div className="relative">
            <div className="flex justify-center">
                <div className="text text-center">
                    <h1>Selamat Datang!</h1>
                    <p>Daftar Magang PT. Kereta Api Indonesia Daerah Operasi 4 Semarang</p>
                </div>
            </div>
            <i className="fas fa-user-cog text-2xl text-gray-600 absolute top-0 right-0 mt-4 mr-4"></i>
        </div>



          <div className="users">
            <div className="card">
              <h3>Tentang kami</h3>
              <p style={{ textAlign: 'center' }}>
                Daerah Operasi IV Semarang atau disingkat dengan Daop 4 Semarang
                atau Daop IV SM adalah salah satu daerah operasi perkeretaapian
                Indonesia, di bawah lingkungan PT Kereta Api Indonesia (Persero)
                yang berada di bawah Direksi PT Kereta Api Indonesia dipimpin oleh
                seorang Executive Vice President (EVP) yang berada di bawah dan
                bertanggung jawab kepada Direksi PT Kereta Api Indonesia.
              </p>
              <p style={{ textAlign: 'center' }}>
                Daerah Operasi IV Semarang memiliki enam stasiun besar, di antaranya
                adalah stasiun Semarang tawang, Stasiun Semaranponcol, Stasiun Pekalongan,
                Stasiun Tegal, Stasiun Bojonegoro, dan Stasiun Cepu, sedangkan stasiun
                kereta api kelas menengah di antaranya adalah Stasiun Kedungjati,
                Stasiun Gambringan, Stasiun Weleri, Stasiun Comal, dan Stasiun Pemalang.
                Gudang kereta api berada di kompleks Stasiun Semarangponcol, sedangkan
                dipo lokomotif berada tak jauh dari Stasiun Semarangponcol.
              </p>
            </div>

            <div className="card">
              <h3>Langkah Penggunaan Website</h3>
              <p style={{ textAlign: 'left' }}>1. Masukkan data diri anda untuk melengkapi proses pendaftaran akun magang.</p>
              <p style={{ textAlign: 'left' }}>2. Setelah melakukan sign in/pendaftaran akun magang pada website, pindah ke menu /kuota magang/ dan pilihlah divisi yang ingin anda daftarkan.</p>
              <p style={{ textAlign: 'left' }}>3. Periksa apakah divisi yang anda pilih masih memiliki kuota yang cukup untuk dapat anda daftarkan.</p>
              <p style={{ textAlign: 'left' }}>4. Pindah ke menu /Daftar Magang/ lalu periksa data diri anda pada menu /Daftar Magang/ apakah sudah sesuai dengan data diri anda sebenarnya, lalu upload file yang dibutuhkan pada menu /daftar magang/ lalu klik upload.</p>
              <p style={{ textAlign: 'left' }}>5. Terakhir, periksa apakah permohonan magang anda sudah terdaftar pada menu /Track Permohonan Magang/ dan tunggu hasilnya secara berkala.</p>
            </div>

            <div className="card">
              <h3>Benefit Magang</h3>
              <p style={{ textAlign: 'center' }}>1. Sertifikat magang</p>
              <p style={{ textAlign: 'center' }}>2. Pengalaman kerja</p>
              <p style={{ textAlign: 'center' }}>3. Relasi</p>
              <p style={{ textAlign: 'center' }}>4. Manajemen waktu</p>
              <p style={{ textAlign: 'center' }}>5. Kerja sama tim</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
