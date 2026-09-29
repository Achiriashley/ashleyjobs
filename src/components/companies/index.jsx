"use client";

import { useRouter } from "next/navigation";
import CommonCard from "../common-card";
import PageHeader from "../page-header";
import { Button } from "../ui/button";

function CompanyAvatar({ companyName }) {
  return (
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
      {companyName?.[0]?.toUpperCase() || "?"}
    </div>
  );
}

function Companies({ jobsList }) {
  const router = useRouter();

  const createUniqueSetOfCompanies = [
    ...new Set(
      jobsList
        .filter(
          (jobItem) =>
            jobItem?.companyName && jobItem?.companyName.trim() !== ""
        )
        .map((item) => item.companyName)
    ),
  ];

  function handleFilterJobsByCompanyName(getCompanyName) {
    sessionStorage.setItem(
      "filterParams",
      JSON.stringify({
        companyName: [getCompanyName],
      })
    );

    router.push("/jobs");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <PageHeader
        title="Browse Companies"
        description="Explore companies that are actively hiring."
      />
      <div className="pt-6 pb-24">
        {createUniqueSetOfCompanies && createUniqueSetOfCompanies.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {createUniqueSetOfCompanies.map((companyName, index) => (
              <CommonCard
                key={index}
                icon={<CompanyAvatar companyName={companyName} />}
                title={companyName}
                footerContent={
                  <Button
                    onClick={() => handleFilterJobsByCompanyName(companyName)}
                    className="h-11 flex items-center justify-center px-5"
                  >
                    See Jobs
                  </Button>
                }
              />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-muted-foreground">
            No companies present yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Companies;
