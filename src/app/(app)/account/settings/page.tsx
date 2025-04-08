import { HeaderTitle } from "@/components/header-title";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/server/auth";

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="flex w-full flex-col">
      <HeaderTitle
        breadcrumbs={[
          {
            label: "Account",
            href: "/account",
          },
          {
            label: "Settings",
            href: "/account/settings",
          },
        ]}
      />
      <div className="flex flex-col">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <p>Settings Page</p>
        </div>
      </div>
    </div>
  );
}
