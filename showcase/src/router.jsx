import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home/Home";
import AgentsPage from "@/pages/Agents/Agents";
import WorkflowsPage from "@/pages/Workflows/Workflows";
import ArchitecturePage from "@/pages/Architecture/Architecture";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/agents", element: <AgentsPage /> },
  { path: "/workflows", element: <WorkflowsPage /> },
  { path: "/architecture", element: <ArchitecturePage /> },
]);
