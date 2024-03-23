import ConnectToMongoDB from "@/middleware/connectdb";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Calls the connect function to establish a connection to the database.
ConnectToMongoDB()

export async function POST(req) {
    try {
        const reqBody = await req.json()
        const { email, password } = reqBody

        // check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return Response.json({ success: false, message: "Incorrrect credentials" }, { status: 200 })
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return Response.json({ success: false, message: "Incorrrect credentials" }, { status: 200 })
        }

        // create token data
        const tokenData = {
            id: user._id,
            // username: user.username,
            // email: user.email
        }
        const secretToken = process.env.secretToken
        // Create a token with expiration of 1 day
        const token = jwt.sign(tokenData, secretToken, { expiresIn: "1d" })

        // Create a JSON response indicating successful login
        const response = Response.json({
            success: true,
            message: "Login successful",
            token: token
        })

        // Set the token as an HTTP-only cookie /* here is the issue */ /* token passed as response and saved to localst. later */
        // response.cookies.set("token", token, {
        //     httpOnly: true,
        // })
        // alternatively storing the token in local storage
        // localStorage.setItem('token', token)
        // if (typeof window !== 'undefined') {
        //     localStorage.setItem('token', token);
        //     response.cookies.set("token", token, {
        //         httpOnly: true,
        //     })
        // }

        return response;

    }
    catch (error) {
        return Response.json({ error: error.message }, { status: error.status })
    }
}