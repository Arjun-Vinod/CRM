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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <span
          className="absolute top-2 right-4 text-2xl cursor-pointer"
          onClick={() => setOpen(false)}
        >
          ×
        </span>
        <h2 className="text-xl mb-4 text-center text-primary">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Full Name"
            className="mb-4 p-2 border rounded text-base"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-2 border rounded text-base"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="mb-4 p-2 border rounded text-base"
            required
          />
          <input
            type="text"
            placeholder="Course Interested In"
            className="mb-4 p-2 border rounded text-base"
            required
          />
          <select
            className="mb-4 p-2 border rounded text-base"
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
            className="mb-4 p-2 border rounded text-base"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded hover:bg-secondary text-base"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;