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

var spotify_redirectUri = 'http://localhost:3000';
const client_id = "0026b79277ab4d2e8103f9351a5076a5";

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

            /* overwolf.utils.openUrlInDefaultBrowser(url); */
            // let browswerWindow = window.open(url);
            // browswerWindow.focus();
            // window.location.replace(url);
            let broswerWindow = window.open(url);
            broswerWindow.postMessage("Hello Broswer window!", url);
            broswerWindow.focus();

            window.addEventListener('message', (evt) => {
                if (evt.origin !== url) {
                    this.displayMessage("NO");
                    return;
                }
                this.displayMessage(`YES ${evt.data}`);
            }, false);
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

Desktop.instance();
