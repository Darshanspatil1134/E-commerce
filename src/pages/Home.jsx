import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export const Home = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const categoryQuery = searchParams.get('category');
    const searchQuery = searchParams.get('search');

    const filteredProducts = products.filter(product => {
        let matches = true;
        if (categoryQuery) {
            matches = matches && product.category === categoryQuery;
        }
        if (searchQuery) {
            const lowerSearch = searchQuery.toLowerCase();
            matches = matches && (
                product.name.toLowerCase().includes(lowerSearch) ||
                product.category.toLowerCase().includes(lowerSearch)
            );
        }
        return matches;
    });

    const handleCategoryClick = (cat) => {
        if (categoryQuery === cat) {
            navigate('/');
        } else {
            navigate(`/?category=${encodeURIComponent(cat)}`);
        }
    };

    const categoryDetails = [
        { name: 'Grocery', keyword: 'grocery', img: 'https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png' },
        { name: 'Mobiles', keyword: 'smartphone', img: 'https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png' },
        { name: 'Fashion', keyword: 'clothing', img: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png' },
        { name: 'Electronics', keyword: 'electronics', img: 'https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png' },
        { name: 'Beauty, Toys & More', keyword: 'beauty', img: 'https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png' }
    ];

    const videoRef = useRef(null);
    const productsSectionRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            // Restart video after 10 seconds
            if (video.currentTime >= 10) {
                video.currentTime = 0;
                video.play();
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }, []);

    const handleShopNow = () => {
        productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen pb-12">
            <div className="bg-white shadow-sm mb-6 border-b border-gray-100">
                <div className="container mx-auto px-4 py-3 flex gap-8 justify-between overflow-x-auto category-scroll no-scrollbar">
                    {categoryDetails.map(cat => (
                        <div key={cat.name} onClick={() => handleCategoryClick(cat.name)} className={`flex flex-col items-center gap-2 cursor-pointer group min-w-[70px] ${categoryQuery === cat.name ? 'drop-shadow-md' : ''}`}>
                            <div className={`w-[70px] h-[70px] overflow-hidden flex items-center justify-center transition-all ${categoryQuery === cat.name ? 'scale-110 drop-shadow-md' : 'group-hover:scale-110'}`}>
                                <img src={cat.img} alt={cat.name} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <span className={`text-sm font-semibold whitespace-nowrap transition-colors ${categoryQuery === cat.name ? 'text-yellow-600' : 'text-gray-800 group-hover:text-yellow-600'}`}>{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dynamic Banner Feed */}
            <div className="container mx-auto px-4 mb-6">
                <div className="h-64 md:h-80 w-full rounded-sm overflow-hidden relative shadow-sm flex items-center p-8 md:p-14 text-white bg-black">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 z-0 w-full h-full object-cover opacity-60 pointer-events-none"
                    >
                        <source src="/videooo.mp4" type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>

                    <div className="z-10 max-w-xl relative">
                        <span className="bg-red-600 text-white text-xs font-bold uppercase px-2 py-1 rounded inline-block mb-3 animate-pulse">Live Sale Ad</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 italic tracking-tight text-[#FFD700] drop-shadow-lg">BIG BILLION DAYS</h1>
                        <p className="text-xl mb-6 opacity-100 font-medium drop-shadow-md text-white">Get up to 80% off on premium electronics and smart wearables. Limited time offer!</p>
                        <button 
                            onClick={handleShopNow}
                            className="bg-[#FFD700] text-gray-900 px-8 py-3 font-bold rounded-sm shadow border border-[#FFD700] hover:bg-yellow-500 hover:shadow-md transition-all active:scale-95"
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>

            <div ref={productsSectionRef} className="container mx-auto px-4">

                <div className="bg-white p-5 shadow-sm rounded-sm mb-2 flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                            {categoryQuery ? categoryQuery : searchQuery ? `Results for "${searchQuery}"` : "Best of Electronics"}
                        </h2>
                        {!categoryQuery && !searchQuery && <div className="bg-[#FFD700] font-bold text-xs uppercase px-2 py-1 rounded shadow-sm text-gray-900 animate-pulse">Hot</div>}
                        <span className="text-sm border ml-2 text-gray-500 font-semibold px-2 py-0.5 rounded bg-gray-50">Showing {filteredProducts.length} items</span>
                    </div>
                    <button className="bg-[#FFD700] hover:bg-yellow-500 text-gray-900 rounded-full p-2 h-10 w-10 flex items-center justify-center text-xl font-bold shadow-md transition-transform hover:scale-105">&rarr;</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 bg-white p-2 shadow-sm rounded-b-sm border">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-500">
                            <span className="text-4xl mb-4">🔍</span>
                            <h3 className="text-xl font-semibold">No products found for this search.</h3>
                            <button onClick={() => navigate('/')} className="mt-4 text-yellow-600 font-semibold hover:underline">Clear Search</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};
