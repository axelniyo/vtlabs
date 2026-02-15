
import React from 'react';
import { Link } from 'react-router-dom';
import { TrainingProgram } from '../types';

interface TrainingProgramHomeCardProps {
  program: TrainingProgram;
}

const TrainingProgramHomeCard: React.FC<TrainingProgramHomeCardProps> = ({ program }) => {
  const coverImage = program.thread?.[0]?.media?.[0] || `https://picsum.photos/seed/${program.id}/600/400`;
  
  return (
    <Link to={`/training-center/${program.id}`} className="block bg-vt-surface rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col">
      <div className="relative">
        <img className="w-full h-36 object-cover" src={coverImage} alt={program.title} />
        <span className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded-full bg-purple-500`}>
          Training
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-vt-text-light mb-2">{program.title}</h3>
        <p className="text-vt-text-secondary text-sm flex-grow">{program.description}</p>
        <div className="mt-4 text-xs text-gray-400">
            {program.year}
        </div>
      </div>
    </Link>
  );
};

export default TrainingProgramHomeCard;
