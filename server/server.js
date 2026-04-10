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
    firstName: String, lastName: String, username: { type: String, unique: true }, password: { type: String }
}));

const Team = mongoose.model('Team', new mongoose.Schema({
    teamName: { type: String, unique: true }
}));

const Project = mongoose.model('Project', new mongoose.Schema({
    name: String,
    description: String,
    productOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
}));

// --- ROUTES ---
app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (err) { res.status(400).send("User exists"); }
});

app.get('/allUsers', async (req, res) => res.send(await User.find({})));

app.post('/createTeam', async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.send(team);
    } catch (err) { res.status(400).send("Team exists"); }
});

app.get('/getTeams', async (req, res) => res.send(await Team.find({})));

app.post('/createProject', async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.send(project);
});

app.get('/getProjects', async (req, res) => {
    const projects = await Project.find({}).populate('productOwner manager team');
    res.send(projects);
});

app.listen(9000, () => console.log(`Server running on port 9000`));