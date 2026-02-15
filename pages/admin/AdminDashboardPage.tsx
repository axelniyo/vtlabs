
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Post, TrainingProgram, Application, PostCategory, TrainingStatus, Project, VtlCraftProject, TrainingUpdate, ProjectUpdate, VtlCraftUpdate } from '../../types';
import { api } from '../../services/api';
import StudentProjectAdminPanel from '../../components/StudentProjectAdminPanel';

type AdminView = 'posts' | 'trainings' | 'projects' | 'student-projects' | 'applications' | 'vtl-craft';

const ManagePosts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Form state
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<PostCategory>(PostCategory.Announcement);
    const [imageUrl, setImageUrl] = useState('');
    const [imageFileInfo, setImageFileInfo] = useState('');

    const loadPosts = async () => {
        setIsLoading(true);
        const data = await api.getPosts();
        setPosts(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setCategory(PostCategory.Announcement);
        setImageUrl('');
        setImageFileInfo('');
        setEditingPostId(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert("File is too large. Please choose a file smaller than 10MB.");
            return;
        }

        const reader = new FileReader();
        const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
        const fileName = file.name;

        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setImageUrl(reader.result);
                setImageFileInfo(`${fileName} (${fileSize})`);
            }
        };
        reader.onerror = () => {
            console.error("Error reading file");
            alert("There was an error reading the file.");
        };
        reader.readAsDataURL(file);
    };

    const handleAddOrUpdatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const postData = { 
                title, 
                description, 
                category, 
                imageUrl: imageUrl || `https://picsum.photos/seed/${Date.now()}/600/400` 
            };

            if (editingPostId) {
                const updatedPost = await api.updatePost(editingPostId, postData);
                setPosts(posts.map(p => p.id === editingPostId ? updatedPost : p));
            } else {
                 const newPost = await api.addPost(postData);
                setPosts(prev => [newPost, ...prev]);
            }
            resetForm();
        } catch(error) {
            console.error("Failed to save post:", error);
            alert(`Error saving post: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    const handleEditClick = (post: Post) => {
        setEditingPostId(post.id);
        setTitle(post.title);
        setDescription(post.description);
        setCategory(post.category);
        setImageUrl(post.imageUrl);
        setImageFileInfo('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = async (postId: string) => {
        if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            try {
                await api.deletePost(postId);
                setPosts(posts.filter(p => p.id !== postId));
            } catch (error) {
                console.error("Failed to delete post:", error);
                alert(`Error deleting post: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    };

    return (
        <div className="space-y-6">
             <form onSubmit={handleAddOrUpdatePost} className="bg-white p-4 rounded-lg shadow space-y-4">
                <h3 className="text-lg font-medium">{editingPostId ? 'Edit Post' : 'Create New Post'}</h3>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" required/>
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" required></textarea>
                <select value={category} onChange={e => setCategory(e.target.value as PostCategory)} className="w-full p-2 border rounded">
                    {Object.values(PostCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <div className="flex items-center space-x-2 mt-1">
                        <input 
                            type="text" 
                            placeholder="Enter image URL or upload" 
                            value={imageUrl} 
                            onChange={e => {
                                setImageUrl(e.target.value);
                                setImageFileInfo(''); // Clear file info on manual edit
                            }} 
                            className="w-full p-2 border rounded" 
                        />
                        <label className="cursor-pointer px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 whitespace-nowrap">
                            Upload
                            <input 
                                type="file" 
                                className="hidden" 
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </label>
                    </div>
                    {imageUrl && (
                         <div className="mt-2 flex items-center space-x-4">
                            <img src={imageUrl} alt="Preview" className="h-20 w-20 object-cover rounded shadow" />
                            {imageFileInfo && <span className="text-xs text-gray-500">{imageFileInfo}</span>}
                        </div>
                    )}
                </div>
                <div className="flex space-x-2">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{editingPostId ? 'Update Post' : 'Add Post'}</button>
                    {editingPostId && <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>}
                </div>
            </form>
            <div className="bg-white p-4 rounded-lg shadow">
                 <h3 className="text-lg font-medium mb-4">Existing Posts</h3>
                {isLoading ? <p>Loading posts...</p> : (
                    <ul className="space-y-2">
                        {posts.map(post => (
                            <li key={post.id} className="p-2 border rounded flex justify-between items-center">
                                <span>{post.title} - <span className="text-sm text-gray-500">{post.category}</span></span>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEditClick(post)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-600 transition-colors">Edit</button>
                                    <button onClick={() => handleDeleteClick(post.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 transition-colors">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const ManageTrainings: React.FC = () => {
    const [trainings, setTrainings] = useState<TrainingProgram[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [status, setStatus] = useState<TrainingStatus>(TrainingStatus.Open);
    const [applicationUrl, setApplicationUrl] = useState('');
    const [thread, setThread] = useState<TrainingUpdate[]>([{ id: '', text: '', media: [''] }]);

    const loadTrainings = async () => {
        setIsLoading(true);
        const data = await api.getTrainingPrograms();
        setTrainings(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadTrainings();
    }, []);

    const resetForm = () => {
        setTitle('');
        setDuration('');
        setYear(new Date().getFullYear());
        setStatus(TrainingStatus.Open);
        setApplicationUrl('');
        setThread([{ id: '', text: '', media: [''] }]);
        setEditingProgramId(null);
    };

    const handleAddUpdate = () => {
        setThread([...thread, { id: '', text: '', media: [''] }]);
    };

    const handleRemoveUpdate = (index: number) => {
        setThread(thread.filter((_, i) => i !== index));
    };
    
    const handleUpdateTextChange = (index: number, value: string) => {
        const newThread = [...thread];
        newThread[index].text = value;
        setThread(newThread);
    };

    const handleMediaUrlChange = (updateIndex: number, mediaIndex: number, value: string) => {
        const newThread = [...thread];
        newThread[updateIndex].media[mediaIndex] = value;
        setThread(newThread);
    };

    const handleAddMediaUrl = (updateIndex: number) => {
        const newThread = [...thread];
        newThread[updateIndex].media.push('');
        setThread(newThread);
    };

    const handleRemoveMediaUrl = (updateIndex: number, mediaIndex: number) => {
        const newThread = [...thread];
        newThread[updateIndex].media = newThread[updateIndex].media.filter((_, i) => i !== mediaIndex);
        setThread(newThread);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, updateIndex: number, mediaIndex: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert("File is too large. Please choose a file smaller than 10MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                handleMediaUrlChange(updateIndex, mediaIndex, reader.result);
            }
        };
        reader.onerror = () => {
            console.error("Error reading file");
            alert("There was an error reading the file.");
        };
        reader.readAsDataURL(file);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const programData = {
                title,
                duration,
                year,
                status,
                applicationUrl,
                thread: thread.map(item => ({
                    ...item,
                    media: item.media.filter(Boolean)
                }))
            };
            if (editingProgramId) {
                const updatedProgram = await api.updateTrainingProgram(editingProgramId, programData);
                setTrainings(trainings.map(p => p.id === editingProgramId ? updatedProgram : p));
            } else {
                await api.addTrainingProgram(programData);
                loadTrainings();
            }
            resetForm();
        } catch (error) {
            console.error("Failed to save training program:", error);
            alert(`Error saving program: ${error instanceof Error ? error.message : String(error)}`);
        }
    };
    
    const handleEditClick = (program: TrainingProgram) => {
        setEditingProgramId(program.id);
        setTitle(program.title);
        setDuration(program.duration);
        setYear(program.year);
        setStatus(program.status);
        setApplicationUrl(program.applicationUrl || '');
        setThread(program.thread && program.thread.length > 0 ? program.thread : [{ id: '', text: '', media: [''] }]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = async (programId: string) => {
        if (window.confirm('Are you sure you want to delete this program? This action cannot be undone.')) {
            try {
                await api.deleteTrainingProgram(programId);
                setTrainings(trainings.filter(p => p.id !== programId));
            } catch (error) {
                console.error("Failed to delete program:", error);
                alert(`Error deleting program: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    };


    return (
         <div className="space-y-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
                <h3 className="text-xl font-semibold">{editingProgramId ? 'Edit Training Program' : 'Create New Training Program'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Program Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="text" placeholder="Duration (e.g., 16 Weeks)" value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="number" placeholder="Year" value={year} onChange={e => setYear(Number(e.target.value))} className="w-full p-2 border rounded" required />
                    <select value={status} onChange={e => setStatus(e.target.value as TrainingStatus)} className="w-full p-2 border rounded">
                        <option value={TrainingStatus.Open}>Open</option>
                        <option value={TrainingStatus.Closed}>Closed</option>
                    </select>
                </div>
                 <div>
                    <input type="url" placeholder="Application Form URL (e.g., Google Forms)" value={applicationUrl} onChange={e => setApplicationUrl(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                
                <div className="space-y-4">
                    <h4 className="font-semibold">Program Thread Updates</h4>
                    {thread.map((update, updateIndex) => (
                        <div key={update.id || updateIndex} className="p-4 border rounded-md space-y-3 bg-gray-50 relative">
                            <label className="block text-sm font-medium text-gray-700">Update #{updateIndex + 1}</label>
                            <textarea placeholder="Update text / description..." value={update.text} onChange={e => handleUpdateTextChange(updateIndex, e.target.value)} className="w-full p-2 border rounded" rows={3} required></textarea>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Media</label>
                                {update.media.map((url, mediaIndex) => (
                                    <div key={mediaIndex} className="flex items-center space-x-2">
                                        <input type="text" placeholder="Enter URL or upload file" value={url} onChange={(e) => handleMediaUrlChange(updateIndex, mediaIndex, e.target.value)} className="w-full p-2 border rounded" />
                                        <label className="cursor-pointer px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 whitespace-nowrap">
                                            Upload
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                onChange={(e) => handleFileChange(e, updateIndex, mediaIndex)}
                                                accept="image/*,video/*"
                                            />
                                        </label>
                                        <button type="button" onClick={() => handleRemoveMediaUrl(updateIndex, mediaIndex)} className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">&ndash;</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddMediaUrl(updateIndex)} className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Add Media</button>
                            </div>

                            {thread.length > 1 && (
                                <button type="button" onClick={() => handleRemoveUpdate(updateIndex)} className="absolute top-2 right-2 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">Remove Update</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddUpdate} className="px-4 py-2 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 font-semibold">Add Another Update</button>
                </div>

                <div className="flex space-x-2">
                    <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold">{editingProgramId ? 'Update Program' : 'Create Program'}</button>
                    {editingProgramId && <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>}
                </div>
            </form>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Existing Training Programs</h3>
                {isLoading ? <p>Loading...</p> : (
                    <ul className="space-y-2">
                        {trainings.map(t => (
                            <li key={t.id} className="p-2 border rounded flex justify-between items-center">
                                <span>{t.title} ({t.status})</span>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEditClick(t)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-600 transition-colors">Edit</button>
                                    <button onClick={() => handleDeleteClick(t.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 transition-colors">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const ManageProjects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [trainings, setTrainings] = useState<TrainingProgram[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form state
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [trainingProgramId, setTrainingProgramId] = useState('');
    const [thread, setThread] = useState<ProjectUpdate[]>([{ id: '', text: '', media: [''] }]);

    const loadData = async () => {
        setIsLoading(true);
        const [projectData, trainingData] = await Promise.all([
            api.getProjects(),
            api.getTrainingPrograms()
        ]);
        setProjects(projectData);
        setTrainings(trainingData);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const resetForm = () => {
        setTitle('');
        setYear(new Date().getFullYear());
        setTrainingProgramId('');
        setThread([{ id: '', text: '', media: [''] }]);
        setEditingProjectId(null);
    };

    // All the thread management handlers are identical to ManageTrainings...
    const handleAddUpdate = () => setThread([...thread, { id: '', text: '', media: [''] }]);
    const handleRemoveUpdate = (index: number) => setThread(thread.filter((_, i) => i !== index));
    const handleUpdateTextChange = (index: number, value: string) => {
        const newThread = [...thread];
        newThread[index].text = value;
        setThread(newThread);
    };
    const handleMediaUrlChange = (updateIndex: number, mediaIndex: number, value: string) => {
        const newThread = [...thread];
        newThread[updateIndex].media[mediaIndex] = value;
        setThread(newThread);
    };
    const handleAddMediaUrl = (updateIndex: number) => {
        const newThread = [...thread];
        newThread[updateIndex].media.push('');
        setThread(newThread);
    };
    const handleRemoveMediaUrl = (updateIndex: number, mediaIndex: number) => {
        const newThread = [...thread];
        newThread[updateIndex].media = newThread[updateIndex].media.filter((_, i) => i !== mediaIndex);
        setThread(newThread);
    };
     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, updateIndex: number, mediaIndex: number) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) { alert("File is too large. Max 10MB."); return; }
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                handleMediaUrlChange(updateIndex, mediaIndex, reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const projectData = {
                title,
                year,
                trainingProgramId: trainingProgramId || undefined,
                thread: thread.map(item => ({
                    ...item,
                    media: item.media.filter(Boolean)
                }))
            };
            if (editingProjectId) {
                const updatedProject = await api.updateProject(editingProjectId, projectData);
                setProjects(projects.map(p => p.id === editingProjectId ? updatedProject : p));
            } else {
                await api.addProject(projectData);
                loadData();
            }
            resetForm();
        } catch (error) {
            console.error("Failed to save project:", error);
            alert(`Error saving project: ${error instanceof Error ? error.message : String(error)}`);
        }
    };
    
    const handleEditClick = (project: Project) => {
        setEditingProjectId(project.id);
        setTitle(project.title);
        setYear(project.year);
        setTrainingProgramId(project.trainingProgramId || '');
        setThread(project.thread && project.thread.length > 0 ? project.thread : [{ id: '', text: '', media: [''] }]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = async (projectId: string) => {
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            try {
                await api.deleteProject(projectId);
                setProjects(projects.filter(p => p.id !== projectId));
            } catch (error) {
                console.error("Failed to delete project:", error);
                alert(`Error deleting project: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
                <h3 className="text-xl font-semibold">{editingProjectId ? 'Edit Project' : 'Create New Project'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="number" placeholder="Year" value={year} onChange={e => setYear(Number(e.target.value))} className="w-full p-2 border rounded" required />
                     <select value={trainingProgramId} onChange={e => setTrainingProgramId(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Standalone Project (No Training Program)</option>
                        {trainings.map(t => <option key={t.id} value={t.id}>{t.title} ({t.year})</option>)}
                    </select>
                </div>
                
                <div className="space-y-4">
                    <h4 className="font-semibold">Project Thread Updates</h4>
                    {thread.map((update, updateIndex) => (
                         <div key={update.id || updateIndex} className="p-4 border rounded-md space-y-3 bg-gray-50 relative">
                            <label className="block text-sm font-medium text-gray-700">Update #{updateIndex + 1}</label>
                            <textarea placeholder="Update text / description..." value={update.text} onChange={e => handleUpdateTextChange(updateIndex, e.target.value)} className="w-full p-2 border rounded" rows={3} required></textarea>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Media</label>
                                {update.media.map((url, mediaIndex) => (
                                    <div key={mediaIndex} className="flex items-center space-x-2">
                                        <input type="text" placeholder="Enter URL or upload file" value={url} onChange={(e) => handleMediaUrlChange(updateIndex, mediaIndex, e.target.value)} className="w-full p-2 border rounded" />
                                        <label className="cursor-pointer px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 whitespace-nowrap">
                                            Upload
                                            <input type="file" className="hidden" onChange={(e) => handleFileChange(e, updateIndex, mediaIndex)} accept="image/*,video/*"/>
                                        </label>
                                        <button type="button" onClick={() => handleRemoveMediaUrl(updateIndex, mediaIndex)} className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">&ndash;</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddMediaUrl(updateIndex)} className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Add Media</button>
                            </div>

                            {thread.length > 1 && (
                                <button type="button" onClick={() => handleRemoveUpdate(updateIndex)} className="absolute top-2 right-2 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">Remove Update</button>
                            )}
                        </div>
                    ))}
                     <button type="button" onClick={handleAddUpdate} className="px-4 py-2 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 font-semibold">Add Another Update</button>
                </div>

                <div className="flex space-x-2">
                    <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold">{editingProjectId ? 'Update Project' : 'Create Project'}</button>
                    {editingProjectId && <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>}
                </div>
            </form>

             <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Existing Projects</h3>
                {isLoading ? <p>Loading...</p> : (
                    <ul className="space-y-2">
                        {projects.map(p => (
                            <li key={p.id} className="p-2 border rounded flex justify-between items-center">
                                <span>{p.title} ({p.year})</span>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEditClick(p)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-600 transition-colors">Edit</button>
                                    <button onClick={() => handleDeleteClick(p.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 transition-colors">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
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

const ManageVtlCraft: React.FC = () => {
    const [projects, setProjects] = useState<VtlCraftProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Form state
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [thread, setThread] = useState<VtlCraftUpdate[]>([{ id: '', text: '', media: [''] }]);

    const loadProjects = async () => {
        setIsLoading(true);
        const data = await api.getVtlCraftProjects();
        setProjects(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const resetForm = () => {
        setTitle('');
        setThread([{ id: '', text: '', media: [''] }]);
        setEditingProjectId(null);
    };
    
    // Thread management handlers (identical to ManageProjects)
    const handleAddUpdate = () => setThread([...thread, { id: '', text: '', media: [''] }]);
    const handleRemoveUpdate = (index: number) => setThread(thread.filter((_, i) => i !== index));
    const handleUpdateTextChange = (index: number, value: string) => {
        const newThread = [...thread];
        newThread[index].text = value;
        setThread(newThread);
    };
    const handleMediaUrlChange = (updateIndex: number, mediaIndex: number, value: string) => {
        const newThread = [...thread];
        newThread[updateIndex].media[mediaIndex] = value;
        setThread(newThread);
    };
    const handleAddMediaUrl = (updateIndex: number) => {
        const newThread = [...thread];
        newThread[updateIndex].media.push('');
        setThread(newThread);
    };
    const handleRemoveMediaUrl = (updateIndex: number, mediaIndex: number) => {
        const newThread = [...thread];
        newThread[updateIndex].media = newThread[updateIndex].media.filter((_, i) => i !== mediaIndex);
        setThread(newThread);
    };
     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, updateIndex: number, mediaIndex: number) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) { alert("File is too large. Max 10MB."); return; }
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                handleMediaUrlChange(updateIndex, mediaIndex, reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const projectData = {
                title,
                thread: thread.map(item => ({
                    ...item,
                    media: item.media.filter(Boolean)
                }))
            };
            if (!projectData.title || projectData.thread.length === 0 || !projectData.thread[0].text) {
                alert('Title and at least one update with text are required.');
                return;
            }

            if (editingProjectId) {
                const updatedProject = await api.updateVtlCraftProject(editingProjectId, projectData);
                setProjects(projects.map(p => p.id === editingProjectId ? updatedProject : p));
            } else {
                await api.addVtlCraftProject(projectData);
                loadProjects();
            }
            resetForm();
        } catch (error) {
            console.error("Failed to save VTL Craft project:", error);
            alert(`Error saving project: ${error instanceof Error ? error.message : String(error)}`);
        }
    };
    
    const handleEditClick = (project: VtlCraftProject) => {
        setEditingProjectId(project.id);
        setTitle(project.title);
        setThread(project.thread && project.thread.length > 0 ? project.thread : [{ id: '', text: '', media: [''] }]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = async (idToDelete: string) => {
        if (window.confirm('Are you sure you want to delete this project? This cannot be undone.')) {
            try {
                await api.deleteVtlCraftProject(idToDelete);
                setProjects(prevProjects => prevProjects.filter(p => p.id !== idToDelete));
            } catch (error) {
                console.error("Failed to delete project:", error);
                alert(`Error deleting project: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
                <h3 className="text-xl font-semibold">{editingProjectId ? 'Edit VTL Craft Project' : 'Create VTL Craft Project'}</h3>
                <input type="text" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
                
                <div className="space-y-4">
                    <h4 className="font-semibold">Project Thread Updates</h4>
                    {thread.map((update, updateIndex) => (
                         <div key={update.id || updateIndex} className="p-4 border rounded-md space-y-3 bg-gray-50 relative">
                            <label className="block text-sm font-medium text-gray-700">Update #{updateIndex + 1}</label>
                            <textarea placeholder="Update text / description..." value={update.text} onChange={e => handleUpdateTextChange(updateIndex, e.target.value)} className="w-full p-2 border rounded" rows={3} required></textarea>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Media</label>
                                {update.media.map((url, mediaIndex) => (
                                    <div key={mediaIndex} className="flex items-center space-x-2">
                                        <input type="text" placeholder="Enter URL or upload file" value={url} onChange={(e) => handleMediaUrlChange(updateIndex, mediaIndex, e.target.value)} className="w-full p-2 border rounded" />
                                        <label className="cursor-pointer px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 whitespace-nowrap">
                                            Upload
                                            <input type="file" className="hidden" onChange={(e) => handleFileChange(e, updateIndex, mediaIndex)} accept="image/*,video/*"/>
                                        </label>
                                        <button type="button" onClick={() => handleRemoveMediaUrl(updateIndex, mediaIndex)} className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">&ndash;</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddMediaUrl(updateIndex)} className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Add Media</button>
                            </div>

                            {thread.length > 1 && (
                                <button type="button" onClick={() => handleRemoveUpdate(updateIndex)} className="absolute top-2 right-2 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">Remove Update</button>
                            )}
                        </div>
                    ))}
                     <button type="button" onClick={handleAddUpdate} className="px-4 py-2 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 font-semibold">Add Another Update</button>
                </div>
                <div className="flex space-x-2">
                    <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold">{editingProjectId ? 'Update Project' : 'Create Project'}</button>
                    {editingProjectId && <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>}
                </div>
            </form>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Existing VTL Craft Projects</h3>
                {isLoading ? <p>Loading...</p> : (
                    <ul className="space-y-2">
                        {projects.map(p => (
                            <li key={p.id} className="p-2 border rounded flex justify-between items-center">
                                <div>
                                    <img src={p.coverImageUrl} alt={p.title} className="w-12 h-12 object-cover inline-block mr-4 rounded"/>
                                    <span>{p.title}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEditClick(p)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-600 transition-colors">Edit</button>
                                    <button onClick={() => handleDeleteClick(p.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 transition-colors">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
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
            case 'projects': return <ManageProjects />;
            case 'student-projects': return <StudentProjectAdminPanel />;
            case 'vtl-craft': return <ManageVtlCraft />;
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

            <div className="flex border-b mb-6 overflow-x-auto">
                <button onClick={() => setActiveView('posts')} className={`px-4 py-2 whitespace-nowrap ${activeView === 'posts' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Manage Posts</button>
                <button onClick={() => setActiveView('trainings')} className={`px-4 py-2 whitespace-nowrap ${activeView === 'trainings' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Manage Trainings</button>
                <button onClick={() => setActiveView('projects')} className={`px-4 py-2 whitespace-nowrap ${activeView === 'projects' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Manage Projects</button>
                <button onClick={() => setActiveView('student-projects')} className={`px-4 py-2 whitespace-nowrap ${activeView === 'student-projects' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Student Projects</button>
                <button onClick={() => setActiveView('vtl-craft')} className={`px-4 py-2 whitespace-nowrap ${activeView === 'vtl-craft' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Manage VTL Craft</button>
                <button onClick={() => setActiveView('applications')} className={`px-4 py-2 whitespace-nowrap ${activeView === 'applications' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>View Applications</button>
            </div>

            <div>
                {renderView()}
            </div>
        </div>
    );
};

export default AdminDashboardPage;