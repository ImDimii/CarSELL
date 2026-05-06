import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 w-full max-w-full overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
}
