import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import { ProjectsPage } from './pages/ProjectsPage'
import type { JSX } from 'react';
import { ProjectFormPage } from './pages/ProjectFormPage';
import { HomePage } from './pages/HomePage';

function PrivateRoute({children}: {children:JSX.Element}){
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace/>
}

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage><main><h2>Bem-vindo!</h2></main></HomePage>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/projects" element={<PrivateRoute><ProjectsPage/></PrivateRoute>}/>
          <Route path="/projects/new" element={<PrivateRoute><ProjectFormPage/></PrivateRoute>}/>
          <Route path="/projects/:id/edit" element={<PrivateRoute><ProjectFormPage/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
