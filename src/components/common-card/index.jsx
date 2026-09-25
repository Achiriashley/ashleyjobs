import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function CommonCard({ title, icon, description, badges, footerContent }) {
  return (
    <Card className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg cursor-pointer">
      <CardHeader className="flex-1 p-0">
        {icon ? icon : null}
        {title ? (
          <CardTitle className="text-xl max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-foreground">
            {title}
          </CardTitle>
        ) : null}
        {description ? (
          <CardDescription className="mt-3 text-muted-foreground">
            {description}
          </CardDescription>
        ) : null}
        {badges && badges.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant={badge.variant}>
                {badge.label}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardHeader>
      <CardFooter className="p-0">{footerContent}</CardFooter>
    </Card>
  );
}

export default CommonCard;
