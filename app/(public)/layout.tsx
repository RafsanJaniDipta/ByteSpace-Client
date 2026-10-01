import { Navbar } from "@/components/shared/Navbar";
import LogoBanner from "@/components/home/logoBanner";
import { TabCategories } from "@/components/home/tabCategories";
import { Explore } from "@/components/home/explore";
import { Professional } from "@/components/home/professional";
import { Footer } from "@/components/layout/Footer";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <LogoBanner />
      <TabCategories />
      <Explore />
      <Professional />
      <Footer />
    </div>
  );
}
