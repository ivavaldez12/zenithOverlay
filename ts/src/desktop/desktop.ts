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
import { runSpotify, checkTokens } from "./runSpotify.js";

const redirect_uri = 'http://localhost:3000';

class Desktop extends AppWindow {
    private static _instance: Desktop;
    /* private static _access_token: string;
    private static _refresh_token: string; */
    private _tokens: {[key: string]: string};

    private constructor() {
        super(kWindowNames.desktop);

        // adds event listener for the spotify login button
        const spotifyBtn = document.getElementById('spotifyLogin');
        spotifyBtn.addEventListener("click", async () => {
            this.displayMessage("Spotify login starting!");
            /* this._tokens = runSpotify();
            if (this._tokens.access_token && this._tokens.refresh_token) this.displayMessage(this._tokens);
            else this.displayMessage("Check tokens failed."); */

            let browswerWindow = window.open(redirect_uri);
            browswerWindow.focus();
            window.location.replace(redirect_uri);

            if (this._tokens === null) {
                this.displayMessage("Spotify login has failed!");
                return;
            }

            this.displayMessage("Spotify login has finished!");
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

Desktop.instance().run();
