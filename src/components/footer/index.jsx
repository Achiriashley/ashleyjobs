import Link from "next/link";

const footerLinks = [
  {
    heading: "Platform",
    links: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Companies", href: "/companies" },
      { label: "Membership", href: "/membership" },
    ],
  },
  {
    heading: "For Recruiters",
    links: [
      { label: "Post a Job", href: "/jobs" },
      { label: "Sign Up as Recruiter", href: "/onboard/recruiter" },
    ],
  },
  {
    heading: "For Candidates",
    links: [
      { label: "Sign Up as Candidate", href: "/onboard/candidate" },
      { label: "Your Activity", href: "/activity" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="text-xl font-extrabold tracking-tight text-foreground">
              <span className="text-primary">ASH</span>JOBS
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              A focused hiring platform connecting candidates and recruiters.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold text-foreground">{group.heading}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ASHJOBS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
