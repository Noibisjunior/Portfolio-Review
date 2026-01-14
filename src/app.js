import React, { useContext } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './app.css';
import BackToTop from './components/helper/back-to-top/back-to-top';
import ChangeTheme from './components/helper/change-theme/change-theme';
import ScrollToTop from './components/helper/scroll-to-top';
import { ThemeContext } from './contexts/theme-context';
import { BlogPage, HomePage, ProjectPage } from './pages';
import RecruiterAI from './components/RecruiterAI';
import { projectsData } from './data/projectsData';
import NeuralBackground from './components/NeuralBackground';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.secondary, position: 'relative', zIndex: 0 }} className="App">
      <NeuralBackground />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/blog' element={<BlogPage />} exact />
          <Route path='/projects' element={<ProjectPage />} exact />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </Router>
      <BackToTop />
      <ChangeTheme />
      <RecruiterAI projectsData={projectsData} />
    </div>
  );
}

export default App;