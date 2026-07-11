import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from './components/MainLayout'; // Import your new layout
import Home from './pages/home/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/auth/Profile';
import Login from './pages/auth/Login';

import ContactUs from './pages/support/ContactUs';
import PrivacyPolicy from './pages/support/PrivacyPolicy';
import ShipAndReturn from './pages/support/ShipAndReturn';
import TermsAndConditions from './pages/support/TermsAndConditions';

import ProductDetails from './pages/product/ProductDetails';
import SignUpSendOtp from './pages/auth/signup/SendOtp';
import SignUpVerifyOtp from './pages/auth/signup/VerifyOtp';
import ForgotPassword from './pages/auth/forgotPassword/SendOtp';
import ResetPassword from './pages/auth/forgotPassword/ResetPassword';
import ProtectRoute from './components/ProtectRoutes';
import NotFound from './pages/NotFound';
import Checkout from './pages/Checkout';
import Address from './pages/Address';
import OrderDetails from './pages/OrderDetails';

const App = () => {
  return (
    <div>
      <Routes>
        
        {/* ==================== CLEAN LAYOUT CONTAINER ==================== */}
        {/* These pages WILL show the Navbar and Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetails />} />
          
          {/* Customer Support Links */}
          <Route path="contact" element={<ContactUs />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="shipping-return" element={<ShipAndReturn />} />
          <Route path="terms-conditions" element={<TermsAndConditions />} />

          {/* Protected Customer Account Routes */}
          <Route path="cart" element={<ProtectRoute><Cart /></ProtectRoute>} />
          <Route path="orders" element={<ProtectRoute><Orders /></ProtectRoute>} />
          <Route path="orders/:id" element={<ProtectRoute><OrderDetails /></ProtectRoute>} />
          <Route path="profile" element={<ProtectRoute><Profile /></ProtectRoute>} />
          <Route path="checkout" element={<ProtectRoute><Checkout /></ProtectRoute>} />
          <Route path="address" element={<ProtectRoute><Address /></ProtectRoute>} />
        </Route>


        {/* ==================== STANDALONE PAGES ==================== */}
        {/* These pages WILL NOT show the Navbar or Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpSendOtp />} />
        <Route path="/signup/verify" element={<SignUpVerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/reset" element={<ResetPassword />} />

        {/* Catch-all global 404 page */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
};

export default App;