import React, { useState } from 'react';
import AuthContext from '../context/AuthContext';
import { getAuth } from "firebase/auth";
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

    

    const authInfo = {
        toggleTheme, toggle,

    }

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;