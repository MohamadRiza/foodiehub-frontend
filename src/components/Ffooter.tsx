import { FaFacebookF, FaTwitter, FaInstagram, FaFax } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="bg-orange-500 py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <span className="text-3xl text-white font-bold tracking-tight">
                    FoodieHub.com
                </span>
                
                <div className="flex gap-6 text-white text-lg font-semibold tracking-tight">
                    <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                    <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
                </div>
                
                <div className="flex space-x-4 text-white">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                        <FaFacebookF size={24} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                        <FaInstagram size={24} />
                    </a>
                </div>
            </div>
            
            <div className="container mx-auto mt-4 flex justify-end text-white text-sm">
                © 2024 FoodieHub. All rights reserved.
            </div>
            <div className='container mx-auto mt-4 flex justify-end text-white text-sm italic'>
             Powered By Riza
            </div>
        </div>
    );
}

export default Footer;
