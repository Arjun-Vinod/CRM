import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope } from 'react-icons/fa';

function AdminAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageStatus, setMessageStatus] = useState({});

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admissions', {
          withCredentials: true,
        });
        setAdmissions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch admissions data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchAdmissions();
  }, []);

  // Simplified email sending function
  const sendVerificationEmail = async (admissionId, email) => {
    try {
      setMessageStatus((prev) => ({ ...prev, [admissionId]: 'Sending...' }));
      await axios.post(
        'http://localhost:5000/api/admissions/send-email',
        { to: email, subject: 'Verification Required', message: 'Please complete your verification.' },
        { withCredentials: true }
      );
      setMessageStatus((prev) => ({ ...prev, [admissionId]: 'Sent' }));
    } catch (err) {
      setMessageStatus((prev) => ({ ...prev, [admissionId]: 'Failed' }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <h1 className="text-xl text-red-600 mb-2">Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-6xl mx-auto">
      <h1 className="text-xl text-blue-600 mb-4 text-center font-semibold">Admissions</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Documents</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Created At</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((admission) => (
              <tr key={admission._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-800">{`${admission.userDetails.firstName} ${admission.userDetails.lastName}`}</td>
                <td className="p-3 text-gray-800">{admission.userDetails.email}</td>
                <td className="p-3 text-gray-800">{admission.userDetails.category}</td>
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    {admission.files.map((file, index) => (
                      <a
                        key={index}
                        href={`http://localhost:5000${file.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {file.name}
                      </a>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-gray-800">
                  {new Date(admission.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => sendVerificationEmail(admission._id, admission.userDetails.email)}
                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    title="Send Verification Email"
                  >
                    <FaEnvelope />
                  </button>
                  {messageStatus[admission._id] && (
                    <span
                      className={`text-xs ml-2 ${
                        messageStatus[admission._id] === 'Failed' ? 'text-red-500' : 'text-green-500'
                      }`}
                    >
                      {messageStatus[admission._id]}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {admissions.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No admissions found</p>
      )}
    </div>
  );
}

export default AdminAdmissions;