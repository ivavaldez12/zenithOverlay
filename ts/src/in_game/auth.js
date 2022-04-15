/* var redirect_uri = "http://localhost:3000"; //registered with spotify


var client_id = "0026b79277ab4d2e8103f9351a5076a5";
var client_secret = "f106ab369e394387b7f1999236e9ca82";

const AUTH = "https://accounts.spotify.com/authorize";

function requestAuthorization(){
    let url = AUTH;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email ugc-image-upload user-read-playback-state user-modify-playback-state user-modify-playback-state user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";
    window.location.href = 'http://localhost:3000/login.html'; //shows spotify's authorization screen
}

var btn = document.getElementById("spotifyLogin");
btn.addEventListener("click", requestAuthorization);
 */