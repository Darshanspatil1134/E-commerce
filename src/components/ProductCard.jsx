import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <Link to={`/product/${product.id}`} className="group relative block bg-[#FFFAF0] rounded-md shadow-sm border border-yellow-200 p-4 transition-all duration-300 hover:shadow-xl hover:border-yellow-400 hover:-translate-y-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md mb-4 bg-white flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                />
            </div>

            <div className="space-y-2">
                <p className="text-yellow-700 text-xs font-bold uppercase tracking-wider">{product.category}</p>
                <h3 className="font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-yellow-600 transition-colors h-11">
                    {product.name}
                </h3>

                <div className="flex items-center gap-2">
                    <div className="bg-green-600 text-white flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold">
                        {product.rating} <Star size={10} fill="currentColor" />
                    </div>
                    <span className="text-gray-500 text-xs font-semibold">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-500 line-through">₹{(product.price * 1.3).toFixed(2)}</span>
                        <span className="text-xs text-green-600 font-bold">30% off</span>
                    </div>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`w-full mt-3 font-bold py-2 rounded-sm flex items-center justify-center gap-2 transition-all duration-300 ${isAdded ? 'bg-green-600 border-green-600 text-white scale-95' : 'bg-white border border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-gray-900 active:scale-95'}`}
                >
                    {isAdded ? (
                        <><Check size={18} /> Added!</>
                    ) : (
                        <><ShoppingCart size={18} /> Add to Cart</>
                    )}
                </button>
            </div>
        </Link>
    );
};
