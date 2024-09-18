import Layout from "@/Layout/layout";
import CreatePublicKey from "@/pages/CreatePublicKey";
import Home from "@/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "createpublickey",
        element: <CreatePublicKey />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};
export default Router;
