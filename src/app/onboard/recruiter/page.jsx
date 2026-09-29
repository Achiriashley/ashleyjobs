"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createProfileAction } from "@/actions";
import CommonForm from "@/components/common-form";
import {
  recruiterOnboardFormControls,
  initialRecruiterFormData,
} from "@/utils";
import { notifier } from "@/utils/notifier";

export default function RecruiterOnboard() {
  const { user } = useUser();
  const router = useRouter();
  const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);

  function handleRecuiterFormValid() {
    return (
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  }

  async function createProfile() {
    try {
      await createProfileAction({
        recruiterInfo: recruiterFormData,
        role: "recruiter",
        isPremiumUser: true,
        userId: user?.id,
        email: user?.primaryEmailAddress?.emailAddress,
      }, "/onboard/recruiter");

      notifier.success("You have been successfully onboarded as a recruiter!");
      router.push("/jobs");
    } catch {
      notifier.error("Failed to onboard. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
        Recruiter Onboarding
      </h1>
      <p className="mb-8 text-muted-foreground">
        Tell us about you and your company to start posting jobs.
      </p>
      <CommonForm
        formControls={recruiterOnboardFormControls}
        buttonText="Onboard as recruiter"
        formData={recruiterFormData}
        setFormData={setRecruiterFormData}
        isBtnDisabled={!handleRecuiterFormValid()}
        action={createProfile}
      />
    </div>
  );
}
