// src/app/page.tsx
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import {
  FaCheckCircle,
  FaTasks,
  FaChartLine,
  FaUsers,
  FaBell,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Organize Your Work, <br />
                <span className="text-blue-600">Achieve More</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-lg">
                TaskFlow helps teams and individuals manage their work
                efficiently. Stay organized, prioritize tasks, and meet
                deadlines with our intuitive task management solution.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 text-center"
                >
                  Get Started
                </Link>
                <Link
                  href="/register"
                  className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg border border-blue-200 transition duration-300 text-center"
                >
                  Create Account
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -right-6 w-64 h-64 bg-blue-100 rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-blue-200 rounded-full opacity-30"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform rotate-3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Todays Tasks</h3>
                    <span className="text-sm text-blue-600 font-medium">
                      3/5 completed
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <FaCheckCircle className="text-green-500" />
                      </div>
                      <span className="text-gray-700 line-through">
                        Team meeting
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <FaCheckCircle className="text-green-500" />
                      </div>
                      <span className="text-gray-700 line-through">
                        Update project docs
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-gray-700">
                        Review design mockups
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-gray-700">
                        Prepare presentation
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center mr-3">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      </div>
                      <span className="text-gray-500">
                        Schedule client call
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Powerful Features for Productivity
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your tasks efficiently and
              collaborate with your team.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <FaTasks className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Task Management
              </h3>
              <p className="mt-4 text-gray-600">
                Create, organize, and prioritize tasks with due dates, labels,
                and custom statuses.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <FaChartLine className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Progress Tracking
              </h3>
              <p className="mt-4 text-gray-600">
                Visualize your progress with charts and reports to stay on track
                with your goals.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Team Collaboration
              </h3>
              <p className="mt-4 text-gray-600">
                Assign tasks, share files, and communicate with your team in
                real-time.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <FaBell className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Smart Reminders
              </h3>
              <p className="mt-4 text-gray-600">
                Never miss a deadline with customizable notifications and email
                reminders.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Secure & Private
              </h3>
              <p className="mt-4 text-gray-600">
                Your data is protected with enterprise-grade security and
                privacy controls.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Cross-Platform
              </h3>
              <p className="mt-4 text-gray-600">
                Access your tasks from any device - desktop, tablet, or mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to boost your productivity?
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of teams and individuals who are already using
            TaskFlow to manage their work efficiently.
          </p>
          <div className="mt-10">
            <Link
              href="/register"
              className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
            >
              Get Started For Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="ml-2 text-xl font-bold">TaskFlow</span>
              </div>
              <p className="mt-4 text-gray-400">
                The ultimate task management solution for teams and individuals.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
