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
import { updateProfileAction } from "@/actions";
import { notifier } from "@/utils/notifier"; // ✅ Import notifier

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

  console.log(profileInfo, "candidateFormData", profileInfo);

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

      notifier.success("Profile updated successfully!"); // ✅ Success notification
    } catch (error) {
      console.error(error);
      notifier.error("Something went wrong while updating your profile."); // ✅ Error notification
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <PageHeader
        title="Account Details"
        description="Update your profile information."
      />
      <div className="py-10 pb-24 max-w-2xl">
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
// export default AccountInfo;