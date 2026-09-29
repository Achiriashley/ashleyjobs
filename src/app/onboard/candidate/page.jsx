"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createProfileAction } from "@/actions";
import { getSupabaseClient } from "@/utils/supabaseClient";
import CommonForm from "@/components/common-form";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
} from "@/utils";
import { notifier } from "@/utils/notifier";

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
    const { data, error } = await getSupabaseClient().storage
      .from("job-board-public")
      .upload(`/public/${file.name}`, file, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("Supabase resume upload error:", error);
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
        <p className="text-sm text-muted-foreground">Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
        Candidate Onboarding
      </h1>
      <p className="mb-8 text-muted-foreground">
        Set up your profile so recruiters can find and evaluate you.
      </p>
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
