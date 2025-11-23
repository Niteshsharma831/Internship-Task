import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-blue-600 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-2">© 2025 IELTS Institute. All rights reserved.</p>
        <p>Email: info@ieltsinstitute.com | Phone: +91 98765 43210</p>
        <div className="mt-2">
          <a href="#home" className="mx-2 hover:underline">
            Home
          </a>
          <a href="#features" className="mx-2 hover:underline">
            Features
          </a>
          <a href="#testimonials" className="mx-2 hover:underline">
            Testimonials
          </a>
          <a href="#contact" className="mx-2 hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
