import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { NotificationProvider } from "@features/providers/notification-context/notification-context";
import { AuthProvider } from "@features/providers/auth-context/auth-context";

import "./index.css";
import App from "./app";
import { queryClient } from "@features/data-fetch/ui/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
