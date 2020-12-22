const apiurl = "https://stevenrummler.com:8000/games/";

function createGame() {
  // Rebuild content section
  document.getElementById("content").innerHTML = `
    <div id="buttons">
        <input class="form-control custombtn entry" id="hostName" placeholder="Enter Your Name">
        <div class="form-group custombtn entry">
        <select class="form-control" id="gameMode">
            <option>Classic</option>
            <option>Normal</option>
            <option>Insanity</option>
        </select>
        </div>
        <button id="create" type="button" class="btn custombtn action">Create</button>
        <button id="mainMenu" type="button" class="btn custombtn exit">Main Menu</button>
    </div>`;
  // Reset event listeners
  document.getElementById("create").addEventListener("click", startLobby);
  document.getElementById("mainMenu").addEventListener("click", mainMenu);
}

function joinGame(error) {
  // Rebuild content section
  document.getElementById("content").innerHTML = `
    <div id="buttons">
        <button id="demoCode" type="button" class="btn action custombtn">Use Demo Code</button>
        <input class="form-control custombtn entry" id="gameCode" placeholder="Enter Game Code">
        <button id="joinLobby" type="button" class="btn action custombtn">Join Lobby</button>
        <button id="mainMenu" type="button" class="btn exit custombtn">Main Menu</button>
    </div>`;
  if (typeof error == "string") {
    document.getElementById("gameCode").placeholder = error;
  }
  // Reset event listeners
  document.getElementById("demoCode").addEventListener("click", demoCode);
  document.getElementById("joinLobby").addEventListener("click", joinLobby);
  document.getElementById("mainMenu").addEventListener("click", mainMenu);
}

function mainMenu() {
  // Rebuild content section
  document.getElementById("content").innerHTML = `
    <div id="buttons">
        <button id="createGame" type="button" class="btn action custombtn">Create Game</button>
        <button id="joinGame" type="button" class="btn action custombtn">Join Game</button>
    </div>`;
  // Reset event listeners
  document.getElementById("createGame").addEventListener("click", createGame);
  document.getElementById("joinGame").addEventListener("click", joinGame);
}

function joinLobby() {
  // Call API
  const value = document.getElementById("gameCode").value;
  console.log(value);
  if (value === "") return;
  let url = apiurl + value + "/";
  // Rebuild content section
  document.getElementById("content").innerHTML = `
    <div id="buttons">
        <button type="button" class="btn info custombtn">Joining Game</button>
    </div>`;
  // Display API data
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Origin: "stevenrummler.com",
  });
  const myRequest = new Request(url, {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  });
  console.log(myRequest);
  fetch(myRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      if (json.detail === "Not found.") {
        joinGame("Invalid Code");
        return;
      }
      document.getElementById("content").innerHTML = `
            <div id="buttons">
                <div id="message" class="message">Waiting For Host To Start The Game...</div>
                <button id="hostName" type="button" class="btn info custombtn">Host Name</button>
                <button id="gameMode" type="button" class="btn info custombtn">Game Mode</button>
                <button id="numPlayers" type="button" class="btn info custombtn">Numbers of Players</button>
                <button id="mainMenu" type="button" class="btn exit custombtn">Leave Game</button>
            </div>`;
      document.getElementById("hostName").innerHTML = "Host: " + json.host;
      document.getElementById("gameMode").innerHTML = "Mode: " + json.mode;
      document.getElementById("numPlayers").innerHTML =
        "Players: " + json.players;
      // Reset event listeners
      document.getElementById("mainMenu").addEventListener("click", mainMenu);
    });
}

function startLobby() {
  // Get values and generate game code
  let code = makeCode(4);
  let host = document.getElementById("hostName").value;
  let mode = document.getElementById("gameMode").value;
  // Go to the loading screen
  document.getElementById("content").innerHTML = `
    <div id="buttons">
        <button type="button" class="btn info custombtn">Creating Game</button>
    </div>`;
  // Create the new game
  let createHeaders = new Headers();
  createHeaders.append("Content-Type", "application/json");
  createHeaders.append("Origin", "google.com");

  let raw = JSON.stringify({ code: code, host: host, mode: mode, players: 5 });

  let requestOptions = {
    method: "POST",
    headers: createHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(apiurl, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  // Rebuild content section
  document.getElementById("content").innerHTML = `
    <div id="buttons">
        <button type="button" class="btn info custombtn">Joining Game</button>
    </div>`;
  // Call API
  let url = apiurl + code + "/";
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Origin: "stevenrummler.com",
  });
  const myRequest = new Request(url, {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  });
  console.log(myRequest);
  fetch(myRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      if (json.detail === "Not found.") {
        joinGame("Game Creation Failed");
        return;
      }
      document.getElementById("content").innerHTML = `<div id="buttons">
                <button id="hostName" type="button" class="btn info custombtn">Host Name</button>
                <button id="gameCode" type="button" class="btn info custombtn">Host Name</button>
                <button id="gameMode" type="button" class="btn info custombtn">Game Mode</button>
                <button id="numPlayers" type="button" class="btn info custombtn">Numbers of Players</ button>
                <button id="startBtn" type="button" class="btn start custombtn">Start Game</button>
                <button id="mainMenu" type="button" class="btn exit custombtn">Leave Game</button>
            </div>`;
      document.getElementById("hostName").innerHTML = "You are the Host";
      document.getElementById("gameCode").innerHTML = "Join Code: " + json.code;
      document.getElementById("gameMode").innerHTML = "Mode: " + json.mode;
      document.getElementById("numPlayers").innerHTML =
        "Players: " + json.players;
      // Reset event listeners
      document.getElementById("mainMenu").addEventListener("click", mainMenu);
      document.getElementById("startBtn").addEventListener("click", startGame);
    });
}

function startGame() {
  // document.body.style.background = '#c1c5cd';

  // Rebuild content section
  document.getElementById("content").innerHTML = `
    <div class="gameDetails">
        <div>
            Your target:
            <span id="nameDetail" class="detail">STEFAN</span>
        </div>
        <div>Kills: <span id="killsDetail" class="detail">0</span></div>
        <div>Targets Remaining: <span id="targetsDetail" class="detail">5</span></div>
    </div>

    <div id="powerMessage" class="powerMessage">
        Message goes here
        <span id="timer">30s</span>
    </div>

    <?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 477.883 477.883" style="enable-background:new 0 0 477.883 477.883;" xml:space="preserve"><g>	<g>		<path d="M468.456,1.808c-4.811-2.411-10.478-2.411-15.289,0l0,0L9.433,223.675c-8.429,4.219-11.842,14.471-7.624,22.9			c2.401,4.798,6.919,8.188,12.197,9.151l176.111,32.034l32.034,176.111c1.311,7.219,7.091,12.793,14.353,13.841			c0.803,0.116,1.613,0.173,2.423,0.171c6.469,0.003,12.383-3.651,15.275-9.438L476.07,24.711			C480.292,16.284,476.883,6.03,468.456,1.808z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>

    <div id='taggedbtn' class="taggedbtn">Assassinated</div>

    <div id="map" class="map">
        <div id="myMarker" class="marker me"></div>
        <div id="targetMarker" class="marker target"></div>
    </div>

    <div id="powerups" class="powerups">
        <div id="power5" class="power">E</div>
        <div id="power4" class="power">D</div>
        <div id="power3" class="power">C</div>
        <div id="power2" class="power">B</div>
        <div id="power1" class="power">A</div>
    </div>
    `;

  el = document.getElementById("powerMessage");
  el.classList.add("hide");
  el.classList.remove("show");

  document.getElementById("myMarker").style.left = "4.6rem";
  document.getElementById("myMarker").style.bottom = "4.6rem";

  document.getElementById("targetMarker").style.left = "8rem";
  document.getElementById("targetMarker").style.bottom = "8rem";

  document.getElementById("power1").addEventListener("click", power1);
  document.getElementById("power2").addEventListener("click", power2);
  document.getElementById("power3").addEventListener("click", power3);
  document.getElementById("power4").addEventListener("click", power4);
  document.getElementById("power5").addEventListener("click", power5);

  document.getElementById("power1").classList.add("available");
  document.getElementById("power2").classList.add("available");
}

function power1() {
  document.getElementById("power1").classList.remove("available");
  document.getElementById("powerMessage").innerHTML =
    'Invisibility\t<span id="timer"></span>';

  el = document.getElementById("powerMessage");
  el.classList.add("show");
  el.classList.remove("hide");

  seconds = 5;
  countdown(seconds);
}

function power2() {
  document.getElementById("power2").classList.remove("available");
  document.getElementById("nameDetail").innerHTML = "Trent";
  kills = document.getElementById("killsDetail").innerHTML;
  targets = document.getElementById("targetsDetail").innerHTML;
  document.getElementById("killsDetail").innerHTML = Number(kills) + 1;
  document.getElementById("targetsDetail").innerHTML = Number(targets) - 1;

  document.getElementById("powerMessage").innerHTML = "Nice Work!";
  el = document.getElementById("powerMessage");
  el.classList.add("show");
  el.classList.remove("hide");

  seconds = 3;
  var countdown = setInterval(function () {
    seconds--;
    if (seconds <= 0) {
      clearInterval(countdown);
      el = document.getElementById("powerMessage");
      el.classList.add("hide");
      el.classList.remove("show");
    }
  }, 1000);
}

function countdown(seconds) {
  document.getElementById("timer").innerHTML = seconds;

  var countdown = setInterval(function () {
    seconds--;
    document.getElementById("timer").textContent = seconds;
    if (seconds <= 0) {
      clearInterval(countdown);
      el = document.getElementById("powerMessage");
      el.classList.add("hide");
      el.classList.remove("show");
    }
  }, 1000);
}

function makeCode(length) {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function demoCode() {
  document.getElementById("gameCode").value = "OSNG";
}

document.getElementById("createGame").addEventListener("click", createGame);
document.getElementById("joinGame").addEventListener("click", joinGame);
document.getElementById("alert").addEventListener("click", () => {
  document.getElementById("alert").style.display = "none";
});
