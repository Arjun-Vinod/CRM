// src/components/Hero.jsx
import React from 'react';

function Hero({ setContactModalOpen }) {
  return (
    <section className="bg-bgSoft text-primary py-20 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to Institution Name</h1>
        <p className="text-lg text-textDark mb-8">Empowering your future with world-class education and professional training.</p>
        <button
          className="bg-primary text-white px-8 py-3 rounded-md hover:bg-secondary transition-all duration-200 font-semibold text-base shadow-md"
          onClick={() => setContactModalOpen(true)}
        >
          Get in Touch
        </button>
      </div>
    </section>
  );
}

export default Hero;