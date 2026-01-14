
import React from 'react';

const ManufacturingPage: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-vt-dark-gray mb-6 border-b pb-2">Manufacturing</h1>
      <div className="space-y-4 text-vt-gray">
        <p>VTLabs is at the forefront of modern manufacturing, integrating cutting-edge technologies like IoT, AI, and robotics to create smart, efficient, and sustainable production lines. Our state-of-the-art facilities are designed for precision, scalability, and flexibility.</p>
        <h2 className="text-2xl font-semibold text-vt-blue pt-4">Our Capabilities</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Rapid Prototyping and 3D Printing</li>
          <li>CNC Machining and Precision Engineering</li>
          <li>Automated Assembly Lines</li>
          <li>Quality Control with Machine Vision</li>
          <li>Custom Electronics Manufacturing</li>
        </ul>
        <p>We partner with businesses across various sectors to turn innovative ideas into tangible products, ensuring the highest standards of quality and efficiency from concept to completion.</p>
      </div>
    </div>
  );
};

export default ManufacturingPage;
