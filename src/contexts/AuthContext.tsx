/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { FAKE_USER } from "../components/constant";
import { UserType } from "../components/model";

type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type AuthProviderType = {
  children: React.ReactNode;
};

type StateType = {
  user: UserType | null;
  isAuthenticated: boolean;
};

type ActionType = {
  type: string;
  payload?: UserType;
};

const initState: StateType = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload as UserType,
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Invalid action type");
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderType) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initState);

  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
