import React, { useState } from 'react';
import AuthContext from '../context/AuthContext';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
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

    const authInfo = {
        toggleTheme, toggle,
        user,

    }

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;