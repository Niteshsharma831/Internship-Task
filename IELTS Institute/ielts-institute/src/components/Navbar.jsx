import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">IELTS Institute</h1>

        {/* Menu Links */}
        <ul className="flex space-x-6">
          <li><a href="#home" className="hover:text-gray-200">Home</a></li>
          <li><a href="#features" className="hover:text-gray-200">Features</a></li>
          <li><a href="#testimonials" className="hover:text-gray-200">Testimonials</a></li>
          <li><a href="#contact" className="hover:text-gray-200">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
