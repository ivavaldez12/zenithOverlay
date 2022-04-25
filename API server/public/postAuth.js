const { get } = require("http");
const { Buffer } = require('buffer');




const buf = Buffer.alloc(35);
buf = Buffer.from(client_id + ":" + client_secret, 'utf8')

var redirect_uri = "http://localhost:3000"; 
var client_id = "0026b79277ab4d2e8103f9351a5076a5";
var client_secret = "f106ab369e394387b7f1999236e9ca82";

//const TOKEN = "https://accounts.spotify.com/api/token";

function onPageLoad(){
        handleRedirect();
}

function handleRedirect(){
    var urlParams = new URLSearchParams(tempCode);
    var code = urlParams.get('code');
    //getAccessToken(code);
    window.location.replace(`overwolf-extension://anoahjhemlbnmhkljlgbmnfflpnhgjpmfjnhdfoe/dist/login.html`);
}

function getAccessToken (code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    apiAuth(body);
}

function apiAuth(body) {
    const TOKEN = "https://accounts.spotify.com/api/token";
    let xhr = new XMLHttpRequest();
    const buf = Buffer.alloc(35);
    buf = Buffer.from(client_id + ":" + client_secret, 'utf8')
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + buf.toString('base64'));
    xhr.send(body);
    xhr.onload = handleAuthRes;
}

function handleAuthRes() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if (data.access_token != undefined){
            var access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if (data.refresh_token != undefined) {
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}