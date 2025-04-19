// src/components/ContactModal.jsx
import React, { useState } from 'react';
import axios from 'axios';

function ContactModal({ open, setOpen }) {
  const [source, setSource] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const leadData = {
      name: e.target[0].value,
      email: e.target[1].value,
      phone: e.target[2].value,
      course: e.target[3].value,
      source: e.target[4].value,
      message: e.target[5].value,
    };
    try {
      const res = await axios.post('/api/leads', leadData);
      alert(res.data.message);
      setOpen(false);
      setSource('');
    } catch (err) {
      alert('Failed to submit lead');
      console.error(err);
    }
  };

  if (!open) return null;

  return (
    <div className="flex justify-center items-center h-full pointer-events-auto">
      <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
        <span
          className="absolute top-2 right-4 text-2xl cursor-pointer text-gray-600 hover:text-primary"
          onClick={() => setOpen(false)}
        >
          ×
        </span>
        <h2 className="text-xl font-bold mb-4 text-center text-primary">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
            type="tel"
            placeholder="Phone Number"
            className="p-2 border rounded text-base focus:ring-2 focus:ring-secondary focus:border-transparent"
            required
          />
          <input
            type="text"
            placeholder="Course Interested In"
            className="p-2 border rounded text-base focus:ring-2 focus:ring-secondary focus:border-transparent"
            required
          />
          <select
            className="p-2 border rounded text-base focus:ring-2 focus:ring-secondary focus:border-transparent"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          >
            <option value="" disabled>Select Source</option>
            <option value="Social Media">Social Media</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            placeholder="Message"
            className="p-2 border rounded text-base focus:ring-2 focus:ring-secondary focus:border-transparent"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded hover:bg-secondary text-base font-medium"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;