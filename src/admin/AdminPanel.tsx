import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import DashboardSection from './DashboardSection';
import SpecializationsSection from './SpecializationsSection';
import DoctorsSection from './DoctorsSection';
import ScheduleSection from './ScheduleSection';
import BlogSection from './BlogSection';
import ContactSection from './ContactSection';

interface AdminPanelProps {
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardSection onNavigate={setCurrentSection} />;
      case 'specializations':
        return <SpecializationsSection />;
      case 'doctors':
        return <DoctorsSection />;
      case 'schedule':
        return <ScheduleSection />;
      case 'blog':
        return <BlogSection />;
      case 'contacts':
        return <ContactSection />;
      default:
        return <DashboardSection onNavigate={setCurrentSection} />;
    }
  };

  return (
    <AdminLayout
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      onExit={onExit}
    >
      {renderSection()}
    </AdminLayout>
  );
};

export default AdminPanel;
