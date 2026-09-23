import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  function CommonCard({ title, icon, description, footerContent }) {
    return (
      <Card className="flex bg-muted flex-col gap-6 rounded-2xl p-8 transition duration-300 hover:bg-card hover:shadow-2xl hover:shadow-foreground/10 cursor-pointer">
        <CardHeader className="p-0">
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
        </CardHeader>
        <CardFooter className="p-0">{footerContent}</CardFooter>
      </Card>
    );
  }
  
  export default CommonCard;
  