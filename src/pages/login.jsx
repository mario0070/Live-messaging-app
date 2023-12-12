import React, { useEffect, useState } from 'react'
import "/public/css/style.css"
import logo from "/public/img/login_image.png"

export default function Login() {
    const [logoName, setLogoName] = useState("Doot")

    return (
    <div className='login fade_load'>
        <div className="d-flex content">
            <div className="logo">
                <h2 className='fw-bold text-white'>{logoName}</h2>
                <p className="text-muted">Responsive Bootstrap 5 Chat App</p>
                <div className="img">
                    <img src={logo} alt="" />
                </div>
            </div>

            <div className="form">
                <h2 className='text-center'>Welcome Back</h2>
                <p className="muted text-center mb-5">Sign in to continue to {logoName}</p>

                <form action="">
                    <div className="input">
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder='Enter your username' />
                    </div>

                    <div className="input">
                        <div className="d-flex forgot">
                            <label htmlFor="">Password</label>
                        </div>
                        <input type="password" placeholder='Password' />
                    </div>

                    <div className="d-flex rem">
                        <input type="checkbox" name="" id="" />
                        <p className="mb-0 mx-1">Remember me</p>
                        
                        <a href="/" className='mx-2'>Forgot Password?</a>
                    </div>

                    <button className='btn btn-success'>Log In</button>

                    <div className="d-flex even with">
                        <div className="line"></div>
                        <p className="mb-0 mx-2 mt-0">Sign in with</p>
                        <div className="line"></div>
                    </div>

                    <div className="d-flex even social">
                        <p className="">facebook</p>
                        <p className="">facebook</p>
                    </div>

                    <p className="text-center muted mt-4">Don't have an account ? <a href="/register">Register</a></p>
                    <p className="text-center muted">© 2023 {logoName}. Crafted by <strong>Muhammadjamiu</strong></p>
                </form>
            </div>
        </div>
    </div>
    )
}
