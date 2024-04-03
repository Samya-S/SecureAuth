import ConnectToMongoDB from "@/middleware/connectdb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

// Calls the connect function to establish a connection to the database.
ConnectToMongoDB()

export async function GET(req) {
    try {
        // get the token from headers
        const authorization = await req.headers.get('authorization');
        const token = authorization && authorization.split(' ')[1]; // get the token from `Bearer ${userToken.value}`

        // Verify and decode the token using the secret key
        const decodedToken = jwt.verify(token, process.env.secretToken);

        // find the user in db
        const user = await User.findOne({ _id: decodedToken.id })

        const { username, email } = user
        return Response.json({ username, email }) // same as ({ username: username, email: email })
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: error.status })
    }
}