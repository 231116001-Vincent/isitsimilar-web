import { Toaster } from "@/components/ui/sonner";
import { Link, Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <div className="w-3xl min-h-screen flex flex-col">
      <nav className="py-4 mb-8">
        <Link to="/">
          <h1 className="text-xl font-medium">IsItSimilar?</h1>
        </Link>
      </nav>

      <Outlet />
      <Toaster />

      <div className="grow"></div>

      <footer className="my-8 flex justify-end">
        <span className="text-muted-foreground">&copy; 2026 VHarya</span>
      </footer>
    </div>
  );
}
