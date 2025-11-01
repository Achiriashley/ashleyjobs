// import { fetchProfileAction } from "@/actions";
// import OnBoard from "@/components/on-board";
// import { currentUser } from '@clerk/nextjs/server';
// import { redirect } from "next/navigation";

// async function OnBoardPage() {
//   //get the auth user from clerk
//   const user = await currentUser();

//   //fetch the profile info -> either user is candidate / user is recruiter
//   const profileInfo = await fetchProfileAction(user?.id);

//   if (profileInfo?._id) {
//     if (profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser)
//       redirect("/membership");
//     else redirect("/");
//   } else return <OnBoard />;
// }



// export default OnBoardPage;



// import { fetchProfileAction } from "@/actions";
// import OnBoard from "@/components/on-board";
// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// export default async function OnBoardPage() {
//   // 1️⃣ Get the current user from Clerk
//   const user = await currentUser();

//   // If the user isn’t logged in, redirect to sign in page first
//   if (!user) {
//     redirect("/sign-in");
//   }

//   // 2️⃣ Fetch the user’s profile info
//   const profileInfo = await fetchProfileAction(user.id);

//   // 3️⃣ If the user already has a profile, redirect appropriately
//   if (profileInfo?._id) {
//     if (profileInfo.role === "recruiter" && !profileInfo.isPremiumUser) {
//       redirect("/membership");
//     } else {
//       redirect("/");
//     }
//   }

//   // 4️⃣ Otherwise, show the onboarding component
//   return <OnBoard />;
// }

"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OnBoard from "@/components/on-board";
import { fetchProfileAction } from "@/actions";

export default function OnBoardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState(null);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      const timeout = setTimeout(() => {
        router.push("/sign-in?redirect_url=/onboard");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded, isSignedIn, router]);

  // ✅ Fetch user profile once logged in
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetchProfileAction(user.id).then((profile) => setProfileInfo(profile));
    }
  }, [isLoaded, isSignedIn, user]);

  // ✅ Redirect based on profile info
  useEffect(() => {
    if (profileInfo?._id) {
      if (profileInfo.role === "recruiter" && !profileInfo.isPremiumUser) {
        router.push("/membership");
      } else {
        router.push("/");
      }
    }
  }, [profileInfo, router]);

  // 🌀 Show loader while redirecting or loading user state
  if (!isLoaded || !isSignedIn || (isSignedIn && profileInfo === null)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-blue-800">
        <button
          disabled
          className="flex items-center gap-3 px-6 py-3 text-lg font-semibold bg-gray-800 text-white rounded-lg cursor-wait opacity-90"
        >
          <svg
            className="animate-spin h-5 w-5 text-white"
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
          {/* Loading / Redirecting... */}
        </button>
      </div>
    );
  }

  // ✅ Show onboarding component if no profile exists
  return <OnBoard />;
}
