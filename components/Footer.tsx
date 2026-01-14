
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-vt-dark-gray text-white mt-auto">
      <div className="container mx-auto py-6 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} VTLabs. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-vt-light-blue">Facebook</a>
            <a href="#" className="hover:text-vt-light-blue">Twitter</a>
            <a href="#" className="hover:text-vt-light-blue">LinkedIn</a>
        </div>
        <div className="mt-6 text-sm">
            <Link to="/admin" className="text-gray-400 hover:text-white transition-colors duration-200">
              Login
            </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
