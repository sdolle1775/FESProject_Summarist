import {
  BookOpen,
  CircleHelp,
  House,
  LogIn,
  LogOut,
  Search,
  Settings,
  Star,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function Sidebar() {
  const { user, openAuth, logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <NavLink className="sidebar-logo" to="/for-you" aria-label="Summarist home">
        <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="Summarist" />
      </NavLink>
      <nav className="sidebar-nav" aria-label="Main navigation">
        <NavLink to="/for-you"><House size={22} /><span>For you</span></NavLink>
        <NavLink to="/library"><BookOpen size={22} /><span>My Library</span></NavLink>
        <button className="disabled-nav" title="Coming soon"><Star size={22} /><span>Highlights</span></button>
        <button className="disabled-nav" title="Use the search bar above"><Search size={22} /><span>Search</span></button>
        <NavLink to="/settings"><Settings size={22} /><span>Settings</span></NavLink>
        <button className="disabled-nav" title="Coming soon"><CircleHelp size={22} /><span>Help & Support</span></button>
      </nav>
      <div className="sidebar-auth">
        {user ? (
          <button onClick={signOut}><LogOut size={22} /><span>Logout</span></button>
        ) : (
          <button onClick={() => openAuth("login")}><LogIn size={22} /><span>Login</span></button>
        )}
      </div>
    </aside>
  );
}
