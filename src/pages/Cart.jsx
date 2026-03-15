import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { PriceSidebar } from '../components/PriceSidebar';

export const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 flex flex-col items-center min-h-[60vh] justify-center bg-white shadow-sm mt-8 rounded-sm">
                <div className="w-64 h-64 mb-6">
                    <img src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=800&q=80" alt="Empty Cart" className="w-full h-full object-cover rounded-full opacity-60 mix-blend-multiply" />
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">Your cart is empty!</h2>
                <p className="text-gray-500 mb-8">Add items to it now.</p>
                <Link to="/" className="bg-[#2874f0] text-white px-16 py-3 font-semibold rounded-sm shadow-sm hover:bg-blue-700 transition-colors uppercase tracking-wide">
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Cart Items */}
                <div className="lg:w-[68%] flex flex-col gap-4">
                    <div className="bg-white p-4 shadow-sm rounded-sm border border-gray-100 flex justify-between items-center text-lg font-bold">
                        <h1 className="text-gray-800">My Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h1>
                        <div className="flex items-center gap-2 text-sm font-normal text-gray-500">
                            <span className="truncate max-w-[150px] md:max-w-none">Deliver to: <span className="text-gray-800 font-semibold">New York, 10001</span></span>
                            <button className="text-[#2874f0] font-semibold border border-gray-200 px-3 py-1 rounded-sm hover:bg-gray-50">Change</button>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-sm border border-gray-100 flex flex-col divide-y">
                        {cartItems.map(item => (
                            <div key={item.id} className="p-4 md:p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50/50 transition-colors">
                                <Link to={`/product/${item.id}`} className="w-full sm:w-32 h-32 shrink-0 bg-white border rounded">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                                </Link>

                                <div className="flex-1 flex flex-col">
                                    <Link to={`/product/${item.id}`} className="font-semibold text-lg text-gray-900 hover:text-[#2874f0] line-clamp-2 md:line-clamp-1 mb-1">
                                        {item.name}
                                    </Link>
                                    <p className="text-sm text-gray-500 mb-3">{item.category}</p>

                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-gray-500 line-through text-sm">₹{(item.price * 1.3).toFixed(2)}</span>
                                        <span className="text-2xl font-bold text-gray-900">₹{item.price.toFixed(2)}</span>
                                        <span className="text-green-600 font-bold text-sm tracking-wide">30% Off</span>
                                    </div>

                                    <div className="mt-auto flex flex-wrap items-center gap-4 md:gap-8">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={16} />
                                            </button>

                                            <div className="w-12 h-8 border border-gray-300 flex items-center justify-center font-bold text-sm bg-white">
                                                {item.quantity}
                                            </div>

                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="font-semibold hover:text-[#2874f0] uppercase tracking-wide text-gray-900 flex items-center gap-2"
                                        >
                                            <Trash2 size={18} /> Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="hidden md:flex flex-col items-end">
                                    <p className="text-sm text-gray-800 font-semibold mb-1 w-max">Delivery by 11 PM, Tomorrow</p>
                                    <p className="text-xs text-green-600">Free <span className="text-gray-500 line-through">₹50</span></p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-4 shadow-sm rounded-sm border border-gray-100 flex justify-end sticky bottom-0 z-10 border-t-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                        <Link to="/checkout" className="w-full sm:w-auto bg-[#fb641b] text-white px-12 py-4 font-bold rounded-sm shadow-sm hover:bg-[#ff5200] transition-colors uppercase tracking-wide text-lg text-center">
                            Place Order
                        </Link>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-[32%]">
                    <PriceSidebar />
                </div>
            </div>
        </div>
    );
};
