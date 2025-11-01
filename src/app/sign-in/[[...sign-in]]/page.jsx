// import { SignIn } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";

// export default function SignInPage() {
//   return <SignIn />;
// }

import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
}
