const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./userSchema'); // This links to your other file

const app = express();

// 2. Middleware
app.use(express.json());
app.use(cors());

// 3. MongoDB Connection
const dbUser = "jhowland022";
const dbPass = encodeURIComponent("S1mp13loo!#@"); 
const mongoString = `mongodb+srv://${dbUser}:${dbPass}@homework2.sjonggp.mongodb.net/lab?retryWrites=true&w=majority`;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => console.log("MongoDB Error:", error));
database.once('connected', () => console.log('Database Connected Successfully'));

// 4. API ROUTES

// Signup Route
app.post('/createUser', async (req, res) => {
    console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username}`);
    const un = req.body.username;
    try {
        const result = await User.exists({ username: un });
        if (result === null) {
            const user = new User(req.body);
            await user.save();
            console.log(`User created! ${user}`);
            res.send(user);
        } else {
            console.log("Username already exists");
            res.status(500).send("Username already exists");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Login Route
app.get('/getUser', async (req, res) => {
    const { username, password } = req.query;
    console.log(`Login attempt for: ${username}`);
    try {
        const user = await User.findOne({ username, password });
        res.send(user); 
    } catch (error) {
        res.status(500).send(error);
    }
});

// 5. Start Server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
});