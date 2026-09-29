import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import Footer from "../footer";
import { fetchProfileAction } from "@/actions";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

async function CommonLayout({ children, ...props }) {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  return (
    <NextThemesProvider {...props}>
      <div className="flex min-h-screen flex-col">
        <Header profileInfo={profileInfo} user={JSON.parse(JSON.stringify(user))} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextThemesProvider>
  );
}

export default CommonLayout;