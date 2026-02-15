
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Post, PostCategory, StudentProject } from '../types';
import { api } from '../services/api';

const HomeSidebar: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Post[]>([]);
    const [studentProjects, setStudentProjects] = useState<StudentProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [allPosts, projects] = await Promise.all([
                    api.getPosts(),
                    api.getStudentProjects(),
                ]);
                const filtered = allPosts
                    .filter(p => p.category === PostCategory.Announcement)
                    .slice(0, 3);
                setAnnouncements(filtered);
                setStudentProjects(projects);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="p-6 h-full flex flex-col overflow-y-auto">
            <div className="space-y-4 mb-8">
                <Link to="/training-center" className="block w-full text-center px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-vt-purple/70 to-vt-purple hover:opacity-90 transition-opacity">
                    Applications Open
                </Link>
                <Link to="/training-center" className="block w-full text-center px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-vt-pink to-vt-purple hover:opacity-90 transition-opacity">
                    Apply Now
                </Link>
            </div>
            <div>
                <h3 className="flex items-center text-xl font-bold text-vt-pink mb-4">
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                    </svg>
                    Announcements
                </h3>
                <div className="space-y-4">
                    {loading ? <p className="text-sm text-vt-text-secondary">Loading...</p> : 
                        announcements.map((post, index) => (
                            <div key={post.id} className={index < announcements.length - 1 ? "border-b border-vt-bg pb-4" : ""}>
                                <p className="text-sm text-vt-pink">{formatDate(post.createdAt)}</p>
                                <h4 className="font-bold text-vt-text-light mt-1">{post.title}</h4>
                                <p className="text-sm text-vt-text-secondary">{post.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="mt-8">
                <h3 className="flex items-center text-xl font-bold text-vt-pink mb-4">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v3.846"></path></svg>
                    Student Projects
                </h3>
                <div className="space-y-4">
                    {loading ? <p className="text-sm text-vt-text-secondary">Loading...</p> :
                        studentProjects.length > 0 ? (
                            studentProjects.map((project, index) => (
                                <Link 
                                    key={project.id} 
                                    to={`/student-projects/${project.id}`}
                                    className={`block hover:opacity-80 transition-opacity ${index < studentProjects.length - 1 ? "border-b border-vt-bg pb-4" : ""}`}
                                >
                                    <p className="font-medium text-vt-text-light hover:text-vt-pink">{project.title}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-sm text-vt-text-secondary">No student projects yet.</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default HomeSidebar;
