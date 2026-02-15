import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { StudentProject, StudentProjectUpdate } from '../types';
import { api } from '../services/api';

const StudentProjectDetailsPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<StudentProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                if (projectId) {
                    const data = await api.getStudentProjectById(projectId);
                    setProject(data || null);
                }
            } catch (error) {
                console.error("Failed to fetch student project:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-vt-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vt-pink"></div>
                    <p className="mt-4 text-vt-text-light">Loading project...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-vt-bg flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-vt-text-light mb-4">Project Not Found</h1>
                    <Link to="/" className="text-vt-pink hover:text-vt-purple transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const currentThread = project.thread || [];

    return (
        <div className="min-h-screen bg-vt-bg py-12">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <Link to="/" className="inline-flex items-center text-vt-pink hover:text-vt-purple transition-colors mb-8">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>

                {/* Project Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-vt-text-light mb-4">{project.title}</h1>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-vt-surface pb-6">
                        <div>
                            <p className="text-lg text-vt-pink font-semibold">By {project.studentName}</p>
                            <p className="text-sm text-vt-text-secondary mt-2">
                                {new Date(project.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-vt-purple hover:bg-vt-purple/80 text-white rounded-lg font-semibold transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                            )}
                            {project.websiteLink && (
                                <a
                                    href={project.websiteLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-vt-pink hover:bg-vt-pink/80 text-white rounded-lg font-semibold transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Visit Website
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Project Thread */}
                <div className="space-y-12">
                    {currentThread.length > 0 ? (
                        currentThread.map((update: StudentProjectUpdate, index: number) => (
                            <div key={update.id} className="bg-vt-surface rounded-lg overflow-hidden shadow-lg">
                                <div className="p-8">
                                    {/* Update Content */}
                                    <div className="mb-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-vt-purple">
                                                    <span className="text-white font-bold">{index + 1}</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-vt-text-light whitespace-pre-wrap leading-relaxed">
                                                    {update.text}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Media Gallery */}
                                    {update.media && update.media.length > 0 && (
                                        <div className="mt-6">
                                            <div className="mb-4">
                                                <div className="relative w-full bg-black rounded-lg overflow-hidden">
                                                    {update.media[selectedMediaIndex].includes('.mp4') ||
                                                     update.media[selectedMediaIndex].includes('video') ? (
                                                        <video
                                                            src={update.media[selectedMediaIndex]}
                                                            controls
                                                            className="w-full h-auto max-h-96 object-contain"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={update.media[selectedMediaIndex]}
                                                            alt={`Update media ${selectedMediaIndex + 1}`}
                                                            className="w-full h-auto max-h-96 object-contain"
                                                        />
                                                    )}
                                                </div>

                                                {/* Media Thumbnails */}
                                                {update.media.length > 1 && (
                                                    <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                                                        {update.media.map((media: string, mediaIndex: number) => (
                                                            <button
                                                                key={mediaIndex}
                                                                onClick={() => setSelectedMediaIndex(mediaIndex)}
                                                                className={`flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                                                                    selectedMediaIndex === mediaIndex
                                                                        ? 'border-vt-pink'
                                                                        : 'border-vt-bg hover:border-vt-purple'
                                                                }`}
                                                            >
                                                                {media.includes('.mp4') || media.includes('video') ? (
                                                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                                            <path d="M8 5v14l11-7z" />
                                                                        </svg>
                                                                    </div>
                                                                ) : (
                                                                    <img
                                                                        src={media}
                                                                        alt={`Thumbnail ${mediaIndex + 1}`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-vt-text-secondary">No project details available yet.</p>
                        </div>
                    )}
                </div>

                {/* Student Info Card */}
                <div className="mt-16 bg-gradient-to-r from-vt-purple/20 to-vt-pink/20 rounded-lg p-8 border border-vt-surface">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-vt-text-light mb-2">About the Student</h2>
                            <p className="text-vt-text-light text-lg font-semibold">{project.studentName}</p>
                            <p className="text-vt-text-secondary mt-2">
                                Project created on {new Date(project.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                })}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-vt-surface rounded-lg hover:bg-vt-purple/20 transition-colors"
                                    title="View on GitHub"
                                >
                                    <svg className="w-6 h-6 text-vt-text-light" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            )}
                            {project.websiteLink && (
                                <a
                                    href={project.websiteLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-vt-surface rounded-lg hover:bg-vt-pink/20 transition-colors"
                                    title="Visit Website"
                                >
                                    <svg className="w-6 h-6 text-vt-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProjectDetailsPage;
