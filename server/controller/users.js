import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

// backend login and signup

export const login = async (req, res) => {
    // get the email and password from the request body
    const { email, password } = req.body;
    try {
        // check if the user exists by looking for the email in the User table
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist" });

        // if the user exists, compare the input password with the correct password by using bcrypt.compare()
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        // if the password is not correct, return json with response status "400"
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials." });

        // if success, generate the token by calling jwt.sign()(https://github.com/auth0/node-jsonwebtoken)
        // and return the result
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            "test",
            { expiresIn: "1h" }
        );
        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const signup = async (req, res) => {
    // get all user information from the request body
    const { name, email, password, confirmPassword } = req.body;
    try {
        // check if the user exists by looking for the email in the User table
        const existingUser = await User.findOne({ email });
        // if the user already exists, this email is not allowed to be used to sign up a new account. return status "404"
        if (existingUser)
            return res.status(404).json({ message: "User already exists" });

        // if the confirm password is not equal to the password, return status "400"
        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords don't match" });
        // create a hashed password by calling bcrypt.hash()
        const hashedPassword = await bcrypt.hash(password, 8);

        // create a new user
        const result = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // after the user created a new account the user should log in immediately
        const token = jwt.sign(
            { email: result.email, id: result._id },
            "test",
            {
                expiresIn: "1h",
            }
        );
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};
