import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MainPage } from "../pages/main/index";
import { AboutPage } from "../pages/about/index";
import Header from "../widgets/header";
import Footer from "../widgets/footer";
import "../shared/i18n/i18n";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-neutral-50 dark:bg-neutral-900">
        <Header />
        <main className="flex-grow  w-full">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about-page/:id" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <div id="modal-portal"></div>
      <div id="notification-portal"></div>
    </QueryClientProvider>
  );
}
