// import WebSocket from 'ws'
// import passport from 'passport'
// const cors = require('cors');
// const express = require('express')
// const app = express()
// const port = 3000
// const path = require('path')
// const server = http.createServer(app)
// const wss = new WebSocket.Server({ clientTracking: false, server })

// app.use(sessionParser);

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(cors());
// app.use(express.json());

// app.set('json spaces',2);

// dotenv.config();

// const
//   PROTOCOL = process.env.PROTOCOL || 'http',
//   PORT = parseInt(process.env.PORT || 3000),
//   RETURN_HOST = process.env.RETURN_HOST || `localhost:${PORT}`,
//   SUBDIR = process.env.SUBDIR || '/';


// const {
//   TWITCH_CLIENT_ID,
//   TWITCH_CLIENT_SECRET
// } = process.env;

// // const AUTH_SCOPE = ;

// const
//   socketConnections = new Map(),
//   usersStore = new Map();


// app.use('/', express.static(path.join(__dirname, 'public')))

// // app.get('/', (req, res) => {
// //   res.send('Hello World!')
// // })

// app.post('/postAuth', (req, res) => {
//   res.send("OK");
// });


// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


//----------------------------------------------------------------------

const express = require('express');
const path = require('path');
const cors = require('cors');

PORT=3000;

app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// 
app.get('/', (req, res) => {
  console.log("Server running!");
  res.send("OK");
});

// 
app.post('/postAuth', (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));