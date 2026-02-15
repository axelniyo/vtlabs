import React from 'react';

// Data for the static training program grid
const programs = [
  { icon: '📡', title: 'IoT', description: 'Learn Wi-Fi & GSM automation, dashboards, and smart solutions.' },
  { icon: '🔌', title: 'Embedded Systems', description: 'Master microcontrollers (Arduino, ESP32, AVR) with real hardware.' },
  { icon: '📐', title: 'CAD / SolidWorks', description: 'Professional 3D design and product modeling for engineering.' },
  { icon: '🖨️', title: '3D Printing', description: 'Hands-on additive manufacturing, slicing, and prototyping.' },
  { icon: '⚡', title: 'Electronics', description: 'From circuit design to PCB assembly and testing.' },
  { icon: '🌐', title: 'Networking', description: 'Build and manage computer networks for real-world setups.' },
  { icon: '💻', title: 'Web Design', description: 'Create interactive websites and IoT dashboards.' },
  { icon: '🔥', title: 'Laser Cutting', description: 'Digital fabrication with laser machines for STEM projects.' },
];

interface ProgramCardProps {
  icon: string;
  title: string;
  description: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ icon, title, description }) => (
  <div className="bg-vt-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transform hover:-translate-y-1 transition-transform duration-300 ease-in-out h-full flex flex-col">
    <h3 className="text-xl font-bold text-vt-pink mb-2 flex items-center">
      <span className="text-2xl mr-3">{icon}</span>
      {title}
    </h3>
    <p className="text-vt-text-secondary text-sm flex-grow">{description}</p>
  </div>
);

const TrainingProgramGrid: React.FC = () => {
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-center text-white mb-10">Our Training Programs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <ProgramCard 
            key={program.title} 
            icon={program.icon} 
            title={program.title} 
            description={program.description} 
          />
        ))}
      </div>
    </div>
  );
};

export default TrainingProgramGrid;
