import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { PriceSidebar } from '../components/PriceSidebar';
import { Check, CreditCard, Home, ShieldCheck } from 'lucide-react';

export const Checkout = () => {
    const { cartItems, clearCart, getCartTotal } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [orderComplete, setOrderComplete] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('qr');

    const [shipping, setShipping] = useState({
        name: '',
        phone: '',
        pincode: '',
        address: '',
        city: '',
        state: ''
    });

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setOrderComplete(true);
        clearCart();

        // Open WhatsApp instantly
        window.open(`https://wa.me/917219743836?text=${whatsappMessage}`, '_blank');

        setTimeout(() => {
            navigate('/');
        }, 5000);
    };

    const whatsappMessage = useMemo(() => {
        let msg = `*New Order from JAY-E-SHOP!* 🛒\n\n`;
        msg += `*Customer:* ${shipping.name}\n`;
        msg += `*Phone:* ${shipping.phone}\n`;
        msg += `*Address:* ${shipping.address}, ${shipping.city}, ${shipping.state} - ${shipping.pincode}\n\n`;
        msg += `*Order Items:*\n`;
        cartItems.forEach(item => {
            msg += `- ${item.name} (x${item.quantity}) = $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        msg += `\n*Payment Method:* ${paymentMethod.toUpperCase()}\n`;
        msg += `*Total Amount:* $${getCartTotal().toFixed(2)}\n\n`;
        msg += `Please confirm my order.`;
        return encodeURIComponent(msg);
    }, [shipping, cartItems, paymentMethod, getCartTotal]);

    if (orderComplete) {
        return (
            <div className="container mx-auto px-4 py-16 flex flex-col items-center min-h-[70vh] justify-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-200">
                    <Check size={40} className="text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Order Placed Successfully!</h1>
                <p className="text-lg text-gray-600 mb-8 max-w-md">Thank you for shopping with JAY-E-SHOP. Your order will be delivered soon.</p>
                <button onClick={() => navigate('/')} className="bg-[#2874f0] text-white px-8 py-3 rounded-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                    Continue Shopping
                </button>
            </div>
        );
    }

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Checkout Steps */}
                <div className="lg:w-[68%] flex flex-col gap-4">

                    {/* Step 1: Login (Skipped/Mocked) */}
                    <div className="bg-white flex shadow-sm rounded-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-100 px-6 py-4 border-r w-12 md:w-16 flex items-center justify-center text-gray-500 font-semibold text-lg">
                            1
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col sm:flex-row justify-between sm:items-center">
                            <div>
                                <h2 className="text-lg font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    Login <Check size={18} className="text-[#2874f0] bg-blue-50 rounded" />
                                </h2>
                                <p className="text-gray-800 font-semibold mt-1">+1 123-456-7890</p>
                            </div>
                            <button className="text-[#2874f0] font-semibold border border-gray-200 px-4 py-1.5 rounded-sm hover:bg-gray-50 mt-4 sm:mt-0 uppercase text-sm w-fit">
                                Change
                            </button>
                        </div>
                    </div>

                    {/* Step 2: Delivery Address */}
                    <div className="bg-white flex shadow-sm rounded-sm border border-gray-100 overflow-hidden">
                        <div className={`px-6 py-4 border-r w-12 md:w-16 flex items-start justify-center text-lg font-semibold ${step === 1 ? 'bg-[#2874f0] text-white' : 'bg-gray-100 text-gray-500'}`}>
                            2
                        </div>
                        <div className="p-4 md:p-6 flex-1">
                            <h2 className={`uppercase tracking-widest font-bold mb-4 flex items-center gap-2 ${step === 1 ? 'text-[#2874f0]' : 'text-gray-500'}`}>
                                Delivery Address {step > 1 && <Check size={18} className="text-[#2874f0] bg-blue-50 rounded" />}
                            </h2>

                            {step === 1 ? (
                                <form id="shipping-form" className="bg-blue-50/30 p-4 border border-blue-100 rounded-sm" onSubmit={handleShippingSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <input required type="text" placeholder="Name" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2874f0] focus:border-[#2874f0]" value={shipping.name} onChange={e => setShipping({ ...shipping, name: e.target.value })} />
                                        </div>
                                        <div>
                                            <input required type="tel" placeholder="10-digit mobile number" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2874f0] text-gray-800 focus:border-[#2874f0]" value={shipping.phone} onChange={e => setShipping({ ...shipping, phone: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <input required type="text" placeholder="Pincode" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2874f0] focus:border-[#2874f0]" value={shipping.pincode} onChange={e => setShipping({ ...shipping, pincode: e.target.value })} />
                                        </div>
                                        <div>
                                            <input required type="text" placeholder="Locality / Town" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2874f0]" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <textarea required placeholder="Address (Area and Street)" className="w-full p-3 border border-gray-300 rounded-sm h-24 focus:outline-none focus:ring-1 focus:ring-[#2874f0] focus:border-[#2874f0]" value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })}></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <input required type="text" placeholder="City/District/Town" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2874f0] focus:border-[#2874f0]" value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} />
                                        </div>
                                        <div>
                                            <select required className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2874f0] text-gray-700 focus:border-[#2874f0]" value={shipping.state} onChange={e => setShipping({ ...shipping, state: e.target.value })}>
                                                <option value="">Select State</option>
                                                <option value="NY">New York</option>
                                                <option value="CA">California</option>
                                                <option value="TX">Texas</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-[#fb641b] hover:bg-[#ff5200] text-white px-8 py-3.5 font-bold rounded-sm uppercase tracking-wide w-full md:w-auto shadow-sm">
                                        Deliver Here
                                    </button>
                                </form>
                            ) : (
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div>
                                        <span className="font-semibold text-gray-900 mr-2">{shipping.name}</span>
                                        <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded mr-3 uppercase">Home</span>
                                        <span className="font-semibold text-gray-900">{shipping.phone}</span>
                                        <p className="text-gray-700 mt-2">{shipping.address}, {shipping.city}, {shipping.state} - {shipping.pincode}</p>
                                    </div>
                                    <button className="text-[#2874f0] font-semibold border border-gray-200 px-4 py-1.5 rounded-sm hover:bg-gray-50 uppercase text-sm mt-4 md:mt-0 w-fit" onClick={() => setStep(1)}>
                                        Change
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Step 3: Payment */}
                    <div className="bg-white flex shadow-sm rounded-sm border border-gray-100 overflow-hidden">
                        <div className={`px-6 py-4 border-r w-12 md:w-16 flex items-start justify-center text-lg font-semibold ${step === 2 ? 'bg-[#2874f0] text-white' : 'bg-gray-100 text-gray-500'}`}>
                            3
                        </div>
                        <div className="p-4 md:p-6 flex-1">
                            <h2 className={`uppercase tracking-widest font-bold mb-4 ${step === 2 ? 'text-[#2874f0]' : 'text-gray-500'}`}>
                                Payment Options
                            </h2>

                            {step === 2 && (
                                <form id="checkout-form" onSubmit={handlePaymentSubmit}>
                                    <div className="space-y-4 border rounded-sm">
                                        {/* Credit Card Option */}
                                        <label className={`flex items-start gap-4 p-4 border-b cursor-pointer ${paymentMethod === 'card' ? 'bg-blue-50/20' : 'hover:bg-gray-50 transition-colors'}`}>
                                            <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 w-4 h-4 text-[#2874f0] focus:ring-[#2874f0]" />
                                            <div className="flex-1 w-full">
                                                <div className="flex items-center gap-2 mb-2 font-semibold text-gray-900">
                                                    Credit / Debit / ATM Card <CreditCard size={18} className="text-gray-500" />
                                                </div>
                                                {paymentMethod === 'card' && (
                                                    <div className="space-y-3 mt-4 pr-4">
                                                        <input required type="text" placeholder="Card Number" className="w-full p-2.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#2874f0]" />
                                                        <div className="flex gap-3">
                                                            <input required type="text" placeholder="MM/YY" className="w-1/2 p-2.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#2874f0]" />
                                                            <input required type="text" placeholder="CVV" className="w-1/4 p-2.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#2874f0]" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </label>

                                        {/* Cash on Delivery Option */}
                                        <label className={`flex items-center gap-4 p-4 border-b cursor-pointer ${paymentMethod === 'cod' ? 'bg-blue-50/20' : 'hover:bg-gray-50 transition-colors'}`}>
                                            <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 focus:ring-[#2874f0] text-[#2874f0]" />
                                            <div className="font-semibold text-gray-800">
                                                Cash on Delivery
                                            </div>
                                        </label>

                                        {/* UPI QR Code Option */}
                                        <label className={`flex items-start gap-4 p-4 cursor-pointer ${paymentMethod === 'qr' ? 'bg-blue-50/20' : 'hover:bg-gray-50 transition-colors'}`}>
                                            <input type="radio" name="payment" value="qr" checked={paymentMethod === 'qr'} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 w-4 h-4 text-[#2874f0] focus:ring-[#2874f0]" />
                                            <div className="flex-1 w-full">
                                                <div className="flex items-center gap-2 mb-2 font-semibold text-gray-900">
                                                    UPI Scan & Pay (PhonePe / GPay)
                                                </div>
                                                {paymentMethod === 'qr' && (
                                                    <div className="mt-4 pr-4 pb-2 animate-in fade-in slide-in-from-top-2">
                                                        <div className="flex flex-col items-center p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                                                            <div className="bg-[#5f259f] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-4 flex items-center gap-2 shadow-sm">
                                                                PhonePe ACCEPTED HERE
                                                            </div>
                                                            <img
                                                                src="/qr.jpg"
                                                                alt="UPI QR Code"
                                                                className="w-48 h-48 object-contain mb-3 rounded border p-1 border-gray-100"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    // Fallback QR code dynamically generated via API if the user hasn't added the image yet
                                                                    e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pn=JAY%20SHRAWAN%20GOSAVI";
                                                                }}
                                                            />
                                                            <p className="text-sm font-bold text-gray-900 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded">JAY SHRAWAN GOSAVI</p>
                                                        </div>

                                                        <div className="flex flex-col items-center gap-3 mt-5 pt-5 border-t border-gray-200">
                                                            <p className="text-sm text-gray-700 font-medium text-center">Payment done? Please share the screenshot on WhatsApp:</p>
                                                            <a
                                                                href={`https://wa.me/917219743836?text=${whatsappMessage}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#25D366] text-white py-3 px-6 rounded-md font-bold hover:bg-[#128C7E] transition-colors shadow"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.061 3.961L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                                                </svg>
                                                                Message +91 721 974 3836
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-[32%]">
                    <PriceSidebar hideButton={true} isCheckout={step === 2} />

                    <div className="mt-4 flex flex-col gap-3 p-4 justify-center items-center">
                        <ShieldCheck size={40} className="text-green-600 mb-1" />
                        <p className="text-xs text-center text-gray-500 font-semibold uppercase leading-relaxed">
                            Safe and Secure Payments.<br />Easy returns. 100% Authentic products.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
