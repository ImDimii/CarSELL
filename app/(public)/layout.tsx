import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import WishlistPanel from "@/components/shared/WishlistPanel";
import ComparisonBar from "@/components/shared/ComparisonBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WishlistPanel />
      <ComparisonBar />
    </>
  );
}
