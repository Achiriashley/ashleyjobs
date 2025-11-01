"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import CommonForm from "@/components/common-form";
import {
  recruiterOnboardFormControls,
  initialRecruiterFormData,
} from "@/utils";
import { notifier } from "@/utils/notifier";

export default function RecruiterOnboard() {
  const { user } = useUser();
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
    } catch {
      notifier.error("Failed to onboard. Please try again.");
    }
  }

  return (
    <div className="bg-white pt-24 px-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Recruiter Onboarding</h1>
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
