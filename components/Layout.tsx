
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="bg-vt-light-gray min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 container mx-auto px-4 py-8">
        <Sidebar />
        <main className="flex-1 lg:ml-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
