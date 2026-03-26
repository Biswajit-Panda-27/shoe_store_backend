const userModel = require('../../models/postgres/UserModel.js')
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        console.log('Users:', users); // Add logging for debugging
        res.status(200).json(users.rows); // Adjust to return the appropriate data structure
    } catch (error) {
        console.error('Error fetching users:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.getUserById(id);
        console.log('User:', user); // Add logging for debugging
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user); // Return user data
    } catch (error) {
        console.error('Error fetching user by ID:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Create new user
const createUser = async (req, res) => {
    try {
        const newUser = await userModel.createUser(req.body);
        console.log('New User Created:', newUser); // Add logging for debugging
        res.status(201).json(newUser); // Return created user data
    } catch (error) {
        console.error('Error creating user:', error); // Log the error
        res.status(400).json({ message: error.message });
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await userModel.updateUser(id, req.body);
        console.log('Updated User:', updatedUser); // Add logging for debugging
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser); // Return updated user data
    } catch (error) {
        console.error('Error updating user:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await userModel.deleteUser(id);
        console.log('User deleted:', id); // Add logging for debugging
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
