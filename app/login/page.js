"use client"
import styles from './login.module.css';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from "next/navigation";
import { AuthContext } from '../authContext';

const Login = () => {
    const router = useRouter();
    const { userToken, login } = useContext(AuthContext);
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const hostingDomain = process.env.NEXT_PUBLIC_hostingDomain

    useEffect(() => {
        // if you are signed in, redirect login -> dashboard
        // if(userToken && typeof window !== 'undefined' && window.location.pathname.includes('/login')){
        if (userToken) {
            router.push(`${hostingDomain}/dashboard`)
        }
    }, [userToken])

    const onLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await login(user);
            if (response.success) {
                router.push(`${hostingDomain}/dashboard`);
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
