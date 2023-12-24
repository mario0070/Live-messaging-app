import React from 'react'
import { CookiesProvider, useCookies } from "react-cookie";

export default function Landing() {
  const [cookie, setCookie,] = useCookies("")

  if(cookie.token){
    window.location.href = "/dashboard"
  }else{
      window.location.href = "/login"
  }
}
