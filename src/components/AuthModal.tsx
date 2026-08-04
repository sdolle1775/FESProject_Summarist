import { useEffect, useState, type FormEvent, type MouseEvent } from "react";
import { UserRound, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function AuthModal() {
  const { authMode, closeAuth, login, loginAsGuest, register, openAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");
  }, [authMode]);

  if (!authMode) return null;
  const isLogin = authMode === "login";

  const finish = () => {
    if (location.pathname === "/") navigate("/for-you");
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      if (isLogin) login(email, password);
      else register(email, password);
      finish();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Something went wrong.");
    }
  };

  const guestLogin = () => {
    loginAsGuest();
    finish();
  };

  const dismissBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeAuth();
  };

  return (
    <div className="modal-backdrop" onMouseDown={dismissBackdrop} role="presentation">
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="modal-close" onClick={closeAuth} aria-label="Close authentication dialog">
          <X size={25} />
        </button>
        <h2 id="auth-title">{isLogin ? "Log in to Summarist" : "Sign up to Summarist"}</h2>
        {isLogin && (
          <>
            <button className="guest-button" onClick={guestLogin}>
              <UserRound size={20} fill="currentColor" />
              Login as a Guest
            </button>
            <div className="auth-divider"><span>or</span></div>
          </>
        )}
        <form onSubmit={submit} noValidate>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <label className="sr-only" htmlFor="auth-email">Email address</label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="sr-only" htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary-button auth-submit" type="submit">
            {isLogin ? "Login" : "Sign up"}
          </button>
        </form>
        <button className="auth-switch" onClick={() => openAuth(isLogin ? "register" : "login")}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </button>
      </section>
    </div>
  );
}
