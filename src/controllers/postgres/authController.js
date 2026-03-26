const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/postgres/UserModel.js"); // Adjust based on path
const SECRET_KEY = "your_secret_key"; // Ideally, store in environment variables

// Signup function
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Log incoming data for debugging
    console.log(req.body);

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password using the salt

    const newUser = await User.createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, SECRET_KEY);
    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};



// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// userProfile function remains as it is
const userProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user id from JWT
    const user = await User.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { signup, login, deleteUser, userProfile };
