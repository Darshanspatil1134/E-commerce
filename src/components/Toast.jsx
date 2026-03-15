import { useCart } from '../hooks/useCart';
import { CheckCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Toast = () => {
    const { notification } = useCart();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (notification) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 2800);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    if (!notification || !visible) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100] animate-fade-in-up">
            <div className="bg-white border-l-4 border-green-500 shadow-2xl rounded-sm p-4 flex items-center gap-4 min-w-[300px] border border-gray-100">
                <div className="w-12 h-12 shrink-0 bg-gray-50 rounded border border-gray-100 p-1">
                    <img src={notification.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-green-600 mb-0.5">
                        <CheckCircle size={14} fill="currentColor" className="text-white" />
                        <span className="text-xs font-bold uppercase tracking-wider">Added to Cart</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{notification.message}</p>
                </div>
                <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={18} />
                </button>
            </div>
            
            {/* Progress bar */}
            <div className={`absolute bottom-0 left-0 h-1 bg-green-500 ${visible ? 'animate-progress' : ''}`}></div>
        </div>
    );
};
