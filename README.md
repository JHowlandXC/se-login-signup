# ICSI 418Y: Software Engineering - Homework 2
## Basics of Web Development – Server

### Project Description
Added server folder and its javascript to it. The files are now connected to mongodb database while the server folder has cors, express, mongoos installed as well as Node.js. The database now stores login information and can have users signup

### Features
- **Login Page**: Allows its users to enter their UserID and Password
- **Signup Page**: Collects First Name, Last Name, User ID, and Password.
- **Responsive Design**: Uses CSS Flexbox to center forms and ensure consistency across both pages.
- **Server**: Uses Node.js and MongoDB to enter and retreive login information 

### Project Structure
source_code/
├── server/
│   ├── server.js
│   └── package.json
└── client/
    ├── src/
    │   ├── Login.js
    │   ├── Signup.js
    │   ├── App.js
    │   └── styles.css
    └── package.json
