"use client"
import styles from './login.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
// import axios from "axios";

const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const hostingDomain = process.env.NEXT_PUBLIC_hostingDomain

    useEffect(() => {
        // if you are signed in, redirect login -> dashboard
        if(localStorage.getItem("token")){
            router.push(`${hostingDomain}/dashboard`)
        }
    })

    const onLogin = async (e) => {
        try {
            e.preventDefault() // prevents page reload while submitting

            // const response = await axios.post("/api/login", user);
            const resp = await fetch(`${hostingDomain}/api/login`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const response = await resp.json()
            // console.log(response)
            if (!response.error){
                // alert(response.message) // for (response.success) = T/F
            }
            else {
                console.log(response)
                alert("Some server error occured! Please try again later")
            }

            if (response.success) { // successful login
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', response.token); // saves jwt token in local storage to keep track of loggedin session
                }
                router.push(`${hostingDomain}/dashboard`)
            }
            else{
                alert(response.message)
            }
        }
        catch (error) {
            console.log("Login failed", error.message);
            alert("Login failed");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className={'text-center shadow-md flex flex-col gap-3 max-w-md w-11/12 ' + styles.logincontainer}>
                <p className="text-3xl">Welcome back!</p>
                <p className="text-xl">Please log into your account to continue</p>
                <form className={'flex flex-col justify-center items-center gap-6 pt-4'} onSubmit={onLogin}>
                    <div className={styles.mb3 + ' w-full'}>
                        <label htmlFor="email" className={styles.formlabel}>Enter your email address:</label>
                        <input
                            className={styles.inputfield + ' shadow-md'}
                            placeholder='someone@example.com'
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            name='email'
                            id="email"
                            aria-describedby="emailHelp"
                            required
                        />
                    </div>
                    <div className={styles.mb3 + ' w-full'}>
                        <label htmlFor="password" className={styles.formlabel}>Enter your password:</label>
                        <input
                            className={styles.inputfield + ' shadow-md'}
                            placeholder='********'
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            name='password'
                            id="password"
                            required
                        />
                    </div>
                    <Link href={'/forgotpassword'} className='text-right text-sm text-red-700 w-full underline'>Forgot your password?</Link>
                    <button type="submit" className={styles.submitbtn + ' mb-4 py-2 px-5 rounded-full shadow-lg hover:shadow'}>Submit</button>
                </form>
                <p>Don&rsquo;t have an account? <Link href={'/signup'} style={{ color: '#1057c2' }}>Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login;
