import { Route, Routes } from "react-router-dom";

import { MainPage } from "@pages/main";
import { AboutPage } from "@pages/about";
import { NotificationWrapper } from "@features/providers/notification-context/notification-wrapper";
import Header from "@widgets/header";
import Footer from "@widgets/footer";
import "@shared/i18n/i18n";

export default function App() {
  return (
    <>
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
      <NotificationWrapper />
    </>
  );
}
