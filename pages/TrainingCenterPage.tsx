
import React, { useState, useEffect, useMemo } from 'react';
import { TrainingProgram, Project, TrainingStatus } from '../types';
import { api } from '../services/api';
import Modal from '../components/Modal';

interface ApplicationFormProps {
  program: TrainingProgram;
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
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Course Selected</label>
                <input type="text" value={program.title} className="mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm p-2" readOnly />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Motivation</label>
                <textarea name="motivation" value={formData.motivation} onChange={handleChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required></textarea>
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-vt-light-blue text-white rounded-md hover:bg-vt-blue disabled:bg-gray-400">
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </div>
        </form>
    );
};


const TrainingCenterPage: React.FC = () => {
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);

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
  
  const handleApplyClick = (program: TrainingProgram) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
    setIsSubmissionSuccess(false);
  };

  const handleFormSubmit = () => {
    setIsSubmissionSuccess(true);
    setTimeout(() => {
        setIsModalOpen(false);
    }, 2000);
  };


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
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Panel: Past Programs */}
      <aside className="w-full md:w-1/3 lg:w-1/4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-vt-dark-gray mb-4">Past Programs</h2>
          {Object.keys(pastProgramsByYear).sort((a,b) => Number(b) - Number(a)).map(year => (
            <div key={year} className="mb-4">
              <h3 className="font-semibold text-lg text-vt-blue">{year}</h3>
              <ul className="list-disc list-inside ml-2 mt-2 space-y-1 text-sm">
                {pastProgramsByYear[Number(year)].map(program => (
                  <li key={program.id} className="text-vt-gray">{program.title}
                    <ul className="list-circle list-inside ml-4 mt-1 text-xs">
                        {projects.filter(p => p.trainingProgramId === program.id).map(proj => (
                            <li key={proj.id} className="text-gray-500">{proj.title}</li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content: Available Programs */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-vt-dark-gray mb-6">Available Training Programs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availablePrograms.map(program => (
            <div key={program.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              <h3 className="text-xl font-bold text-vt-dark-gray">{program.title}</h3>
              <p className="text-vt-gray my-2 flex-grow">{program.description}</p>
              <div className="flex justify-between items-center text-sm mt-4">
                <span className="font-semibold text-vt-blue">{program.duration}</span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${program.status === TrainingStatus.Open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {program.status}
                </span>
              </div>
              <button
                onClick={() => handleApplyClick(program)}
                className="mt-6 w-full bg-vt-light-blue text-white font-bold py-2 px-4 rounded-md hover:bg-vt-blue transition-colors duration-300"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
      
       {selectedProgram && (
         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Apply for ${selectedProgram.title}`}>
            {isSubmissionSuccess ? (
                <div className="text-center p-8">
                    <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-xl font-semibold text-gray-800">Application Submitted!</h3>
                    <p className="mt-2 text-gray-600">Thank you. We have received your application and will be in touch shortly.</p>
                </div>
            ) : (
                <ApplicationForm program={selectedProgram} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} />
            )}
        </Modal>
       )}
    </div>
  );
};

export default TrainingCenterPage;
