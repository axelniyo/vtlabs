
import { Post, TrainingProgram, Project, Application, VtlCraftProject, TrainingUpdate, ProjectUpdate, VtlCraftUpdate, StudentProject, StudentProjectUpdate } from '../types';
// Re-import the local mock data for fallback purposes
import { 
    mockPosts, 
    mockTrainingPrograms, 
    mockProjects, 
    mockApplications, 
    mockVtlCraftProjects 
} from '../data/mockData';

const API_BASE_URL = 'http://localhost:3001/api';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        if (response.status === 204) return; // No content for successful DELETE
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    // Handle cases where DELETE might return 204 with no content
    if (response.status === 204) return null;
    return response.json();
};

// --- Type definitions for update payloads ---
export type UpdatePostData = Omit<Post, 'id' | 'createdAt'>;
export type UpdateTrainingProgramData = Omit<TrainingProgram, 'id' | 'description' | 'createdAt'>;
export type UpdateProjectData = Omit<Project, 'id' | 'description' | 'imageUrl' | 'createdAt'>;
export type UpdateVtlCraftProjectData = Omit<VtlCraftProject, 'id' | 'coverImageUrl' | 'description' | 'createdAt'>;
export type UpdateStudentProjectData = Omit<StudentProject, 'id' | 'coverImageUrl' | 'description' | 'createdAt'>;

export const api = {
  login: async (email: string, password: string): Promise<{ success: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

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

  updatePost: async (id: string, postData: UpdatePostData): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
    });
    return handleResponse(response);
  },

  deletePost: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, { method: 'DELETE' });
    if (!response.ok && response.status !== 204) throw new Error('Failed to delete post');
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

  addTrainingProgram: async (programData: Omit<TrainingProgram, 'id' | 'description' | 'createdAt'>): Promise<TrainingProgram> => {
     const response = await fetch(`${API_BASE_URL}/training-programs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programData),
    });
    return handleResponse(response);
  },

  updateTrainingProgram: async (id: string, programData: UpdateTrainingProgramData): Promise<TrainingProgram> => {
    const response = await fetch(`${API_BASE_URL}/training-programs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programData),
    });
    return handleResponse(response);
  },

  deleteTrainingProgram: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/training-programs/${id}`, { method: 'DELETE' });
    if (!response.ok && response.status !== 204) throw new Error('Failed to delete training program');
  },

  getTrainingProgramById: async (id: string): Promise<TrainingProgram | undefined> => {
    try {
        const response = await fetch(`${API_BASE_URL}/training-programs/${id}`);
        if (response.status === 404) return undefined;
        return await handleResponse(response);
    } catch(error) {
        console.warn("⚠️ Backend not available. Falling back to local mock data for single training program.", error);
        return mockTrainingPrograms.find(p => p.id === id);
    }
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

  addProject: async (projectData: Omit<Project, 'id' | 'description' | 'imageUrl' | 'createdAt'>): Promise<Project> => {
     const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
    });
    return handleResponse(response);
  },

  updateProject: async (id: string, projectData: UpdateProjectData): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
    });
    return handleResponse(response);
  },

  deleteProject: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, { method: 'DELETE' });
    if (!response.ok && response.status !== 204) throw new Error('Failed to delete project');
  },

  getProjectById: async (id: string): Promise<Project | undefined> => {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`);
        if (response.status === 404) return undefined;
        return await handleResponse(response);
    } catch(error) {
        console.warn("⚠️ Backend not available. Falling back to local mock data for single project.", error);
        return mockProjects.find(p => p.id === id);
    }
  },

  getVtlCraftProjects: async (): Promise<VtlCraftProject[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/vtl-craft-projects`);
        return await handleResponse(response);
    } catch (error) {
        console.warn("⚠️ Backend not available. Falling back to local mock data for VTL Craft projects.", error);
        return mockVtlCraftProjects;
    }
  },
  
  getVtlCraftProjectById: async (id: string): Promise<VtlCraftProject | undefined> => {
    try {
        const response = await fetch(`${API_BASE_URL}/vtl-craft-projects/${id}`);
        if (response.status === 404) return undefined;
        return await handleResponse(response);
    } catch(error) {
        console.warn("⚠️ Backend not available. Falling back to local mock data for single VTL Craft project.", error);
        return mockVtlCraftProjects.find(p => p.id === id);
    }
  },

  addVtlCraftProject: async (projectData: Omit<VtlCraftProject, 'id' | 'coverImageUrl' | 'description' | 'createdAt'>): Promise<VtlCraftProject> => {
     const response = await fetch(`${API_BASE_URL}/vtl-craft-projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
    });
    return handleResponse(response);
  },

  updateVtlCraftProject: async (id: string, projectData: UpdateVtlCraftProjectData): Promise<VtlCraftProject> => {
    const response = await fetch(`${API_BASE_URL}/vtl-craft-projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
    });
    return handleResponse(response);
  },
  
  deleteVtlCraftProject: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/vtl-craft-projects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok && response.status !== 204) {
        const error = await response.json().catch(() => ({ message: 'Failed to delete project' }));
        throw new Error(error.message);
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

  getStudentProjects: async (): Promise<StudentProject[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/student-projects`);
      return await handleResponse(response);
    } catch (error) {
      console.warn("⚠️ Backend not available. Falling back to empty array for student projects.", error);
      return [];
    }
  },

  getStudentProjectById: async (id: string): Promise<StudentProject | undefined> => {
    try {
        const response = await fetch(`${API_BASE_URL}/student-projects/${id}`);
        if (response.status === 404) return undefined;
        return await handleResponse(response);
    } catch(error) {
        console.warn("⚠️ Backend not available for student project.", error);
        return undefined;
    }
  },

  addStudentProject: async (projectData: Omit<StudentProject, 'id' | 'coverImageUrl' | 'description' | 'createdAt'>): Promise<StudentProject> => {
     const response = await fetch(`${API_BASE_URL}/student-projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
    });
    return handleResponse(response);
  },

  updateStudentProject: async (id: string, projectData: UpdateStudentProjectData): Promise<StudentProject> => {
    const response = await fetch(`${API_BASE_URL}/student-projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
    });
    return handleResponse(response);
  },

  deleteStudentProject: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/student-projects/${id}`, { method: 'DELETE' });
    if (!response.ok && response.status !== 204) throw new Error('Failed to delete student project');
  },
};
