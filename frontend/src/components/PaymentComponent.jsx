import React, { useState } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    amount: 0,
  });

  const courses = [
    { name: 'Web Development', fees: 15000 },
    { name: 'Data Science', fees: 20000 },
    { name: 'Machine Learning', fees: 25000 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'course') {
      const selectedCourse = courses.find((course) => course.name === value);
      setFormData({
        ...formData,
        course: value,
        amount: selectedCourse ? selectedCourse.fees : 0,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/payments/create-order', {
        amount: formData.amount,
        currency: 'INR',
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Your Academy Name',
        description: `Payment for ${formData.course}`,
        order_id: data.id,
        handler: async (response) => {
          try {
            const verification = await axios.post('/api/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userDetails: {
                name: formData.name,
                email: formData.email,
                course: formData.course,
              },
            });
            alert('Payment Successful!');
          } catch (error) {
            console.error(error);
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: '#002147', // Changed to primary color for consistency
        },
      };

      if (!window.Razorpay) {
        alert('Razorpay SDK failed to load. Please check your internet connection or try again later.');
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Course Payment</h3>

      {/* Notice Section */}
      <div className="mb-6 p-4 bg-bgSoft border border-gray-200 rounded-md">
        <p className="text-sm text-textDark">
          <span className="font-semibold text-primary">Important Notice:</span> Please proceed with the payment only after receiving the document verification success confirmation email from our admissions team. This ensures your enrollment process is complete and verified before making any financial commitments.
        </p>
      </div>

      {/* Payment Form */}
      <form onSubmit={handlePayment} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-textDark mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent text-base"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-textDark mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent text-base"
            required
          />
        </div>

        <div>
          <label htmlFor="course" className="block text-sm font-medium text-textDark mb-1">
            Course <span className="text-red-500">*</span>
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent text-base"
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.name} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-textDark mb-1">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            value={`₹${formData.amount.toLocaleString('en-IN')}`}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-base cursor-not-allowed"
            readOnly
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-all duration-200 font-semibold text-base shadow-md"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentComponent;