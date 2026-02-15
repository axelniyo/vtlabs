
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project } from '../types';
import { api } from '../services/api';

const isVideo = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

const ProjectDetailsPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = React.useState<Project | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        if (!projectId) {
            setError('Project ID is missing.');
            setLoading(false);
            return;
        }

        const fetchProject = async () => {
            try {
                const foundProject = await api.getProjectById(projectId);
                if (foundProject) {
                    setProject(foundProject);
                } else {
                    setError('Project not found.');
                }
            } catch (err) {
                setError('Failed to fetch project details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) return <div className="text-center p-10">Loading project details...</div>;
    if (error) return <div className="text-center p-10 text-red-400">{error}</div>;
    if (!project) return <div className="text-center p-10">Project not found.</div>;

    return (
        <div>
            <div className="mb-6">
                 <Link to="/projects" className="text-vt-purple hover:text-vt-pink transition-colors">&larr; Back to Projects</Link>
            </div>
            
            {/* Header section */}
            <div className="bg-vt-surface p-8 rounded-lg shadow-md mb-8">
                <h1 className="text-4xl font-bold text-vt-text-light mb-2">{project.title}</h1>
                <div className="flex items-center space-x-4 text-vt-text-secondary mb-6">
                    <span>Year: <span className="font-semibold text-vt-purple">{project.year}</span></span>
                </div>
            </div>

            {/* Thread/Updates Section */}
            <div className="space-y-8">
                {project.thread && project.thread.length > 0 ? (
                    project.thread.map(update => (
                        <div key={update.id} className="bg-vt-surface p-6 rounded-lg shadow-md">
                            <p className="text-vt-text-secondary text-lg leading-relaxed mb-6">{update.text}</p>
                            {update.media && update.media.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {update.media.map((url, index) => (
                                        <div key={index} className="rounded-lg overflow-hidden bg-vt-bg">
                                            {isVideo(url) ? (
                                                <video controls src={url} className="w-full h-full object-cover">
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (
                                                <img src={url} alt={`Update media ${index + 1}`} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="bg-vt-surface p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-vt-text-light mb-4">Project Details</h2>
                        <p className="text-vt-text-secondary text-lg leading-relaxed">{project.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailsPage;
