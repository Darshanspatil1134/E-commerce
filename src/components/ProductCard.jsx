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

    const [imageError, setImageError] = useState(false);

    // Use a generic, professional placeholder if an image fails
    // This avoids "misleading mismatches" like showing headphones for laptops
    const genericPlaceholder = "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&q=80";

    return (
        <Link to={`/product/${product.id}`} className="group relative block bg-white rounded-xl shadow-sm border border-gray-100 p-3 transition-all duration-500 hover:shadow-2xl hover:border-yellow-300 hover:-translate-y-2 overflow-hidden">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-4 bg-gray-50 flex items-center justify-center">
                <img
                    src={imageError ? genericPlaceholder : product.image}
                    alt={product.name}
                    onError={() => setImageError(true)}
                    className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
                />


                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                
                {product.rating > 4.5 && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-tighter">
                        Best Seller
                    </div>
                )}
            </div>

            <div className="space-y-2 px-1">
                <p className="text-yellow-600 text-[10px] font-bold uppercase tracking-widest">{product.category}</p>
                <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-yellow-600 transition-colors h-10 text-sm">
                    {product.name}
                </h3>

                <div className="flex items-center gap-2">
                    <div className="bg-green-600 text-white flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold">
                        {product.rating} <Star size={10} fill="currentColor" />
                    </div>
                    <span className="text-gray-400 text-[10px] font-semibold">({product.reviews.toLocaleString()})</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1 rounded">30% OFF</span>
                        </div>
                        <span className="text-xs text-gray-400 line-through">₹{(product.price * 1.3).toFixed(0)}</span>
                    </div>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`w-full mt-3 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm ${isAdded ? 'bg-green-600 border-green-600 text-white scale-95' : 'bg-gray-900 text-white hover:bg-black active:scale-95 shadow-lg shadow-gray-200'}`}
                >
                    {isAdded ? (
                        <><Check size={16} /> Added!</>
                    ) : (
                        <><ShoppingCart size={16} /> Add to Cart</>
                    )}
                </button>
            </div>
        </Link>
    );
};
