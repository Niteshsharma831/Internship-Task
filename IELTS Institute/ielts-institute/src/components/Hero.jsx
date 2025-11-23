import React from "react";

const Hero = () => {
  return (
    <section id="home" className="bg-gray-100 py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Left Text */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Crack IELTS with Confidence
          </h2>
          <p className="text-gray-700 mb-6">
            Get expert guidance, AI-based feedback, and unlimited practice to
            achieve your dream band score.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Join Now
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 p-6">
          <img
            src="https://images.unsplash.com/photo-1584697964195-3106fbcf2a1e"
            alt="IELTS preparation"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
