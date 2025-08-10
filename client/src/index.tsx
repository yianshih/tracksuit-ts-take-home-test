import { createRoot } from "react-dom/client";
import { App } from "./routes/app.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/index.ts";

export const queryClient = new QueryClient();

/**
TODO:
 - Add router for different pages
 - Add Strict Mode for development
 - Add error boundaries for better error handling
*/

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
