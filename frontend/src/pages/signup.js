import React, {useState, useEffect} from 'react'
import Head from "next/head";
import {useRouter} from "next/router";

export default function signup(props) {
    const {
        showAlert,
        user
    } = props;
    const router = useRouter();
    const [signupCredentials, setSignupCredentials] = useState({ username: '', name: '', email: '', password: '', cpassword: '' });

    if (user.token) {
        router.push('/')
    }

    const handleChange = function (e) {
        setSignupCredentials(signupCredentials => ({...signupCredentials, [e.target.name]: `${e.target.value}`}))
    }

    const handleSubmit = async function (e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', signupCredentials.username);
        formData.append('name', signupCredentials.name);
        formData.append('email', signupCredentials.email);
        formData.append('password', signupCredentials.password);
        formData.append('cpassword', signupCredentials.cpassword);
        const res = await fetch('http://localhost:5000/api/handlesignup', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        console.log(data)
        showAlert(data.message, data.success?'success':'error')
        if (data.success) {
            setSignupCredentials({ username: '', name: '', email: '', password: '', cpassword: '' });
        }
        setTimeout(() => {
            router.push('/login');
        }, 2100)
    }

    return (
        <>
            <Head>
                <title>Signup - iSecure</title>
            </Head>
            <div className={"w-2/3 my-3 mx-auto"}>
                <h1 className={"font-bold text-emerald-500 text-4xl text-center mb-3"}>Signup for a new account</h1>
                <form className={"w-2/3 mx-auto"}>
                    <div className={"my-3"}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className={"block w-full p-2 border-2 border-emerald-500 focus:border-emerald-600 outline-none shadow-none rounded"} name={"username"} id={"username"} onChange={handleChange} value={signupCredentials.username}/>
                    </div>
                    <div className={"my-3"}>
                        <label htmlFor="name">Name</label>
                        <input type="text" className={"block w-full p-2 border-2 border-emerald-500 focus:border-emerald-600 outline-none shadow-none rounded"} name={"name"} id={"name"} onChange={handleChange} value={signupCredentials.name}/>
                    </div>
                    <div className={"my-3"}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className={"block w-full p-2 border-2 border-emerald-500 focus:border-emerald-600 outline-none shadow-none rounded"} name={"email"} id={"email"} onChange={handleChange} value={signupCredentials.email}/>
                    </div>
                    <div className={"my-3"}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className={"block w-full p-2 border-2 border-emerald-500 focus:border-emerald-600 outline-none shadow-none rounded"} name={"password"} id={"password"} onChange={handleChange} value={signupCredentials.password}/>
                    </div>
                    <div className={"my-3"}>
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input type="password" className={"block w-full p-2 border-2 border-emerald-500 focus:border-emerald-600 outline-none shadow-none rounded"} name={"cpassword"} id={"cpassword"} onChange={handleChange} value={signupCredentials.cpassword}/>
                    </div>
                    <button type={"button"} className={"px-2 py-2 font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded"} onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </>
    )
}