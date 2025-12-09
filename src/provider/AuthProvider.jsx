import React, { useState } from 'react';
import AuthContext from '../context/AuthContext';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.config';

const auth = getAuth(app)
const AuthProvider = ({ children }) => {

    // Theme related functionalities
    const [toggle, setToggle] = useState(true);
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => {
        toggle ? setTheme('dark') : setTheme('light');
        setToggle(!toggle);
        document.documentElement.setAttribute("data-theme", theme);
    }

    const [user, serUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const authInfo = {
        toggleTheme, toggle,
        user, loading,
        register, login,
    }

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;