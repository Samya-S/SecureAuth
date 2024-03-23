"use client"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Link from 'next/link';

const Dashboard = () => {
  const router = useRouter();
  const [userdata, setuserdata] = useState({
    username: "",
    email: "",
  })
  const hostingDomain = process.env.NEXT_PUBLIC_hostingDomain

  useEffect(() => {
    // if you are logged out, redirect dashboard -> sign in
    if (!localStorage.getItem("token")) {
      router.push(`${hostingDomain}/login`)
    }
  })

  // let flag = true;

  const getUserDetails = async () => {
    try {
      const resp = await fetch(`${hostingDomain}/api/getuser`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Retrieve the token from the local storage
          token: localStorage.getItem("token")
        })
      });
      const user = await resp.json()
      console.log(user)
      setuserdata(user)
    }
    catch (error) {
      console.log("Error: (status", error.status, ") ", error.message);
    }
  }
  // if (flag) {
  // flag = false
  getUserDetails()
  // };

  return (
    <div className='p-10'>
      <p>Dashboard</p>
      {/* <button onClick={getUserDetails} className={''}>getUserDetails</button> */}
      <p>Username: {userdata.username}</p>
      <p>Email: {userdata.email}</p>
      <Link href={'/updatedetails'}>Update</Link>
    </div>
  )
}

export default Dashboard
