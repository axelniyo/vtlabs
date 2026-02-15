
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const isVtlCraft = to === '/vtl-craft';

  if (isVtlCraft) {
      return (
           <Link to={to} className="px-4 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-vt-pink to-vt-purple hover:opacity-90 transition-opacity">
              {children}
           </Link>
      );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
          isActive || (to === '/training-center' && children === 'Training Center')
            ? 'bg-gradient-to-r from-vt-pink to-vt-purple text-white'
            : 'text-vt-text-light hover:bg-vt-surface'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const logoSrc = '/logo.svg';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const headerClasses = "bg-vt-surface shadow-lg sticky top-0 z-50";

    return (
      <header className={headerClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
               <Link to="/" className="flex items-center gap-2">
                 <img src={logoSrc} alt="VTLabs Logo" className="h-16 w-16" />
                 <span className="text-white text-3xl font-extrabold">
                   VT<span className="border-b-4 border-vt-blue pb-1">LABS</span>
                 </span>
               </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <NavItem to="/training-center">Training Center</NavItem>
                <NavItem to="/projects">Projects</NavItem>
                <NavItem to="/manufacturing">Manufacturing</NavItem>
                <NavItem to="/about-us">About Us</NavItem>
                <NavItem to="/vtl-craft">VTL-CRAFT</NavItem>
              </div>
            </div>
            <div className="md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-vt-surface focus:outline-none"
                    aria-label="Open main menu"
                    aria-expanded={isMobileMenuOpen}
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
            <div className="md:hidden container mx-auto p-4 pt-0">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-vt-surface rounded-b-lg">
                    <NavItem to="/training-center">Training Center</NavItem>
                    <NavItem to="/projects">Projects</NavItem>
                    <NavItem to="/manufacturing">Manufacturing</NavItem>
                    <NavItem to="/about-us">About Us</NavItem>
                    <NavItem to="/vtl-craft">VTL-CRAFT</NavItem>
                </div>
            </div>
        )}
      </header>
    );
};

export default Header;
