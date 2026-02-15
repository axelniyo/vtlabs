
import React, { useState } from 'react';
import { Post } from '../types';
import { api } from '../services/api';

interface ApplicationFormProps {
  program: Post;
  onClose: () => void;
  onSubmit: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ program, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        motivation: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.submitApplication({
                ...formData,
                courseId: program.id,
                courseName: program.title,
            });
            onSubmit();
        } catch (error) {
            console.error("Failed to submit application:", error);
            alert("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-vt-text-secondary">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 block w-full bg-vt-bg border border-vt-surface rounded-md shadow-sm p-2 text-vt-text-light" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-vt-text-secondary">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full bg-vt-bg border border-vt-surface rounded-md shadow-sm p-2 text-vt-text-light" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-vt-text-secondary">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full bg-vt-bg border border-vt-surface rounded-md shadow-sm p-2 text-vt-text-light" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-vt-text-secondary">Course Selected</label>
                <input type="text" value={program.title} className="mt-1 block w-full border bg-vt-bg border-vt-surface rounded-md shadow-sm p-2" readOnly />
            </div>
            <div>
                <label className="block text-sm font-medium text-vt-text-secondary">Motivation</label>
                <textarea name="motivation" value={formData.motivation} onChange={handleChange} rows={4} className="mt-1 block w-full bg-vt-bg border border-vt-surface rounded-md shadow-sm p-2 text-vt-text-light" required></textarea>
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-vt-text-secondary/20 text-vt-text-light rounded-md hover:bg-vt-text-secondary/30">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-vt-pink text-white rounded-md hover:bg-opacity-90 disabled:bg-gray-400">
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </div>
        </form>
    );
};

export default ApplicationForm;
