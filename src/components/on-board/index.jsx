// "use client";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { TabsContent } from "@radix-ui/react-tabs";
// import { useEffect, useState, useCallback } from "react";
// import {
//   candidateOnboardFormControls,
//   initialCandidateFormData,
//   initialRecruiterFormData,
//   recruiterOnboardFormControls,
// } from "@/utils";
// import { useUser } from "@clerk/nextjs";
// import { createProfileAction } from "@/actions";
// import { createClient } from "@supabase/supabase-js";
// import CommonForm from "../common-form";
// import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants";

// const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// function OnBoard() {
//   const [currentTab, setCurrentTab] = useState("candidate");
//   const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
//   const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);
//   const [file, setFile] = useState(null);

//   const { user } = useUser();

// async  function handleFileChange(event) {
//     event.preventDefault();
//     setFile(event.target.files[0]);
//   }
 
//   const handleUploadPdfToSupabase = useCallback(async () => {
//     const { data, error } = await getSupabaseClient().storage
//       .from("job-board-public")
//       .upload(`/public/${file.name}`, file, {
//         cacheControl: "3600",
//         upsert: false,
//       });
//     console.log(data, error);
//     if (data) {
//       setCandidateFormData((prevData) => ({
//         ...prevData,
//         resume: data.path,
//       }));
//     }
//   }, [file]);

//   useEffect(() => {
//     if (file) handleUploadPdfToSupabase();
//   }, [file, handleUploadPdfToSupabase]);

//   function handleTabChange(value) {
//     setCurrentTab(value);
//   }

//   function handleRecuiterFormValid() {
//     return (
//       recruiterFormData &&
//       recruiterFormData.name.trim() !== "" &&
//       recruiterFormData.companyName.trim() !== "" &&
//       recruiterFormData.companyRole.trim() !== ""
//     );
//   }

  

//   function handleCandidateFormValid() {
//     return Object.keys(candidateFormData).every((key) => {
//       const value = candidateFormData[key];
//       return typeof value === "string" ? value.trim() !== "" : value !== null && value !== undefined;
//     });
//   }
  

//   async function createProfile() {
//     const data =
//       currentTab === "candidate"
//         ? {
//             candidateInfo: candidateFormData,
//             role: "candidate",
//             isPremiumUser: true,
//             userId: user?.id,
//             email: user?.primaryEmailAddress?.emailAddress,
//           }
//         : {
//             recruiterInfo: recruiterFormData,
//             role: "recruiter",
//             isPremiumUser: true,
//             userId: user?.id,
//             email: user?.primaryEmailAddress?.emailAddress,
//           };

//     await createProfileAction(data, "/onboard");
//   }

//   return (
//     <div className="bg-white">
//       <Tabs value={currentTab} onValueChange={handleTabChange}>
//         <div className="w-full">
//           <div className="flex items-baseline justify-between border-b pb-6 pt-24">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//               Welcome to onboarding
//             </h1>
//             <TabsList>
//               <TabsTrigger value="candidate">Candidate</TabsTrigger>
//               <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
//             </TabsList>
//           </div>
//         </div>
//         <TabsContent value="candidate">
//           <CommonForm
//             action={createProfile}
//             formData={candidateFormData}
//             setFormData={setCandidateFormData}
//             formControls={candidateOnboardFormControls}
//             buttonText={"Onboard as candidate"}
//             handleFileChange={handleFileChange}
//             isBtnDisabled={!handleCandidateFormValid()}
//           />
//         </TabsContent>
//         <TabsContent value="recruiter">
//           <CommonForm
//             formControls={recruiterOnboardFormControls}
//             buttonText={"Onboard as recruiter"}
//             formData={recruiterFormData}
//             setFormData={setRecruiterFormData}
//             isBtnDisabled={!handleRecuiterFormValid()}
//             action={createProfile}
//           />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default OnBoard;

"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState, useCallback } from "react";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createProfileAction } from "@/actions";
import { getSupabaseClient } from "@/utils/supabaseClient";
import CommonForm from "../common-form";
import "notyf/notyf.min.css";
import { notifier } from "@/utils/notifier";

function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
  const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);
  const [file, setFile] = useState(null);

  const { user } = useUser();
  const router = useRouter();

  async function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  const handleUploadPdfToSupabase = useCallback(async () => {
    const { data, error } = await getSupabaseClient().storage
      .from("job-board-public")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase resume upload error:", error);
      notifier.error("Failed to upload resume. Please try again.");
    } else if (data) {
      notifier.success("Resume uploaded successfully!");
      setCandidateFormData((prevData) => ({
        ...prevData,
        resume: data.path,
      }));
    }
  }, [file]);

  useEffect(() => {
    if (file) handleUploadPdfToSupabase();
  }, [file, handleUploadPdfToSupabase]);

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  function handleRecuiterFormValid() {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  }

  function handleCandidateFormValid() {
    return Object.keys(candidateFormData).every((key) => {
      const value = candidateFormData[key];
      return typeof value === "string" ? value.trim() !== "" : value !== null && value !== undefined;
    });
  }

  async function createProfile() {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: true,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: true,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };

    try {
      await createProfileAction(data, "/onboard");

      notifier.success("You have been successfully onboarded!");
      router.push("/jobs");
    } catch (error) {
      notifier.error("Failed to onboard. Please try again.");
    }
  }

  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome to onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <CommonForm
            action={createProfile}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            formControls={candidateOnboardFormControls}
            buttonText={"Onboard as candidate"}
            handleFileChange={handleFileChange}
            isBtnDisabled={!handleCandidateFormValid()}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <CommonForm
            formControls={recruiterOnboardFormControls}
            buttonText={"Onboard as recruiter"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecuiterFormValid()}
            action={createProfile}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OnBoard;

