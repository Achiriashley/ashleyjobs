import { fetchProfileAction } from "@/actions";
import AccountInfo from "@/components/account-info";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const user = await currentUser();

  // Redirect if there's no user
  if (!user) {
    redirect("/sign-in");
  }

  const profileInfo = await fetchProfileAction(user?.id);

  // Redirect if profile doesn't exist
  if (!profileInfo) {
    redirect("/onboard");
  }

  return <AccountInfo profileInfo={profileInfo} />;
}
