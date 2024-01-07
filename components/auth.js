import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {}
  });

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    console.log(user)

    const logout = () => {

        // 쿠키 삭제
        document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        setUser(null);
        
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
