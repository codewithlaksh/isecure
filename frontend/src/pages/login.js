import React, {useEffect, useState} from 'react';
import Head from "next/head";
import {useRouter} from "next/router";

export default function login(props) {
    const {
        showAlert,
        user
    } = props;
    const router = useRouter();
    const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });

    if (user.token) {
        router.push('/')
    }

    const handleChange = function (e) {
        setLoginCredentials(loginCredentials => ({...loginCredentials, [e.target.name]: `${e.target.value}`}))
    }

    const handleSubmit = async function (e) {
        e.preventDefault();
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', loginCredentials.username);
        formData.append('password', loginCredentials.password);
        const res = await fetch('http://localhost:5000/api/handlelogin', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        showAlert(data.message, data.success?'success':'error')
        if (data.success) {
            localStorage.setItem('isecure', JSON.stringify({
                'token': data.token,
                'user': data.user
            }))
        }
        setTimeout(() => {
            router.push('/');
        }, 2100)
    }

    return (
        <>
            <Head>
                <title>Login - iSecure</title>
            </Head>
            <div className={"w-2/3 my-3 mx-auto"}>
                <h1 className={"font-bold text-emerald-500 text-4xl text-center mb-3"}>Login to your account</h1>
                <form className={"w-2/3 mx-auto"}>
                    <div className={"my-3"}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className={"block w-full p-2 border-2 border-emerald-500 focus:border-emerald-600 outline-none shadow-none rounded"} name={"username"} id={"username"} onChange={handleChange}/>
                    </div>
                    <div className={"my-3"}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className={"block w-full p-2 border-2 border-emerald-500 focus:border-emerald-600 outline-none shadow-none rounded"} name={"password"} id={"password"} onChange={handleChange}/>
                    </div>
                    <button type={"button"} className={"px-2 py-2 font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded"} onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </>
    )
}