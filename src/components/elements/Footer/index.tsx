import Image from 'next/image';
import { BsSuitcaseLg } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";

const Footer: React.FC = () => {
    return (
       <div className="bg-blue-1000 flex pb-4 pr-36">
        <div>
            <Image src="/kai3.png" alt="Logo KAI" width={120} height={55} className={'ml-10 mt-6 mr-8'} />
        </div>
        <div>
            <h2 className="font-semibold text-2xl text-orange-1000 mt-6">PT Kereta Api Indonesia (Persero)</h2>
            <p className="font-semibold text-lg text-white">Contact Us</p>
            <div className="flex text-smd">
                <BsSuitcaseLg className="text-orange-1000 font-bold mr-2 mt-1" width={20} height={20} />
                <p className="text-white font-medium">(024) 3544606</p>
            </div>
            <div className="flex text-sm text-white">
                <FiPhone className="text-orange-1000 font-bold mr-2 mt-1" width={20} height={20} />
                <p className="text-white font-medium">+62 821-4227-9780 (Nova Adrian - Assistant Manajer Internal dan External)</p>
            </div>
        </div>
        <div>
            <p className="font-semibold text-lg text-white mt-14">Location</p>
            <div className="flex text-sm font-regular">
                <p className="text-white font-medium">Jl. MH Thamrin No.3, Miroto, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50133.</p>
            </div>
        </div>
       </div>
    );
};

export default Footer;