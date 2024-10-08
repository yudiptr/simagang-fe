import React from 'react';
import Footer from '@/components/elements/Footer';
import { Navbar } from '@/components';
import AuthHoc from "@/components/hoc/authHoc";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Home: React.FC = () => {
  return (
    <div className="">
      <div className="min-h-screen min-w-screen flex">
      <Navbar />
      <section className="flex-1 overflow-y-auto mt-16 md:mt-1">
        <div className='md:p-10 p-4'>
        <div className="relative mb-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-1000">Selamat Datang!</h1>
            <p>Daftar Magang PT. Kereta Api Indonesia (Persero) Daerah Operasi 4 Semarang</p>
          </div>
        </div>

        <div className="text-justify">
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="font-bold text-blue-1000"><p className='font-bold text-2xl'>Tentang Kami</p></Typography>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col gap-4'>
              <Typography>
              Daerah Operasi 4 Semarang atau disingkat dengan Daop 4 Semarang adalah salah satu 
              daerah operasi perkeretaapian Indonesia yang dipimpin oleh seorang Executive Vice 
              President (EVP) yang berada di bawah dan bertanggung jawab kepada Direksi PT Kereta 
              Api Indonesia. Daerah Operasi 4 Semarang memiliki lima stasiun besar, di antaranya 
              adalah stasiun Semarang Tawang Bank Jateng, Stasiun Semarang Poncol, Stasiun 
              Pekalongan, Stasiun Tegal, dan Stasiun Cepu. Gudang kereta api berada di kompleks 
              Stasiun Semarang Poncol, sedangkan dipo lokomotif berada tak jauh dari Stasiun 
              Semarang Poncol.
              </Typography>

              <Typography>
              Daerah operasi Semarang juga mempunyai wilayah kerja yang meliputi tiga kota dan 
              tujuh Kabupaten yang berada di Jawa Tengah antara lain yaitu:
              <ul className="list-disc list-inside">
                <li>Kota Semarang</li>
                <li>Kota Tegal</li>
                <li>Kota Pekalongan</li>
                <li>Kabupaten Tegal</li>
                <li>Kabupaten Pemalang</li>
                <li>Kabupaten Pekalongan</li>
                <li>Kabupaten Batang</li>
                <li>Kabupaten Kendal</li>
                <li>Kabupaten Grobogan</li>
                <li>Kabupaten Blora</li>
              </ul>

              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="font-bold"><p className='font-bold text-2xl text-blue-1000'>Langkah Penggunaan Website</p></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul className="list-disc list-inside">
                  <li>Masukkan data diri anda untuk melengkapi proses pendaftaran akun magang.</li>
                  <li>Setelah melakukan sign in/pendaftaran akun magang pada website, pindah ke menu /kuota magang/ dan pilihlah divisi yang ingin anda daftarkan.</li>
                  <li>Periksa apakah divisi yang anda pilih masih memiliki kuota yang cukup untuk dapat anda daftarkan.</li>
                  <li>Pindah ke menu /Daftar Magang/ lalu periksa data diri anda pada menu /Daftar Magang/ apakah sudah sesuai dengan data diri anda sebenarnya, lalu upload file yang dibutuhkan pada menu /daftar magang/ lalu klik upload.</li>
                  <li>Terakhir, periksa apakah permohonan magang anda sudah terdaftar pada menu /Track Permohonan Magang/ dan tunggu hasilnya secara berkala.</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="font-bold"><p className='font-bold text-2xl text-blue-1000'>Benefit Magang</p></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul className="list-disc list-inside">
                  <li>Sertifikat magang</li>
                  <li>Pengalaman kerja</li>
                  <li>Relasi</li>
                  <li>Manajemen waktu</li>
                  <li>Kerja sama tim</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>

        </div>
        </div>
        <div className='flex'>
        </div>
      </section>
      </div>
      <div className='w-full z-0'>
       <Footer />
      </div>
    </div>
  );
};

export default AuthHoc(Home);
