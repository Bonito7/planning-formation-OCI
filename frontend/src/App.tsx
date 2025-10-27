import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ApprenantPage from './pages/ApprenantPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import './index.css';

const queryClient = new QueryClient();

// Composant pour la redirection basée sur l'authentification
const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Route publique - Planning accessible à tous */}
      <Route path="/" element={<ApprenantPage />} />
      
      {/* Route admin - protégée par authentification */}
      <Route 
        path="/admin" 
        element={
          isAuthenticated ? (
            <AdminPage />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      
      {/* Route login - seulement pour les non-authentifiés */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <LoginPage />
          )
        } 
      />
      
      {/* Redirection par défaut vers le planning */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;