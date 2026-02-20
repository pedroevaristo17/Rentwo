import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const linkStyle = ({ isActive }) => ({
    padding: 12,
    textDecoration: "none",
    fontWeight: isActive ? "700" : "400",
  });

  return (
    <nav style={{ display: "flex", justifyContent: "space-around", borderTop: "1px solid #ddd" }}>
      <NavLink to="/swipe" style={linkStyle}>Swipe</NavLink>
      <NavLink to="/likes" style={linkStyle}>Likes</NavLink>
      <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
    </nav>
  );
}