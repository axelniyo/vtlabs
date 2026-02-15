
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TrainingCenterPage from './pages/TrainingCenterPage';
import TrainingProgramDetailsPage from './pages/TrainingProgramDetailsPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ManufacturingPage from './pages/ManufacturingPage';
import AboutUsPage from './pages/AboutUsPage';
import VTLCraftPage from './pages/VTLCraftPage';
import VtlCraftDetailsPage from './pages/VtlCraftDetailsPage';
import StudentProjectDetailsPage from './pages/StudentProjectDetailsPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import Layout from './components/Layout';
import { AuthContext, AuthProvider } from './contexts/AuthContext';

const AdminLayout = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Outlet />
    </div>
  );
};

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = React.useContext(AuthContext);
    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};


const App: React.FC = () => {
  return (
    <AuthProvider>
        <HashRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="training-center" element={<TrainingCenterPage />} />
                    <Route path="training-center/:programId" element={<TrainingProgramDetailsPage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="projects/:projectId" element={<ProjectDetailsPage />} />
                    <Route path="manufacturing" element={<ManufacturingPage />} />
                    <Route path="about-us" element={<AboutUsPage />} />
                    <Route path="vtl-craft" element={<VTLCraftPage />} />
                    <Route path="vtl-craft/:projectId" element={<VtlCraftDetailsPage />} />
                    <Route path="student-projects/:projectId" element={<StudentProjectDetailsPage />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="login" element={<AdminLoginPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="dashboard" element={<AdminDashboardPage />} />
                    </Route>
                     <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </HashRouter>
    </AuthProvider>
  );
};

export default App;