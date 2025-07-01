import { Navigate, Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";

const RootLayout = () => {
  const cookieFallback = localStorage.getItem("cookieFallback");
  const isNotAuthenticated = cookieFallback === "[]" || cookieFallback == null;

  return isNotAuthenticated ? (
    <Navigate to="/sign-in" />
  ) : (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
