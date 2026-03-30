const app = express();
app.use(express.json());
app.use(cors());

// --- MONGODB ATLAS CONNECTION ---
const dbUser = "jhowland022";
const dbPass = encodeURIComponent("S1mp13loo!#@"); 
const mongoString = `mongodb+srv://${dbUser}:${dbPass}@homework2.sjonggp.mongodb.net/lab?retryWrites=true&w=majority`;

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => console.log("MongoDB Error:", error));
database.once('connected', () => console.log('Database Connected Successfully'));
// --- USER SCHEMA (Requirement: f_name, l_name, username, password) ---
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

// --- API ROUTES ---

// SIGNUP ROUTE
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

// LOGIN ROUTE
app.get('/getUser', async (req, res) => {
    const { username, password } = req.query;
    try {
        const user = await User.findOne({ username, password });
        res.send(user); 
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(9000, () => console.log('Server running on port 9000'));