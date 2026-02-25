import { Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/TopNav";

import Swipe from "./pages/Swipe";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import ChatList from "./pages/ChatList";
import ChatRoom from "./pages/ChatRoom";
import Homes from "./pages/Homes";

export default function App() {
  return (
    <div className="min-h-screen bg-background-light">
      <TopNav />

      <Routes>
        <Route path="/" element={<Navigate to="/swipe" replace />} />
        <Route path="/swipe" element={<Swipe />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/homes" element={<Homes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat/:chatId" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}