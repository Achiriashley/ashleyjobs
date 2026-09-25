"use client";

import { filterMenuDataArray, formUrlQuery } from "@/utils";
import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Label } from "../ui/label";
import PageHeader from "../page-header";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function JobListing({
  user,
  profileInfo,
  jobList,
  jobApplications,
  filterCategories,
}) {
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleFilter(getSectionID, getCurrentOption) {
    let cpyFilterParams = { ...filterParams };
    const indexOfCurrentSection =
      Object.keys(cpyFilterParams).indexOf(getSectionID);
    if (indexOfCurrentSection === -1) {
      cpyFilterParams = {
        ...cpyFilterParams,
        [getSectionID]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilterParams[getSectionID].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        cpyFilterParams[getSectionID].push(getCurrentOption);
      else cpyFilterParams[getSectionID].splice(indexOfCurrentOption, 1);
    }
    setFilterParams(cpyFilterParams);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterParams));
  }

  useEffect(() => {
    setFilterParams(JSON.parse(sessionStorage.getItem("filterParams")));
  }, []);

  useEffect(() => {
    if (filterParams && Object.keys(filterParams).length > 0) {
      let url = "";
      url = formUrlQuery({
        params: searchParams.toString(),
        dataToAdd: filterParams,
      });

      router.push(url, { scroll: false });
    }
  }, [filterParams, searchParams, router]);

  const filterMenus = filterMenuDataArray.map((item) => ({
    id: item.id,
    name: item.label,
    options: [
      ...new Set(filterCategories.map((listItem) => listItem[item.id])),
    ],
  }));

  console.log(filterParams, "filterParams");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <PageHeader
        title={
          profileInfo?.role === "candidate"
            ? "Explore All Jobs"
            : "Jobs Dashboard"
        }
        description={
          profileInfo?.role === "candidate"
            ? "Browse open roles and apply in one click."
            : "Manage your postings and review applicants."
        }
        action={
          profileInfo?.role === "candidate" ? (
            <Menubar>
              {filterMenus.map((filterMenu) => (
                // eslint-disable-next-line react/jsx-key
                <MenubarMenu>
                  <MenubarTrigger>{filterMenu.name}</MenubarTrigger>
                  <MenubarContent>
                    {filterMenu.options.map((option) => (
                      <MenubarItem
                        key={option}
                        className="flex items-center"
                        onClick={() => handleFilter(filterMenu.id, option)}
                      >
                        <div
                          className={`h-4 w-4 rounded border border-input ${
                            filterParams &&
                            Object.keys(filterParams).length > 0 &&
                            filterParams[filterMenu.id] &&
                            filterParams[filterMenu.id].indexOf(option) > -1
                              ? "bg-primary border-primary"
                              : ""
                          } `}
                        />

                        <Label className="ml-3 cursor-pointer text-sm text-muted-foreground">
                          {option}
                        </Label>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              ))}
            </Menubar>
          ) : (
            <PostNewJob jobList={jobList} user={user} profileInfo={profileInfo} />
          )
        }
      />
      <div className="pt-6 pb-24">
        {jobList && jobList.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobList.map((jobItem) =>
              profileInfo?.role === "candidate" ? (
                <CandidateJobCard
                  key={jobItem.id}
                  profileInfo={profileInfo}
                  jobItem={jobItem}
                  jobApplications={jobApplications}
                />
              ) : (
                <RecruiterJobCard
                  key={jobItem.id}
                  profileInfo={profileInfo}
                  jobItem={jobItem}
                  jobApplications={jobApplications}
                />
              )
            )}
          </div>
        ) : (
          <p className="py-16 text-center text-muted-foreground">
            {profileInfo?.role === "candidate"
              ? "No jobs match your filters yet."
              : "You haven't posted any jobs yet."}
          </p>
        )}
      </div>
    </div>
  );
}

export default JobListing;
