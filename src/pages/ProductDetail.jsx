import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Star, Truck, ShieldCheck, Tag, Zap, Check, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';

export const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen bg-white text-gray-500">
                <h2 className="text-2xl">Product Not Found</h2>
            </div>
        );
    }

    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    const handleBuyNow = () => {
        addToCart(product);
        navigate('/cart');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-4 lg:p-6 shadow shadow-black/5 rounded-sm border mb-8 flex flex-col md:flex-row gap-8 lg:gap-14">

                {/* Images Component */}
                <div className="w-full md:w-[45%] lg:w-2/5 flex flex-col items-center">
                    <div className="p-4 border border-gray-100 rounded-sm w-full h-[400px] lg:h-[480px] flex items-center justify-center relative hover:shadow-lg transition-shadow bg-white">
                        <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform hover:scale-110 duration-500" />
                        <span className="absolute top-4 left-4 bg-green-600 text-white rounded-sm px-3 py-1 text-xs font-bold shadow">Bestseller</span>
                    </div>

                    <div className="flex gap-2 w-full mt-4 flex-col lg:flex-row">
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdded}
                            className={`flex-1 font-bold py-4 rounded-sm transition-all text-base uppercase shadow flex items-center justify-center gap-2 tracking-wide ${isAdded ? 'bg-green-600' : 'bg-[#ff9f00] hover:bg-[#f39400] active:scale-95 text-white'}`}
                        >
                            {isAdded ? (
                                <><Check size={20} /> Added to Cart</>
                            ) : (
                                <><ShoppingCart size={20} /> Add to Cart</>
                            )}
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-[#fb641b] hover:bg-[#ff5200] text-white font-bold py-4 rounded-sm transition-colors text-base uppercase shadow flex items-center justify-center gap-2 tracking-wide"
                        >
                            <Zap size={20} fill="currentColor" /> Buy Now
                        </button>
                    </div>
                </div>

                {/* Product Information */}
                <div className="w-full md:w-[55%] lg:w-3/5">
                    <p className="text-sm text-gray-500 font-semibold mb-2 tracking-wide uppercase hover:text-[#2874f0] cursor-pointer inline-block">{product.category}</p>
                    <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 leading-snug mb-3">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-3">
                        <div className="bg-green-600 text-white flex items-center gap-1 px-2 py-0.5 rounded-sm text-sm font-bold shadow-sm">
                            {product.rating} <Star size={12} fill="currentColor" />
                        </div>
                        <span className="text-gray-500 text-sm font-semibold hover:text-[#2874f0] cursor-pointer">{product.reviews} Ratings & 45 Reviews</span>
                        <span className="bg-gray-100 border border-gray-200 text-gray-700 rounded-sm text-xs px-2 py-1 font-bold tracking-wide italic text-[#2874f0]">Kart Assured</span>
                    </div>

                    <div className="flex items-end gap-3 mb-6">
                        <span className="text-3xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                        <span className="text-gray-500 line-through text-lg font-medium">₹{(product.price * 1.3).toFixed(2)}</span>
                        <span className="text-green-600 font-bold text-sm tracking-wide">30% off</span>
                    </div>

                    <div className="mb-6 border-t border-b py-5">
                        <h3 className="font-semibold text-gray-800 mb-3 text-sm">Available offers</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-[#388e3c] mt-0.5">•</span>
                                <p><span className="font-bold text-gray-800">Bank Offer:</span> 5% Cashback on JAY-E-SHOP Axis Bank Card <span className="text-[#2874f0] font-semibold cursor-pointer">T&C</span></p>
                            </li>
                            <li className="flex gap-3 items-start text-sm">
                                <Tag size={18} className="text-green-600 shrink-0 mt-0.5" />
                                <p><span className="font-bold text-gray-800">Special Price:</span> Get extra 10% off (price inclusive of cashback/coupon) <span className="text-[#2874f0] font-semibold cursor-pointer">T&C</span></p>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8 mt-4">
                        <div className="flex gap-4 items-center">
                            <Truck className="text-[#2874f0] shrink-0" size={32} />
                            <div>
                                <p className="font-semibold text-sm text-gray-800">Free Delivery</p>
                                <p className="text-xs text-black font-semibold">Delivery by {new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <ShieldCheck className="text-[#2874f0] shrink-0" size={32} />
                            <div>
                                <p className="font-semibold text-sm text-gray-800">1 Year Warranty</p>
                                <p className="text-xs text-gray-500">Brand authorized service</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold border border-b-0 border-gray-200 text-gray-800 px-4 py-3 bg-gray-50 rounded-t-sm">Product Description</h3>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line border border-gray-200 p-4 rounded-b-sm">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
