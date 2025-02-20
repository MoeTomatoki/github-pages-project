import { Route, Routes } from "react-router-dom";

import { MainPage } from "../pages/main/index";
import { AboutPage } from "../pages/about/index";
import Header from "../widgets/header";

export default function App() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-primary-bg">
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/about-page/:index" element={<AboutPage />} />
            </Routes>
        </main>
    )
}