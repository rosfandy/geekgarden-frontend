import React, { createContext, useState, ReactNode } from "react";

interface Auth {
    token: string | null;
    isAdmin: boolean | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextType {
    auth: Auth;
    setAuth: (auth: Auth) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<Auth>({
        token: null,
        isAdmin: null
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };


