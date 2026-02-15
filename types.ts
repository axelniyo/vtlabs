
export enum PostCategory {
  Announcement = 'Announcement',
  Project = 'Project',
  Training = 'Training',
  InteriorDesign = 'Interior Design',
}

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: PostCategory;
  createdAt: string; // ISO date string
}

export interface TrainingUpdate {
    id: string;
    text: string;
    media: string[]; // Array of image/video URLs
}

export enum TrainingStatus {
    Open = 'Open',
    Closed = 'Closed'
}

export interface TrainingProgram {
    id: string;
    title: string;
    description: string; // Summary / text from the first thread update
    duration: string;
    status: TrainingStatus;
    year: number;
    applicationUrl?: string;
    thread?: TrainingUpdate[];
    createdAt: string; // ISO date string
}

export interface ProjectUpdate {
    id: string;
    text: string;
    media: string[]; // Array of image/video URLs
}

export interface Project {
    id: string;
    title: string;
    description: string; // Derived from thread
    imageUrl: string;    // Derived from thread
    year: number;
    trainingProgramId?: string;
    thread?: ProjectUpdate[];
    createdAt: string; // ISO date string
}

export interface Application {
    id:string;
    fullName: string;
    email: string;
    phone: string;
    courseId: string;
    courseName: string;
    motivation: string;
    submittedAt: string;
}

export interface VtlCraftUpdate {
    id: string;
    text: string;
    media: string[];
}

export interface VtlCraftProject {
    id: string;
    title: string;
    description: string; // Derived from thread
    coverImageUrl: string; // Derived from thread
    thread?: VtlCraftUpdate[];
    createdAt: string;
}

export interface StudentProjectUpdate {
    id: string;
    text: string;
    media: string[]; // Array of image/video URLs
}

export interface StudentProject {
    id: string;
    title: string;
    studentName: string;
    description: string; // Derived from thread
    coverImageUrl: string; // Derived from thread
    thread?: StudentProjectUpdate[];
    githubLink?: string;
    websiteLink?: string;
    createdAt: string;
}