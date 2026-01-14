
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TrainingCenterPage from './pages/TrainingCenterPage';
import ProjectsPage from './pages/ProjectsPage';
import ManufacturingPage from './pages/ManufacturingPage';
import AboutUsPage from './pages/AboutUsPage';
import VTLCraftPage from './pages/VTLCraftPage';
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
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="manufacturing" element={<ManufacturingPage />} />
                    <Route path="about-us" element={<AboutUsPage />} />
                    <Route path="vtl-craft" element={<VTLCraftPage />} />
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
