import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      
      {/* The Outlet renders whatever matching nested page route is active */}
      <main>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;