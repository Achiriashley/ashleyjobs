

import { fetchProfileAction } from "@/actions";
import DashboardCard from "@/components/dashboard-card";
import SmoothScrollLinks from "@/components/smoothScrollLinks";
import { currentUser } from "@clerk/nextjs/server";
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
      <div className="min-h-screen bg-background">
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
    <div className="flex min-h-screen flex-col bg-background text-foreground">

      <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="flex flex-col items-center md:flex-row">
            <div className="mb-10 md:mb-0 md:w-1/2">
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                Your Next Career Opportunity <span className="text-yellow-300">Awaits</span>
              </h1>
              <p className="mb-8 text-xl opacity-90">
                Connecting top talent with leading companies through our streamlined hiring platform.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <a href="#role-selection" className="rounded-lg bg-white px-8 py-3 text-center font-semibold text-blue-600 transition hover:bg-blue-50">
                  Get Started
                </a>
                <a href="#how-it-works" className="rounded-lg border border-white px-8 py-3 text-center font-semibold text-white transition hover:bg-white/10">
                  Learn More
                </a>
              </div>
            </div>
            <div className="flex justify-center md:w-1/2">
              <img
                src="/career-progress.svg"
                alt="Career illustration"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Role selection */}
      <section className="py-16" id="role-selection">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Join As</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Select your role to get started with ASHJOBS
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {/* Job Seeker Card */}
            <div className="cursor-pointer rounded-xl border-2 border-transparent bg-card p-8 shadow-md transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                <FaUserGraduate className="text-3xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-4 text-center text-2xl font-bold">Job Seeker</h3>
              <p className="mb-6 text-center text-muted-foreground">
                Find your dream job and apply with your CV in just a few clicks.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <FaCheckCircle className="mr-2 text-blue-500" />
                  <span>Browse thousands of job listings</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="mr-2 text-blue-500" />
                  <span>One-click application with your CV</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="mr-2 text-blue-500" />
                  <span>Get matched with ideal positions</span>
                </li>
              </ul>
              <Link href="/onboard/candidate" className="block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700">
                Sign Up as Job Seeker
              </Link>
            </div>

            {/* Recruiter Card */}
            <div className="cursor-pointer rounded-xl border-2 border-transparent bg-card p-8 shadow-md transition hover:-translate-y-1 hover:border-purple-500 hover:shadow-lg">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
                <FaBriefcase className="text-3xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-4 text-center text-2xl font-bold">Recruiter</h3>
              <p className="mb-6 text-center text-muted-foreground">
                Post jobs and find qualified candidates quickly and easily.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <FaCheckCircle className="mr-2 text-purple-500" />
                  <span>Create and manage job postings</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="mr-2 text-purple-500" />
                  <span>Receive applications directly</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="mr-2 text-purple-500" />
                  <span>Access candidate CVs instantly</span>
                </li>
              </ul>
              <Link href="/onboard/recruiter" className="block w-full rounded-lg bg-purple-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-purple-700">
                Sign Up as Recruiter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Application flow */}
      <section className="bg-muted/50 py-16" id="how-it-works">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Simple Application Process</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From job posting to hiring — our platform makes recruitment effortless
            </p>
          </div>

          <div className="application-flow relative mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="flow-step rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col md:items-end md:text-right">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Recruiter Posts Job</h3>
                <p className="text-muted-foreground">
                  Recruiters create detailed job listings with requirements, benefits, and application details.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flow-step rounded-xl border border-border bg-card p-6 shadow-sm md:mt-20">
              <div className="flex flex-col md:items-center md:text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Job Seeker Applies</h3>
                <p className="text-muted-foreground">
                  Candidates browse jobs and apply with one click, sending their CV directly to the recruiter.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flow-step rounded-xl border border-border bg-card p-6 shadow-sm md:mt-40">
              <div className="flex flex-col md:items-start">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Recruiter Reviews</h3>
                <p className="text-muted-foreground">
                  Recruiters receive applications with CVs and can contact qualified candidates directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">For Job Seekers</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Everything you need to find and land your perfect job
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                <FaSearch className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Advanced Job Search</h3>
              <p className="text-muted-foreground">
                Filter jobs by location, salary, experience level, and more to find exactly what you're looking for.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                <FaFileUpload className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold">One-Click Applications</h3>
              <p className="text-muted-foreground">
                Upload your CV once and apply to multiple jobs with just a single click.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                <FaBell className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Job Alerts</h3>
              <p className="text-muted-foreground">
                Get notified when new jobs matching your criteria are posted.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">For Recruiters</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Powerful tools to streamline your hiring process
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
                <FaEdit className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Easy Job Posting</h3>
              <p className="text-muted-foreground">
                Create and manage job listings with our intuitive dashboard.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
                <FaUsers className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Candidate Management</h3>
              <p className="text-muted-foreground">
                Organize and track applicants through every stage of your hiring process.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
                <FaChartBar className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Track performance metrics for your job postings and hiring funnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Transform Your Career or Hiring Process?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            Join thousands of professionals and companies who have already found success with ASHJOBS.
          </p>
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <a
              href="#role-selection"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="text-3xl font-extrabold">
              <span className="text-orange-400">ASH</span>JOBS
            </div>
            <nav>
              <ul className="flex flex-wrap gap-6 text-sm">
                <li>
                  <a href="/about" className="transition-colors hover:text-orange-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="transition-colors hover:text-orange-300">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="transition-colors hover:text-orange-300">
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
