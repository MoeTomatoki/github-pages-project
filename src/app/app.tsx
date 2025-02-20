import { Route, Routes } from "react-router-dom";

import { MainPage } from "../pages/main/index";
import { AboutPage } from "../pages/about/index";

export default function App() {
    return (
        <main className="relative min-h-screen py-6 overflow-hidden bg-primary-bg">
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/about-page/:index" element={<AboutPage />} />
            </Routes>
        </main>
    )
}

export function Header() {
    return (
        <header className="flex items-center px-4 text-white">
          <div className="w-10 h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              fill="currentColor"
              className="w-full h-full"
            >
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="4" fill="none" />
              <text x="50" y="55" fontSize="24" textAnchor="middle" fill="white" fontFamily="Arial">
                H
              </text>
            </svg>
          </div>
          <h1 className="ml-4 text-xl font-bold">Мой сайт</h1>
        </header>
      );
}
