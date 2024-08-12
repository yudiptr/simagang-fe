import React from 'react';
import { Navbar } from '@/components';
import AuthHoc from "@/components/hoc/authHoc";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen flex">
      <Navbar />
      <section className="flex-1 p-10">
        <div className="relative mb-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Selamat Datang!</h1>
            <p>Daftar Magang PT. Kereta Api Indonesia Daerah Operasi 4 Semarang</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-justify">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="uppercase font-bold">Tentang Kami</h3>
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
              adalah stasiun Semarang Tawang, Stasiun Semarang Poncol, Stasiun Pekalongan,
              Stasiun Tegal, Stasiun Bojonegoro, dan Stasiun Cepu, sedangkan stasiun
              kereta api kelas menengah di antaranya adalah Stasiun Kedungjati,
              Stasiun Gambringan, Stasiun Weleri, Stasiun Comal, dan Stasiun Pemalang.
              Gudang kereta api berada di kompleks Stasiun Semarang Poncol, sedangkan
              dipo lokomotif berada tak jauh dari Stasiun Semarang Poncol.
            </p>
          </div>

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

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="uppercase font-bold">Benefit Magang</h3>
            <ul className="list-disc list-inside">
              <li>Sertifikat magang</li>
              <li>Pengalaman kerja</li>
              <li>Relasi</li>
              <li>Manajemen waktu</li>
              <li>Kerja sama tim</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg sm:col-span-2">
            <h3 className="uppercase font-bold">Lokasi Perusahaan</h3>
            <p>
              Daerah operasi Semarang sendiri mempunyai wilayah kerja yang
              meliputi tiga kota dan tujuh Kabupaten di Jawa Tengah dan dua Kabupaten
              di Jawa Timur. Tiga kota yang berada di wilayah Jawa Tengah adalah Kota Tegal,
              Kota Pekalongan, dan Kota Semarang. Sedangkan tujuh Kabupaten di Jawa Tengah adalah:
            </p>
            <ul className="list-disc list-inside text-left">
              <li>Kabupaten Tegal</li>
              <li>Kabupaten Pemalang</li>
              <li>Kabupaten Pekalongan</li>
              <li>Kabupaten Batang</li>
              <li>Kabupaten Kendal</li>
              <li>Kabupaten Grobogan</li>
              <li>Kabupaten Blora</li>
            </ul>
            <p>
              Wilayah kerja PT. Kereta Api Indonesia (Persero) DAOP IV Semarang
              tidak hanya pada wilayah Jawa Tengah saja tetapi juga meliputi Jawa Timur
              yang terdiri dari dua Kabupaten yaitu Kabupaten Bojonegoro dan Kabupaten Tuban.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg sm:col-span-1">
            <h3 className="uppercase font-bold">Lokasi Perusahaan</h3>
            <p>
              PT. Kereta Api Indonesia (Persero) DAOP IV Semarang berlokasi di
              Jalan MH. Thamrin No.3 Semarang yang berdekatan dengan pusat kota Semarang.
              Lokasi Perusahaan ini ditentukan oleh pemerintah, dimana hal ini dilatarbelakangi oleh:
            </p>
            <ul className="list-disc list-inside text-left">
              <li>Lokasi Kantor PT Kereta Api Indonesia (Persero) DAOP IV Semarang
                  dekat dengan jalan raya untuk memudahkan dan memperlancar berbagai
                  urusan baik bagi orang luar maupun pihak lain.
              </li>
              <li>Lokasi kantor PT Kereta Api Indonesia (Persero) DAOP IV Semarang
                  dekat dengan bagian operasional perusahaan yaitu Stasiun Tawang dan
                  Stasiun Poncol.
              </li>
              <li>Lokasi Kantor PT Kereta Api Indonesia (Persero) DAOP IV Semarang
                  yang berada di pusat kota memiliki beberapa fasilitas penunjang seperti
                  Bank, pusat belanja, dan pusat hiburan.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthHoc(Home);
