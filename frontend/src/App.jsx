import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthModal from './components/AuthModel';
import ContactModal from './/components/ContactModel';
import Sidebar from './components/Sidebar';
import Courses from './components/Courses';
import UploadDocuments from './components/UploadDocuments';
import axios from 'axios';

function App() {
  const [authModal, setAuthModal] = useState({ open: false, type: 'login' });
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/auth/me', { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-16'
          }`}
        >
          <Navbar setAuthModal={setAuthModal} user={user} setUser={setUser} />
          <div className="pt-[56px]">
            <Routes>
              {/* Home Route */}
              <Route
                path="/"
                element={
                  <>
                    <Hero setContactModalOpen={setContactModalOpen} />
                    <Courses />
                  </>
                }
              />
              {/* Admission Route */}
              <Route path="/admission" element={<UploadDocuments />} />
            </Routes>
          </div>
          <AuthModal authModal={authModal} setAuthModal={setAuthModal} setUser={setUser} />
          <ContactModal open={contactModalOpen} setOpen={setContactModalOpen} />
        </div>
      </div>
    </Router>
  );
}

export default App;