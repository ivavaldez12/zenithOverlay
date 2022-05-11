/* 
import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";

// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
 new AppWindow(kWindowNames.desktop);
 */

// Zenith Version

import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";

var spotify_redirectUri = 'http://localhost:3000/';
const client_id = "0026b79277ab4d2e8103f9351a5076a5";

const access_token = localStorage.getItem('access_token');
const refresh_token = localStorage.getItem('refresh_token');

class Desktop extends AppWindow {
    private static _instance: Desktop;
    private _spotify_tokens: {[key: string]: string};

    private constructor() {
        super(kWindowNames.desktop);

        /* this._spotify_tokens['access_token'] = null;
        this._spotify_tokens['refresh_token'] = null; */

        const spotifyBtn = document.getElementById('spotifyLogin');
        var that = this;

        window.addEventListener("message", evt => {
            evt.preventDefault();
            /* if (e.origin !== spotify_redirectUri) {
                return;
            }
            this._spotify_tokens.access_token = e.data.access_token;
            this._spotify_tokens.refresh_token = e.data.refresh_token; */
            document.getElementById('newMessage').innerText = "Message event listener fired!";
        }, false);

        spotifyBtn.addEventListener("click", evt => {
            evt.preventDefault();
            that.displayMessage(`Spotify login starting from ${spotify_redirectUri} to ${window.location.href}!`);

            let url = 'https://accounts.spotify.com/authorize';
            url += "?client_id=" + client_id;
            url += "&response_type=code";
            url += "&redirect_uri=" + encodeURI(spotify_redirectUri);
            url += "&show_dialog=true";
            url += "&scope=user-read-private user-read-email ugc-image-upload user-read-playback-state user-modify-playback-state user-modify-playback-state user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";

            let broswerWindow = window.open(url);
            broswerWindow.postMessage("Hello Broswer window!", url);
            broswerWindow.focus();
        });
    }

    public static instance() {
        if (!this._instance) {
          this._instance = new Desktop();
        }
        return this._instance;
    }

    public run() {
        
    }

    private displayMessage(message: string) {
        document.getElementById('displayMessage').innerText = message;
    }
}

async function updateDisplay(){
    const result = (await (await fetch('http://localhost:3000/callback')).json());
    
    if (result.access_token && result.refresh_token){

        const getProfile = async (token) => {
            const profile = await fetch('https://api.spotify.com/v1/me', { 
                method: 'GET',
                headers: { 'Authorization' : 'Bearer' + token }
            });
    
            const data = await profile.json();
            return data;
        } 

        const resultProfile = await getProfile(result.access_token);

        document.getElementById('profilePic').style.display = 'none';
        document.getElementById('user').innerText = resultProfile;

        // const profileUser = resultProfile.body.display_name;
        // const profileImgUrl = resultProfile.body.images.url;


        // const button = document.getElementById('spotifyLogout');
        // const profilePic = document.getElementById('profilePic');
        // const userName = document.getElementById('user');

        // profilePic.setAttribute("src", profileImgUrl);
        // userName.innerText = profileUser;


        //Make page visible last after everything has been updated
        document.getElementById('isLogged').style.display = 'block';
        document.getElementById('notLogged').style.display = 'none';
    }
    else {
        document.getElementById('isLogged').style.display = 'none';
        document.getElementById('notLogged').style.display = 'block';
        document.getElementById('displayMessage').innerText = JSON.stringify(result);
    }
}

Desktop.instance();
//Checking if signed in
// if (access_token && refresh_token)
// {
//     window.location.replace('overwolf-extension://anoahjhemlbnmhkljlgbmnfflpnhgjpmfjnhdfoe/ts/src/desktop/desktop.html');
// }

// overwolf.windows.obtainDeclaredWindow('desktop', (window) => {
    //     overwolf.windows.restore(window.window.id);
    // });

(async function () {
    await updateDisplay();

    //Flea market websocket 
    setInterval(async () => {
        await updateDisplay();
    } , 17);
})();


