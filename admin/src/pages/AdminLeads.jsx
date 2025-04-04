import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaEnvelope, FaSms } from 'react-icons/fa'; // Icons for better UX

function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followUpStatus, setFollowUpStatus] = useState({}); // Track follow-up actions

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get('/api/leads');
        console.log('API Response:', res.data);
        setLeads(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err.response ? err.response.data : err.message);
        setError(`Failed to fetch leads: ${err.response?.status ? `${err.response.status} - ${err.response.statusText}` : err.message}`);
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Handle WhatsApp follow-up
  const handleWhatsAppFollowUp = (lead) => {
    const message = `Hello ${lead.name}, I'm following up regarding your interest in ${lead.course}. How can we assist you today?`;
    const whatsappUrl = `https://wa.me/${lead.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    updateFollowUpStatus(lead._id, 'WhatsApp');
  };

  // Handle Email follow-up
  const handleEmailFollowUp = (lead) => {
    const subject = `Follow-up on Your ${lead.course} Inquiry`;
    const body = `Dear ${lead.name},\n\nThank you for your interest in ${lead.course}. I'm reaching out to see how we can assist you further. Please let me know if you have any questions!\n\nBest regards,\n[Your Name]`;
    const mailtoUrl = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    updateFollowUpStatus(lead._id, 'Email');
  };

  // Handle SMS follow-up (assuming a backend API or third-party service would be used)
  const handleSMSFollowUp = async (lead) => {
    try {
      // This is a placeholder - you'd need a backend API or SMS service like Twilio
      const message = `Hi ${lead.name}, this is a follow-up on your ${lead.course} inquiry. Reply or call us for more info!`;
      console.log(`SMS to ${lead.phone}: ${message}`);
      // Example: await axios.post('/api/send-sms', { phone: lead.phone, message });
      alert('SMS functionality would be implemented via a backend service.');
      updateFollowUpStatus(lead._id, 'SMS');
    } catch (err) {
      console.error('SMS Error:', err);
      alert('Failed to send SMS. Please try again.');
    }
  };

  // Update follow-up status for UI feedback
  const updateFollowUpStatus = (leadId, method) => {
    setFollowUpStatus((prev) => ({
      ...prev,
      [leadId]: `Followed up via ${method}`,
    }));
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-base">Loading leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-base text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl text-primary mb-6 text-center font-bold">Leads Management</h1>
      {leads.length === 0 ? (
        <p className="text-base text-center">No leads found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-4 text-base font-semibold">Name</th>
                <th className="p-4 text-base font-semibold">Email</th>
                <th className="p-4 text-base font-semibold">Phone</th>
                <th className="p-4 text-base font-semibold">Course</th>
                <th className="p-4 text-base font-semibold">Source</th>
                <th className="p-4 text-base font-semibold">Message</th>
                <th className="p-4 text-base font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b hover:bg-bgSoft transition-colors duration-200">
                  <td className="p-4 text-base">{lead.name}</td>
                  <td className="p-4 text-base">{lead.email}</td>
                  <td className="p-4 text-base">{lead.phone}</td>
                  <td className="p-4 text-base">{lead.course}</td>
                  <td className="p-4 text-base">{lead.source}</td>
                  <td className="p-4 text-base">{lead.message}</td>
                  <td className="p-4 text-base flex space-x-2">
                    <button
                      onClick={() => handleWhatsAppFollowUp(lead)}
                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      title="Follow up via WhatsApp"
                    >
                      <FaWhatsapp />
                    </button>
                    <button
                      onClick={() => handleEmailFollowUp(lead)}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      title="Follow up via Email"
                    >
                      <FaEnvelope />
                    </button>
                    <button
                      onClick={() => handleSMSFollowUp(lead)}
                      className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                      title="Follow up via SMS"
                    >
                      <FaSms />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Display follow-up status below the table */}
          {Object.keys(followUpStatus).length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              <h3 className="font-semibold">Follow-Up Status:</h3>
              {leads.map((lead) => (
                followUpStatus[lead._id] && (
                  <p key={lead._id}>
                    {lead.name} - {followUpStatus[lead._id]}
                  </p>
                )
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminLeads;