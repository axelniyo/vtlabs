import React from 'react';

const kits = [
  {
    icon: '⚙️',
    title: 'PLC Training Kit',
    description: 'For automation & industrial control education, based on OpenPLC.',
  },
  {
    icon: '📡',
    title: 'IoT Smart Home Kit',
    description: 'Wi-Fi & GSM-based smart home projects with ESP32.',
  },
  {
    icon: '🤖',
    title: 'Robotics & Drone Kit',
    description: 'For robotics, UAVs, and autonomous systems in STEM labs.',
  },
  {
    icon: '🔌',
    title: 'Electronics Prototyping Kit',
    description: 'Multi-experiment kit for circuits, sensors, and embedded systems.',
  },
];

interface KitCardProps {
  icon: string;
  title: string;
  description: string;
}

const KitCard: React.FC<KitCardProps> = ({ icon, title, description }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full text-left">
    <h3 className="text-xl font-bold text-vt-pink mb-2 flex items-center">
      <span className="text-2xl mr-3">{icon}</span>
      {title}
    </h3>
    <p className="text-vt-text-secondary">{description}</p>
  </div>
);

const StemKitsSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-vt-bg via-[#2c1a5d] to-[#581c3c] py-20 px-4 my-16 rounded-lg shadow-lg overflow-hidden">
        {/* Decorative elements */}
       <div className="absolute top-0 -left-40 w-80 h-80 bg-vt-purple/10 rounded-full blur-3xl opacity-50"></div>
       <div className="absolute bottom-0 -right-40 w-80 h-80 bg-vt-pink/10 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-5xl font-bold text-white mb-4">
          STEM Training Kits for <span className="text-vt-pink">Education</span>
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-vt-text-secondary mb-12">
          We don't just train — we design and manufacture our own training kits that integrate multiple experiments into one platform, helping learners and educators maximize hands-on learning in STEM fields.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {kits.map(kit => (
                <KitCard 
                  key={kit.title} 
                  icon={kit.icon} 
                  title={kit.title} 
                  description={kit.description} 
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default StemKitsSection;
