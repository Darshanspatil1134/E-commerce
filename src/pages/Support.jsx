import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export const Support = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [orderId, setOrderId] = useState('');
    const [message, setMessage] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');

    const handleSupportSubmit = (e) => {
        e.preventDefault();
        setSubmitStatus('Redirecting to WhatsApp...');

        // Format message for WhatsApp
        let waMsg = `*New Support Request!* 🚨\n\n`;
        waMsg += `*Name:* ${name}\n`;
        waMsg += `*Email:* ${email}\n`;
        waMsg += `*Order ID:* ${orderId || 'N/A'}\n\n`;
        waMsg += `*Issue/Feedback:*\n${message}`;

        const encodedMsg = encodeURIComponent(waMsg);

        // Open WhatsApp instantly
        window.open(`https://wa.me/917219743836?text=${encodedMsg}`, '_blank');

        setTimeout(() => {
            setSubmitStatus('');
            setName('');
            setEmail('');
            setOrderId('');
            setMessage('');
        }, 3000);
    };

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12 max-w-6xl">
            <div className="mb-10 text-center max-w-2xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">JAY-E-SHOP Help Center</h1>
                <p className="text-gray-600 text-lg">We are here to help you 24x7. Reach out to our team instantly via phone or drop a message below.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* Contact Form */}
                <div className="w-full md:w-3/5 bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                        Send us a message <Send size={24} className="text-[#2874f0] -mt-1" />
                    </h2>

                    <form className="space-y-5" onSubmit={handleSupportSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]/50 focus:border-[#2874f0] transition-colors bg-gray-50 focus:bg-white text-gray-900" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]/50 focus:border-[#2874f0] transition-colors bg-gray-50 focus:bg-white text-gray-900" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Order ID (Optional)</label>
                            <input type="text" value={orderId} onChange={e => setOrderId(e.target.value)} className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]/50 focus:border-[#2874f0] transition-colors bg-gray-50 focus:bg-white text-gray-900" placeholder="OD123456789" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Issue / Feedback</label>
                            <textarea required value={message} onChange={e => setMessage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-sm h-32 md:h-40 focus:outline-none focus:ring-2 focus:ring-[#2874f0]/50 focus:border-[#2874f0] transition-colors bg-gray-50 focus:bg-white text-gray-900 resize-none" placeholder="Describe your issue in detail..."></textarea>
                        </div>

                        <button type="submit" className="bg-[#fb641b] hover:bg-[#ff5200] text-white px-8 py-3.5 font-bold rounded-sm uppercase tracking-wide w-full sm:w-auto shadow-sm transition-colors text-lg">
                            Submit Request
                        </button>

                        {submitStatus && (
                            <div className="mt-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded font-semibold text-sm">
                                {submitStatus}
                            </div>
                        )}
                    </form>
                </div>

                {/* Contact Info */}
                <div className="w-full md:w-2/5 flex flex-col gap-6">
                    <div className="bg-gradient-to-br from-[#2874f0] to-[#1e5bbd] text-white p-8 rounded-sm shadow-sm flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-6 italic tracking-wide">Team Support</h3>

                        <div className="space-y-8">
                            <div className="flex gap-4 items-start">
                                <a href="tel:+917219743836" className="bg-white/20 hover:bg-white/30 transition-colors p-3 rounded-full shrink-0 mt-1 shadow-sm cursor-pointer">
                                    <Phone size={24} className="text-white" />
                                </a>
                                <div>
                                    <h4 className="font-semibold text-white/90 text-sm uppercase tracking-wider mb-1">Call Us</h4>
                                    <a href="tel:+917219743836" className="font-bold text-2xl tracking-tight mb-1 hover:text-gray-200 block transition-colors">
                                        +91 7219743836
                                    </a>
                                    <p className="text-sm font-bold text-yellow-300 tracking-wide bg-black/20 inline-block px-2 py-0.5 rounded mt-1">24x7 Available</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ravansunny2916@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 transition-colors p-3 rounded-full shrink-0 shadow-sm mt-1 cursor-pointer">
                                    <Mail size={24} className="text-white" />
                                </a>
                                <div>
                                    <h4 className="font-semibold text-white/90 text-sm uppercase tracking-wider mb-1">Email Support</h4>
                                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ravansunny2916@gmail.com" target="_blank" rel="noopener noreferrer" className="font-bold text-lg mb-0.5 break-all hover:text-gray-200 block transition-colors mt-1">
                                        ravansunny2916@gmail.com
                                    </a>
                                    <p className="text-white/80 text-sm font-medium mt-1">We reply within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="bg-white/20 p-3 rounded-full shrink-0 shadow-sm mt-1">
                                    <MapPin size={24} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white/90 text-sm uppercase tracking-wider mb-1">Head Office</h4>
                                    <p className="font-bold leading-relaxed opacity-95 text-sm mt-1 w-[90%]">
                                        JAY-E-SHOP Internet Pvt Ltd, <br />
                                        Mane Nagar Road, <br />
                                        Nashik, 422002, <br />
                                        Maharashtra, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 border rounded-sm shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-2">Need help with an order?</h3>
                        <p className="text-sm text-gray-600 mb-4">Track orders, manage returns, and more directly from your account dashboard.</p>
                        <button onClick={() => navigate('/')} className="text-[#2874f0] font-bold border border-[#2874f0] hover:bg-[#2874f0] hover:text-white transition-colors px-6 py-2 rounded-sm w-full uppercase text-sm">
                            View Orders
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
