import Topbar from "@/components/shared/Topbar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Topbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
