import Image from 'next/image';
import { BsSuitcaseLg } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";

const Footer: React.FC = () => {
    return (
       <div className="bg-blue-1000 md:w-full flex flex-col md:flex-row pb-4 lg:pl-36 lg:pr-48 px-12 md:px-1">
        <div className="md:absolute flex">
            <Image src="/kai3.png" alt="Logo KAI" width={145} height={50} className={'mt-6 mb-4 md:mb-0'} />
        </div>
        <div className="md:text-left mb-4 md:mb-0 md:ml-48">
            <h2 className="font-semibold text-xl md:text-2xl text-orange-1000 mt-2 md:mt-6">PT Kereta Api Indonesia (Persero) Daerah Operasi 4 Semarang</h2>
            <p className="font-semibold text-lg text-white mt-2">Hubungi kami</p>
            <div className="flex md:justify-start text-sm md:text-base mt-1">
                <BsSuitcaseLg className="text-orange-1000 font-bold mr-2" width={20} height={20} />
                <p className="text-white font-medium">(024) 3544606</p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-start md:items-start text-sm md:text-base text-white mt-1">
                <FiPhone className="text-orange-1000 font-bold mr-2 mb-1 md:mb-0 md:mt-1" width={20} height={20} />
                <span>
                    <p className="text-white font-medium md:text-left md:pr-1">+62 821-4227-9780 (Nova Adrian - Assistant Manajer Internal dan External)</p>
                </span>
            </div>
        </div>
        <div className="md:text-left mt-4 md:mt-16">
            <p className="font-semibold text-lg text-white">Lokasi</p>
            <div className="flex md:justify-start text-sm font-regular mt-1">
                <p className="text-white font-medium md:text-left">Jl. MH Thamrin No.3, Miroto, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50133.</p>
            </div>
        </div>
       </div>
    );
};

export default Footer;