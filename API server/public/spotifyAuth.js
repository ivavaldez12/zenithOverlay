

var client_id = '0026b79277ab4d2e8103f9351a5076a5';
var client_secret = 'f106ab369e394387b7f1999236e9ca82';

var redirect_uri = 'http://localhost:3000';
const TOKEN = "https://accounts.spotify.com/api/token";

var grant_type = "authorization_code";
var refresh = "";



function requestAuthorization() {
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
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    if (tokensSaved(access_token, refresh_token)) {
        grant_type = "refresh_token";
        refresh = "&refresh_token=" + refresh_token;
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
    //let buf = new Buffer.from(client_id + ":" + client_secret);
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret).toString('base64'));
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
function tokensSaved(access_token, refresh_token) {
    if (access_token && refresh_token) {
        console.log("Tokens here!");
        return true;
    }

    console.log("Tokens not here.");
    return false;
};


// main
async function onPageLoad() {
    console.log("Spotify Auth starting!");
    
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    if (window.location.search.length > 0 /* || !tokensSaved() */) {
        handleRedirect();
    }

    // move localStorage from localhost:3000 to overwolf window
    /* const overwolfWindow = window.focus("overwolf-extension://anoahjhemlbnmhkljlgbmnfflpnhgjpmfjnhdfoe/desktop.html");

    if (tokensSaved(access_token, refresh_token)) {
        overwolfWindow.postMessage({
            access_token: access_token,
            refresh_token: refresh_token
        }, "*");
    } */

    window.addEventListener('message', (evt) => {
        if (evt.origin !== "overwolf-extension://anoahjhemlbnmhkljlgbmnfflpnhgjpmfjnhdfoe/desktop.html") {
            console.log("NO");
            return;
        }
        console.log(`YES ${evt.data}`);
        evt.source.postMessage("Hello back!", "http://localhost:3000");
    }, false);

    console.log("Spotify Auth finished!");
};
