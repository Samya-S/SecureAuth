"use client"
import styles from './signup.module.css'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from "next/navigation";
import { AuthContext } from '../authContext';

const SignUp = () => {
    const router = useRouter();
    const { signUp, userToken } = useContext(AuthContext);
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })
    const hostingDomain = process.env.NEXT_PUBLIC_hostingDomain

    useEffect(() => {
        // if you are signed in, redirect signup -> dashboard
        if(userToken){
            router.push(`${hostingDomain}/dashboard`)
        }
    }, [userToken])

    const onSignup = async (e) => {
        e.preventDefault() // prevents page reload while submitting
        try {
            await signUp(user);
            alert("Congrats! your account has been created. Now you can sign in to your account.")
            router.push(`${hostingDomain}/login`);
        }
        catch (error) {
            alert("Sorry! your account cannot created. Please try again.")
            console.log("Signup failed", error.message);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className={'text-center shadow-md flex flex-col gap-3 max-w-md w-11/12 ' + styles.signupcontainer}>
                <p className="text-3xl">Create an Account</p>
                <p className="text-xl">Join us by creating an account</p>
                <form className={'flex flex-col justify-center items-center gap-6 pt-4'} onSubmit={onSignup}>
                    <div className={styles.mb3 + ' w-full'}>
                        <label htmlFor="username" className={styles.formlabel}>Enter your username:</label>
                        <input
                            className={styles.inputfield + ' shadow-md'}
                            placeholder='Random78'
                            type="username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            name='username'
                            id="username"
                            required
                        />
                    </div>
                    <div className={styles.mb3 + ' w-full'}>
                        <label htmlFor="email" className={styles.formlabel}>Enter your email address:</label>
                        <input
                            className={styles.inputfield + ' shadow-md'}
                            placeholder='someone@example.com'
                            type="email" value={user.email}
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
                    <button type="submit" className={styles.submitbtn + ' my-4 py-2 px-5 rounded-full shadow-lg hover:shadow'}>Submit</button>
                </form>
                <p>Already have an account? <Link href={'/login'} style={{ color: '#1057c2' }}>Login</Link></p>
            </div>
        </div>
    )
}

export default SignUp;
