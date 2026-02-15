import React, { useState, useEffect } from 'react';
import { StudentProject, StudentProjectUpdate } from '../types';
import { api } from '../services/api';

interface StudentProjectForm {
    title: string;
    studentName: string;
    thread: StudentProjectUpdate[];
    githubLink: string;
    websiteLink: string;
}

const StudentProjectAdminPanel: React.FC = () => {
    const [projects, setProjects] = useState<StudentProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<StudentProjectForm>({
        title: '',
        studentName: '',
        thread: [{ id: '1', text: '', media: [] }],
        githubLink: '',
        websiteLink: '',
    });
    const [currentUpdateIndex, setCurrentUpdateIndex] = useState(0);
    const [uploadingMedia, setUploadingMedia] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await api.getStudentProjects();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch student projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddThread = () => {
        const newThreadId = `${Date.now()}`;
        setForm({
            ...form,
            thread: [
                ...form.thread,
                { id: newThreadId, text: '', media: [] }
            ]
        });
        // Set current update index to the newly added one
        setTimeout(() => {
            setCurrentUpdateIndex(form.thread.length);
        }, 0);
    };

    const handleRemoveThread = (index: number) => {
        setForm({
            ...form,
            thread: form.thread.filter((_, i) => i !== index)
        });
        if (currentUpdateIndex >= form.thread.length - 1) {
            setCurrentUpdateIndex(Math.max(0, form.thread.length - 2));
        }
    };

    const handleThreadTextChange = (index: number, text: string) => {
        const newThread = [...form.thread];
        newThread[index].text = text;
        setForm({ ...form, thread: newThread });
    };

    const handleMediaUrlAdd = (index: number, url: string) => {
        const newThread = [...form.thread];
        if (!newThread[index].media.includes(url)) {
            newThread[index].media.push(url);
        }
        setForm({ ...form, thread: newThread });
    };

    const handleMediaRemove = (threadIndex: number, mediaIndex: number) => {
        const newThread = [...form.thread];
        newThread[threadIndex].media.splice(mediaIndex, 1);
        setForm({ ...form, thread: newThread });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, threadIndex: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            alert("File is too large. Please choose a file smaller than 10MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                handleMediaUrlAdd(threadIndex, reader.result);
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
            if (!form.title || !form.studentName || form.thread.length === 0) {
                alert('Please fill in all required fields and add at least one update');
                return;
            }

            if (editingId) {
                await api.updateStudentProject(editingId, form);
            } else {
                await api.addStudentProject(form);
            }

            // Reset form
            setForm({
                title: '',
                studentName: '',
                thread: [{ id: '1', text: '', media: [] }],
                githubLink: '',
                websiteLink: '',
            });
            setShowForm(false);
            setIsEditing(false);
            setEditingId(null);
            setCurrentUpdateIndex(0);

            // Refresh projects
            fetchProjects();
        } catch (error) {
            console.error("Failed to save student project:", error);
            alert('Failed to save student project');
        }
    };

    const handleEdit = (project: StudentProject) => {
        setEditingId(project.id);
        setIsEditing(true);
        setShowForm(true);
        setForm({
            title: project.title,
            studentName: project.studentName,
            thread: project.thread || [{ id: '1', text: '', media: [] }],
            githubLink: project.githubLink || '',
            websiteLink: project.websiteLink || '',
        });
        setCurrentUpdateIndex(0);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this student project?')) {
            try {
                await api.deleteStudentProject(id);
                fetchProjects();
            } catch (error) {
                console.error("Failed to delete student project:", error);
                alert('Failed to delete student project');
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditingId(null);
        setForm({
            title: '',
            studentName: '',
            thread: [{ id: '1', text: '', media: [] }],
            githubLink: '',
            websiteLink: '',
        });
        setCurrentUpdateIndex(0);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Student Projects Management</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    {showForm ? 'Cancel' : 'Add New Project'}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Project Title *</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Student Name *</label>
                                <input
                                    type="text"
                                    value={form.studentName}
                                    onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">GitHub Link</label>
                                <input
                                    type="url"
                                    value={form.githubLink}
                                    onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
                                    placeholder="https://github.com/..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Website Link</label>
                                <input
                                    type="url"
                                    value={form.websiteLink}
                                    onChange={(e) => setForm({ ...form, websiteLink: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Thread Updates */}
                        <div className="border-t pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Project Updates (Thread) *</h3>
                            </div>

                            {/* Thread Tabs */}
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                {form.thread.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setCurrentUpdateIndex(index)}
                                        className={`px-4 py-2 rounded whitespace-nowrap ${
                                            currentUpdateIndex === index
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    >
                                        Update {index + 1}
                                    </button>
                                ))}
                            </div>

                            {/* Current Update Editor */}
                            {form.thread[currentUpdateIndex] && (
                                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Update Text</label>
                                        <textarea
                                            value={form.thread[currentUpdateIndex].text}
                                            onChange={(e) => handleThreadTextChange(currentUpdateIndex, e.target.value)}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Describe this update..."
                                        />
                                    </div>

                                    {/* Media */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Media (Images/Videos)</label>
                                        <div className="space-y-2">
                                            {form.thread[currentUpdateIndex].media.length > 0 && (
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                                    {form.thread[currentUpdateIndex].media.map((media, mediaIndex) => (
                                                        <div key={mediaIndex} className="relative group">
                                                            {media.includes('data:video') || media.includes('.mp4') ? (
                                                                <div className="w-full h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                                                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M8 5v14l11-7z" />
                                                                    </svg>
                                                                </div>
                                                            ) : (
                                                                <img
                                                                    src={media}
                                                                    alt={`Media ${mediaIndex + 1}`}
                                                                    className="w-full h-24 object-cover rounded-lg"
                                                                />
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => handleMediaRemove(currentUpdateIndex, mediaIndex)}
                                                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                                                <div className="flex flex-col items-center">
                                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    <span className="text-sm text-gray-600">Click to upload media</span>
                                                    <span className="text-xs text-gray-500">Images or videos (max 10MB)</span>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => handleFileChange(e, currentUpdateIndex)}
                                                    accept="image/*,video/*"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Remove Thread Button */}
                                    {form.thread.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveThread(currentUpdateIndex)}
                                            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                        >
                                            Remove This Update
                                        </button>
                                    )}

                                    {/* Add Another Update Button */}
                                    <button
                                        type="button"
                                        onClick={handleAddThread}
                                        className="px-4 py-2 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 font-semibold"
                                    >
                                        + Add Another Update
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4 justify-end">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                {isEditing ? 'Update Project' : 'Create Project'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Projects List */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {projects.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No student projects yet. Create your first one!
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Student</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Updates</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Links</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm">{project.title}</td>
                                        <td className="px-6 py-4 text-sm">{project.studentName}</td>
                                        <td className="px-6 py-4 text-sm">{project.thread?.length || 0}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex gap-2">
                                                {project.githubLink && (
                                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
                                                )}
                                                {project.websiteLink && (
                                                    <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Website</a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm space-x-2">
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentProjectAdminPanel;
