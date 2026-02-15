
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectHomeCardProps {
  project: Project;
}

const ProjectHomeCard: React.FC<ProjectHomeCardProps> = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`} className="block bg-vt-surface rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col">
      <div className="relative">
        <img className="w-full h-36 object-cover" src={project.imageUrl} alt={project.title} />
        <span className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded-full bg-green-500`}>
          Project
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-vt-text-light mb-2">{project.title}</h3>
        <p className="text-vt-text-secondary text-sm flex-grow">{project.description}</p>
        <div className="mt-4 text-xs text-gray-400">
            {project.year}
        </div>
      </div>
    </Link>
  );
};

export default ProjectHomeCard;
