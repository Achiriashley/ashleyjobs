import React from 'react'

export default function index() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Logo or Brand */}
          <div className="text-2xl font-bold">
            <span className="text-indigo-500">Your</span>Platform
          </div>

          {/* Links */}
          <ul className="flex space-x-6 text-sm">
            <li>
              <a href="/about" className="hover:text-indigo-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-indigo-400 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-indigo-400 transition">
                Privacy
              </a>
            </li>
          </ul>
        </div>

        {/* Bottom line */}
        <div className="mt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} YourPlatform. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

