import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import Events from './components/Events';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Team from './components/Team';
import Gallery from './components/Gallery';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnnouncementBanner from './components/AnnouncementBanner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminManager from './pages/admin/AdminManager';
import AdminSettings from './pages/admin/AdminSettings';
import ProtectedRoute from './pages/admin/ProtectedRoute';

function PublicSite() {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <Events />
        <Projects />
        <Achievements />
        <Team />
        <Gallery />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return <BrowserRouter basename="/IEEEMBITS">
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<AdminManager />} />
          <Route path="projects" element={<AdminManager />} />
          <Route path="achievements" element={<AdminManager />} />
          <Route path="team" element={<AdminManager />} />
          <Route path="gallery" element={<AdminManager />} />
          <Route path="announcements" element={<AdminManager />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>;
}
