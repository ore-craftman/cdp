import Header from "../ui/header";
import PageTitle from "../ui/page-title";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-1">
      <Header />

      <PageTitle />

      <main>{children}</main>
    </div>
  );
}
