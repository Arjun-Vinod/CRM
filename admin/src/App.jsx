import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './pages/AdminDashboard';
import AdminAdmissions from './pages/AdminAdmissions';
import AdminLeads from './pages/AdminLeads';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 ml-64 mt-16 p-6 bg-bgSoft overflow-auto">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/admissions" element={<AdminAdmissions />} />
              <Route path="/leads" element={<AdminLeads />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;