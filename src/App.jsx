import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Support } from './pages/Support';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen relative">
          <Header />
          <div className="flex-1 bg-[#f1f3f6]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/support" element={<Support />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
          <Toast />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
