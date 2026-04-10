const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION ---
const dbUser = "jhowland022";
const dbPass = encodeURIComponent("S1mp13loo!#@"); 
const mongoString = `mongodb+srv://${dbUser}:${dbPass}@homework2.sjonggp.mongodb.net/lab?retryWrites=true&w=majority`;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => console.log("MongoDB Connection Error:", error));
database.once('connected', () => console.log('Database Connected Successfully to MongoDB Atlas'));

// --- SCHEMAS & MODELS ---
// User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Team Schema
const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true, unique: true }
});
const Team = mongoose.model('Team', teamSchema);

// Project Schema 
// Note: productOwner, manager, and team are References (ObjectIds)
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    productOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});
const Project = mongoose.model('Project', projectSchema);

// --- ROUTES ---

// 1. User Routes (Signup & Login)
app.post('/createUser', async (req, res) => {
    try {
        const userExists = await User.findOne({ username: req.body.username });
        if (userExists) return res.status(400).send("Username already exists");
        
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/getUser', async (req, res) => {
    const { username, password } = req.query;
    try {
        const user = await User.findOne({ username, password });
        if (user) res.send(user);
        else res.status(401).send("Invalid Credentials");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/allUsers', async (req, res) => {
    const users = await User.find({});
    res.send(users);
});

// 2. Team Routes
app.post('/createTeam', async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.status(201).send(team);
    } catch (err) {
        res.status(500).send("Team name might already exist.");
    }
});

app.get('/getTeams', async (req, res) => {
    const teams = await Team.find({});
    res.send(teams);
});

// 3. Project Routes
app.post('/createProject', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send(project);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/getProjects', async (req, res) => {
    try {
        // .populate() replaces the ID with the actual object from the referenced collection
        const projects = await Project.find({})
            .populate('productOwner')
            .populate('manager')
            .populate('team');
        res.send(projects);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// --- START SERVER ---
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
});