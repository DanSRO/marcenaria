import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import { ProjectsPage } from './pages/ProjectsPage'
import type { JSX } from 'react';
import { ProjectFormPage } from './pages/ProjectFormPage';
import { HomePage } from './pages/HomePage';
import { PostsPage } from './pages/PostsPage';
import { ServicesPage } from './pages/ServicesPage';
import { PostFormPage } from './pages/PostFormPage';
import { ServiceFormPage } from './pages/ServiceFormPage';
import { Default } from './pages/Default';
import { Layout } from './layouts/Layout';

function PrivateRoute({children}: {children:JSX.Element}){
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace/>
}

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            {/* <Route index element={<main><h2>Bem-vindo!</h2></main>}/> */}
            <Route path='/*' element={<Default/>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<PrivateRoute><ProjectsPage/></PrivateRoute>}/>
            <Route path="/projects/new" element={<PrivateRoute><ProjectFormPage/></PrivateRoute>}/>
            <Route path="/projects/:id/edit" element={<PrivateRoute><ProjectFormPage/></PrivateRoute>}/>
            <Route path="/posts" element={<PrivateRoute><PostsPage/></PrivateRoute>}/>
            <Route path="/posts/new" element={<PrivateRoute><PostFormPage/></PrivateRoute>}/>
            <Route path="/posts/:id/edit" element={<PrivateRoute><PostFormPage/></PrivateRoute>}/>
            <Route path="/services" element={<PrivateRoute><ServicesPage/></PrivateRoute>}/>
            <Route path="/services/new" element={<PrivateRoute><ServiceFormPage/></PrivateRoute>}/>
            <Route path="/services/:id/edit" element={<PrivateRoute><ServiceFormPage/></PrivateRoute>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
