import Link from "next/link";
import { Button } from "../ui/button";

function DashboardCard({ title, description, href, cta }) {
  return (
    <div className="bg-card text-card-foreground p-6 sm:p-8 rounded-xl shadow-sm border border-border flex flex-col justify-between gap-6 transition hover:shadow-md">
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link href={href}>{cta}</Link>
      </Button>
    </div>
  );
}

export default DashboardCard;
