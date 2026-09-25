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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import PageHeader from "../page-header";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

function JobListing({
  user,
  profileInfo,
  jobList,
  jobApplications,
  filterCategories,
}) {
  const [filterParams, setFilterParams] = useState({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
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

  function handleClearFilters() {
    setFilterParams({});
    sessionStorage.removeItem("filterParams");
    router.push(window.location.pathname, { scroll: false });
  }

  const activeFilterCount = useMemo(
    () =>
      filterParams
        ? Object.values(filterParams).reduce(
            (total, options) => total + (options?.length || 0),
            0
          )
        : 0,
    [filterParams]
  );

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
            <div className="flex items-center gap-3">
              <Menubar className="hidden sm:flex">
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

              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative sm:hidden">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 ? (
                      <Badge
                        variant="primary"
                        className="ml-2 h-5 min-w-5 justify-center px-1.5"
                      >
                        {activeFilterCount}
                      </Badge>
                    ) : null}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Jobs</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 px-4 pb-6">
                    {filterMenus.map((filterMenu) => (
                      <div key={filterMenu.id}>
                        <h3 className="mb-3 text-sm font-semibold text-foreground">
                          {filterMenu.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {filterMenu.options.map((option) => {
                            const isActive =
                              filterParams &&
                              filterParams[filterMenu.id] &&
                              filterParams[filterMenu.id].indexOf(option) > -1;
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => handleFilter(filterMenu.id, option)}
                                className={`rounded-full border px-4 py-2 text-sm transition ${
                                  isActive
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-muted-foreground"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    {activeFilterCount > 0 ? (
                      <Button variant="outline" onClick={handleClearFilters}>
                        Clear all filters
                      </Button>
                    ) : null}
                  </div>
                </SheetContent>
              </Sheet>

              {activeFilterCount > 0 ? (
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="hidden sm:inline-flex"
                >
                  Clear filters
                </Button>
              ) : null}
            </div>
          ) : (
            <PostNewJob jobList={jobList} user={user} profileInfo={profileInfo} />
          )
        }
      />
      {profileInfo?.role === "recruiter" ? (
        <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Active Jobs</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {jobList?.length || 0}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Total Applicants</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {jobApplications?.length || 0}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 col-span-2 sm:col-span-1">
            <p className="text-sm text-muted-foreground">Selected</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {jobApplications?.filter((item) => item.status?.includes("selected"))
                .length || 0}
            </p>
          </div>
        </div>
      ) : null}
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
