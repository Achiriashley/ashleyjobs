import { fetchProfileAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function redirectIfOnboarded() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (profileInfo?._id) {
    if (profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser)
      redirect("/membership");
    else redirect("/");
  }

  return user;
}
