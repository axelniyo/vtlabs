
import { Post, TrainingProgram, Project, Application, GalleryImage } from '../types';
// Re-import the local mock data for fallback purposes
import { 
    mockPosts, 
    mockTrainingPrograms, 
    mockProjects, 
    mockApplications, 
    mockGalleryImages 
} from '../data/mockData';

const API_BASE_URL = 'http://localhost:3001/api';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const api = {
  getPosts: async (): Promise<Post[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      return await handleResponse(response);
    } catch (error) {
      console.warn("⚠️ Backend not available. Falling back to local mock data for posts.", error);
      return mockPosts;
    }
  },
  
  addPost: async (postData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
    });
    return handleResponse(response);
  },

  getTrainingPrograms: async (): Promise<TrainingProgram[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/training-programs`);
        return await handleResponse(response);
    } catch(error) {
        console.warn("⚠️ Backend not available. Falling back to local mock data for training programs.", error);
        return mockTrainingPrograms;
    }
  },

  addTrainingProgram: async (programData: Omit<TrainingProgram, 'id'>): Promise<TrainingProgram> => {
     const response = await fetch(`${API_BASE_URL}/training-programs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programData),
    });
    return handleResponse(response);
  },
  
  getProjects: async (): Promise<Project[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        return await handleResponse(response);
    } catch(error) {
        console.warn("⚠️ Backend not available. Falling back to local mock data for projects.", error);
        return mockProjects;
    }
  },

  getGalleryImages: async (): Promise<GalleryImage[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/gallery-images`);
        return await handleResponse(response);
    } catch (error) {
        console.warn("⚠️ Backend not available. Falling back to local mock data for gallery images.", error);
        return mockGalleryImages;
    }
  },
  
  submitApplication: async (appData: Omit<Application, 'id' | 'submittedAt'>): Promise<Application> => {
     const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appData),
    });
    return handleResponse(response);
  },

  getApplications: async (): Promise<Application[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications`);
        return await handleResponse(response);
    } catch (error) {
        console.warn("⚠️ Backend not available. Falling back to local mock data for applications.", error);
        return mockApplications;
    }
  },
};
