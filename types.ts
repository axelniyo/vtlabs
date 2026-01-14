
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

export enum TrainingStatus {
    Open = 'Open',
    Closed = 'Closed'
}

export interface TrainingProgram {
    id: string;
    title: string;
    description: string;
    duration: string;
    status: TrainingStatus;
    year: number;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    year: number;
    trainingProgramId: string;
}

export interface Application {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    courseId: string;
    courseName: string;
    motivation: string;
    submittedAt: string;
}

export interface GalleryImage {
    id: string;
    imageUrl: string;
    title?: string;
}
