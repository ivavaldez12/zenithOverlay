//import WebSocket from 'ws'
//import passport from 'passport'
//const cors = require('cors');
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
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


app.use('/', express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})