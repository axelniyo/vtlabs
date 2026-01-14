
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Post, TrainingProgram, Application, PostCategory, TrainingStatus } from '../../types';
import { api } from '../../services/api';

type AdminView = 'posts' | 'trainings' | 'applications';

const ManagePosts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const loadPosts = async () => {
            setIsLoading(true);
            const data = await api.getPosts();
            setPosts(data);
            setIsLoading(false);
        };
        loadPosts();
    }, []);

    // Placeholder for form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<PostCategory>(PostCategory.Announcement);

    const handleAddPost = async (e: React.FormEvent) => {
        e.preventDefault();
        const newPostData = { title, description, category, imageUrl: `https://picsum.photos/seed/${Date.now()}/600/400` };
        const newPost = await api.addPost(newPostData);
        setPosts(prev => [newPost, ...prev]);
        setTitle(''); setDescription('');
    };

    return (
        <div className="space-y-6">
             <form onSubmit={handleAddPost} className="bg-white p-4 rounded-lg shadow space-y-4">
                <h3 className="text-lg font-medium">Create New Post</h3>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" required/>
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" required></textarea>
                <select value={category} onChange={e => setCategory(e.target.value as PostCategory)} className="w-full p-2 border rounded">
                    {Object.values(PostCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Post</button>
            </form>
            <div className="bg-white p-4 rounded-lg shadow">
                 <h3 className="text-lg font-medium mb-4">Existing Posts</h3>
                {isLoading ? <p>Loading posts...</p> : (
                    <ul className="space-y-2">
                        {posts.map(post => <li key={post.id} className="p-2 border rounded">{post.title} - <span className="text-sm text-gray-500">{post.category}</span></li>)}
                    </ul>
                )}
            </div>
        </div>
    );
};

const ManageTrainings: React.FC = () => {
    const [trainings, setTrainings] = useState<TrainingProgram[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const data = await api.getTrainingPrograms();
            setTrainings(data);
            setIsLoading(false);
        };
        loadData();
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Manage Training Programs</h3>
            {isLoading ? <p>Loading...</p> : (
                <ul className="space-y-2">
                    {trainings.map(t => <li key={t.id} className="p-2 border rounded">{t.title} ({t.status})</li>)}
                </ul>
            )}
        </div>
    );
};

const ViewApplications: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const data = await api.getApplications();
            setApplications(data);
            setIsLoading(false);
        };
        loadData();
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Training Applications</h3>
            {isLoading ? <p>Loading...</p> : (
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map(app => (
                            <tr key={app.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{app.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{app.courseName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(app.submittedAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const AdminDashboardPage: React.FC = () => {
    const [activeView, setActiveView] = useState<AdminView>('posts');
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const renderView = () => {
        switch (activeView) {
            case 'posts': return <ManagePosts />;
            case 'trainings': return <ManageTrainings />;
            case 'applications': return <ViewApplications />;
            default: return <ManagePosts />;
        }
    };
    
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-vt-dark-gray">Admin Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Logout</button>
            </header>

            <div className="flex border-b mb-6">
                <button onClick={() => setActiveView('posts')} className={`px-4 py-2 ${activeView === 'posts' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Manage Posts</button>
                <button onClick={() => setActiveView('trainings')} className={`px-4 py-2 ${activeView === 'trainings' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Manage Trainings</button>
                <button onClick={() => setActiveView('applications')} className={`px-4 py-2 ${activeView === 'applications' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>View Applications</button>
            </div>

            <div>
                {renderView()}
            </div>
        </div>
    );
};

export default AdminDashboardPage;
