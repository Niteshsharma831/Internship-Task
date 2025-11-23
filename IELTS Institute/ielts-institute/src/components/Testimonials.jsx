import React from "react";

const testimonials = [
  {
    name: "Rohit Sharma",
    review: "Thanks to IELTS Institute, I scored Band 8.0 in my first attempt!",
  },
  {
    name: "Priya Verma",
    review: "The mock tests and speaking practice boosted my confidence.",
  },
  {
    name: "Arjun Patel",
    review: "AI feedback helped me find and fix my mistakes quickly.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          What Our Students Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <p className="text-gray-700 mb-4">“{t.review}”</p>
              <h4 className="font-semibold text-blue-600">- {t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
