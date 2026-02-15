
import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import Hero from '../components/Hero';
import HomeSidebar from '../components/HomeSidebar';
import ProjectsAndRD from '../components/ProjectsAndRD';
import { Post, TrainingProgram, TrainingStatus, Project } from '../types';
import { api } from '../services/api';
import TrainingProgramHomeCard from '../components/TrainingProgramHomeCard';
import ProjectHomeCard from '../components/ProjectHomeCard';

// Define a unified type for all update items
type UpdateItem =
  | { type: 'post'; content: Post; date: Date }
  | { type: 'program'; content: TrainingProgram; date: Date }
  | { type: 'project'; content: Project; date: Date };


const HomePage: React.FC = () => {
  const [recentItems, setRecentItems] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [fetchedPosts, fetchedPrograms, fetchedProjects] = await Promise.all([
          api.getPosts(),
          api.getTrainingPrograms(),
          api.getProjects(),
        ]);

        const postItems: UpdateItem[] = fetchedPosts.map(post => ({
          type: 'post',
          content: post,
          date: new Date(post.createdAt),
        }));

        const programItems: UpdateItem[] = fetchedPrograms
          .filter(p => p.status === TrainingStatus.Open) // Only show open programs as "recent"
          .map(program => ({
            type: 'program',
            content: program,
            date: new Date(program.createdAt),
          }));

        const projectItems: UpdateItem[] = fetchedProjects.map(project => ({
            type: 'project',
            content: project,
            date: new Date(project.createdAt),
        }));
        
        const allItems = [...postItems, ...programItems, ...projectItems]
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 4); // Enforce a strict limit of 4 items

        setRecentItems(allItems);

      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
             <div key={index} className="bg-vt-surface rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="bg-vt-bg h-36 w-full"></div>
                <div className="p-6">
                    <div className="h-6 bg-vt-bg rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-vt-bg rounded w-full mb-2"></div>
                    <div className="h-4 bg-vt-bg rounded w-5/6"></div>
                </div>
            </div>
        ))}
    </div>
  );

  return (
    <div>
      <div className="relative h-[calc(100vh-4rem)]">
        {/* Main content (Hero) is always visible and takes up the full space */}
        <main className="h-full">
          <Hero />
        </main>
        
        {/* Sidebar Trigger Area on the left edge */}
        <div 
          className="absolute top-0 left-0 h-full w-12 z-30 flex items-center justify-center group"
          onMouseEnter={() => setIsSidebarVisible(true)}
        >
          <div className="w-8 space-y-1.5 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-1 bg-white rounded-full"></div>
              <div className="w-full h-1 bg-white rounded-full"></div>
              <div className="w-full h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* The sidebar, which slides in from the left over the main content */}
        <aside 
          className={`absolute top-0 left-0 h-full bg-vt-surface z-40 transition-transform duration-300 ease-in-out transform ${
            isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
          } w-80 shadow-2xl`}
          onMouseLeave={() => setIsSidebarVisible(false)}
        >
          <HomeSidebar />
        </aside>
      </div>


      <ProjectsAndRD />

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-vt-text-light mb-6">Recent Updates</h2>
        {loading ? renderSkeletons() : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentItems.map((item) => {
              switch(item.type) {
                case 'post':
                  return <PostCard key={`post-${item.content.id}`} post={item.content} />;
                case 'program':
                  return <TrainingProgramHomeCard key={`program-${item.content.id}`} program={item.content} />;
                case 'project':
                    return <ProjectHomeCard key={`project-${item.content.id}`} project={item.content} />;
                default:
                    return null;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
