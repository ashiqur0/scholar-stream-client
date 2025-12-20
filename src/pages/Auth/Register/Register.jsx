import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SocialLogin from '../../../components/SocialLogin';
import Swal from 'sweetalert2';

const Register = () => {

    const { register: createUserWithEmail, updateUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure()

    const handleRegistration = (data) => {

        const profileImage = data.photo[0];

        createUserWithEmail(data.email, data.password)
            .then(() => {
                console.log('user registered');

                // store the image in form data
                const formData = new FormData();
                formData.append('image', profileImage);

                // image bb photo upload api url
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`

                // store photo to img bb database
                axios.post(image_API_URL, formData)
                    .then(res => {

                        // get direct link
                        const photoURL = res.data.data.url;

                        // store user to database
                        const userInfo = {
                            displayName: data.name,
                            email: data.email,
                            photoURL: photoURL
                        }

                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                console.log('user is created in the database', res.data);
                            })

                        // update firebase user profile
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUser(userProfile)
                            .then(() => {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Registration successful",
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                                navigate(location.state || '/')
                            })
                            .then(err => {
                                console.log('error updating profile', err);
                            })
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='md:max-w-7xl min-h-screen flex flex-col justify-center items-center'>
            <title>Register</title>
            <div className='md:w-2/6 mx-auto md:p-10 px-4 rounded-2xl w-full'>
                <h1 className='text-center md:text-2xl text-xl font-semibold mb-5'>Register Your Account</h1>

                <form onSubmit={handleSubmit(handleRegistration)} className=''>
                    <fieldset className="fieldset">

                        <label className="label">Name</label>
                        <input
                            type="txt"
                            className="input w-full"
                            placeholder="Your name "
                            {...register('name', { required: true })}
                        />
                        {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}

                        <label className="label mt-4">Email</label>
                        <input
                            type="email"
                            className="input w-full"
                            placeholder="Email"
                            {...register('email', { required: true })}
                        />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is Required</p>}

                        <label className="label mt-4">Photo</label>
                        <input
                            type="file"
                            className="file-input w-full"
                            placeholder="Photo URL"
                            {...register('photo', { required: true })}
                        />
                        {errors.photo?.type === 'required' && <p className='text-red-500'>Photo is required</p>}

                        <label className="label mt-4">Password</label>
                        <input
                            type="password"
                            className="input w-full"
                            placeholder="Password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
                            })}
                        />
                        {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500'>Password should be at least 6 character</p>}
                        {errors.password?.type === 'pattern' && <p className='text-red-500'>Password combination: uppercase, lowercase, digit, and special character</p>}

                        <button type='submit' className=" btn btn-soft btn-warning border border-orange-400 mt-4">Register</button>
                        <p>Already have an account? <Link to='/login' state={location?.state} className='text-purple-500'>login</Link> </p>
                    </fieldset>
                </form>

                <SocialLogin />
            </div>


        </div>
    );
};

export default Register;