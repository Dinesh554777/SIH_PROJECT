import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import DashboardPage from './pages/DashboardPage';
import CareerGuidancePage from './pages/CareerGuidancePage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import ResourcesPage from './pages/ResourcesPage';
import CommunityPage from './pages/CommunityPage';
import EventsPage from './pages/EventsPage';
import FeedbackPage from './pages/FeedbackPage';

const PlaceholderPage: React.FC = () => {
  const { pathname } = useLocation();
  const pageTitle = pathname.substring(1).replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return (
    <div className="text-center py-20 min-h-[50vh] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold font-heading text-text-primary">{pageTitle}</h1>
      <p className="text-lg mt-4 text-text-secondary">This page is under construction. Coming soon!</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/career" element={<CareerGuidancePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Extended Routes from Plan */}
          <Route path="/admin" element={<PlaceholderPage />} />
          <Route path="/ai-lab" element={<PlaceholderPage />} />
          <Route path="/offline" element={<PlaceholderPage />} />
          <Route path="/help" element={<PlaceholderPage />} />
          <Route path="/privacy" element={<PlaceholderPage />} />
          <Route path="/terms" element={<PlaceholderPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;