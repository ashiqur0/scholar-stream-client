import React from 'react';
import Logo from './Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {

    const {
        toggle, toggleTheme,
        user,
    } = useAuth();

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/all-scholarships'}>All Scholarships</NavLink></li>
    </>

    return (
        <nav className='md:max-w-7xl md:mx-auto pt-4'>
            <div className="navbar ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Logo />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="md:flex hidden gap-3 navbar-end">
                    <button
                        onClick={toggleTheme}
                        className="relative w-20 h-10 bg-gray-300 dark:bg-slate-900 rounded-full p-1 transition-colors duration-300">
                        {/* Sliding Circle */}
                        <div
                            className={`absolute top-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                            ${toggle ? "left-10 bg-amber-500 text-white" : "left-1 bg-indigo-700 text-white"}`}
                        >
                            {toggle ? <MdLightMode /> : <MdDarkMode />}
                        </div>
                    </button>

                    {
                        user ? <>
                            <NavLink
                                to={'/'}
                                className={'btn btn-primary rounded-sm font-semibold hover:bg-slate-800 bg-slate-900'}
                            >
                                Logout
                            </NavLink>

                            <div className='w-10 rounded-full ml-3 cursor-pointer'
                            >
                                <img src={`${user && user?.photoURL}`} alt={user?.displayName} />
                            </div>
                        </> : <>
                            <Link to={'/login'}
                            className='btn btn-primary rounded-sm font-semibold hover:bg-slate-800 bg-slate-900'
                            >
                                Login
                            </Link>

                             <Link to={'/register'}
                            className='btn btn-primary rounded-sm font-semibold hover:bg-slate-800 bg-slate-900'
                            >
                                SignUp
                            </Link>
                        </>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;