import {
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
  fetchPublicFeaturedJobsAction,
  fetchPublicJobCategoriesAction,
} from "@/actions";
import DashboardCard from "@/components/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRelativeDate } from "@/utils";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Search,
  UploadCloud,
  UserSearch,
} from "lucide-react";

async function Home() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  if (profileInfo?._id) {
    const displayName =
      profileInfo?.role === "candidate"
        ? profileInfo?.candidateInfo?.name
        : profileInfo?.recruiterInfo?.name;

    const [jobList, applications] =
      profileInfo?.role === "candidate"
        ? await Promise.all([
            fetchJobsForCandidateAction(),
            fetchJobApplicationsForCandidate(profileInfo?.userId),
          ])
        : await Promise.all([
            fetchJobsForRecruiterAction(profileInfo?.userId),
            fetchJobApplicationsForRecruiter(profileInfo?.userId),
          ]);

    const stats =
      profileInfo?.role === "candidate"
        ? [
            { label: "Applications sent", value: applications?.length || 0 },
            {
              label: "In review",
              value:
                applications?.filter(
                  (item) =>
                    !item.status?.includes("selected") &&
                    !item.status?.includes("rejected")
                ).length || 0,
            },
            {
              label: "Selected",
              value:
                applications?.filter((item) => item.status?.includes("selected"))
                  .length || 0,
            },
          ]
        : [
            { label: "Active jobs", value: jobList?.length || 0 },
            { label: "Total applicants", value: applications?.length || 0 },
            {
              label: "Selected",
              value:
                applications?.filter((item) => item.status?.includes("selected"))
                  .length || 0,
            },
          ];

    return (
      <div className="bg-background">
        <section className="hero-mesh border-b border-border py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {profileInfo?.role === "candidate" ? "Candidate dashboard" : "Recruiter dashboard"}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
              Welcome back{displayName ? `, ${displayName}` : ""}
            </h1>
            <p className="mt-2 max-w-xl text-lg text-muted-foreground">
              {profileInfo?.role === "candidate"
                ? "Ready to find your next opportunity?"
                : "Ready to find your next great hire?"}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 sm:max-w-lg">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  description="Track the status of jobs you've applied to and revisit saved jobs."
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
        </section>
      </div>
    );
  }

  const [featuredJobs, jobCategories] = await Promise.all([
    fetchPublicFeaturedJobsAction(6),
    fetchPublicJobCategoriesAction(),
  ]);

  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Hero */}
      <section className="hero-mesh border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2">
          <div>
            <Badge variant="primary" className="mb-6">
              Built for hiring, done right
            </Badge>
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Find your next role, <span className="text-primary">or your next hire.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              ASHJOBS connects candidates and recruiters directly — browse real
              openings, apply in one click, and manage applicants without the
              noise.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/onboard/candidate">
                  Find a job <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                <Link href="/onboard/recruiter">Hire talent</Link>
              </Button>
            </div>
          </div>

          {/* Original illustrative mock — not a real screenshot or testimonial */}
          <div className="relative hidden h-80 lg:block">
            <div className="absolute right-8 top-4 w-72 rotate-3 rounded-2xl border border-border bg-card p-5 shadow-xl">
              <div className="mb-3 h-10 w-10 rounded-full bg-primary/10" />
              <div className="h-3 w-3/4 rounded bg-foreground/10" />
              <div className="mt-2 h-3 w-1/2 rounded bg-foreground/10" />
              <div className="mt-4 flex gap-2">
                <div className="h-6 w-16 rounded-full bg-primary/10" />
                <div className="h-6 w-16 rounded-full bg-warm/15" />
              </div>
            </div>
            <div className="absolute left-4 top-24 w-72 -rotate-2 rounded-2xl border border-border bg-card p-5 shadow-xl">
              <div className="mb-3 h-10 w-10 rounded-full bg-warm/15" />
              <div className="h-3 w-2/3 rounded bg-foreground/10" />
              <div className="mt-2 h-3 w-1/3 rounded bg-foreground/10" />
              <div className="mt-4 flex gap-2">
                <div className="h-6 w-20 rounded-full bg-primary/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real job categories, from live data */}
      {jobCategories && jobCategories.length > 0 ? (
        <section className="border-b border-border bg-muted/30 py-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 sm:px-6">
            <span className="text-sm font-semibold text-muted-foreground">
              Browse by type:
            </span>
            {jobCategories.map((category) => (
              <Link key={category} href="/onboard/candidate">
                <Badge variant="outline" className="cursor-pointer hover:border-primary hover:text-primary">
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Real featured jobs teaser */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Open roles</h2>
              <p className="mt-2 text-muted-foreground">
                A sample of what recruiters are hiring for right now.
              </p>
            </div>
          </div>

          {featuredJobs && featuredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job) => (
                <div
                  key={job._id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.companyName}</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {job.location ? <Badge>{job.location}</Badge> : null}
                    {job.type ? <Badge variant="primary">{job.type} Time</Badge> : null}
                  </div>
                  {formatRelativeDate(job.createdAt) ? (
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeDate(job.createdAt)}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
              No jobs have been posted yet — be the first recruiter to post one.
            </p>
          )}

          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/onboard/candidate">
                Sign up to see all open roles <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">How it works</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              From job posting to hiring — ASHJOBS keeps it simple for both sides.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Recruiter posts a job",
                description:
                  "Recruiters create a listing with the role, location, type, and requirements.",
              },
              {
                step: "2",
                title: "Candidate applies",
                description:
                  "Candidates browse open roles and apply in one click with their profile and resume.",
              },
              {
                step: "3",
                title: "Recruiter reviews & decides",
                description:
                  "Recruiters review applicants directly in their dashboard and update application status.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For candidates */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">For candidates</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Filter jobs that fit",
                description: "Narrow down by company, title, type, and location to find roles worth applying to.",
              },
              {
                icon: UploadCloud,
                title: "One-click applications",
                description: "Upload your resume once and apply to multiple jobs instantly.",
              },
              {
                icon: ClipboardList,
                title: "Track every application",
                description: "See the live status of every job you've applied to in one place.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For recruiters */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm/15">
              <BriefcaseBusiness className="h-6 w-6 text-warm-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">For recruiters</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: UserSearch,
                title: "Post jobs in minutes",
                description: "Create and manage listings from a single, focused dashboard.",
              },
              {
                icon: CheckCircle2,
                title: "Review applicants directly",
                description: "See every applicant for each role and move them through select or reject.",
              },
              {
                icon: BarChart3,
                title: "Real hiring stats",
                description: "Active job count and applicant totals, pulled live from your own postings.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-warm/15">
                  <feature.icon className="h-6 w-6 text-warm-foreground" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-2xl text-lg opacity-90">
            Create your profile as a candidate or recruiter — it only takes a minute.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
              <Link href="/onboard/candidate">Find a job</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-primary-foreground/40 bg-transparent px-8 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/onboard/recruiter">Hire talent</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
