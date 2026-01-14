
import { Post, PostCategory, TrainingProgram, TrainingStatus, Project, Application, GalleryImage } from '../types';

export const mockPosts: Post[] = [
  { id: '1', title: 'New Robotics Training Program', description: 'Join our advanced robotics program starting this fall. Limited seats available!', imageUrl: 'https://picsum.photos/seed/robotics/600/400', category: PostCategory.Training, createdAt: '2023-10-26T10:00:00Z' },
  { id: '2', title: 'VTLabs Completes Smart City Project', description: 'Successfully deployed IoT solutions for traffic management in downtown.', imageUrl: 'https://picsum.photos/seed/city/600/400', category: PostCategory.Project, createdAt: '2023-10-25T14:30:00Z' },
  { id: '3', title: 'Annual Company Announcement', description: 'We are excited to announce our expansion into new markets and technologies.', imageUrl: 'https://picsum.photos/seed/announce/600/400', category: PostCategory.Announcement, createdAt: '2023-10-24T09:00:00Z' },
  { id: '4', title: 'Minimalist Office Interior Design', description: 'Our VTL Craft team has redesigned the new wing with a focus on minimalism and productivity.', imageUrl: 'https://picsum.photos/seed/office/600/400', category: PostCategory.InteriorDesign, createdAt: '2023-10-23T11:00:00Z' },
  { id: '5', title: 'AI in Manufacturing Workshop', description: 'A hands-on workshop covering the latest trends in AI for manufacturing.', imageUrl: 'https://picsum.photos/seed/ai/600/400', category: PostCategory.Training, createdAt: '2023-10-22T16:00:00Z' },
  { id: '6', title: 'Eco-Friendly Housing Project', description: 'A new sustainable housing project utilizing green technologies.', imageUrl: 'https://picsum.photos/seed/eco/600/400', category: PostCategory.Project, createdAt: '2023-10-21T18:00:00Z' },
  { id: '7', title: 'VTLabs Partners with TechCorp', description: 'A strategic partnership to accelerate innovation in cloud computing.', imageUrl: 'https://picsum.photos/seed/partner/600/400', category: PostCategory.Announcement, createdAt: '2023-10-20T10:00:00Z' },
  { id: '8', title: 'Advanced Web Development Bootcamp', description: 'An intensive 12-week bootcamp for aspiring full-stack developers.', imageUrl: 'https://picsum.photos/seed/webdev/600/400', category: PostCategory.Training, createdAt: '2023-10-19T09:30:00Z' },
];

export const mockTrainingPrograms: TrainingProgram[] = [
    { id: 'tp1', title: 'Advanced Robotics', description: 'Master robotics with hands-on projects.', duration: '16 Weeks', status: TrainingStatus.Open, year: 2024 },
    { id: 'tp2', title: 'Full-Stack Web Development', description: 'Become a full-stack developer with MERN stack.', duration: '12 Weeks', status: TrainingStatus.Open, year: 2024 },
    { id: 'tp3', title: 'Data Science with Python', description: 'Learn data analysis, machine learning, and visualization.', duration: '20 Weeks', status: TrainingStatus.Closed, year: 2023 },
    { id: 'tp4', title: 'IoT and Smart Devices', description: 'Build and program connected devices.', duration: '14 Weeks', status: TrainingStatus.Closed, year: 2023 },
    { id: 'tp5', title: 'Cloud Computing Essentials', description: 'Fundamentals of AWS, Azure, and GCP.', duration: '8 Weeks', status: TrainingStatus.Closed, year: 2022 },
];

export const mockProjects: Project[] = [
    { id: 'p1', title: 'Automated Warehouse Robot', description: 'A robot for sorting and moving packages.', imageUrl: 'https://picsum.photos/seed/project1/600/400', year: 2023, trainingProgramId: 'tp3' },
    { id: 'p2', title: 'Smart Home Hub', description: 'A central hub to control smart home devices.', imageUrl: 'https://picsum.photos/seed/project2/600/400', year: 2023, trainingProgramId: 'tp4' },
    { id: 'p3', title: 'E-commerce Platform', description: 'A fully functional e-commerce website.', imageUrl: 'https://picsum.photos/seed/project3/600/400', year: 2024, trainingProgramId: 'tp2' },
    { id: 'p4', title: 'Serverless Data Pipeline', description: 'A data processing pipeline using serverless architecture.', imageUrl: 'https://picsum.photos/seed/project4/600/400', year: 2022, trainingProgramId: 'tp5' },
];

export const mockApplications: Application[] = [
    { id: 'app1', fullName: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', courseId: 'tp1', courseName: 'Advanced Robotics', motivation: 'I am passionate about robotics.', submittedAt: '2023-10-25T10:00:00Z' },
    { id: 'app2', fullName: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', courseId: 'tp2', courseName: 'Full-Stack Web Development', motivation: 'I want to build amazing web applications.', submittedAt: '2023-10-26T11:00:00Z' },
];

export const mockGalleryImages: GalleryImage[] = [
    { id: 'g1', imageUrl: 'https://picsum.photos/seed/gallery1/800/600', title: 'Modern Living Room' },
    { id: 'g2', imageUrl: 'https://picsum.photos/seed/gallery2/800/600', title: 'Corporate Lounge' },
    { id: 'g3', imageUrl: 'https://picsum.photos/seed/gallery3/800/600', title: 'Minimalist Kitchen' },
    { id: 'g4', imageUrl: 'https://picsum.photos/seed/gallery4/800/600', title: 'Open Office Space' },
    { id: 'g5', imageUrl: 'https://picsum.photos/seed/gallery5/800/600', title: 'Cozy Bedroom' },
    { id: 'g6', imageUrl: 'https://picsum.photos/seed/gallery6/800/600', title: 'Reception Area' },
    { id: 'g7', imageUrl: 'https://picsum.photos/seed/gallery7/800/600', title: 'Creative Workspace' },
    { id: 'g8', imageUrl: 'https://picsum.photos/seed/gallery8/800/600', title: 'Luxury Bathroom' },
];
