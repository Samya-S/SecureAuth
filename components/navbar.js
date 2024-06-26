"use client"
import Link from 'next/link'
import { MdOutlineLockPerson } from "react-icons/md";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../app/authContext";

const Navbar = () => {
    const router = useRouter();
    const { userToken, setUserToken } = useContext(AuthContext);
    // const [user, setuser] = useState({ value: null });
    const hostingDomain = process.env.NEXT_PUBLIC_hostingDomain
        
    // useEffect(() => {
    //     // const token = localStorage.getItem("token")
    //     // console.log(token)
    //     if (userToken) {
    //         // setuser({ value: token })
    //         // router.push(`${hostingDomain}/`) /* work pending regarding updating navbar when user logs in */
    //     }
    // }, [userToken])

    const logOut = () => {
        localStorage.removeItem("token")
        setUserToken(null)
        router.push(`${hostingDomain}/login`)
    }

    return (
        <header className="text-gray-600 body-font p-10">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center shadow-lg" style={{ border: '0px solid black', borderRadius: '30px', backgroundColor: '#fafafa' }}>
                <p className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Link href={'/'} className="md:ml-10 flex flex-row gap-2">
                        <span className=' text-3xl'><MdOutlineLockPerson /></span>
                        <span className=' text-xl'>SecureAuth</span>
                    </Link>
                </p>
                <nav className="md:mr-7 md:ml-auto flex flex-wrap items-center text-base justify-center">
                    {!userToken && (<Link href={'/login'} className="mx-3 hover:text-gray-900">Login</Link>)}
                    {!userToken && (<Link href={'/signup'} className="mx-3 hover:text-gray-900">Sign up</Link>)}
                    {userToken && (<Link href={'/dashboard'} className="mx-3 hover:text-gray-900">Dashboard</Link>)}
                    {userToken && (<a onClick={logOut} className="mx-3 hover:text-gray-900 cursor-pointer">Log out</a>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
