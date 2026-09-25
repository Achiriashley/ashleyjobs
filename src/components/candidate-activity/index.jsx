"use client";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import PageHeader from "../page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function CandidateActivity({ jobList, jobApplicants }) {
  console.log(jobList, jobApplicants);

  const uniqueStatusArray = [
    ...new Set(
      jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)
    ),
  ];

  console.log(uniqueStatusArray);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {uniqueStatusArray.length > 0 ? (
        <Tabs defaultValue="Applied" className="w-full">
          <PageHeader
            title="Your Activity"
            description="Track the status of jobs you've applied to."
            action={
              <TabsList>
                {uniqueStatusArray.map((status) => (
                  <TabsTrigger key={status} value={status}>
                    {status}
                  </TabsTrigger>
                ))}
              </TabsList>
            }
          />
          <div className="pb-24 pt-6">
            {uniqueStatusArray.map((status) => (
              <TabsContent key={status} value={status}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {jobList
                    .filter(
                      (jobItem) =>
                        jobApplicants
                          .filter(
                            (jobApplication) =>
                              jobApplication.status.indexOf(status) > -1
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
              </TabsContent>
            ))}
          </div>
        </Tabs>
      ) : (
        <>
          <PageHeader
            title="Your Activity"
            description="Track the status of jobs you've applied to."
          />
          <p className="py-16 text-center text-muted-foreground">
            You haven't applied to any jobs yet.
          </p>
        </>
      )}
    </div>
  );
}

export default CandidateActivity;