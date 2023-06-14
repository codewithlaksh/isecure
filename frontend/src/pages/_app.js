import React, { useState, useEffect } from "react";
import '@/styles/globals.css'
import Header from "@/components/Header";
import Alert from "@/components/Alert";
import {useRouter} from "next/router";

export default function App({ Component, pageProps }) {
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({ token: null, user: null });
  const [key, setKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
      const token = localStorage.getItem('isecure');
      if (token) {
        let parsedToken = JSON.parse(token);
        setUser({
            token: parsedToken.token,
            user: parsedToken.user
        });
        setKey(Math.random());
      }
  }, [router.query])

  const showAlert = (msg, type) => {
      setAlert({
          message: msg,
          status: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 2000)
  }

    const logout = () => {
        localStorage.removeItem('isecure');
        showAlert('You have been logged out successfully!', 'success');
        setKey(Math.random());
        setUser({ token: null, user: null })
        router.push('/login');
    }

  return (
      <>
        <Header key={key} user={user} logout={logout} />
        <Alert alert={alert}/>
        <Component {...pageProps} showAlert={showAlert} user={user}/>
      </>
  )
}
