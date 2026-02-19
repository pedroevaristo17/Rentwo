import { Routes, Route } from "react-router-dom";
import Swipe from "./pages/Swipe";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/swipe" element={<Swipe />} />
      <Route path="/likes" element={<Likes />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
