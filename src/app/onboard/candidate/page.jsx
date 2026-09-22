"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";
import CommonForm from "@/components/common-form";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
} from "@/utils";
import { notifier } from "@/utils/notifier";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CandidateOnboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      const timeout = setTimeout(() => {
        router.push("/sign-in?redirect_url=/onboard/candidate");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded, isSignedIn, router]);

  async function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  const handleUploadPdfToSupabase = useCallback(async () => {
    if (!file) return;
    const { data, error } = await supabaseClient.storage
      .from("job-board-public")
      .upload(`/public/${file.name}`, file, { cacheControl: "3600", upsert: false });

    if (error) {
      notifier.error("Failed to upload resume. Please try again.");
    } else if (data) {
      notifier.success("Resume uploaded successfully!");
      setCandidateFormData((prev) => ({ ...prev, resume: data.path }));
    }
  }, [file]);

  useEffect(() => {
    if (file) handleUploadPdfToSupabase();
  }, [file, handleUploadPdfToSupabase]);

  function handleCandidateFormValid() {
    return Object.values(candidateFormData).every((value) =>
      typeof value === "string" ? value.trim() !== "" : value !== null && value !== undefined
    );
  }

  async function createProfile() {
    try {
      await createProfileAction(
        {
          candidateInfo: candidateFormData,
          role: "candidate",
          isPremiumUser: true,
          userId: user?.id,
          email: user?.primaryEmailAddress?.emailAddress,
        },
        "/onboard/candidate"
      );

      notifier.success("You have been successfully onboarded as a candidate!");
      router.push("/jobs");
    } catch {
      notifier.error("Failed to onboard. Please try again.");
    }
  }

  if (!isLoaded || !isSignedIn) {
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
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white pt-24 px-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Candidate Onboarding</h1>
      <CommonForm
        action={createProfile}
        formData={candidateFormData}
        setFormData={setCandidateFormData}
        formControls={candidateOnboardFormControls}
        buttonText="Onboard as candidate"
        handleFileChange={handleFileChange}
        isBtnDisabled={!handleCandidateFormValid()}
      />
    </div>
  );
}
