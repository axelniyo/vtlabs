
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { api } from '../services/api';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-vt-surface rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {project.imageUrl && (
            <div className="md:w-1/3 flex-shrink-0">
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 md:h-full object-cover" />
            </div>
        )}
        <div className={`p-6 flex flex-col flex-grow ${!project.imageUrl && 'w-full'}`}>
            <h3 className="text-2xl font-bold text-vt-text-light">{project.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-vt-text-secondary my-2">
                <span className="font-semibold text-vt-purple">Year: {project.year}</span>
            </div>
            <p className="text-vt-text-secondary mt-2 text-base flex-grow">{project.description}</p>
            <div className="mt-6 flex-shrink-0 self-start">
                <Link
                    to={`/projects/${project.id}`}
                    className="inline-block text-center bg-vt-pink text-white font-bold py-3 px-6 rounded-md hover:opacity-90 transition-colors duration-300"
                >
                    View Project Details
                </Link>
            </div>
        </div>
    </div>
);


const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const fetchedProjects = await api.getProjects();
                setProjects(fetchedProjects);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) return <div className="text-center p-10">Loading projects...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-vt-text-light mb-6 border-b border-vt-surface pb-2">Our Projects</h1>
            <div className="space-y-8">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;