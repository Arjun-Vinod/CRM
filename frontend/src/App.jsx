// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthModal from './components/AuthModel';
import ContactModal from './components/ContactModel';
import Sidebar from './components/Sidebar';
import Courses from './components/Courses';
import UploadDocuments from './components/UploadDocuments';
import PaymentComponent from './components/PaymentComponent';
import CourseComponent from './components/CourseComponent';
// import Footer from './components/Footer';
import axios from 'axios';

function App() {
  const [authModal, setAuthModal] = useState({ open: false, type: 'login' });
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const isAnyModalOpen = authModal.open || contactModalOpen;

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-bgSoft">
        {/* Navbar */}
        <Navbar
          setAuthModal={setAuthModal}
          user={user}
          setUser={setUser}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Layout with Dimming */}
        <div
          className={`flex flex-1 ${isAnyModalOpen ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
        >
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <main className="flex-1 pt-16">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero setContactModalOpen={setContactModalOpen} />
                    <Courses />
                  </>
                }
              />
              <Route path="/admission" element={<UploadDocuments />} />
              <Route path="/payment" element={<PaymentComponent />} />
              <Route path="/course-details" element={<CourseComponent />} />
            </Routes>
          </main>
        </div>

        {/* Footer */}
        {/* <Footer /> */}

        {/* Modals */}
        {isAnyModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}
        <div className="fixed inset-0 z-50 pointer-events-none">
          <AuthModal authModal={authModal} setAuthModal={setAuthModal} setUser={setUser} />
          <ContactModal open={contactModalOpen} setOpen={setContactModalOpen} />
        </div>
      </div>
    </Router>
  );
}

export default App;