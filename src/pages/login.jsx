import React, { useEffect, useRef, useState } from 'react'
import "/public/css/style.css"
import logo from "/public/img/login_image.png"
import api from '../utils/api'
import { CookiesProvider, useCookies } from "react-cookie";
import { redirect } from 'react-router-dom';

export default function Login() {
    const [logoName, setLogoName] = useState("Doot") 
    const email = useRef("")
    const password = useRef("")
    const [cookie, setCookie] = useCookies()

    const alert = (icon,msg) => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icon,
            title: msg
        });
    }

    const login = (e) => {
        var btn = document.getElementById("login")
        btn.innerHTML = `Processing <div class="spinner-border spinner-border-sm text-white"></div>`
        e.preventDefault()
        api.post("/user/login", {
            email : email.current.value,
            password : password.current.value,
        })
        .then(res => {
            console.log(res)
            setCookie("token", res.data, {maxAge : 3600 * 12 })
            btn.innerHTML = "Log In"
            alert("success", "Login was successful")
            setTimeout(() => {
                window.location.href = "/dashboard"
            },1000)
        })
        .catch(err => {
            btn.innerHTML = "Log In"
            alert("error", "Invalid credentials")
            console.log(err)
        })
    }

    const googleLogin = () => {
        api.get("/user/google-login")
        .then(res => {
            window.location.href = res.data.url
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    const showPassword = () => {
        var password = document.querySelector(".password")
        var showpassword = document.querySelector(".showpassword")
        if(password.type == "password"){
            password.type = "text"
            showpassword.innerHTML = `<i class="fa-solid fa-eye"></i>`
            showpassword.style.color = "green"
        }else{
            password.type = "password"
            showpassword.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`
            showpassword.style.color = "grey"
        }
    }


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
                <img src={logo} alt="" className='text-center'/>
                <h2 className='text-center'>Welcome Back</h2>
                <p className="muted text-center mb-5">Sign in to continue to {logoName}</p>

                <form action="" onSubmit={login}>
                    <div className="input">
                        <label htmlFor="">Email</label>
                        <input ref={email} type="email" placeholder='Enter your email' />
                    </div>

                    <div className="input">
                        <div className="d-flex forgot">
                            <label htmlFor="">Password</label>
                        </div>
                        <div className="">
                            <input ref={password} className='password' type="password" placeholder='Password' />
                            <span className="showpassword" onClick={showPassword}><i className="fa-solid fa-eye-slash"></i></span>
                        </div>
                    </div>

                    

                    <div className="d-flex rem">
                        <input type="checkbox" name="" id="" />
                        <p className="mb-0 mx-1">Remember me</p>
                        
                        <a href="/" className='mx-2'>Forgot Password?</a>
                    </div>

                    <button className='btn btn-success' id='login'>Log In</button>

                    <div className="d-flex even with">
                        <div className="line"></div>
                        <p className="mb-0 mx-2 mt-0">Sign in with</p>
                        <div className="line"></div>
                    </div>

                    <div className="d-flex even social">
                        <p className="" onClick={googleLogin}><i class="fa-brands fa-google-plus-g text-danger"></i></p>
                        <p className=""><i class="fa-brands fa-facebook text-info"></i></p>
                    </div>

                    <p className="text-center muted mt-4">Don't have an account ? <a href="/register">Register</a></p>
                    <p className="text-center muted">© 2023 {logoName}. Crafted by <strong>Muhammadjamiu</strong></p>
                </form>
            </div>
        </div>
    </div>
    )
}
