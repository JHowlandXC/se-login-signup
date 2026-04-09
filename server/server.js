const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('../userSchema'); 
const Team = require('./models/Team'); 
const Project = require('./models/Project');

const app = express();
app.use(express.json());
app.use(cors());

const dbUser = "jhowland022";
const dbPass = encodeURIComponent("S1mp13loo!#@"); 
const mongoString = `mongodb+srv://${dbUser}:${dbPass}@homework2.sjonggp.mongodb.net/lab?retryWrites=true&w=majority`;

mongoose.connect(mongoString);
mongoose.connection.once('connected', () => console.log('Database Connected Successfully'));

// ROUTES
app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (error) { res.status(500).send("User already exists"); }
});

app.get('/getUser', async (req, res) => {
    const { username, password } = req.query;
    const user = await User.findOne({ username, password });
    res.send(user); 
});

app.get('/allUsers', async (req, res) => {
    const users = await User.find({});
    res.send(users);
});

app.post('/createTeam', async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.status(201).send(team);
    } catch (err) { res.status(500).send(err); }
});

app.get('/getTeams', async (req, res) => {
    const teams = await Team.find({});
    res.send(teams);
});

app.post('/createProject', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send(project);
    } catch (err) { res.status(500).send(err); }
});

app.get('/getProjects', async (req, res) => {
    const projects = await Project.find({}).populate('productOwner manager team');
    res.send(projects);
});

app.listen(9000, () => console.log(`Server running on port 9000`));