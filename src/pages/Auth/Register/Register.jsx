import React from 'react';

const Register = () => {

    const handleRegistration = () => {

    }

    return (
        <div className='md:max-w-7xl min-h-screen flex flex-col justify-center items-center'>
            <div className='md:w-2/6 mx-auto bg-slate-950 p-10 rounded-2xl'>
                <h1 className='text-center md:text-2xl text-xl font-semibold mb-5'>Register Your Account</h1>

                <form onSubmit={handleRegistration} className=''>
                    <fieldset className="fieldset">

                        <label className="label">Name</label>
                        <input
                            type="txt"
                            className="input w-full"
                            placeholder="Your name "
                        />

                        <label className="label mt-4">Email</label>
                        <input
                            type="email"
                            className="input w-full"
                            placeholder="Email"
                        />

                        <label className="label mt-4">Photo</label>
                        <input
                            type="txt"
                            className="input w-full"
                            placeholder="Photo URL"
                        />

                        <label className="label mt-4">Password</label>
                        <input
                            type="password"
                            className="input w-full"
                            placeholder="Password"
                        />
                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button type='submit' className=" btn btn-neutral mt-4 bg-primary">Register</button>
                    </fieldset>
                </form>
            </div>


        </div>
    );
};

export default Register;