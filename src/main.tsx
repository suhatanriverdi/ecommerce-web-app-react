import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import the SupabaseProvider
import { SupabaseProvider } from "./supabase/SupabaseContext.tsx";

import "./index.css";

import Introduction from "./pages/Introduction.tsx";
import Advertisement from "./pages/Advertisement.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Introduction />,
      },
      {
        path: "advertisement",
        element: <Advertisement />,
      },
      {
        path: "home/:gender",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SupabaseProvider>
      <RouterProvider router={router} />
    </SupabaseProvider>
  </StrictMode>
);
