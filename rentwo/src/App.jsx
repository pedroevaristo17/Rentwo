import { Routes, Route, Navigate } from "react-router-dom";
import Swipe from "./pages/Swipe";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";
import ChatRoom from "./pages/ChatRoom";
import ChatList from "./pages/ChatList"

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/chat" element={<ChatList />} />
          <Route path="/" element={<Navigate to="/swipe" replace />} />
          <Route path="/swipe" element={<Swipe />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat/:id" element={<ChatRoom />} />
        </Routes>
      </div>

      <BottomNav />
    </div>
  );
}