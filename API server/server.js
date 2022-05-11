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
const getTokens = require('./public/spotifyAuth.js');
const express = require('express');
const path = require('path');
const cors = require('cors');
const buffer = require('buffer');
const axios = require('axios');
var request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');


var code ;
var client_id = '0026b79277ab4d2e8103f9351a5076a5';
var client_secret = 'f106ab369e394387b7f1999236e9ca82';
var redirect_uri = 'http://localhost:3000/';
PORT=3000;
let token;

app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// 
app.get('/', (req, res) => {
  console.log(req)
});

app.post('/callback', (req,res) => {
  //receives authorization code
  //set server side code variable
});

app.get('/callback', (req,res) => {
  //retrieves access and refresh tokens
  //response is sending an object containig refresh and access
});


// https://accounts.spotify.com/api/token
  
//   // request({
//   //   url: "https://accounts.spotify.com/api/token",
//   //   form: {
//   //     code: auth_code,
//   //     redirect_uri: redirect_uri,
//   //     grant_type: 'authorization_code'
//   //   },
//   //   headers: {
//   //     'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
//   //     'Content-Type': 'application/x-www-form-urlencoded'
//   //   },
//   //   json: true
//   // }, function (error, response, data){
//   //   res.send(data);
//   // })
// });

app.post('/tokens', (req, res) => {
  console.log(req.body);
  const result = req.body;
  access = result.access;
  refresh = result.refresh;

  res.json();
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

//------------------------------------------------------------------------

