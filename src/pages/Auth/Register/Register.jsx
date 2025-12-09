import React from 'react';

const Register = () => {
    return (
        <div className='md:max-w-7xl min-h-screen flex flex-col justify-center items-center'>
            <h1 className='text-center md:text-2xl text-xl font-semibold mb-10'>Register Your Account</h1>

            <form className='md:w-1/4 mx-auto'>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
            </form>

        </div>
    );
};

export default Register;