"use client";

import { membershipPlans } from "@/utils";
import PageHeader from "../page-header";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { updateProfileAction } from "@/actions";
import { cn } from "@/lib/utils";

function Membership({ profileInfo }) {
  async function handleFreePlan(getCurrentPlan) {
    await updateProfileAction(
      {
        ...profileInfo,
        isPremiumUser: true,
        memberShipType: getCurrentPlan?.type,
        memberShipStartDate: new Date().toString(),
        memberShipEndDate: new Date(
          new Date().getFullYear() + getCurrentPlan?.durationYears,
          new Date().getMonth(),
          new Date().getDate()
        ),
      },
      "/membership"
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <PageHeader
        title={
          profileInfo?.isPremiumUser ? "You are a premium user" : "Choose your plan"
        }
        description={
          profileInfo?.isPremiumUser
            ? "Manage or upgrade your current membership."
            : "Unlock higher posting and application limits."
        }
      />
      <div className="py-10 pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {membershipPlans.map((plan) => {
            const isCurrentPlan = profileInfo?.memberShipType === plan.type;

            return (
              <div
                key={plan.type}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl border bg-card p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg",
                  isCurrentPlan ? "border-primary ring-1 ring-primary/30" : "border-border"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">{plan.heading}</h3>
                  {isCurrentPlan ? <Badge variant="primary">Current plan</Badge> : null}
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-foreground">
                    XAF {plan.price}
                  </span>
                  <span className="text-muted-foreground"> / {plan.durationYears === 1 ? "year" : `${plan.durationYears} years`}</span>
                </div>
                <p className="text-sm capitalize text-muted-foreground">{plan.type} tier</p>
                <div className="mt-auto pt-4">
                  {isCurrentPlan ? (
                    <Button disabled className="w-full">
                      Active plan
                    </Button>
                  ) : (
                    <Button onClick={() => handleFreePlan(plan)} className="w-full">
                      {profileInfo?.isPremiumUser ? "Switch to this plan" : "Get started"}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Membership;
