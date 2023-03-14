import './style.css';
import './app.css';
import 'bootstrap';
import * as htmx from 'htmx.org';

// import logo from './assets/images/logo-universal.png';
import logo2 from './assets/images/logo-large.svg';
import {Greet} from '../wailsjs/go/main/App';
// import {EventsOn} from "../wailsjs/runtime";

// Setup the greet function
window.greet = function () {
    // Get name
    let name = nameElement!.value;

    // Check if the input is empty
    if (name === "") return;

    // Call App.Greet(name)
    try {
        Greet(name)
            .then((result) => {
                // Update result with data back from App.Greet()
                resultElement!.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};

document.querySelector('#app')!.innerHTML = `
    <img id="logo" class="logo">
      <div class="result align-content-centerx" id="result">
      <p>
         It looks like this is your first time running this. Let's create an account for you. If you already
         have an account at materialscommons.org, then use the same email and password.
      </p>
      </div>
      <div class="input-box" id="input">
        <input class="input" id="name" type="text" autocomplete="off" />
        <button class="btn" onclick="greet()">Greet</button>
      </div>
    </div>
`;
(document.getElementById('logo') as HTMLImageElement).src = logo2;

// htmx.trigger(htmx.find("#start", "start-app", {}));

htmx.on('htmx:afterSettle', function() {
    console.log('afterSettle');
});

// EventsOn("domready", function() {
//     console.log('domready event caught')
//     // @ts-ignore
//     htmx.trigger(htmx.find("#start"), "start-app", {})
// });
// htmx.on('htmx:load', function(evt) {
//     console.log(`htmx:afterSettle fired ${i}`);
//     i++;
//     htmx.trigger(htmx.find("#start"), "start-app", {});
// });

let nameElement = (document.getElementById("name") as HTMLInputElement);
nameElement.focus();
let resultElement = document.getElementById("result");

window.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    // @ts-ignore
    htmx.trigger(htmx.find("#start"), "start-app", {});
});

declare global {
    interface Window {
        greet: () => void;
    }
}
