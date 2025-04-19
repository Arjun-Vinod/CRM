import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments/all');
        setPayments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="ml-64 p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Payment Records</h1>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-textDark">Name</th>
              <th className="p-3 text-left text-sm font-semibold text-textDark">Email</th>
              <th className="p-3 text-left text-sm font-semibold text-textDark">Course</th>
              <th className="p-3 text-left text-sm font-semibold text-textDark">Amount</th>
              <th className="p-3 text-left text-sm font-semibold text-textDark">Date</th>
              <th className="p-3 text-left text-sm font-semibold text-textDark">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{payment.name}</td>
                <td className="p-3">{payment.email}</td>
                <td className="p-3">{payment.course}</td>
                <td className="p-3">₹{payment.amount.toLocaleString('en-IN')}</td>
                <td className="p-3">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;