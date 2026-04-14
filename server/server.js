const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const dbUser = "jhowland022";
const dbPass = encodeURIComponent("S1mp13loo!#@"); 
const mongoString = `mongodb+srv://${dbUser}:${dbPass}@homework2.sjonggp.mongodb.net/lab?retryWrites=true&w=majority`;

mongoose.connect(mongoString);
mongoose.connection.once('connected', () => console.log('Database Connected Successfully'));

// --- SCHEMAS ---
const User = mongoose.model('User', new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

const Team = mongoose.model('Team', new mongoose.Schema({
    teamName: { type: String, required: true, unique: true }
}));

const Project = mongoose.model('Project', new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    productOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
}));

// --- ROUTES ---

// Signup & User list
app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) { res.status(400).send("User already exists"); }
});

app.get('/allUsers', async (req, res) => res.send(await User.find({})));

// Teams
app.post('/createTeam', async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.status(201).send(team);
    } catch (err) { res.status(400).send("Team already exists"); }
});

app.get('/getTeams', async (req, res) => res.send(await Team.find({})));

// Projects
app.post('/createProject', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send(project);
    } catch (err) { res.status(500).send(err.message); }
});

app.get('/getProjects', async (req, res) => {
    // Populate turns IDs into full Objects so we can see names in the table
    const projects = await Project.find({})
        .populate('productOwner')
        .populate('manager')
        .populate('team');
    res.send(projects);
});

const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));