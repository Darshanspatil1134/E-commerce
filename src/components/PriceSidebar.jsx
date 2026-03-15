import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export const PriceSidebar = ({ hideButton = false, isCheckout = false }) => {
    const { cartItems, getCartTotal } = useCart();

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const total = getCartTotal();
    const discount = total * 0.15; // 15% discount
    const shipping = total > 500 ? 0 : 50;
    const finalTotal = total - discount + shipping;

    if (totalItems === 0) return null;

    return (
        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 sticky top-24">
            <h3 className="text-gray-500 font-semibold uppercase text-sm border-b pb-3 mb-4 tracking-wider">Price Details</h3>

            <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center text-gray-800">
                    <span>Price ({totalItems} items)</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-gray-800">
                    <span>Discount</span>
                    <span className="text-green-600 font-semibold">-${discount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-gray-800">
                    <span>Delivery Charges</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold border-b border-dashed border-green-600" : ""}>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                </div>

                <div className="border-t border-dashed my-4 pt-4 pb-2 border-b flex justify-between items-center font-bold text-lg text-gray-900 border-gray-200">
                    <span>Total Amount</span>
                    <span>${finalTotal.toFixed(2)}</span>
                </div>

                <p className="text-green-600 font-semibold text-xs tracking-wide">
                    You will save ${discount.toFixed(2)} on this order
                </p>

                {!hideButton && (
                    <Link
                        to="/checkout"
                        className="w-full mt-6 bg-[#fb641b] text-white font-bold py-3 px-4 rounded-sm flex justify-center uppercase hover:bg-[#ff5200] transition-colors shadow-sm"
                    >
                        Place Order
                    </Link>
                )}

                {isCheckout && (
                    <button
                        type="submit"
                        form="checkout-form"
                        className="w-full mt-6 bg-[#fb641b] text-white font-bold py-3 px-4 rounded-sm flex justify-center uppercase hover:bg-[#ff5200] transition-colors shadow-sm"
                    >
                        Confirm & Pay
                    </button>
                )}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs font-semibold">
                <span className="uppercase">Safe and Secure Payments</span>
            </div>
        </div>
    );
};
