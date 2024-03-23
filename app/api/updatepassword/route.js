import ConnectToMongoDB from "@/middleware/connectdb";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Calls the connect function to establish a connection to the database.
ConnectToMongoDB()

export async function POST(req) {
    try {
        // get the token and updated user details
        const reqBody = await req.json()
        const { token, updatedpassword } = reqBody

        // Verify and decode the token using the secret key
        const decodedToken = jwt.verify(token, process.env.secretToken);

        // hash new password using bcryptjs.
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(updatedpassword, salt)
        
        // find the user in db and update
        const user = await User.findOneAndUpdate(
            { _id: decodedToken.id }, // fining user using id
            { password: hashedPassword }, // updating passowrd with new ones
            { new: true } // to return the updated data
        )

        return Response.json({ message: "Password changed successfully" })
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: error.status })
    }
}