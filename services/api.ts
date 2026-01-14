
import { mockPosts, mockTrainingPrograms, mockProjects, mockApplications, mockGalleryImages } from '../data/mockData';
import { Post, TrainingProgram, Project, Application, GalleryImage } from '../types';

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Let's make the data mutable for admin dashboard simulations
let posts = [...mockPosts];
let trainingPrograms = [...mockTrainingPrograms];
let projects = [...mockProjects];
let applications = [...mockApplications];
let galleryImages = [...mockGalleryImages];

export const api = {
  getPosts: async (): Promise<Post[]> => {
    await delay(200);
    return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  
  addPost: async (postData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    await delay(300);
    const newPost: Post = {
        ...postData,
        id: `post_${Date.now()}`,
        createdAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    return newPost;
  },

  getTrainingPrograms: async (): Promise<TrainingProgram[]> => {
    await delay(200);
    return [...trainingPrograms].sort((a, b) => b.year - a.year);
  },

  addTrainingProgram: async (programData: Omit<TrainingProgram, 'id'>): Promise<TrainingProgram> => {
    await delay(300);
    const newProgram: TrainingProgram = {
        ...programData,
        id: `tp_${Date.now()}`,
    };
    trainingPrograms.unshift(newProgram);
    return newProgram;
  },
  
  getProjects: async (): Promise<Project[]> => {
    await delay(200);
    return [...projects].sort((a, b) => b.year - a.year);
  },

  getGalleryImages: async (): Promise<GalleryImage[]> => {
    await delay(200);
    return [...galleryImages];
  },
  
  submitApplication: async (appData: Omit<Application, 'id' | 'submittedAt'>): Promise<Application> => {
    await delay(500);
    const newApplication: Application = {
      ...appData,
      id: `app_${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    applications.push(newApplication);
    console.log("New Application Submitted:", newApplication);
    return newApplication;
  },

  getApplications: async (): Promise<Application[]> => {
    await delay(200);
    return [...applications].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  },
};
