
import { Post, PostCategory, TrainingProgram, TrainingStatus, Project, Application, VtlCraftProject } from '../types';

export const mockPosts: Post[] = [
  // FIX: Corrected future dates to be more realistic, allowing other content to appear in "Recent Updates".
  { id: '9', title: 'akazi', description: 'VTLABS iri gutanga akazi.', imageUrl: 'https://picsum.photos/seed/announcement1/600/400', category: PostCategory.Announcement, createdAt: '2024-10-01T10:00:00Z' },
  { id: '10', title: 'umushyitsi', description: 'guverineri wa kigali yasuye vtlabs', imageUrl: 'https://picsum.photos/seed/announcement2/600/400', category: PostCategory.Announcement, createdAt: '2024-09-15T10:00:00Z' },
  { id: '11', title: 'kwirukana', description: 'vtlabs yirukanye abakozi bigize nabi', imageUrl: 'https://picsum.photos/seed/announcement3/600/400', category: PostCategory.Announcement, createdAt: '2024-08-20T10:00:00Z' },
  { id: '1', title: 'New Robotics Training Program', description: 'Join our advanced robotics program starting this fall. Limited seats available!', imageUrl: 'https://picsum.photos/seed/robotics/600/400', category: PostCategory.Training, createdAt: '2023-10-26T10:00:00Z' },
  { id: '2', title: 'VTLabs Completes Smart City Project', description: 'Successfully deployed IoT solutions for traffic management in downtown.', imageUrl: 'https://picsum.photos/seed/city/600/400', category: PostCategory.Project, createdAt: '2023-10-25T14:30:00Z' },
  { id: '3', title: 'Annual Company Announcement', description: 'We are excited to announce our expansion into new markets and technologies.', imageUrl: 'https://picsum.photos/seed/announce/600/400', category: PostCategory.Announcement, createdAt: '2023-10-24T09:00:00Z' },
  { id: '4', title: 'Minimalist Office Interior Design', description: 'Our VTL Craft team has redesigned the new wing with a focus on minimalism and productivity.', imageUrl: 'https://picsum.photos/seed/office/600/400', category: PostCategory.InteriorDesign, createdAt: '2023-10-23T11:00:00Z' },
  { id: '5', title: 'AI in Manufacturing Workshop', description: 'A hands-on workshop covering the latest trends in AI for manufacturing.', imageUrl: 'https://picsum.photos/seed/ai/600/400', category: PostCategory.Training, createdAt: '2023-10-22T16:00:00Z' },
  // FIX: Corrected a missing 'title' property key.
  { id: '6', title: 'Eco-Friendly Housing Project', description: 'A new sustainable housing project utilizing green technologies.', imageUrl: 'https://picsum.photos/seed/eco/600/400', category: PostCategory.Project, createdAt: '2023-10-21T18:00:00Z' },
  { id: '7', title: 'VTLabs Partners with TechCorp', description: 'A strategic partnership to accelerate innovation in cloud computing.', imageUrl: 'https://picsum.photos/seed/partner/600/400', category: PostCategory.Announcement, createdAt: '2023-10-20T10:00:00Z' },
  { id: '8', title: 'Advanced Web Development Bootcamp', description: 'An intensive 12-week bootcamp for aspiring full-stack developers.', imageUrl: 'https://picsum.photos/seed/webdev/600/400', category: PostCategory.Training, createdAt: '2023-10-19T09:30:00Z' },
];

export const mockTrainingPrograms: TrainingProgram[] = [
    { 
        id: 'tp1', 
        title: 'Advanced Robotics', 
        description: 'Master robotics with hands-on projects. This is our first update about the program, showcasing our new lab setup.',
        duration: '16 Weeks', 
        status: TrainingStatus.Open, 
        year: 2024, 
        createdAt: '2024-01-15T09:00:00Z',
        thread: [
            {
                id: 'update1-tp1',
                text: 'Master robotics with hands-on projects. This is our first update about the program, showcasing our new lab setup.',
                media: [
                    'https://picsum.photos/seed/robotics-gallery1/800/600',
                    'https://picsum.photos/seed/robotics-gallery2/800/600',
                ]
            },
            {
                id: 'update2-tp1',
                text: 'We just received our new shipment of parts! Students will be working with state-of-the-art components. Check out this video of the unboxing.',
                media: [
                    'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                ]
            }
        ]
    },
    { 
        id: 'tp2', 
        title: 'Full-Stack Web Development', 
        description: 'Become a full-stack developer with MERN stack. Our curriculum is now updated for 2024!', 
        duration: '12 Weeks', 
        status: TrainingStatus.Open, 
        year: 2024, 
        createdAt: '2024-01-20T09:00:00Z',
        thread: [
            {
                id: 'update1-tp2',
                text: 'Become a full-stack developer with MERN stack. Our curriculum is now updated for 2024!',
                media: [
                    'https://picsum.photos/seed/webdev-gallery1/800/600'
                ]
            }
        ]
    },
    { 
        id: 'tp3', 
        title: 'Data Science with Python', 
        description: 'Learn data analysis, machine learning, and visualization. This program is concluded for 2023.', 
        duration: '20 Weeks', 
        status: TrainingStatus.Closed, 
        year: 2023,
        createdAt: '2023-02-01T09:00:00Z',
        thread: [
             {
                id: 'update1-tp3',
                text: 'Learn data analysis, machine learning, and visualization. This program is concluded for 2023.',
                media: []
            }
        ]
    },
    { 
        id: 'tp4', 
        title: 'IoT and Smart Devices', 
        description: 'Build and program connected devices. See the final projects from our 2023 cohort.', 
        duration: '14 Weeks', 
        status: TrainingStatus.Closed, 
        year: 2023,
        createdAt: '2023-03-01T09:00:00Z',
         thread: [
             {
                id: 'update1-tp4',
                text: 'Build and program connected devices. See the final projects from our 2023 cohort.',
                media: ['https://picsum.photos/seed/iot-gallery1/800/600']
            }
        ]
    },
    { 
        id: 'tp5', 
        title: 'Cloud Computing Essentials', 
        description: 'Fundamentals of AWS, Azure, and GCP. The 2022 session was a great success.', 
        duration: '8 Weeks', 
        status: TrainingStatus.Closed, 
        year: 2022,
        createdAt: '2022-09-01T09:00:00Z',
        thread: []
    },
];


export const mockProjects: Project[] = [
    { 
        id: 'p1', 
        title: 'Automated Warehouse Robot', 
        description: 'A robot for sorting and moving packages, developed by the 2023 Data Science cohort.', 
        imageUrl: 'https://picsum.photos/seed/project1/600/400', 
        year: 2023, 
        createdAt: '2023-11-10T11:00:00Z',
        trainingProgramId: 'tp3',
        thread: [{ id: 'update1-p1', text: 'A robot for sorting and moving packages, developed by the 2023 Data Science cohort.', media: ['https://picsum.photos/seed/project1/600/400'] }]
    },
    { 
        id: 'p2', 
        title: 'Smart Home Hub', 
        description: 'A central hub to control smart home devices, the capstone project for the IoT program.', 
        imageUrl: 'https://picsum.photos/seed/project2/600/400', 
        year: 2023, 
        createdAt: '2023-11-15T11:00:00Z',
        trainingProgramId: 'tp4',
        thread: [{ id: 'update1-p2', text: 'A central hub to control smart home devices, the capstone project for the IoT program.', media: ['https://picsum.photos/seed/project2/600/400'] }]
    },
    { 
        id: 'p3', 
        title: 'E-commerce Platform', 
        description: 'A fully functional e-commerce website built with the MERN stack by our web development students.', 
        imageUrl: 'https://picsum.photos/seed/project3/600/400', 
        year: 2024, 
        createdAt: '2024-05-20T14:00:00Z',
        trainingProgramId: 'tp2',
        thread: [{ id: 'update1-p3', text: 'A fully functional e-commerce website built with the MERN stack by our web development students.', media: ['https://picsum.photos/seed/project3/600/400'] }]
    },
    { 
        id: 'p4', 
        title: 'Serverless Data Pipeline', 
        description: 'A data processing pipeline using serverless architecture, a key project from the Cloud Computing course.', 
        imageUrl: 'https://picsum.photos/seed/project4/600/400', 
        year: 2022, 
        createdAt: '2022-12-01T11:00:00Z',
        trainingProgramId: 'tp5',
        thread: [{ id: 'update1-p4', text: 'A data processing pipeline using serverless architecture, a key project from the Cloud Computing course.', media: ['https://picsum.photos/seed/project4/600/400'] }]
    },
];

export const mockApplications: Application[] = [
    { id: 'app1', fullName: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', courseId: 'tp1', courseName: 'Advanced Robotics', motivation: 'I am passionate about robotics.', submittedAt: '2023-10-25T10:00:00Z' },
    { id: 'app2', fullName: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', courseId: 'tp2', courseName: 'Full-Stack Web Development', motivation: 'I want to build amazing web applications.', submittedAt: '2023-10-26T11:00:00Z' },
];

export const mockVtlCraftProjects: VtlCraftProject[] = [
    { 
        id: 'craft1', 
        title: 'Modern Living Room', 
        description: 'A complete redesign of a living space focusing on clean lines, neutral colors, and smart technology integration.',
        coverImageUrl: 'https://picsum.photos/seed/gallery1/800/600',
        createdAt: '2023-11-05T10:00:00Z',
        thread: [
            { id: 'craft1-update1', text: 'Initial concept and mood board for the modern living room. We focused on a minimalist aesthetic with natural textures.', media: ['https://picsum.photos/seed/gallery1/800/600', 'https://picsum.photos/seed/gallery1-2/800/600'] },
            { id: 'craft1-update2', text: 'The final result, showcasing the custom furniture and integrated lighting system.', media: ['https://picsum.photos/seed/gallery1-3/800/600'] }
        ]
    },
    { 
        id: 'craft2', 
        title: 'Corporate Lounge', 
        description: 'Designing a functional and relaxing lounge area for a corporate headquarters to foster collaboration and creativity.',
        coverImageUrl: 'https://picsum.photos/seed/gallery2/800/600',
        createdAt: '2023-10-15T10:00:00Z',
        thread: [
            { id: 'craft2-update1', text: 'Designing a functional and relaxing lounge area for a corporate headquarters to foster collaboration and creativity.', media: ['https://picsum.photos/seed/gallery2/800/600'] }
        ]
    },
];
