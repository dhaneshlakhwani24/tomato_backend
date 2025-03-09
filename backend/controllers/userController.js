import userModel from "../models/userModel.js";

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Name, email, and password are required." });
    }

    try {
        const newUser = new userModel({ name, email, password });
        await newUser.save();
        res.json({ success: true, message: "User registered successfully." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occurred while registering the user." });
    }
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }
        res.json({ success: true, message: "User logged in successfully." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occurred while logging in." });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occurred while fetching user profile." });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.json({ success: true, message: "User profile updated successfully." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occurred while updating user profile." });
    }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile };
