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
const router = createBrowserRouter([
  {
    // First Page Where We Display Our Branding with Animations
    path: "/",
    element: <Introduction />,
    errorElement: <NotFound />,
  },
  {
    path: "/advertisement",
    element: <Advertisement />,
    errorElement: <NotFound />,
  },
  {
    path: "/home/:gender",
    element: <Home />,
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SupabaseProvider>
      <RouterProvider router={router} />
    </SupabaseProvider>
  </StrictMode>
);
