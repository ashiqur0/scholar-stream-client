import React, { useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import useAxios from '../hooks/useAxios';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {

    // Theme related functionalities
    const [toggle, setToggle] = useState(true);
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => {
        toggle ? setTheme('dark') : setTheme('light');
        setToggle(!toggle);
        document.documentElement.setAttribute("data-theme", theme);
    }

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();

    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const loggedUser = { email: currentUser.email };
                axios.post('/getToken', loggedUser)
                    .then(res => {
                        localStorage.setItem(`token${user._id}`, res.data.token)
                    })
            } else {
                localStorage.removeItem('token');
            }

            setLoading(false);
        });

        return () => {
            unsubscribe();
        }
    }, [axios, user]);

    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    }

    const authInfo = {
        toggleTheme, toggle,
        user, loading,
        register, login, signInWithGoogle, logOut, updateUser
    }

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;