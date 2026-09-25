"use client";

import { Fragment, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { createJobApplicationAction } from "@/actions";
import { notifier } from "@/utils/notifier";

function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);

  async function handlejobApply() {
    if (!profileInfo?.isPremiumUser && jobApplications.length >= 200) {
      setShowJobDetailsDrawer(false);
      notifier.error("You can apply max 200 jobs.", {
        description: "Please opt for membership to apply for more jobs",
      });
      return;
    }

    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: jobItem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
    setShowJobDetailsDrawer(false);
    notifier.success("Job application submitted successfully!", {
      description: "You have successfully applied for the job.",
    });
  }

  return (
    <Fragment>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}
      >
        <CommonCard
          icon={<JobIcon />}
          title={jobItem?.title}
          description={jobItem?.companyName}
          footerContent={
            <Button
              onClick={() => setShowJobDetailsDrawer(true)}
              className=" flex h-11 items-center justify-center px-5"
            >
              View Details
            </Button>
          }
        />
        <DrawerContent className="p-6">
          <DrawerHeader className="px-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <DrawerTitle className="text-3xl font-extrabold text-foreground sm:text-4xl">
                {jobItem?.title}
              </DrawerTitle>
              <div className="flex shrink-0 gap-3">
                <Button
                  onClick={handlejobApply}
                  disabled={
                    jobApplications.findIndex(
                      (item) => item.jobID === jobItem?._id
                    ) > -1
                      ? true
                      : false
                  }
                  className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
                >
                  {jobApplications.findIndex(
                    (item) => item.jobID === jobItem?._id
                  ) > -1
                    ? "Applied"
                    : "Apply"}
                </Button>
                <Button
                  variant="outline"
                  className="flex h-11 items-center justify-center px-5"
                  onClick={() => setShowJobDetailsDrawer(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-xl font-medium text-muted-foreground">
            {jobItem?.description}
            <span className="ml-4 text-base font-normal">{jobItem?.location}</span>
          </DrawerDescription>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex h-9 items-center rounded-full bg-primary/10 px-4 text-sm font-semibold text-primary">
              {jobItem?.type} Time
            </span>
            <span className="text-base font-medium text-muted-foreground">
              Experience: {jobItem?.experience} year
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {jobItem?.skills.split(",").map((skillItem, index) => (
              <span
                key={`skill-${index}`}
                className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {skillItem}
              </span>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}

export default CandidateJobCard;

