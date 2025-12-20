import React from 'react';
import Logo from '../Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import DarkLightThemeToggle from '../DarkLightThemeToggle';

const Navbar = () => {

    const { user, logOut } = useAuth();

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/all-scholarships'}>All Scholarships</NavLink></li>
    </>

    const handleLogOut = () => {
        return logOut()
            .then(() => {
                console.log('Success Logout...');
            })
            .catch(error => {
                console.log('Logout Failed with: ', error.code);
            })
    }

    return (
        <nav className='md:max-w-7xl md:mx-auto pt-4'>
            <div className="navbar ">
                <div className="navbar-start w-full">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                            {
                                <li className='my-1'> <div className='flex items-center'><span className='mr-2'>Dark and Light</span> <DarkLightThemeToggle /></div></li>
                            }
                            {
                                user ? <>
                                    <li><Link to="/dashboard/my-profile">Profile</Link></li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><Link
                                        onClick={handleLogOut}
                                        to={'/'}
                                        className={'btn btn-sm btn-soft btn-warning border border-orange-400 rounded-sm font-semibold'}
                                    >
                                        Logout
                                    </Link></li>
                                    </> : <>
                                        <Link to={'/login'}
                                            className='btn btn-sm btn-soft btn-warning border border-orange-400 rounded-sm font-semibold'
                                        >
                                            Login
                                        </Link>

                                        <Link to={'/register'}
                                            className='btn btn-sm btn-soft btn-warning border border-orange-400 rounded-sm font-semibold mt-2'
                                        >
                                            SignUp
                                        </Link>
                                    </>
                            }
                                </ul>
                    </div>
                    <Logo />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="md:flex hidden gap-3 navbar-end w-full">
                    <DarkLightThemeToggle />
                    {
                        user ? <>
                            <div className='w-10 rounded-full ml-3 cursor-pointer dropdown'
                            >
                                <img tabIndex={0}
                                    className='rounded-full w-10 h-10'
                                    src={`${user && user?.photoURL}`}
                                    alt={user.displayName} />

                                {/* DROPDOWN */}
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 rounded-md w-30 -ml-18 mt-2 border border-gray-400 space-y-1"
                                >
                                    <li><Link to="/dashboard/my-profile">Profile</Link></li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><Link
                                        onClick={handleLogOut}
                                        to={'/'}
                                        className={'btn btn-sm btn-soft btn-warning border border-orange-400 text-xl rounded-sm font-semibold'}
                                    >
                                        Logout
                                    </Link></li>
                                </ul>
                            </div>
                        </> : <>
                            <Link to={'/login'}
                                className='btn btn-sm btn-soft btn-warning border border-orange-400 text-xl rounded-sm font-semibold'
                            >
                                Login
                            </Link>

                            <Link to={'/register'}
                                className='btn btn-sm btn-soft btn-warning border border-orange-400 text-xl rounded-sm font-semibold'
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