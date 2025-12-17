import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Sidebar />
      <div className="flex flex-col min-h-screen pl-[240px]">
        <Header />
        <main className="flex-1">
          <div className="container py-6 px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
