const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
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

const User = mongoose.model('User', new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

const Team = mongoose.model('Team', new mongoose.Schema({
    teamName: { type: String, required: true, unique: true }
}));

const TeamRoster = mongoose.model('TeamRoster', new mongoose.Schema({
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}));

const Project = mongoose.model('Project', new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    productOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
}));

const UserStory = mongoose.model('UserStory', new mongoose.Schema({
    user_story: { type: String, required: true },
    proj_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    priority: { type: Number, default: 0 }
}));


// Auth Routes
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

app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) { res.status(400).send("User already exists"); }
});

app.get('/allUsers', async (req, res) => {
    const users = await User.find({});
    res.send(users);
});

// Team & Roster Routes
app.post('/createTeam', async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.status(201).send(team);
    } catch (err) { res.status(400).send("Team already exists"); }
});

app.get('/getTeams', async (req, res) => {
    const { user_id } = req.query;
    try {
        if (user_id) {
            const rosters = await TeamRoster.find({ member_id: user_id }).populate('team_id');
            const teams = rosters.map(r => r.team_id);
            res.send(teams);
        } else {
            const allTeams = await Team.find({});
            res.send(allTeams);
        }
    } catch (err) { res.status(500).send(err.message); }
});

app.post('/addToRoster', async (req, res) => {
    try {
        const { team_id, members } = req.body; 
        const rosterEntries = members.map(mID => ({ team_id, member_id: mID }));
        await TeamRoster.insertMany(rosterEntries);
        res.status(201).send("Members added successfully");
    } catch (err) { res.status(500).send(err.message); }
});

// Project Routes
app.post('/createProject', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send(project);
    } catch (err) { res.status(500).send(err.message); }
});

app.get('/getProjects', async (req, res) => {
    try {
        const projects = await Project.find({}).populate('productOwner manager team');
        res.send(projects);
    } catch (err) { res.status(500).send(err.message); }
});

// User Story Routes
app.post('/createUserStory', async (req, res) => {
    try {
        const story = new UserStory(req.body);
        await story.save();
        res.status(201).send(story);
    } catch (err) { res.status(500).send(err.message); }
});

const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));