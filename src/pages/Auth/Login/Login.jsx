import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../../components/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {

    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        login(data.email, data.password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login in successful",
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate(location.state || '/');
            })
            .catch(err => {
                console.log('error while login', err);
            })
    }

    return (
        <div className='md:max-w-7xl min-h-screen flex flex-col justify-center items-center'>
            <div className='md:w-2/6 mx-auto bg-slate-950 p-10 rounded-2xl'>
                <h1 className='text-center md:text-2xl text-xl font-semibold mb-5'>Login Your Account</h1>

                <form onSubmit={handleSubmit(handleLogin)} className=''>
                    <fieldset className="fieldset">

                        <label className="label mt-4">Email</label>
                        <input
                            type="email"
                            className="input w-full"
                            placeholder="Email"
                            {...register('email', { required: true })}
                        />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is Required</p>}

                        <label className="label mt-4">Password</label>
                        <input
                            type="password"
                            className="input w-full"
                            placeholder="Password"
                            {...register('password', { required: true })}
                        />
                        {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button type='submit' className=" btn btn-neutral mt-4 bg-primary">Login</button>
                        <p>Already have an account? <Link to='/register' state={location?.state} className='text-blue-700'>register</Link> </p>
                    </fieldset>
                </form>

                <SocialLogin />
            </div>


        </div>
    );
};

export default Login;