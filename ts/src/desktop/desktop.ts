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

const spotify_redirectUri = 'http://localhost:3000/';

class Desktop extends AppWindow {
    private static _instance: Desktop;
    private _spotify_tokens: {[key: string]: string};

    private constructor() {
        super(kWindowNames.desktop);

        // adds event listener for the spotify login button
        const spotifyBtn = document.getElementById('spotifyLogin');
        spotifyBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            this.displayMessage("Spotify login starting!");

            let browswerWindow = window.open(spotify_redirectUri);
            browswerWindow.focus();
            window.location.replace(spotify_redirectUri);
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

    private displayMessage(message) {
        document.getElementById('displayMessage').innerText = message;
    }
}

Desktop.instance();
