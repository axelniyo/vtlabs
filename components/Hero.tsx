
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative text-white overflow-hidden h-full">
      <img 
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop" 
        alt="Laptop with code on a desk with a plant" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-vt-bg bg-opacity-60"></div>
      
      <div className="relative z-10 flex flex-col justify-end h-full">
        <div className="w-full text-center py-16 px-4 bg-gradient-to-t from-vt-bg via-vt-bg/90 to-transparent">
            <p className="text-2xl text-vt-pink mb-4">
                Empowering Education & Innovation
            </p>
            <h1 className="text-8xl font-extrabold tracking-wide bg-gradient-to-r from-vt-pink to-vt-purple bg-clip-text text-transparent">
              VTLABS GROUP
            </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;