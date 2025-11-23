import React from "react";

const features = [
  {
    title: "Speaking Practice",
    text: "Improve fluency with daily speaking sessions.",
  },
  {
    title: "Mock Tests",
    text: "Get real exam-like experience with timed tests.",
  },
  {
    title: "AI Band Score",
    text: "Instant feedback powered by AI evaluation.",
  },
  {
    title: "Expert Tutors",
    text: "Learn from certified IELTS professionals.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Our Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
