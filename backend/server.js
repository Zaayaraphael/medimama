import express from 'express';

import dotenv from 'dotenv';




import connectToDB from './config/db.js';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/user.model.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello world1111');
});

// Sign up
app.post('/api/signup', async (req, res) => {
    const { firstname, lastname, email, phone, dob, nationality, state, lga, city, password } = req.body;

    try {
        if (!firstname || !lastname || !email || !phone || !dob || !nationality || !password) {
            return res.status(400).json({ message: 'All marked fields are required' });
        }

        if (nationality === 'Nigeria' && (!state || !lga)) {
            return res.status(400).json({ message: 'State and LGA are required for Nigeria' });
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(400).json({ message: 'Email already exists, please login' });

        const phoneExists = await User.findOne({ phone });
        if (phoneExists) return res.status(400).json({ message: 'Phone number already exists' });

        const hashedPassword = await bcryptjs.hash(password, 8);

        const userDoc = await User.create({
            firstname,
            lastname,
            email,
            phone,
            dob,
            nationality,
            state: state || '',
            lga: lga || '',
            city: city || '',
            password: hashedPassword,
        });

        // Build safe user object without password
        const userSafe = userDoc.toObject ? { ...userDoc.toObject() } : { ...userDoc };
        if (userSafe.password) delete userSafe.password;

        const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return res.status(201).json({ user: userSafe, message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(400).json({ message: error.message });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email });
        if (!userDoc) return res.status(400).json({ message: 'Email address does not exist' });

        const isPasswordValid = await bcryptjs.compare(password, userDoc.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

        const userSafe = userDoc.toObject ? { ...userDoc.toObject() } : { ...userDoc };
        if (userSafe.password) delete userSafe.password;

        const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return res.status(200).json({ user: userSafe, message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(400).json({ message: error.message });
    }
});

// Fetch user
app.get('/api/fetch-user', async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ message: 'Invalid token' });

        const userDoc = await User.findById(decoded.id).select('-password');
        if (!userDoc) return res.status(400).json({ message: 'Account not found' });

        return res.status(200).json({ user: userDoc });
    } catch (error) {
        console.error('Error in fetching user:', error);
        return res.status(400).json({ message: error.message });
    }
});

// Logout
app.post('/api/logout', async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
});

app.listen(PORT, async () => {
    await connectToDB();
    console.log(`server is running on http://localhost:${PORT}`);
});