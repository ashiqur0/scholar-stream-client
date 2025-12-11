import React from 'react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { AiOutlineGift } from "react-icons/ai";
import { IoSettingsOutline } from 'react-icons/io5';
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { FaHome, FaTasks } from 'react-icons/fa';
import logoImg from '../assets/logo.png'
import useRole from '../hooks/useRole';
import { CgProfile } from "react-icons/cg";

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
                            <img src={logoImg} className='w-8 h-auto' alt="" />
                            <span className="is-drawer-close:hidden text-xl font-bold">Scholar Stream</span>
                        </Link></li>                       

                        {/* common */}
                        <li><NavLink to={'/dashboard'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard Home">
                            <FaHome size={20} />
                            <span className="is-drawer-close:hidden">Dashboard Home</span>
                        </NavLink></li>

                        <li><NavLink to={'/dashboard/my-profile'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                            <CgProfile size={20} />
                            <span className="is-drawer-close:hidden">My Profile</span>
                        </NavLink></li>

                        {/* student only link */}
                        {
                            role === 'student' && <>
                                <li><NavLink
                                    to='/dashboard/my-parcels'
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                    data-tip="My Parcels"><AiOutlineGift size={20} />
                                    <span className='is-drawer-close:hidden'>My Parcels</span>
                                </NavLink></li>
                            </>
                        }

                        {/* moderator only links */}
                        {
                            role === 'moderator' && <>
                                <li><NavLink
                                    to='/dashboard/assigned-deliveries'
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                    data-tip="Assigned Deliveries"><FaTasks size={20} />
                                    <span className='is-drawer-close:hidden'>Assigned Deliveries</span>
                                </NavLink></li>
                            </>
                        }

                        {/* admin only links */}
                        {
                            role === 'admin' && <>
                                <li><NavLink
                                    to='/dashboard/approve-riders'
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                    data-tip="Approve Riders"><MdAssignmentTurnedIn size={20} />
                                    <span className='is-drawer-close:hidden'>Approve Riders</span>
                                </NavLink></li>
                            </>
                        }

                        {/* common links */}
                        <li><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                            <IoSettingsOutline size={20} />
                            <span className="is-drawer-close:hidden">Settings</span>
                        </button></li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;