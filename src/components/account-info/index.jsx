"use client";

import {
  candidateOnboardFormControls,
  initialCandidateAccountFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import PageHeader from "../page-header";
import { Badge } from "../ui/badge";
import { updateProfileAction } from "@/actions";
import { notifier } from "@/utils/notifier";

function AccountInfo({ profileInfo }) {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateAccountFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  useEffect(() => {
    if (profileInfo?.role === "recruiter")
      setRecruiterFormData(profileInfo?.recruiterInfo);

    if (profileInfo?.role === "candidate")
      setCandidateFormData(profileInfo?.candidateInfo);
  }, [profileInfo]);

  async function handleUpdateAccount() {
    try {
      await updateProfileAction(
        profileInfo?.role === "candidate"
          ? {
              _id: profileInfo?._id,
              userId: profileInfo?.userId,
              email: profileInfo?.email,
              role: profileInfo?.role,
              isPremiumUser: profileInfo?.isPremiumUser,
              memberShipType: profileInfo?.memberShipType,
              memberShipStartDate: profileInfo?.memberShipStartDate,
              memberShipEndDate: profileInfo?.memberShipEndDate,
              candidateInfo: {
                ...candidateFormData,
                resume: profileInfo?.candidateInfo?.resume,
              },
            }
          : {
              _id: profileInfo?._id,
              userId: profileInfo?.userId,
              email: profileInfo?.email,
              role: profileInfo?.role,
              isPremiumUser: profileInfo?.isPremiumUser,
              memberShipType: profileInfo?.memberShipType,
              memberShipStartDate: profileInfo?.memberShipStartDate,
              memberShipEndDate: profileInfo?.memberShipEndDate,
              recruiterInfo: {
                ...recruiterFormData,
              },
            },
        "/account"
      );

      notifier.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      notifier.error("Something went wrong while updating your profile.");
    }
  }

  const displayName =
    profileInfo?.role === "candidate"
      ? profileInfo?.candidateInfo?.name
      : profileInfo?.recruiterInfo?.name;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <PageHeader
        title="Account Details"
        description="Update your profile information."
      />
      <div className="grid grid-cols-1 gap-8 py-10 pb-24 lg:grid-cols-[280px_1fr]">
        <div className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {displayName?.[0]?.toUpperCase() || "?"}
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">
            {displayName || "Your profile"}
          </h2>
          <p className="text-sm text-muted-foreground">{profileInfo?.email}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="primary">
              {profileInfo?.role === "candidate" ? "Candidate" : "Recruiter"}
            </Badge>
            {profileInfo?.isPremiumUser ? (
              <Badge variant="warm">Premium</Badge>
            ) : null}
          </div>
        </div>

        <CommonForm
          action={handleUpdateAccount}
          formControls={
            profileInfo?.role === "candidate"
              ? candidateOnboardFormControls.filter(
                  (formControl) => formControl.name !== "resume"
                )
              : recruiterOnboardFormControls
          }
          formData={
            profileInfo?.role === "candidate"
              ? candidateFormData
              : recruiterFormData
          }
          setFormData={
            profileInfo?.role === "candidate"
              ? setCandidateFormData
              : setRecruiterFormData
          }
          buttonText="Update Profile"
        />
      </div>
    </div>
  );
}

export default AccountInfo;