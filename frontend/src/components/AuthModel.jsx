// src/components/AuthModal.jsx
import React from 'react';
import axios from 'axios';

function AuthModal({ authModal, setAuthModal, setUser }) {
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
      setUser(res.data.user);
      setAuthModal({ open: false, type: 'login' });
    } catch (err) {
      alert('Login failed');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      const res = await axios.post('/api/auth/signup', { name, email, password }, { withCredentials: true });
      setUser(res.data.user);
      setAuthModal({ open: false, type: 'signup' });
    } catch (err) {
      alert('Signup failed');
    }
  };

  if (!authModal.open) return null;

  return (
    <div className="flex justify-center items-center h-full pointer-events-auto">
      <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
        <span
          className="absolute top-2 right-4 text-2xl cursor-pointer text-gray-600 hover:text-primary"
          onClick={() => setAuthModal({ open: false, type: authModal.type })}
        >
          ×
        </span>
        {authModal.type === 'login' ? (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center text-primary">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="p-2 border rounded text-base focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 border rounded text-base focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded hover:bg-secondary text-base font-medium"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center text-primary">Signup</h2>
            <form onSubmit={handleSignup} className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="p-2 border rounded text-base focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 border rounded text-base focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 border rounded text-base focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded hover:bg-secondary text-base font-medium"
              >
                Signup
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;