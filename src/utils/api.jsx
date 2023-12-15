import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

if(Cookies.get('user_token')){
    var data = JSON.parse(Cookies.get('user_token'))
    var API =  axios.create({
        baseURL: 'https://live-messaging-api.onrender.com',
        headers: {
            "Authorization" : `Bearer ${data.token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    });

}else{
    var API =  axios.create({
        baseURL: 'https://live-messaging-api.onrender.com',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    });
}

export default API


