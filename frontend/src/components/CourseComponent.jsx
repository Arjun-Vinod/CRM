// src/components/CourseComponent.jsx
import React from 'react';

function CourseComponent() {
  const courses = [
    {
      id: 1,
      name: 'Web Development',
      duration: '6 months',
      fees: 15000,
      description: 'Learn full-stack web development with modern technologies like HTML, CSS, JavaScript, React, and Node.js.',
      level: 'Beginner to Intermediate',
      highlights: ['Project-based learning', 'Industry-standard tools', 'Certificate included'],
    },
    {
      id: 2,
      name: 'Data Science',
      duration: '8 months',
      fees: 20000,
      description: 'Master data analysis, machine learning, and statistical modeling with Python and R.',
      level: 'Intermediate',
      highlights: ['Real-world datasets', 'Expert instructors', 'Career guidance'],
    },
    {
      id: 3,
      name: 'Mobile Development',
      duration: '5 months',
      fees: 12000,
      description: 'Build iOS and Android apps using Swift, Kotlin, and cross-platform frameworks.',
      level: 'Beginner',
      highlights: ['App development projects', 'Mobile UI/UX basics', 'Certification'],
    },
    {
      id: 4,
      name: 'Cloud Computing',
      duration: '7 months',
      fees: 18000,
      description: 'Master cloud infrastructure and services with AWS, Azure, and Google Cloud.',
      level: 'Intermediate',
      highlights: ['Cloud certification prep', 'Hands-on labs', 'Scalable solutions'],
    },
    {
      id: 5,
      name: 'Cybersecurity',
      duration: '6 months',
      fees: 17000,
      description: 'Learn to protect systems and networks from cyber threats with ethical hacking and security practices.',
      level: 'Intermediate',
      highlights: ['Security simulations', 'Latest tools', 'Certification prep'],
    },
    {
      id: 6,
      name: 'Artificial Intelligence',
      duration: '9 months',
      fees: 22000,
      description: 'Dive into AI concepts, neural networks, and deep learning with TensorFlow and PyTorch.',
      level: 'Advanced',
      highlights: ['AI project portfolio', 'Research opportunities', 'Expert mentorship'],
    },
    {
      id: 7,
      name: 'UI/UX Design',
      duration: '4 months',
      fees: 10000,
      description: 'Create user-friendly interfaces and experiences with Figma, Adobe XD, and design principles.',
      level: 'Beginner',
      highlights: ['Design portfolio', 'User testing', 'Industry insights'],
    },
    {
      id: 8,
      name: 'DevOps Engineering',
      duration: '6 months',
      fees: 16000,
      description: 'Learn continuous integration, deployment, and infrastructure automation with Docker and Kubernetes.',
      level: 'Intermediate',
      highlights: ['CI/CD pipelines', 'Cloud integration', 'Certification'],
    },
    {
      id: 9,
      name: 'Blockchain Development',
      duration: '7 months',
      fees: 19000,
      description: 'Build decentralized applications and smart contracts with Ethereum and Solidity.',
      level: 'Intermediate to Advanced',
      highlights: ['Blockchain projects', 'Crypto basics', 'Career support'],
    },
  ];

  return (
    <div className="py-20 px-4 bg-bgSoft min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">Course Details</h1>
          <p className="text-lg text-textDark max-w-3xl mx-auto">
            Discover our comprehensive training programs designed to equip you with in-demand skills for today’s industries.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-primary mb-3">{course.name}</h2>
              <p className="text-sm text-textDark mb-4 line-clamp-2">{course.description}</p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-textDark">
                  <span className="font-medium">Duration:</span> {course.duration}
                </p>
                <p className="text-sm text-textDark">
                  <span className="font-medium">Level:</span> {course.level}
                </p>
                <p className="text-sm text-textDark">
                  <span className="font-medium">Fees:</span> ₹{course.fees.toLocaleString('en-IN')}
                </p>
              </div>
              <ul className="text-sm text-textDark mb-6 space-y-1">
                {course.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-all duration-200 font-medium shadow-sm">
                Enroll Now
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center bg-white py-8 px-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-primary mb-4">Why Choose Us?</h3>
          <p className="text-base text-textDark mb-6">
            Our courses are crafted by industry experts, offering practical training, flexible schedules, and recognized certifications to advance your career.
          </p>
          <button className="bg-secondary text-white px-8 py-3 rounded-md hover:bg-primary transition-all duration-200 font-semibold shadow-md">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseComponent;