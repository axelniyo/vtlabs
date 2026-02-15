
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrainingProgram, Project, TrainingStatus } from '../types';
import { api } from '../services/api';
import TrainingCenterHero from '../components/TrainingCenterHero';
import TrainingProgramGrid from '../components/TrainingProgramGrid';
import StemKitsSection from '../components/StemKitsSection';

const TrainingProgramCard: React.FC<{ program: TrainingProgram }> = ({ program }) => {
    const coverImage = program.thread?.[0]?.media?.[0];
    const description = program.description; // This is already set to thread[0].text from API

    return (
        <div className="bg-vt-surface rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            {coverImage && (
                <div className="md:w-1/3 flex-shrink-0">
                    <img src={coverImage} alt={program.title} className="w-full h-48 md:h-full object-cover" />
                </div>
            )}
            <div className={`p-6 flex flex-col flex-grow ${!coverImage && 'w-full'}`}>
                <h3 className="text-2xl font-bold text-vt-text-light">{program.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-vt-text-secondary my-2">
                    <span className="font-semibold text-vt-purple">{program.duration}</span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${program.status === TrainingStatus.Open ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {program.status}
                    </span>
                </div>
                <p className="text-vt-text-secondary mt-2 text-base flex-grow">{description}</p>
                <div className="mt-6 flex-shrink-0 self-start">
                    <Link
                        to={`/training-center/${program.id}`}
                        className="inline-block text-center bg-vt-pink text-white font-bold py-3 px-6 rounded-md hover:opacity-90 transition-colors duration-300"
                    >
                        View Details to Apply
                    </Link>
                </div>
            </div>
        </div>
    );
};

const TrainingCenterPage: React.FC = () => {
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedPrograms, fetchedProjects] = await Promise.all([
          api.getTrainingPrograms(),
          api.getProjects(),
        ]);
        setPrograms(fetchedPrograms);
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  

  const { availablePrograms, pastProgramsByYear } = useMemo(() => {
    const available = programs.filter(p => p.status === TrainingStatus.Open);
    const past = programs.filter(p => p.status === TrainingStatus.Closed);
    
    const groupedByYear = past.reduce((acc, program) => {
        (acc[program.year] = acc[program.year] || []).push(program);
        return acc;
    }, {} as Record<number, TrainingProgram[]>);
    
    return { availablePrograms: available, pastProgramsByYear: groupedByYear };
  }, [programs]);
  
  if (loading) return <div className="text-center p-10">Loading training programs...</div>;

  return (
    <div>
      <TrainingCenterHero />
      <TrainingProgramGrid />
      <StemKitsSection />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Panel: Past Programs */}
        <aside className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-vt-surface p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-vt-text-light mb-4">Past Programs</h2>
            {Object.keys(pastProgramsByYear).length > 0 ? Object.keys(pastProgramsByYear).sort((a,b) => Number(b) - Number(a)).map(year => (
              <div key={year} className="mb-4">
                <h3 className="font-semibold text-lg text-vt-purple">{year}</h3>
                <ul className="list-disc list-inside ml-2 mt-2 space-y-1 text-sm">
                  {pastProgramsByYear[Number(year)].map(program => (
                    <li key={program.id} className="text-vt-text-secondary">{program.title}
                      <ul className="list-circle list-inside ml-4 mt-1 text-xs">
                          {projects.filter(p => p.trainingProgramId === program.id).map(proj => (
                              <li key={proj.id} className="text-gray-500">{proj.title}</li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )) : (
              <p className="text-sm text-vt-text-secondary">No past programs to show.</p>
            )}
          </div>
        </aside>

        {/* Main Content: Available Programs */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-vt-text-light mb-6">Available Training Programs</h1>
          {availablePrograms.length > 0 ? (
              <div className="space-y-8">
                  {availablePrograms.map(program => (
                      <TrainingProgramCard key={program.id} program={program} />
                  ))}
              </div>
          ) : (
              <div className="bg-vt-surface p-8 rounded-lg text-center text-vt-text-secondary">
                  <p>There are currently no training programs open for applications. Please check back later!</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingCenterPage;
