"use client"
import { useEffect, useContext } from 'react'
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { AuthContext } from '../authContext';

const Dashboard = () => {
	const router = useRouter();
	const { userToken, userData } = useContext(AuthContext);
	const hostingDomain = process.env.NEXT_PUBLIC_hostingDomain

	useEffect(() => {
		// if you are logged out, redirect dashboard -> sign in
		if (!userToken) {
			router.push(`${hostingDomain}/login`)
		}
	}, [userToken])

	return (
		<div className='p-10'>
			<p>Dashboard</p>
			<p>Username: {userData.username}</p>
			<p>Email: {userData.email}</p>
			<Link href={'/updatedetails'}>Update</Link>
		</div>
	)
}

export default Dashboard;
