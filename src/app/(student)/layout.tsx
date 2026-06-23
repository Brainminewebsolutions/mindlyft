import { getSession } from "@/lib/auth/session";
import SiteNavbar    from "@/components/site/SiteNavbar";

const NAVBAR_HEIGHT = 80;

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="student-panel min-h-screen bg-background">
      <SiteNavbar user={session?.user ?? null} height={NAVBAR_HEIGHT} />
      <div style={{ paddingTop: NAVBAR_HEIGHT }}>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
