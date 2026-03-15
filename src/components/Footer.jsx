import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <ul className="flex flex-col md:flex-row gap-6 text-sm w-full md:w-auto items-center">
                        <li className="flex gap-2 items-center hover:text-white transition-colors cursor-pointer p-2 rounded-lg hover:bg-gray-800">
                            <MapPin size={18} className="text-[#FFD700] shrink-0" />
                            <span className="text-center md:text-left">Tech Park, mane nagar Road, Nashik, 424002, India</span>
                        </li>
                        <li className="flex gap-2 items-center hover:text-white transition-colors cursor-pointer p-2 rounded-lg hover:bg-gray-800">
                            <Phone size={18} className="text-[#FFD700] shrink-0" />
                            <span>+91 72197 43836 / 95183 77707</span>
                        </li>
                        <li className="flex gap-2 items-center hover:text-white transition-colors cursor-pointer p-2 rounded-lg hover:bg-gray-800">
                            <Mail size={18} className="text-[#FFD700] shrink-0" />
                            <span>jsgosavi2005@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-400">
                    <p>&copy; 2026 Jay-e-commerce reserved</p>
                </div>
            </div>
        </footer>
    );
};
