import { Routes, Route, useLocation } from "react-router-dom";
import TopNav from "./components/TopNav";

import Swipe from "./pages/Swipe";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import ChatList from "./pages/ChatList";
import ChatRoom from "./pages/ChatRoom";
import Homes from "./pages/Homes";
import Landing from "./pages/Landing";

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background-light">
      {!isLanding && <TopNav />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/swipe" element={<Swipe />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/homes" element={<Homes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat/:chatId" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}