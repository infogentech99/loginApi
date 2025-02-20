// // // require('dotenv').config();
// // // const express = require('express');
// // // const jwt = require('jsonwebtoken');
// // // const bodyParser = require('body-parser');

// // // const app = express();
// // // app.use(bodyParser.json());

// // // const SECRET_KEY = 'your_secret_key'; // Change this to a strong secret

// // // // Dummy User (Replace with Database in real-world apps)
// // // const USER = { username: 'admin', password: 'password123' };

// // // // Login Route
// // // app.post('/login', (req, res) => {
// // //     const { username, password } = req.body;

// // //     if (username !== USER.username || password !== USER.password) {
// // //         return res.status(401).json({ message: 'Invalid username or password' });
// // //     }

// // //     const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
// // //     res.json({ message: 'Login successful', token });
// // // });

// // // // Start Server
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// // require('dotenv').config();
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');

// // const app = express();
// // app.use(express.json());
// // app.use(bodyParser.json());

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGO_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // }).then(() => console.log("MongoDB Connected"))
// // .catch(err => console.error(err));

// // // User Schema
// // const UserSchema = new mongoose.Schema({
// //     username: { type: String, required: true, unique: true },
// //     password: { type: String, required: true }
// // });

// // const User = mongoose.model('User', UserSchema);

// // // Login API
// // app.post('/login', async (req, res) => {
// //     const { username, password } = req.body;

// //     if (!username || !password) {
// //         return res.status(400).json({ message: "Username and password are required" });
// //     }

// //     const user = await User.findOne({ username });
// //     if (!user) {
// //         return res.status(401).json({ message: "Invalid username or password" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //         return res.status(401).json({ message: "Invalid username or password" });
// //     }

// //     const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });

// //     res.json({ message: "Login successful", token });
// // });

// // // Protected Dashboard API (Only logged-in users can access)
// // app.get('/dashboard', (req, res) => {
// //     const token = req.headers.authorization;

// //     if (!token) {
// //         return res.status(403).json({ message: "No token provided" });
// //     }

// //     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
// //         if (err) {
// //             return res.status(401).json({ message: "Invalid token" });
// //         }

// //         res.json({ message: "Welcome to your dashboard!", user: decoded });
// //     });
// // });

// // // Start Server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));











// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // User Schema
// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// const User = mongoose.model('User', UserSchema);

// // Login API (Auto Register If User Doesn't Exist)
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     console.log("Login Attempt:", { username, password });

//     if (!username || !password) {
//         return res.status(400).json({ message: "Username and password are required" });
//     }

//     let user = await User.findOne({ username });

//     if (!user) {
//         console.log("🔹 User not found, creating new user...");

//         // Hash password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);
//         user = new User({ username, password: hashedPassword });
//         await user.save();

//         console.log("✅ New User Registered:", user);
//     }

//     // Check Password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         console.log("❌ Password does not match");
//         return res.status(401).json({ message: "Invalid username or password" });
//     }

//     // Generate JWT Token
//     const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });

//     console.log("✅ Login Successful, Token:", token);
//     res.json({ message: "Login successful", token });
// });

// // Protected Dashboard API (Requires Token)
// app.get('/dashboard', (req, res) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(403).json({ message: "No token provided" });
//     }

//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: "Invalid token" });
//         }

//         res.json({ message: "Welcome to your dashboard!", user: decoded });
//     });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));







require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(express.json()); // Ensure JSON parsing
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Login API (Registers User if Not Exists)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("🔹 Login Attempt:", { username, password });

    if (!username || !password) {
        console.log("❌ Missing username or password");
        return res.status(400).json({ message: "Username and password are required" });
    }

    let user = await User.findOne({ username });

    if (!user) {
        console.log("🔹 User not found, creating new user...");

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, password: hashedPassword });
        await user.save();

        console.log("✅ New User Registered:", user);
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password Match:", isMatch);

    if (!isMatch) {
        console.log("❌ Password does not match");
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });

    console.log("✅ Login Successful, Redirecting to Dashboard...");
    res.json({ message: "Login successful", token, redirect: "/dashboard" });
});

// Protected Dashboard API (Only accessible with a valid token)
app.get('/dashboard', (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        res.json({ message: "Welcome to your dashboard!", user: decoded });
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
