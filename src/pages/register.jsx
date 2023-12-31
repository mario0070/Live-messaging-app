import React, { useRef, useState } from 'react'
import logo from "/public/img/login_image.png"
import api from '../utils/api'
import { CookiesProvider, useCookies } from "react-cookie";

export default function Register() {
    const [logoName, setLogoName] = useState("Doot")
    const email = useRef("")
    const username = useRef("")
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

    const register = (e) => {
        var btn = document.getElementById("register")
        btn.innerHTML = `Processing <div class="spinner-border spinner-border-sm text-white"></div>`
        e.preventDefault()
        api.post("/user", {
            email : email.current.value,
            password : password.current.value,
            username : username.current.value,
        })
        .then(res => {
            // console.log(res)
            btn.innerHTML = "Register"
            alert("success", "Registration was successful")
            setCookie("token", res.data, {maxAge : 3600 * 12 })
            setTimeout(() => {
                window.location.href = "/dashboard"
            },1000)
        })
        .catch(err => {
            if(err.response.data.message == "user already exist"){
                alert("warning", "User already exist")
            }else{
                alert("error", "Something went wrong")
            }
            btn.innerHTML = "Register"
            console.log(err)
        })
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
                <h2 className='text-center'>Register Account</h2>
                <p className="muted text-center mb-5">Get your free {logoName} account now.</p>

                <form action="" onSubmit={register}>
                    <div className="input">
                        <label htmlFor="">Email</label>
                        <input ref={email} type="email" placeholder='Enter email' />
                    </div>

                    <div className="input">
                        <label htmlFor="">Username</label>
                        <input ref={username} type="text" placeholder='Enter your username' />
                    </div>

                    <div className="input">
                        <div className="d-flex forgot">
                            <label htmlFor="">Password</label>
                        </div>
                        <input ref={password} className='password' type="password" placeholder='Password' />
                        <span className="showpassword" onClick={showPassword}><i className="fa-solid fa-eye-slash"></i></span>
                    </div>

                    <p className="text-center terms mb-4">By registering you agree to the {logoName} <span>Terms of Use</span></p>

                    <button id='register' className='btn btn-success'>Register</button>

                    <div className="d-flex even with">
                        <div className="line"></div>
                        <p className="mb-0 mx-2 mt-0">Continue in with</p>
                        <div className="line"></div>
                    </div>

                    <div className="d-flex even social">
                        <p className=""><i class="fa-brands fa-google-plus-g text-danger"></i></p>
                        <p className=""><i class="fa-brands fa-facebook text-info"></i></p>
                    </div>

                    <p className="text-center muted mt-4">Already have an account ? <a href="/login">Login</a></p>
                    <p className="text-center muted">© 2023 {logoName}. Crafted by <strong>Muhammadjamiu</strong></p>
                </form>
            </div>
        </div>
    </div>
    )
}
