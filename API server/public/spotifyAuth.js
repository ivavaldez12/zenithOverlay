

var client_id = '0026b79277ab4d2e8103f9351a5076a5';
var client_secret = 'f106ab369e394387b7f1999236e9ca82';

var redirect_uri = 'http://localhost:3000';
const TOKEN = "https://accounts.spotify.com/api/token";

var grant_type = "authorization_code";
var refresh = "";



function requestAuthorization() {
    /* localStorage.setItem('client_id', '0026b79277ab4d2e8103f9351a5076a5');
    localStorage.setItem('client_secret', 'f106ab369e394387b7f1999236e9ca82'); */

    let url = 'https://accounts.spotify.com/authorize';
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email ugc-image-upload user-read-playback-state user-modify-playback-state user-modify-playback-state user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";

    window.location.replace(url);
}

function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);

    // window.history.pushState("", "", redirect_uri);
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
    if (checkTokens()) {
        grant_type = "refresh_token";
        refresh = "&refresh_token=" + localStorage.getItem('refresh_token');
        document.getElementById('authorize').innerText = "You may now close this page.";
    }

    let body = "grant_type=" + grant_type;
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    body += refresh;

    console.log(body);
    apiAuth(body);
}

function apiAuth(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + new Buffer.from(client_id + ":" + client_secret).toString('base64'));
    xhr.send(body);
    xhr.onload = handleAuthRes;
}

function handleAuthRes() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);

        if (data.access_token != undefined){
            var access_token = data.access_token;
            localStorage.setItem("access_token", access_token);

        }
        if (data.refresh_token != undefined) {
            var refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        //onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

// checks tokens
function checkTokens() {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    if (access_token && refresh_token) {
        console.log("Tokens here!");
        return true;
    }

    console.log("Tokens not here.");
    return false;
};


// main
function onPageLoad() {
    console.log("Spotify Auth starting!");

    /* client_id = localStorage.getItem('client_id');
    client_secret = localStorage.getItem('client_secret'); */

    if (window.location.search.length > 0) {
        handleRedirect();
    }

    console.log("Spotify Auth finished!");
};
