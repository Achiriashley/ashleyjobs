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
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";
import { createJobApplicationAction, toggleSavedJobAction } from "@/actions";
import { notifier } from "@/utils/notifier";
import { formatRelativeDate } from "@/utils";

function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);
  const [isSaved, setIsSaved] = useState(
    !!profileInfo?.savedJobs?.includes(jobItem?._id)
  );

  async function handleToggleSaveJob(event) {
    event.stopPropagation();
    setIsSaved((prev) => !prev);
    await toggleSavedJobAction(profileInfo?._id, jobItem?._id, "/jobs");
  }

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
          cornerAction={
            <button
              type="button"
              onClick={handleToggleSaveJob}
              aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
              className="rounded-full p-2 text-muted-foreground transition hover:bg-accent hover:text-primary"
            >
              <Bookmark
                className={isSaved ? "h-5 w-5 fill-primary text-primary" : "h-5 w-5"}
              />
            </button>
          }
          badges={[
            jobItem?.location ? { label: jobItem.location } : null,
            jobItem?.type ? { label: `${jobItem.type} Time`, variant: "primary" } : null,
            formatRelativeDate(jobItem?.createdAt)
              ? { label: formatRelativeDate(jobItem.createdAt), variant: "outline" }
              : null,
          ].filter(Boolean)}
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
            <Badge variant="primary" className="h-9 px-4 text-sm">
              {jobItem?.type} Time
            </Badge>
            <span className="text-base font-medium text-muted-foreground">
              Experience: {jobItem?.experience} year
            </span>
            {formatRelativeDate(jobItem?.createdAt) ? (
              <span className="text-base font-medium text-muted-foreground">
                {formatRelativeDate(jobItem.createdAt)}
              </span>
            ) : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {jobItem?.skills.split(",").map((skillItem, index) => (
              <Badge key={`skill-${index}`}>{skillItem}</Badge>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}

export default CandidateJobCard;

