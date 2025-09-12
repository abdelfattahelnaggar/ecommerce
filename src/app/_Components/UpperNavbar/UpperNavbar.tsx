"use client";
import React from "react";

const UpperNavbar = () => {
  return (
    <div className="hidden lg:block bg-slate-200 py-1">
      <div className="w-full md:w-4/5 mx-auto">
        <div className="flex justify-center items-center">
          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition-colors duration-300 p-2 rounded-full hover:bg-blue-50"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f text-lg"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-300 p-2 rounded-full hover:bg-slate-100"
              aria-label="Twitter"
            >
              <i className="fab fa-x-twitter text-lg"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-pink-600 transition-colors duration-300 p-2 rounded-full hover:bg-pink-50"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-700 transition-colors duration-300 p-2 rounded-full hover:bg-blue-50"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-lg"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-red-600 transition-colors duration-300 p-2 rounded-full hover:bg-red-50"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube text-lg"></i>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-300 p-2 rounded-full hover:bg-slate-100"
              aria-label="TikTok"
            >
              <i className="fab fa-tiktok text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperNavbar;
