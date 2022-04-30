const Buffer = require('buffer');

var client_id = '0026b79277ab4d2e8103f9351a5076a5';
var client_secret = "f106ab369e394387b7f1999236e9ca82";

var redirect_uri = 'http://localhost:3000';
const TOKEN = "https://accounts.spotify.com/api/token";

var tokens = {
    access_token: "",
    refresh_token: ""
};



function requestAuthorization() {
    /* localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); */

    let url = 'https://accounts.spotify.com/authorize';
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email ugc-image-upload user-read-playback-state user-modify-playback-state user-modify-playback-state user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";

    let browserWindow = window.open(url,"mozillaTab", "popup");
    browserWindow.focus();
    window.location.replace(url);
}

function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);

    window.history.pushState("", "", redirect_uri);
}

function getCode() {
    let code = null;
    const queryString = window.location.search;

    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code');
    }

    return code;
}

function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    apiAuth(body);
}

function apiAuth() {
    let xhr = new XMLHttpRequest();
    let buf = Buffer.alloc(35);
    buf = Buffer.from(client_id + ":" + client_secret, 'utf8')
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + buf.toString('base64'));
    xhr.send(body);
    xhr.onload = handleAuthRes();
}

function handleAuthRes() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);

        if (data.access_token != undefined){
            tokens.access_token = data.access_token;
            // localStorage.setItem("access_token", access_token);
            // save them somewhere Desktop can access them

        }
        if (data.refresh_token != undefined) {
            tokens.refresh_token = data.refresh_token;
            // localStorage.setItem("refresh_token", refresh_token);
        }
        runSpotify();
    }
    else {
        displayMessage(this.responseText);
        alert(this.responseText);
    }
}


export function runSpotify() {
    /* client_id = localStorage.get('client_id');
    client_secret = localStorage.get('client_secret'); */

    requestAuthorization();

    if (window.location.search.length > 0) {
        handleRedirect();
    }

    return tokens;
};

export function checkTokens() {
    if (tokens.access_token && tokens.refresh_token) {
        return true;
    }
    return false;
};