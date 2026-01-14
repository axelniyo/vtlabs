
import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-vt-dark-gray mb-6 border-b pb-2">About VTLabs</h1>
      <div className="space-y-6 text-vt-gray">
        <p className="text-lg">VTLabs is a technology and innovation powerhouse dedicated to solving complex challenges and building the future. Founded in 2010, we have grown from a small research group into a global leader in technology solutions, training, and manufacturing.</p>
        
        <div>
          <h2 className="text-2xl font-semibold text-vt-blue">Our Mission</h2>
          <p>To empower businesses and individuals through transformative technology and education, fostering a world where innovation drives progress and creates sustainable value for all.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-vt-blue">Our Vision</h2>
          <p>To be the world's most trusted partner in technological innovation, known for our commitment to excellence, ethical practices, and positive global impact.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-vt-blue">Our Team</h2>
          <p>Our strength lies in our people. We are a diverse team of engineers, designers, researchers, and strategists united by a passion for technology and a drive to make a difference. We cultivate a culture of collaboration, curiosity, and continuous learning.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
