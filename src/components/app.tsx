import { Route, Routes } from "react-router-dom";

import { MainPage } from "./pages/main/main-page";
import { AboutPage } from "./pages/about/about-page";

export default function App() {
    return (
        <main className="relative min-h-screen py-8 overflow-hidden bg-primary-bg">
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/about-page/:index" element={<AboutPage />} />
            </Routes>
        </main>
    )
}
