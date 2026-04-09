const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// 1. IMPORT ALL MODELS
// Make sure these files exist in your folder!
const User = require('./userSchema'); 
const Team = require('./models/Team'); 
const Project = require('./models/Project');

const app = express();

// 2. MIDDLEWARE
app.use(express.json());
app.use(cors());

// 3. MONGODB CONNECTION
const dbUser = "jhowland022";
const dbPass = encodeURIComponent("S1mp13loo!#@"); 
const mongoString = `mongodb+srv://${dbUser}:${dbPass}@homework2.sjonggp.mongodb.net/lab?retryWrites=true&w=majority`;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => console.log("MongoDB Error:", error));
database.once('connected', () => console.log('Database Connected Successfully'));

// 4. API ROUTES

// --- User Routes ---
app.post('/createUser', async (req, res) => {
    const un = req.body.username;
    try {
        const result = await User.exists({ username: un });
        if (result === null) {
            const user = new User(req.body);
            await user.save();
            res.send(user);
        } else {
            res.status(500).send("Username already exists");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getUser', async (req, res) => {
    const { username, password } = req.query;
    try {
        const user = await User.findOne({ username, password });
        res.send(user); 
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// --- Team Routes ---
app.post('/createTeam', async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.status(201).send(team);
    } catch (err) { 
        res.status(500).send(err); 
    }
});

app.get('/getTeams', async (req, res) => {
    try {
        const teams = await Team.find({});
        res.send(teams);
    } catch (err) {
        res.status(500).send(err);
    }
});

// --- Project Routes ---
app.post('/createProject', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send(project);
    } catch (err) { 
        res.status(500).send(err); 
    }
});

app.get('/getProjects', async (req, res) => {
    try {
        const projects = await Project.find({})
            .populate('productOwner')
            .populate('manager')
            .populate('team');
        res.send(projects);
    } catch (err) {
        res.status(500).send(err);
    }
});

// 5. START SERVER
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
});