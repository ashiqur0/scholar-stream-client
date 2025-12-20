import React from 'react';
import Logo from '../Logo';
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
            <nav>
                <Logo />
                <p className='md:w-100'>Your bridge to global education. Connecting students with life-changing scholarship opportunities worldwide.</p>
            </nav>
            <nav>
                <h6 className="footer-title">Navigation</h6>
                <Link to={'/'} className="link link-hover">🏠 Home</Link>
                <Link to={'/all-scholarships'} className="link link-hover">🌍 All Scholarships</Link>
                <Link to={'/dashboard'} className="link link-hover">📊 Dashboard</Link>
                <Link to={'/register'} className="link link-hover">📝 Register</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Scholarship Categories</h6>
                <Link className="link link-hover">💰 Full Fund Scholarships</Link>
                <Link className="link link-hover">💸 Partial Fund</Link>
                <Link className="link link-hover">🎓 Self-Funded Programs</Link>
                <Link className="link link-hover">📜 Diploma & Bachelor</Link>
                <Link className="link link-hover">🎓 Masters & PhD</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Contact & Support</h6>
                <Link className="link link-hover">📍 Address: 123 Education Hub, Global City</Link>
                <Link className="link link-hover">📞 Phone: +1 (555) 000-SHLR</Link>
                <Link className="link link-hover">✉️ Email: support@scholarstream.com</Link>
                <Link className="link link-hover">❓ F.A.Q</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <Link><FaXTwitter size={20} /></Link>
                    <Link><FaYoutube size={20} /></Link>
                    <Link><ImFacebook size={20} /></Link>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;