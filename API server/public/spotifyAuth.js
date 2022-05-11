var client_id = '0026b79277ab4d2e8103f9351a5076a5';
var client_secret = 'f106ab369e394387b7f1999236e9ca82';

var redirect_uri = 'http://localhost:3000/';
const TOKEN = "https://accounts.spotify.com/api/token";

var grant_type = "authorization_code";
var refresh = "";

var auth_code;

async function handleRedirect() {
    let code = getCode();
    console.log(code);
    await fetchAccessToken(code);
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

const getToken = async (code) => {
    const result = await fetch('http://localhost:3000/callback', { 
        method: 'POST',
        //pass authorization code in body of request
        headers: {
            'Content-Type': 'application/json' 
        }
    });

    const data = await result.json();

    console.log(data);

    return data.access_token;
} 

async function fetchAccessToken(code) {

    localStorage.setItem('auth_code', code);
    auth_code = localStorage.getItem('auth_code');

    if (authSaved(auth_code)) {


        console.log("Getting access token...");
        let access_token = await getToken(auth_code);
        console.log(access_token);
        if (access_token) {
            console.log("Retrieved access token")
        }
        else
        {
            console.log("Failed to retrieve access token")
        }

    }
}

// checks tokens
function authSaved(auth_code) {
    if (auth_code) {
        console.log("Authorization code here!");
        return true;
    }

    console.log("Authorization code not here.");
    return false;
};










// main
async function onPageLoad() {
    console.log("Spotify Auth starting!");

    await handleRedirect();

    window.addEventListener('message', (evt) => {
        if (evt.origin !== "overwolf-extension://anoahjhemlbnmhkljlgbmnfflpnhgjpmfjnhdfoe/desktop.html") {
            console.log("NO");
            return;
        }
        console.log(`YES ${evt.data}`);
        evt.source.postMessage("Hello back!", "http://localhost:3000/");
    }, false);

    console.log("Spotify Auth finished!");
};
