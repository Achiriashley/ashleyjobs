// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "../ui/button";
// import { useEffect } from "react";

// function HomepageButtonControls({ user, profileInfo }) {
//   const router = useRouter();

//   useEffect(() => {
//     router.refresh();
//   }, []);

//   return (
//     <div className="flex space-x-4">
//       <Button
//         onClick={() => router.push("/jobs")}
//         className="flex h-11 items-center justify-center px-5"
//       >
//         {user
//           ? profileInfo?.role === "candidate"
//             ? "Browse Jobs"
//             : "Jobs Dasboard"
//           : "Find Jobs"}
//       </Button>
//       <Button
//         onClick={() =>
//           router.push(
//             user
//               ? profileInfo?.role === "candidate"
//                 ? "/activity"
//                 : "/jobs"
//               : "/jobs"
//           )
//         }
//         className="flex h-11 items-center justify-center px-5"
//       >
//         {user
//           ? profileInfo?.role === "candidate"
//             ? "Your Activity"
//             : "Post New Job"
//           : "Post New Job"}
//       </Button>
//     </div>
//   );
// }

// export default HomepageButtonControls;

"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect } from "react";

function HomepageButtonControls({ user, profileInfo }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh(); // Optional if you're already using it

    // Prefetch common routes
    router.prefetch("/jobs");
    router.prefetch("/activity");
  }, []);

  return (
    <div className="flex space-x-4">
      <button
        type="button"
        onClick={() => router.push("/jobs")}
        className="flex h-11 items-center justify-center px-5 bg-black
         text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "Browse Jobs"
            : "Jobs Dasboard"
          : "Find Jobs"}
      </button>
      <button
        type="button"
        onClick={() =>
          router.push(
            user
              ? profileInfo?.role === "candidate"
                ? "/activity"
                : "/jobs"
              : "/jobs"
          )
        }
        // className="flex h-11 items-center justify-center px-5"
        className="flex h-11 items-center justify-center px-5 bg-black text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "Your Activity"
            : "Post New Job"
          : "Post New Job"}
      </button>
    </div>
  );
}

export default HomepageButtonControls;

