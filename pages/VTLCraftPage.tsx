
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VtlCraftProject } from '../types';
import { api } from '../services/api';

const VtlCraftProjectCard: React.FC<{ project: VtlCraftProject }> = ({ project }) => (
    <div className="bg-vt-surface rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {project.coverImageUrl && (
            <div className="md:w-1/3 flex-shrink-0">
                <img src={project.coverImageUrl} alt={project.title} className="w-full h-48 md:h-full object-cover" />
            </div>
        )}
        <div className={`p-6 flex flex-col flex-grow ${!project.coverImageUrl && 'w-full'}`}>
            <h3 className="text-2xl font-bold text-vt-text-light">{project.title}</h3>
            <p className="text-vt-text-secondary mt-2 text-base flex-grow">{project.description}</p>
            <div className="mt-6 flex-shrink-0 self-start">
                <Link
                    to={`/vtl-craft/${project.id}`}
                    className="inline-block text-center bg-vt-pink text-white font-bold py-3 px-6 rounded-md hover:opacity-90 transition-colors duration-300"
                >
                    View Project Details
                </Link>
            </div>
        </div>
    </div>
);

const VTLCraftPage: React.FC = () => {
  const [projects, setProjects] = useState<VtlCraftProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await api.getVtlCraftProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to fetch VTL Craft projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="text-center p-10">Loading projects...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-vt-text-light mb-2">VTL Craft</h1>
      <p className="text-vt-text-secondary mb-6">A showcase of our passion for interior design, where technology meets aesthetics.</p>
      {projects.length > 0 ? (
        <div className="space-y-8">
            {projects.map((project) => (
                <VtlCraftProjectCard key={project.id} project={project} />
            ))}
        </div>
      ) : (
        <div className="bg-vt-surface p-8 rounded-lg text-center text-vt-text-secondary">
            <p>No design projects have been added yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default VTLCraftPage;
