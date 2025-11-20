import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar'
import Dashboard from './pages/user/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import Login from './pages/authorization/Login';
import Register from './pages/authorization/Register';
import { AuthProvider } from './context/AuthProvider';
import CartPage from './pages/Cart';

function App() {
  return (
    <AuthProvider>
      
      <BrowserRouter>
       <Navbar /> {/* Navbar can now access AuthContext */}
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
