"use client";

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import PageHeader from "../page-header";
import CandidateJobCard from "../candidate-job-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";

function CandidateActivity({ jobList, jobApplicants, profileInfo }) {
  const uniqueStatusArray = [
    ...new Set(jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)),
  ];
  const [activeStatus, setActiveStatus] = useState(uniqueStatusArray[0]);

  const savedJobs = jobList.filter((jobItem) =>
    profileInfo?.savedJobs?.includes(jobItem._id)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <Tabs defaultValue="applications">
        <PageHeader
          title="Your Activity"
          description="Track your applications and revisit jobs you've saved."
          action={
            <TabsList>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="saved">Saved Jobs ({savedJobs.length})</TabsTrigger>
            </TabsList>
          }
        />

        <div className="pb-24 pt-6">
          <TabsContent value="applications">
            {uniqueStatusArray.length > 0 ? (
              <>
                <div className="mb-6 flex flex-wrap gap-2">
                  {uniqueStatusArray.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setActiveStatus(status)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition",
                        activeStatus === status
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {jobList
                    .filter(
                      (jobItem) =>
                        jobApplicants
                          .filter(
                            (jobApplication) =>
                              jobApplication.status.indexOf(activeStatus) > -1
                          )
                          .findIndex(
                            (filteredItemByStatus) =>
                              jobItem._id === filteredItemByStatus.jobID
                          ) > -1
                    )
                    .map((finalFilteredItem) => (
                      <CommonCard
                        key={finalFilteredItem?._id}
                        icon={<JobIcon />}
                        title={finalFilteredItem?.title}
                        description={finalFilteredItem?.companyName}
                      />
                    ))}
                </div>
              </>
            ) : (
              <p className="py-16 text-center text-muted-foreground">
                You haven&apos;t applied to any jobs yet.
              </p>
            )}
          </TabsContent>

          <TabsContent value="saved">
            {savedJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedJobs.map((jobItem) => (
                  <CandidateJobCard
                    key={jobItem._id}
                    jobItem={jobItem}
                    profileInfo={profileInfo}
                    jobApplications={jobApplicants}
                  />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center text-muted-foreground">
                No saved jobs yet — bookmark a job from the Jobs page to find it here.
              </p>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default CandidateActivity;
