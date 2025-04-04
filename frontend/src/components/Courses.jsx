import React from 'react';

function Courses() {
  // Sample course data (you can replace this with real data from an API or props)
  const courses = [
    { id: 1, title: 'Web Development', description: 'Learn HTML, CSS, JavaScript, and more.', duration: '12 weeks' },
    { id: 2, title: 'Data Science', description: 'Master Python, statistics, and machine learning.', duration: '16 weeks' },
    { id: 3, title: 'Graphic Design', description: 'Explore Adobe tools and design principles.', duration: '10 weeks' },
    { id: 4, title: 'Digital Marketing', description: 'Understand SEO, SEM, and social media strategies.', duration: '8 weeks' },
  ];

  return (
    <section className="py-12 px-4">
      <h2 className="text-xl text-primary text-center mb-8">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-primary mb-2">{course.title}</h3>
            <p className="text-base text-textDark mb-4">{course.description}</p>
            <p className="text-base text-textDark font-medium">Duration: {course.duration}</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-secondary text-base w-full">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Courses;