"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import {
  getCandidateDetailsByIDAction,
  updateJobApplicationAction,
} from "@/actions";
import { getSupabaseClient } from "@/utils/supabaseClient";

function CandidateList({
  jobApplications,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) {
  async function handleFetchCandidateDetails(getCurrentCandidateId) {
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);

    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  }

  console.log(currentCandidateDetails);

  function handlePreviewResume() {
    const { data } = getSupabaseClient().storage
      .from("job-board-public")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function handleUpdateJobStatus(getCurrentStatus) {
    let cpyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    );
    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplicant],
      status:
        cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(
          getCurrentStatus
        ),
    };

    console.log(jobApplicantsToUpdate, "jobApplicantsToUpdate");
    await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
  }

  console.log(jobApplications);

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-6 sm:p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem) => (
              <div
                key={jobApplicantItem?.candidateUserID}
                className="w-full max-w-sm rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-foreground">
                    {jobApplicantItem?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserID
                      )
                    }
                    className="flex h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {currentCandidateDetails?.candidateInfo?.name},{" "}
              {currentCandidateDetails?.email}
            </h1>
            <p className="text-xl font-medium text-foreground">
              {currentCandidateDetails?.candidateInfo?.currentCompany}
            </p>
            <p className="text-sm font-normal text-muted-foreground">
              {currentCandidateDetails?.candidateInfo?.currentJobLocation}
            </p>
            <p className="text-muted-foreground">
              Total Experience:{" "}
              {currentCandidateDetails?.candidateInfo?.totalExperience} Years
            </p>
            <p className="text-muted-foreground">
              Salary: {currentCandidateDetails?.candidateInfo?.currentSalary}{" "}
              LPA
            </p>
            <p className="text-muted-foreground">
              Notice Period:{" "}
              {currentCandidateDetails?.candidateInfo?.noticePeriod} Days
            </p>
            <div className="mt-6">
              <h1 className="font-semibold text-foreground">Previous Companies</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {currentCandidateDetails?.candidateInfo?.previousCompanies
                  .split(",")
                  .map((skillItem) => (
                    <span
                      key={skillItem}
                      className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {skillItem}
                    </span>
                  ))}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {currentCandidateDetails?.candidateInfo?.skills
                .split(",")
                .map((skillItem) => (
                  <span
                    key={skillItem}
                    className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {skillItem}
                  </span>
                ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handlePreviewResume}
              className=" flex h-11 items-center justify-center px-5"
            >
              Resume
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("selected")}
              className=" disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected") ||
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? true
                  : false
              }
            >
              {jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("selected")
                ? "Selected"
                : "Select"}
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("rejected")}
              className=" disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected") ||
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? true
                  : false
              }
            >
              {jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("rejected")
                ? "Rejected"
                : "Reject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default CandidateList;