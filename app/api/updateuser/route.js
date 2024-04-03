import ConnectToMongoDB from "@/middleware/connectdb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

// Calls the connect function to establish a connection to the database.
ConnectToMongoDB()

export async function POST(req) {
    try {
        // get the token and updated user details
        const reqBody = await req.json()
        const { token, updateduser } = reqBody

        // Verify and decode the token using the secret key
        const decodedToken = jwt.verify(token, process.env.secretToken);

        // find the user in db and update
        const user = await User.findOneAndUpdate(
            { _id: decodedToken.id }, // finding user using id
            { username: updateduser.username, email: updateduser.email }, // updating data with new ones
            { new: true } // to return the updated data
        )

        const { username, email } = user
        return Response.json({ username, email }) // same as ({ username: username, email: email })
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: error.status })
    }
}