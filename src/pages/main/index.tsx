import React from 'react';
import Image from 'next/image'
import { FaUsers} from 'react-icons/fa';
import AuthHoc from "@/components/hoc/authHoc"
import { Navbar } from '@/components';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen">
      <div className="flex">
        <Navbar/>
        <section className="flex-1 p-10">
          <div className="relative mb-10 flex">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Selamat Datang!</h1>
              <p>Daftar Magang PT. Kereta Api Indonesia Daerah Operasi 4 Semarang</p>
            </div>
            <FaUsers className="text-2xl flex-shrink-0" />
            <i className="fas fa-user-cog text-2xl text-gray-600 absolute top-0 right-0 mt-4 mr-4"></i>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <h3 className="uppercase font-bold">Tentang kami</h3>
                <p>
                  Daerah Operasi IV Semarang atau disingkat dengan Daop 4 Semarang
                  atau Daop IV SM adalah salah satu daerah operasi perkeretaapian
                  Indonesia, di bawah lingkungan PT Kereta Api Indonesia (Persero)
                  yang berada di bawah Direksi PT Kereta Api Indonesia dipimpin oleh
                  seorang Executive Vice President (EVP) yang berada di bawah dan
                  bertanggung jawab kepada Direksi PT Kereta Api Indonesia.
                </p>
                <p>
                  Daerah Operasi IV Semarang memiliki enam stasiun besar, di antaranya
                  adalah stasiun Semarang tawang, Stasiun Semaranponcol, Stasiun Pekalongan,
                  Stasiun Tegal, Stasiun Bojonegoro, dan Stasiun Cepu, sedangkan stasiun
                  kereta api kelas menengah di antaranya adalah Stasiun Kedungjati,
                  Stasiun Gambringan, Stasiun Weleri, Stasiun Comal, dan Stasiun Pemalang.
                  Gudang kereta api berada di kompleks Stasiun Semarangponcol, sedangkan
                  dipo lokomotif berada tak jauh dari Stasiun Semarangponcol.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="uppercase font-bold">Langkah Penggunaan Website</h3>
                <ul className="list-disc list-inside text-left">
                  <li>Masukkan data diri anda untuk melengkapi proses pendaftaran akun magang.</li>
                  <li>Setelah melakukan sign in/pendaftaran akun magang pada website, pindah ke menu /kuota magang/ dan pilihlah divisi yang ingin anda daftarkan.</li>
                  <li>Periksa apakah divisi yang anda pilih masih memiliki kuota yang cukup untuk dapat anda daftarkan.</li>
                  <li>Pindah ke menu /Daftar Magang/ lalu periksa data diri anda pada menu /Daftar Magang/ apakah sudah sesuai dengan data diri anda sebenarnya, lalu upload file yang dibutuhkan pada menu /daftar magang/ lalu klik upload.</li>
                  <li>Terakhir, periksa apakah permohonan magang anda sudah terdaftar pada menu /Track Permohonan Magang/ dan tunggu hasilnya secara berkala.</li>
                </ul>
              </div>
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <h3 className="uppercase font-bold">Benefit Magang</h3>
                <ul className="list-disc list-inside">
                  <li>Sertifikat magang</li>
                  <li>Pengalaman kerja</li>
                  <li>Relasi</li>
                  <li>Manajemen waktu</li>
                  <li>Kerja sama tim</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthHoc(Home);
