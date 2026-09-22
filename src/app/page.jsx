

import { fetchProfileAction } from "@/actions";
import { AnimatedTestimonialsDemo } from "@/components/AnimatedTestimonialsDemo";
import HomepageButtonControls from "@/components/homepage-button-controls";
import DashboardCard from "@/components/dashboard-card";
import SmoothScrollLinks from "@/components/smoothScrollLinks";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaUserGraduate, FaBriefcase, FaCheckCircle, FaSearch, FaFileUpload, FaBell, FaChartBar, FaUsers, FaEdit } from "react-icons/fa";

async function Home() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  if (profileInfo?._id) {
    const displayName =
      profileInfo?.role === "candidate"
        ? profileInfo?.candidateInfo?.name
        : profileInfo?.recruiterInfo?.name;

    return (
      <div className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back{displayName ? `, ${displayName}` : ""}
            </h1>
            <p className="mt-2 text-lg opacity-90">
              {profileInfo?.role === "candidate"
                ? "Ready to find your next opportunity?"
                : "Ready to find your next great hire?"}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {profileInfo?.role === "candidate" ? (
                <>
                  <DashboardCard
                    title="Browse Jobs"
                    description="Explore open roles that match your skills and apply in one click."
                    href="/jobs"
                    cta="Browse Jobs"
                  />
                  <DashboardCard
                    title="Your Activity"
                    description="Track the status of jobs you've applied to."
                    href="/activity"
                    cta="View Activity"
                  />
                </>
              ) : (
                <>
                  <DashboardCard
                    title="Post a New Job"
                    description="Create a new listing and start receiving applications."
                    href="/jobs"
                    cta="Post a Job"
                  />
                  <DashboardCard
                    title="Your Job Postings"
                    description="Review your posted jobs and see who has applied."
                    href="/jobs"
                    cta="View Applicants"
                  />
                </>
              )}
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-3xl font-extrabold">
                <span className="text-orange-400">ASH</span>JOBS
              </div>
              <nav>
                <ul className="flex flex-wrap gap-6 text-sm">
                  <li>
                    <a href="/about" className="hover:text-orange-300 transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-orange-300 transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="hover:text-orange-300 transition-colors">
                      Privacy
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mt-8 text-center text-sm">
              © {new Date().getFullYear()} ASHJOBS. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <>
    <SmoothScrollLinks />
    <div className="flex flex-col min-h-screen bg-white  text-black
    ">

  
          <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Your Next Career Opportunity <span className="text-yellow-300">Awaits</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Connecting top talent with leading companies through our streamlined hiring platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#role-selection" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold text-center hover:bg-gray-100 transition">
                  Get Started
                </a>
                <a href="#how-it-works" className="px-8 py-3 hover:text-blue-600 border border-white text-white rounded-lg font-semibold text-center hover:bg-white hover:bg-opacity-10 transition">
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/career-progress.svg"
                alt="Career illustration"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
         <section className="py-16" id="role-selection">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Join As</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your role to get started with CareerConnect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Job Seeker Card */}
          <div className="bg-white p-8 rounded-xl shadow-md role-card transition cursor-pointer border-2 border-transparent hover:border-blue-500">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUserGraduate className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">Job Seeker</h3>
            <p className="text-gray-600 mb-6 text-center">
              Find your dream job and apply with your CV in just a few clicks.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <FaCheckCircle className="text-blue-500 mr-2" />
                <span>Browse thousands of job listings</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-blue-500 mr-2" />
                <span>One-click application with your CV</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-blue-500 mr-2" />
                <span>Get matched with ideal positions</span>
              </li>
            </ul>
            <Link href="/onboard/candidate" className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition">
                Sign Up as Job Seeker
            </Link>
          </div>

          {/* Recruiter Card */}
          <div className="bg-white p-8 rounded-xl shadow-md role-card transition cursor-pointer border-2 border-transparent hover:border-purple-500">
            <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBriefcase className="text-purple-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">Recruiter</h3>
            <p className="text-gray-600 mb-6 text-center">
              Post jobs and find qualified candidates quickly and easily.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <FaCheckCircle className="text-purple-500 mr-2" />
                <span>Create and manage job postings</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-purple-500 mr-2" />
                <span>Receive applications directly</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-purple-500 mr-2" />
                <span>Access candidate CVs instantly</span>
              </li>
            </ul>
            <Link href="/onboard/recruiter" className="block w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold text-center hover:bg-purple-700 transition">
                Sign Up as Recruiter
            </Link>
          </div>
        </div>
      </div>
    </section>

{/* application flow */}
   <section className="py-16 bg-gray-50" id="how-it-works">
  <div className="container mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Simple Application Process</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        From job posting to hiring - our platform makes recruitment effortless
      </p>
    </div>

    <div className="application-flow relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Step 1 */}
      <div className="flow-step bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:items-end md:text-right">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span className="text-blue-600 font-bold text-xl">1</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Recruiter Posts Job</h3>
          <p className="text-gray-600">
            Recruiters create detailed job listings with requirements, benefits, and application details.
          </p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="flow-step bg-white p-6 rounded-xl shadow-sm md:mt-20">
        <div className="flex flex-col md:items-center md:text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span className="text-blue-600 font-bold text-xl">2</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Job Seeker Applies</h3>
          <p className="text-gray-600">
            Candidates browse jobs and apply with one click, sending their CV directly to the recruiter.
          </p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="flow-step bg-white p-6 rounded-xl shadow-sm md:mt-40">
        <div className="flex flex-col md:items-start">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span className="text-blue-600 font-bold text-xl">3</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Recruiter Reviews</h3>
          <p className="text-gray-600">
            Recruiters receive applications with CVs and can contact qualified candidates directly.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

   
 <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">For Job Seekers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to find and land your perfect job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FaSearch className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Advanced Job Search</h3>
            <p className="text-gray-600">
              Filter jobs by location, salary, experience level, and more to find exactly what you're looking for.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FaFileUpload className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">One-Click Applications</h3>
            <p className="text-gray-600">
              Upload your CV once and apply to multiple jobs with just a single click.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FaBell className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Job Alerts</h3>
            <p className="text-gray-600">
              Get notified when new jobs matching your criteria are posted.
            </p>
          </div>
        </div>
      </div>
    </section>
    
 <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">For Recruiters</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful tools to streamline your hiring process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Easy Job Posting */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FaEdit className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Easy Job Posting</h3>
            <p className="text-gray-600">
              Create and manage job listings with our intuitive dashboard.
            </p>
          </div>

          {/* Candidate Management */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FaUsers className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Candidate Management</h3>
            <p className="text-gray-600">
              Organize and track applicants through every stage of your hiring process.
            </p>
          </div>

          {/* Analytics Dashboard */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FaChartBar className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Track performance metrics for your job postings and hiring funnel.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA section */}

    <section className="bg-gradient-to-r from-indigo-600 to-blue-500 py-16 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Career or Hiring Process?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of professionals and companies who have already found success with CareerConnect.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#role-selection"
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          >
            Get Started Now
          </a>
          <a
            href="#"
            className="px-8 py-4 border border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:bg-opacity-10 hover:text-blue-600 transition"
          >
            Schedule a Demo
          </a>
        </div>
      </div>
    </section>




      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-3xl font-extrabold">
              <span className="text-orange-400">ASH</span>JOBS
            </div>
            <nav>
              <ul className="flex flex-wrap gap-6 text-sm">
                <li>
                  <a href="/about" className="hover:text-orange-300 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-orange-300 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-orange-300 transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm">
            © {new Date().getFullYear()} ASHJOBS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

export default Home;
