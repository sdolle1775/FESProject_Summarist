import { Route, Routes } from "react-router-dom";
import { AuthModal } from "./components/AuthModal";
import { AppLayout } from "./components/AppLayout";
import { BookPage } from "./pages/BookPage";
import { ChoosePlanPage } from "./pages/ChoosePlanPage";
import { ForYouPage } from "./pages/ForYouPage";
import { HomePage } from "./pages/HomePage";
import { LibraryPage } from "./pages/LibraryPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlayerPage } from "./pages/PlayerPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/choose-plan" element={<ChoosePlanPage />} />
        <Route element={<AppLayout />}>
          <Route path="/for-you" element={<ForYouPage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <AuthModal />
    </>
  );
}
