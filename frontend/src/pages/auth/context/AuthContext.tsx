import React, { createContext, useState, useContext } from "react";
interface AuthContextType {
  user: string | null;
  token: string | null;
  role: string | null;
  login: (token: string, user: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  //handle login
  const login = (token: string, user: string, role: string) => {
    setToken(token);
    setUser(user);
    setRole(role);
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    localStorage.setItem("role", role);
  };
  //handle logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error while processing authentication");
  }
  return context;
};
