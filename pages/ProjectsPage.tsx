
import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { api } from '../services/api';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
        <img className="w-full h-56 object-cover" src={project.imageUrl} alt={project.title} />
        <div className="p-6">
            <div className="font-bold text-xl mb-2 text-vt-dark-gray">{project.title}</div>
            <p className="text-vt-gray text-base">{project.description}</p>
            <div className="mt-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    Year: {project.year}
                </span>
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
            <h1 className="text-3xl font-bold text-vt-dark-gray mb-6 border-b pb-2">Our Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
