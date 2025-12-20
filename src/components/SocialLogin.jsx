import React from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {

    const { signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleLoginWithGoogle = () => {
        signInWithGoogle()
            .then(res => {

                // store user into database
                const userInfo = {
                    displayName: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL
                }

                axiosSecure.post('/users', userInfo)
                    .then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "successfully Logged In With Google",
                            showConfirmButton: false,
                            timer: 2500
                        });
                        navigate(location.state || '/');
                    })
            })
            .catch(err => {
                console.log('error during login with google', err)
            });
    }

    return (
        <div className='w-full'>

            <p className='text-center text-2xl font-semibold my-3'>Or</p>

            {/* Google */}
            <button onClick={handleLoginWithGoogle} className="btn btn-soft btn-warning w-full border border-orange-400">
                <FcGoogle size={22} />
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;