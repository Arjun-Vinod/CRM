// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Institution Name</h3>
            <p className="text-sm">Providing quality education since 20XX.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-secondary">Home</a></li>
              <li><a href="/course-details" className="hover:text-secondary">Courses</a></li>
              <li><a href="/admission" className="hover:text-secondary">Admission</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: info@institution.com</p>
            <p className="text-sm">Phone: +91 123 456 7890</p>
            <p className="text-sm">Address: 123 Education Lane, City, Country</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Institution Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;