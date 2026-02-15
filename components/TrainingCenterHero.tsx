
import React from 'react';

const TrainingCenterHero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-vt-bg via-[#2c1a5d] to-[#581c3c] p-16 rounded-lg shadow-lg mb-16 overflow-hidden text-center">
        {/* Decorative Circles */}
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-vt-pink/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-32 right-16 w-32 h-32 bg-vt-pink/10 rounded-full blur-2xl"></div>

        <div className="relative z-10">
            <h1 className="text-5xl font-extrabold text-white mb-4">
                Empowering Education <span className="text-vt-pink">Through Technology</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-vt-text-secondary leading-relaxed">
                At VTLABS, our Training Center blends practical courses with custom-built training kits. We focus on STEM education to equip learners with the tools to innovate and create solutions for the future.
            </p>
        </div>
    </div>
  );
};

export default TrainingCenterHero;
