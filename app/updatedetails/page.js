"use client"
import { useEffect, useState, useContext } from 'react';
import { useRouter } from "next/navigation";
import { AuthContext } from "../authContext";
import styles from './updatedetails.module.css';

const UpdateDetails = () => {
    const router = useRouter();
    const { userToken, userData, setUserData } = useContext(AuthContext);
    const [updateduser, setupdateduser] = useState(userData);
    const [updatedpassword, setupdatedpassword] = useState('');
    const hostingDomain = process.env.NEXT_PUBLIC_hostingDomain

    useEffect(() => {
        // if you are logged out, redirect dashboard -> sign in
        if (!userToken) {
            router.push(`${hostingDomain}/login`)
        }
    }, [userToken])

    useEffect(() => {
        setUserData(updateduser);
    }, [updateduser]);

    const updateUserDetails = async (field) => {
        const resp = await fetch(`${hostingDomain}/api/updateuser`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Retrieve the token from the context
                token: userToken.value,
                updateduser: { [field]: updateduser[field] }
            })
        });
        const user = await resp.json()
        // console.log(user)
        alert("Details updated successfully!")
        setupdateduser({ username: user.username, email: user.email })
    }

    const updatePassword = async () => {
        // console.log("updatedpassword: " + updatedpassword)
        const resp = await fetch(`${hostingDomain}/api/updatepassword`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Retrieve the token from the context
                token: userToken.value,
                updatedpassword: updatedpassword
            })
        });
        const response = await resp.json()

        if (response.message) {
            alert(response.message)
        }
        else {
            alert("Failed to update password. Please retry.")
            console.log(response)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className={'text-center shadow-md flex flex-col gap-3 max-w-md w-11/12 ' + styles.updatedetailscontainer}>
                <p className="text-3xl">Update your details</p>
                <p className="text-xl">Change your username and email</p>
                <div className={'flex flex-col justify-center items-center gap-6 pt-4'}>
                    <div className={styles.mb3 + ' w-full'}>
                        <label htmlFor="username" className={styles.formlabel}>Enter your new username:</label>
                        <input
                            className={styles.inputfield + ' shadow-md'}
                            placeholder='Random78'
                            type="username"
                            value={updateduser.username}
                            onChange={(e) => setupdateduser({ ...updateduser, username: e.target.value })}
                            name='username'
                            id="username"
                            required
                        />
                    </div>
                    <button onClick={() => updateUserDetails('username')} className={styles.submitbtn + ' mb-4 py-2 px-5 rounded-full shadow-lg hover:shadow'}>Update Username</button>
                    <div className={styles.mb3 + ' w-full'}>
                        <label htmlFor="email" className={styles.formlabel}>Enter your new email address:</label>
                        <input
                            className={styles.inputfield + ' shadow-md'}
                            placeholder='someone@example.com'
                            type="email"
                            value={updateduser.email}
                            onChange={(e) => setupdateduser({ ...updateduser, email: e.target.value })}
                            name='email'
                            id="email"
                            aria-describedby="emailHelp"
                            required
                        />
                    </div>
                    <button onClick={() => updateUserDetails('email')} className={styles.submitbtn + ' mb-4 py-2 px-5 rounded-full shadow-lg hover:shadow'}>Update Email</button>
                </div>
                <p className="text-xl">Change your password</p>
                <form className={'flex flex-col justify-center items-center gap-6 pt-4'} onSubmit={updatePassword}>
                    <div className={styles.mb3 + ' w-full'}>
                        <label htmlFor="password" className={styles.formlabel}>Enter your new password:</label>
                        <input
                            className={styles.inputfield + ' shadow-md'}
                            placeholder='********'
                            type="password"
                            value={updatedpassword}
                            onChange={(e) => setupdatedpassword(e.target.value)}
                            name='password'
                            id="password"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitbtn + ' mb-4 py-2 px-5 rounded-full shadow-lg hover:shadow'}>Update Password</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateDetails;