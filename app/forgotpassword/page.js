"use client"
import styles from './forgotpassword.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
    const router = useRouter();
    const [email, setemail] = useState('')
    const hostingDomain = process.env.NEXT_PUBLIC_hostingDomain

    useEffect(() => {
        // if you are signed in, redirect forgotpassword -> dashboard
        if(localStorage.getItem("token")){
            router.push(`${hostingDomain}/dashboard`)
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = { email };

        console.log(data)

        // fetch(`${process.env.NEXT_PUBLIC_hostingDomain}/api/postcontact`, {
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // }).then(response => response.text())
        // .then(data => {
        //     alert("Thanks for contacting us");
        //     setemail('')
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    }

    const handleChange = (event) => {
        if (event.target.name == 'email') {
            setemail(event.target.value)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className={'text-center shadow-md flex flex-col gap-3 max-w-md w-11/12 ' + styles.forgotpasswordcontainer}>
                <p className="text-3xl">Forgot password</p>
                <p className="text-xl">No worries! We are there to help you</p>
                <form className={'flex flex-col justify-center items-center gap-6 pt-4'} onSubmit={handleSubmit}>
                    <div className={styles.mb3 + ' w-full'}>
                        <label htmlFor="email" className={styles.formlabel}>Enter your email address:</label>
                        <input className={styles.inputfield + ' shadow-md'} placeholder='someone@example.com' type="email" value={email} onChange={handleChange} name='email' id="email" aria-describedby="emailHelp" required />
                    </div>
                    <button type="submit" className={styles.submitbtn + ' mb-4 py-2 px-5 rounded-full shadow-lg hover:shadow'}>Continue</button>
                </form>
                <p>Or do you remember it? <Link href={'/login'} style={{ color: '#1057c2' }}>Login</Link></p>
            </div>
        </div>
    )
}

export default ForgotPassword
