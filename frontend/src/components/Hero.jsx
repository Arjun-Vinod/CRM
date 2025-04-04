import React from 'react';
import StudyImg from '../assets/study.jpg';

function Hero({ setContactModalOpen }) {
  return (
    <section className="relative text-center m-0 p-0">
      <img
        src={StudyImg}
        alt="Study Institution"
        className="w-full h-[500px] object-cover"
      />
      <button
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-3 rounded hover:bg-secondary text-base"
        onClick={() => setContactModalOpen(true)}
      >
        Contact Us
      </button>
    </section>
  );
}

export default Hero;