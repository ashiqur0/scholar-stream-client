import React, { useState } from 'react';
import AuthContext from '../context/AuthContext';

const AuthProvider = ({ children }) => {

    // Theme related functionalities
    const [toggle, setToggle] = useState(true);
    const [theme, setTheme] = useState('dark');
    const changeTheme = () => {
        toggle ? setTheme('dark') : setTheme('light');
        setToggle(!toggle);

        document.documentElement.setAttribute("data-theme", theme);
    }

    const authInfo = {
        changeTheme,
    }

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;