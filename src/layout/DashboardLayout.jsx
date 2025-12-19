import React from 'react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { AiOutlineGift } from "react-icons/ai";
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { FaHome, FaTasks, FaUsers } from 'react-icons/fa';
import { GiGraduateCap } from "react-icons/gi";
import useRole from '../hooks/useRole';
import { CgProfile } from "react-icons/cg";
import { MdLibraryAdd } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";

const DashboardLayout = () => {

    const [expand, setExpand] = useState(true);
    const { role } = useRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

                {/* Navbar */}
                <nav onClick={() => setExpand(!expand)} className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        {
                            !expand && <GoSidebarExpand size={20} /> || <GoSidebarCollapse size={20} />
                        }
                    </label>
                    <div className="px-4 text-[1rem] font-semibold">Scholar Stream Dashboard</div>
                </nav>

                {/* Page content here */}
                <Outlet />

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow space-y-2">

                        {/* common links*/}
                        <li><Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                            <GiGraduateCap size={25}/>
                            <span className="is-drawer-close:hidden text-xl font-bold">Scholar Stream</span>
                        </Link></li>

                        <li><Link to={'/dashboard'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard Home">
                            <IoHomeOutline size={20} />
                            <span className="is-drawer-close:hidden">Dashboard Home</span>
                        </Link></li>

                        <li><NavLink to={'/dashboard/my-profile'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                            <CgProfile size={20} />
                            <span className="is-drawer-close:hidden">My Profile</span>
                        </NavLink></li>

                        {/* student only link */}
                        {
                            role === 'student' && <>
                                <li><NavLink
                                    to='/dashboard/my-applications'
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                    data-tip="My Applications"><FaWpforms size={20} />
                                    <span className='is-drawer-close:hidden'>My Applications</span>
                                </NavLink></li>

                                <li><NavLink
                                    to='/dashboard/my-reviews'
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                    data-tip="My Reviews"><MdRateReview size={20} />
                                    <span className='is-drawer-close:hidden'>My Reviews</span>
                                </NavLink></li>
                            </>
                        }

                        {/* moderator only links */}
                        {
                            role === 'moderator' && <>
                                <li><NavLink
                                    to='/dashboard/manage-applied-applications'
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                    data-tip="Manage Applications"><MdManageHistory size={20} />
                                    <span className='is-drawer-close:hidden'>Manage Applications</span>
                                </NavLink></li>

                                <li><NavLink
                                    to='/dashboard/all-reviews'
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                    data-tip="All Reviews"><MdRateReview size={20} />
                                    <span className='is-drawer-close:hidden'>All Reviews</span>
                                </NavLink></li>
                            </>
                        }

                        {/* admin only links */}
                        {
                            role === 'admin' && <>
                                <li><NavLink
                                    to='/dashboard/add-scholarship'
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                    data-tip="Add Scholarship"><MdLibraryAdd size={20} />
                                    <span className='is-drawer-close:hidden'>Add Scholarship</span>
                                </NavLink></li>

                                <li><NavLink
                                    to='/dashboard/manage-scholarship'
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                    data-tip="Manage Scholarship"><MdManageHistory size={20} />
                                    <span className='is-drawer-close:hidden'>Manage Scholarship</span>
                                </NavLink></li>

                                <li><NavLink
                                    to='/dashboard/manage-users'
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                    data-tip="Manage Users"><FaUsers size={20} />
                                    <span className='is-drawer-close:hidden'>Manage Users</span>
                                </NavLink></li>

                                <li><NavLink
                                    to='/dashboard/analytics'
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                    data-tip="Analytics"><IoAnalyticsSharp size={20} />
                                    <span className='is-drawer-close:hidden'>Analytics</span>
                                </NavLink></li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;