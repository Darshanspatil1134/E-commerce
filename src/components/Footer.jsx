import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-[#172337] text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-gray-400 font-semibold mb-4 text-sm uppercase tracking-wider">About</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link to="/stories" className="hover:text-white transition-colors">JAY-E-SHOP Stories</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-gray-400 font-semibold mb-4 text-sm uppercase tracking-wider">Help</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/support" className="hover:text-white transition-colors">Payments</Link></li>
                            <li><Link to="/support" className="hover:text-white transition-colors">Shipping</Link></li>
                            <li><Link to="/support" className="hover:text-white transition-colors">Cancellation & Returns</Link></li>
                            <li><Link to="/support" className="hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-gray-400 font-semibold mb-4 text-sm uppercase tracking-wider">Policy</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/policy" className="hover:text-white transition-colors">Return Policy</Link></li>
                            <li><Link to="/policy" className="hover:text-white transition-colors">Terms of Use</Link></li>
                            <li><Link to="/policy" className="hover:text-white transition-colors">Security</Link></li>
                            <li><Link to="/policy" className="hover:text-white transition-colors">Privacy</Link></li>
                        </ul>
                    </div>
                    <div className="border-t border-gray-700 md:border-t-0 md:border-l pl-0 md:pl-8 pt-8 md:pt-0">
                        <h3 className="text-gray-400 font-semibold mb-4 text-sm uppercase tracking-wider">Mail Us / Office</h3>
                        <ul className="text-gray-400 text-sm space-y-4">
                            <li className="flex gap-3">
                                <MapPin size={18} className="shrink-0 text-gray-400 mt-1" />
                                <p>JAY-E-SHOP Internet Private Limited,<br />Tech Park, mane nagar Road,<br />Nashik, 424002,<br />maharashtra, India</p>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone size={18} className="shrink-0 text-gray-400" />
                                <p>+91 72197 43836 / 95183 77707 </p>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail size={18} className="shrink-0 text-gray-400" />
                                <p>ravansunny2916@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} JAY-E-SHOP.com. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
