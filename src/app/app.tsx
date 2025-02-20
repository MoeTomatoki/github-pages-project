import { Route, Routes } from "react-router-dom";

import { MainPage } from "../pages/main/index";
import { AboutPage } from "../pages/about/index";
import Header from "../widgets/header";
import Footer from "../widgets/footer";

export default function App() {
  return (
      <div className="flex flex-col min-h-screen w-full overflow-hidden bg-primary-bg">
          <Header />g
          <main className="flex-grow  w-full">
              <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/about-page/:index" element={<AboutPage />} />
              </Routes>
          </main>
          <Footer />
      </div>
  );
}
