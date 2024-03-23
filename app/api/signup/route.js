import ConnectToMongoDB from "@/middleware/connectdb";
import User from "@/models/User";
import bcryptjs from "bcryptjs";

// Calls the connect function to establish a connection to the database
ConnectToMongoDB()

export async function POST(req) {
    try {
        // Parses the request body to extract username, email, and password.
        const reqBody = await req.json()
        const { username, email, password } = reqBody

        // Checks if a user with the same email exists. 
        const user = await User.findOne({ email })

        // If yes, returns a 400 response.
        if (user) {
            return Response.json({ error: "User already exists" }, { status: 400 })
        }

        // hash password using bcryptjs.
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // Saves the new user to the database.
        const savedUser = await newUser.save()

        return Response.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: error.status })
    }
}

