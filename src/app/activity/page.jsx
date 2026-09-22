import {
  fetchJobApplicationsForCandidate,
  fetchJobsForCandidateAction,
  fetchProfileAction,
} from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";

export default async function Activity() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (!profileInfo) redirect("/onboard");

  const jobList = await fetchJobsForCandidateAction();
  const jobApplicants = await fetchJobApplicationsForCandidate(user?.id);

  return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants} />;
}