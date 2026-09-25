import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-primary/5 p-12 lg:flex">
        <div>
          <span className="text-2xl font-extrabold tracking-tight text-primary">
            ASHJOBS
          </span>
        </div>
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Find your next role, or your next hire.
          </h1>
          <p className="text-muted-foreground">
            Create an account to start applying for jobs as a candidate, or
            post openings and manage applicants as a recruiter.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ASHJOBS
        </p>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <SignUp />
      </div>
    </div>
  );
}
