// const { Buffer } = require('buffer');
// //const { get } = require("http");

// var client_id = '0026b79277ab4d2e8103f9351a5076a5';
// var client_secret = "f106ab369e394387b7f1999236e9ca82";
// var redirect_uri = 'http://localhost:3000';

// /* const buf = Buffer.alloc(35);
// buf = Buffer.from(client_id + ":" + client_secret, 'utf8'); */


// function handleRedirect(){
//     var tempCode = window.location.search;
//     var urlParams = new URLSearchParams(tempCode);
//     var code = urlParams.get('code');
//     getAccessToken(code);
// }

// function getAccessToken (code) {
//     let body = "grant_type=authorization_code";
//     body += "&code=" + code;
//     body += "&redirect_uri=" + encodeURI(redirect_uri);
//     body += "&client_id=" + client_id;
//     body += "&client_secret=" + client_secret;
//     apiAuth(body);
// }

// function apiAuth(body) {
//     const TOKEN = "https://accounts.spotify.com/api/token";
//     let xhr = new XMLHttpRequest();
//     const buf = Buffer.alloc(35);
//     buf = Buffer.from(client_id + ":" + client_secret, 'utf8')
//     xhr.open("POST", TOKEN, true);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.setRequestHeader('Authorization', 'Basic ' + buf.toString('base64'));
//     xhr.send(body);
//     xhr.onload = handleAuthRes();
// }

// function handleAuthRes() {
//     if (this.status == 200) {
//         var data = JSON.parse(this.responseText);
//         console.log(data);
//         var data = JSON.parse(this.responseText);
//         if (data.access_token != undefined){
//             var access_token = data.access_token;
//             localStorage.setItem("access_token", access_token);
//         }
//         if (data.refresh_token != undefined) {
//             refresh_token = data.refresh_token;
//             localStorage.setItem("refresh_token", refresh_token);
//         }
//     }
//     else {
//         displayMessage(this.responseText);
//         alert(this.responseText);
//     }
// }


// //-------------------------Changes------------------------------------------------------

// function requestAuthorization(){

//     let url = 'https://accounts.spotify.com/authorize';
//     url += "?client_id=" + client_id;
//     url += "&response_type=code";
//     url += "&redirect_uri=" + encodeURI(redirect_uri);
//     url += "&show_dialog=true";
//     url += "&scope=user-read-private user-read-email ugc-image-upload user-read-playback-state user-modify-playback-state user-modify-playback-state user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";
//     window.location.replace(url);

//     overwolf.windows.getCurrentWindow((owW) => {
//         let element = document.createElement("p");
//         element.setAttribute('id', "mainDisplay");
//         element.innerContent = JSON.stringify(owW);
//         document.body.appendChild(element);
//     });
// }

// const displayMessage = message => {
//     document.getElementById('displayMessage').innerText = message;
// };

// // this function is what is called to run everything here for this window
// export function load () {
//     displayMessage("Page Load Working!");

//     requestAuthorization();

//     if (window.location.search.length > 0){
//         handleRedirect();
//         return;
//     }
// };

