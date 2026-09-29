"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OnBoard from "@/components/on-board";
import { fetchProfileAction } from "@/actions";

export default function OnBoardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState(undefined);

  // Redirect if not logged in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      const timeout = setTimeout(() => {
        router.push("/sign-in?redirect_url=/onboard");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded, isSignedIn, router]);

  // Fetch user profile once logged in
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetchProfileAction(user.id).then((profile) => setProfileInfo(profile));
    }
  }, [isLoaded, isSignedIn, user]);

  // Redirect based on profile info
  useEffect(() => {
    if (profileInfo?._id) {
      if (profileInfo.role === "recruiter" && !profileInfo.isPremiumUser) {
        router.push("/membership");
      } else {
        router.push("/");
      }
    }
  }, [profileInfo, router]);

  // Show loader while redirecting or loading user state
  if (!isLoaded || !isSignedIn || (isSignedIn && profileInfo === undefined)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
        <svg
          className="h-8 w-8 animate-spin text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p className="text-sm text-muted-foreground">Loading your account...</p>
      </div>
    );
  }

  return <OnBoard />;
}
