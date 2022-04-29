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
import { kWindowNames, kHotkeys, kGamesFeatures } from "../consts";

class Desktop extends AppWindow {
    private static _instance: Desktop;

    private constructor() {
        super(kWindowNames.desktop);

        // adds event listener for the spotify login button
        const spotifyBtn = document.getElementById('spotifyLogin');
        spotifyBtn.addEventListener("click", () => {
            this.displayMessage("spotify button working!");

            var client_id = '0026b79277ab4d2e8103f9351a5076a5';
            var redirect_uri = 'http://localhost:3000';

            function requestAuthorization(){
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

            requestAuthorization();
            // overwolf.windows.obtainDeclaredWindow("login", (declaredWindow) => {
            //   overwolf.windows.restore(declaredWindow.window.id);
            // });
        });
    }

    public static instance() {
        if (!this._instance) {
          this._instance = new Desktop();
        }
    
        return this._instance;
    }
    
    // main/control function for the Desktop window
    public async run() {

    }

    private displayMessage(message) {
        document.getElementById('displayMessage').innerText = message;
    }
}

Desktop.instance().run();
