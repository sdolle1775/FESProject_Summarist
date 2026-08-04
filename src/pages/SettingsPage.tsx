import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function SettingsPage() {
  const { user, openAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="content-page settings-page">
      <h1>Settings</h1>
      {!user ? (
        <div className="settings-logged-out">
          <img src="/assets/login.png" alt="Sign in securely to your account" />
          <h2>Log in to your account to see your details.</h2>
          <button className="primary-button settings-login" onClick={() => openAuth("login")}>Login</button>
        </div>
      ) : (
        <div className="settings-details">
          <div>
            <strong>Your Subscription plan</strong>
            <p>{user.plan}</p>
            {user.plan === "basic" && (
              <button className="primary-button upgrade-button" onClick={() => navigate("/choose-plan")}>Upgrade to Premium</button>
            )}
          </div>
          <div><strong>Email</strong><p>{user.email}</p></div>
        </div>
      )}
    </div>
  );
}
