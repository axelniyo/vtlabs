
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrainingProgram, TrainingStatus } from '../types';
import { api } from '../services/api';

const isVideo = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

const TrainingProgramDetailsPage: React.FC = () => {
    const { programId } = useParams<{ programId: string }>();
    const [program, setProgram] = React.useState<TrainingProgram | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        if (!programId) {
            setError('Program ID is missing.');
            setLoading(false);
            return;
        }

        const fetchProgram = async () => {
            try {
                const foundProgram = await api.getTrainingProgramById(programId);
                if (foundProgram) {
                    setProgram(foundProgram);
                } else {
                    setError('Training program not found.');
                }
            } catch (err) {
                setError('Failed to fetch training program details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProgram();
    }, [programId]);

    if (loading) return <div className="text-center p-10">Loading program details...</div>;
    if (error) return <div className="text-center p-10 text-red-400">{error}</div>;
    if (!program) return <div className="text-center p-10">Program not found.</div>;

    return (
        <div>
            <div className="mb-6">
                 <Link to="/training-center" className="text-vt-purple hover:text-vt-pink transition-colors">&larr; Back to Training Center</Link>
            </div>
            
            {/* Header section */}
            <div className="bg-vt-surface p-8 rounded-lg shadow-md mb-8">
                <div className="flex justify-between items-start">
                    <h1 className="text-4xl font-bold text-vt-text-light mb-2">{program.title}</h1>
                     <span className={`px-4 py-2 text-sm font-semibold rounded-full ${program.status === TrainingStatus.Open ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {program.status}
                    </span>
                </div>
                <div className="flex items-center space-x-4 text-vt-text-secondary mb-6">
                    <span>Duration: <span className="font-semibold text-vt-purple">{program.duration}</span></span>
                    <span>Year: <span className="font-semibold text-vt-purple">{program.year}</span></span>
                </div>
            </div>

            {/* Thread/Updates Section */}
            <div className="space-y-8">
                {program.thread && program.thread.length > 0 ? (
                    program.thread.map(update => (
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
                        <h2 className="text-2xl font-bold text-vt-text-light mb-4">Program Details</h2>
                        <p className="text-vt-text-secondary text-lg leading-relaxed">{program.description}</p>
                    </div>
                )}
            </div>
            
            {/* Apply Now Button */}
            {program.status === TrainingStatus.Open && program.applicationUrl && (
                <div className="mt-8 pt-8 border-t border-vt-surface flex justify-center">
                    <a 
                        href={program.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-vt-pink text-white font-bold py-3 px-8 rounded-md hover:opacity-90 transition-colors duration-300 text-lg"
                    >
                        Apply Now
                    </a>
                </div>
            )}
        </div>
    );
};

export default TrainingProgramDetailsPage;