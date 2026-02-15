
import React from 'react';

const ServiceCard = ({ title, description }: { title: string, description: string }) => (
  <div 
    className="relative bg-vt-surface/30 p-8 text-center text-white backdrop-blur-sm transition-all duration-300 hover:bg-vt-surface/50 h-56 flex items-center justify-center" 
    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
  >
    <div 
      className="absolute inset-0 bg-gradient-to-br from-vt-pink to-vt-purple opacity-20 group-hover:opacity-30 transition-opacity"
      style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
    ></div>
    <div className="relative z-10">
        <h3 className="text-lg font-bold text-vt-pink mb-2">{title}</h3>
        <p className="text-sm text-vt-text-light">{description}</p>
    </div>
  </div>
);

const ProjectsAndRD: React.FC = () => {
  const services = [
    { title: 'STEM Education', description: 'Supporting schools with innovative learning kits.' },
    { title: 'Custom Electronics', description: 'Design & prototyping for clients\' unique needs.' },
    { title: 'Automation Solutions', description: 'Developing open-source PLC & industrial solutions.' },
    { title: 'AI & Robotics', description: 'Exploring robotics and humanoid AI systems.' },
  ];

  return (
    <div className="relative bg-vt-bg py-20 px-4 overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-vt-purple/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-vt-pink/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-8">Projects & R&D</h2>
          <div className="w-full max-w-4xl mx-auto h-px bg-vt-surface mb-16"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map(service => (
                  <div key={service.title} className="group">
                    <ServiceCard title={service.title} description={service.description} />
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default ProjectsAndRD;
