import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegistration = (data) => {
        console.log(data);
    }

    return (
        <div className='md:max-w-7xl min-h-screen flex flex-col justify-center items-center'>
            <div className='md:w-2/6 mx-auto bg-slate-950 p-10 rounded-2xl'>
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
                            type="txt"
                            className="input w-full"
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

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button type='submit' className=" btn btn-neutral mt-4 bg-primary">Register</button>
                        <p>Already have an account? <Link to='/login' state={location?.state} className='text-blue-700'>login</Link> </p>
                    </fieldset>
                </form>
            </div>


        </div>
    );
};

export default Register;