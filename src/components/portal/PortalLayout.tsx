import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalHeader from "@/components/portal/PortalHeader";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <PortalSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PortalHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
