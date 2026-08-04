import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Plan, StoredAccount, User } from "../types";

type AuthMode = "login" | "register";

interface AuthContextValue {
  user: User | null;
  authMode: AuthMode | null;
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
  setPlan: (plan: Plan) => void;
}

const USER_KEY = "summarist:user";
const ACCOUNTS_KEY = "summarist:accounts";
const AuthContext = createContext<AuthContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStorage(USER_KEY, null));
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  const saveUser = useCallback((nextUser: User | null) => {
    setUser(nextUser);
    if (nextUser) localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    else localStorage.removeItem(USER_KEY);
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      if (!validEmail(email)) throw new Error("Please enter a valid email address.");
      const accounts = readStorage<StoredAccount[]>(ACCOUNTS_KEY, []);
      const account = accounts.find(
        (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
      );
      if (!account || account.password !== password) {
        throw new Error("The email or password you entered is incorrect.");
      }
      saveUser({ email: account.email, plan: account.plan });
      setAuthMode(null);
    },
    [saveUser],
  );

  const register = useCallback(
    (email: string, password: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      if (!validEmail(normalizedEmail)) throw new Error("Please enter a valid email address.");
      if (password.length < 6) throw new Error("Your password must be at least 6 characters.");
      const accounts = readStorage<StoredAccount[]>(ACCOUNTS_KEY, []);
      if (accounts.some((item) => item.email.toLowerCase() === normalizedEmail)) {
        throw new Error("An account with this email already exists.");
      }
      const account: StoredAccount = { email: normalizedEmail, password, plan: "basic" };
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
      saveUser({ email: account.email, plan: account.plan });
      setAuthMode(null);
    },
    [saveUser],
  );

  const loginAsGuest = useCallback(() => {
    saveUser({ email: "guest@summarist.com", plan: "basic", guest: true });
    setAuthMode(null);
  }, [saveUser]);

  const setPlan = useCallback(
    (plan: Plan) => {
      if (!user) return;
      const next = { ...user, plan };
      saveUser(next);
      if (!user.guest) {
        const accounts = readStorage<StoredAccount[]>(ACCOUNTS_KEY, []);
        localStorage.setItem(
          ACCOUNTS_KEY,
          JSON.stringify(accounts.map((item) => (item.email === user.email ? { ...item, plan } : item))),
        );
      }
    },
    [saveUser, user],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      authMode,
      openAuth: (mode = "login") => setAuthMode(mode),
      closeAuth: () => setAuthMode(null),
      login,
      register,
      loginAsGuest,
      logout: () => saveUser(null),
      setPlan,
    }),
    [authMode, login, loginAsGuest, register, saveUser, setPlan, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
