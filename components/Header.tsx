
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
          isActive
            ? 'bg-vt-light-blue text-white'
            : 'text-white hover:bg-vt-blue hover:bg-opacity-75'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
      <header className="bg-vt-blue shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-2xl font-bold">
                VT<span className="text-vt-light-blue">Labs</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem to="/training-center">Training Center</NavItem>
                <NavItem to="/projects">Projects</NavItem>
                <NavItem to="/manufacturing">Manufacturing</NavItem>
                <NavItem to="/about-us">About Us</NavItem>
                <NavItem to="/vtl-craft">VTL Craft</NavItem>
              </div>
            </div>
            <div className="md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-vt-blue hover:bg-opacity-75 focus:outline-none"
                >
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavItem to="/training-center">Training Center</NavItem>
                    <NavItem to="/projects">Projects</NavItem>
                    <NavItem to="/manufacturing">Manufacturing</NavItem>
                    <NavItem to="/about-us">About Us</NavItem>
                    <NavItem to="/vtl-craft">VTL Craft</NavItem>
                </div>
            </div>
        )}
      </header>
    );
};

export default Header;
