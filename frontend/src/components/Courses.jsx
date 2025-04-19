// src/components/Courses.jsx
import React from 'react';

function Courses() {
  const courses = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Learn HTML, CSS, JavaScript, React, and Node.js to build modern web applications.',
      duration: '12 weeks',
      level: 'Beginner to Intermediate',
      highlights: ['Hands-on projects', 'Industry mentors', 'Certificate on completion'],
    },
    {
      id: 2,
      title: 'Data Science',
      description: 'Master Python, statistics, machine learning, and data visualization techniques.',
      duration: '16 weeks',
      level: 'Intermediate',
      highlights: ['Real-world datasets', 'Expert-led sessions', 'Career support'],
    },
    {
      id: 3,
      title: 'Graphic Design',
      description: 'Explore Adobe Photoshop, Illustrator, and design principles for stunning visuals.',
      duration: '10 weeks',
      level: 'Beginner',
      highlights: ['Portfolio development', 'Creative workshops', 'Industry tools'],
    },
    {
      id: 4,
      title: 'Digital Marketing',
      description: 'Understand SEO, SEM, social media strategies, and analytics for effective campaigns.',
      duration: '8 weeks',
      level: 'Beginner to Intermediate',
      highlights: ['Live campaigns', 'Google certification prep', 'Practical insights'],
    },
  ];

  return (
    <section className="py-20 px-4 bg-bgSoft">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Explore Our Courses</h2>
          <p className="text-lg text-textDark max-w-2xl mx-auto">
            Unlock your potential with our expertly designed programs tailored to industry needs.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-primary mb-2">{course.title}</h3>
              <p className="text-sm text-textDark mb-4 line-clamp-2">{course.description}</p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-textDark">
                  <span className="font-medium">Duration:</span> {course.duration}
                </p>
                <p className="text-sm text-textDark">
                  <span className="font-medium">Level:</span> {course.level}
                </p>
              </div>
              <ul className="text-sm text-textDark mb-4 space-y-1">
                {course.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-all duration-200 font-medium shadow-sm">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;