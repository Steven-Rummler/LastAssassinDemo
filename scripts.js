const apiurl = 'http://stevenrummler.com:8000/games/';

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
    if (typeof (error) == "string") {
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
    if (value === "")
        return;
    let url = apiurl + value + "/";
    // Rebuild content section
    document.getElementById("content").innerHTML = `
    <div id="buttons">
        <button type="button" class="btn info custombtn">Joining Game</button>
    </div>`;
    // Display API data
    const myHeaders = new Headers({ 'Content-Type': 'application/json', 'Origin': 'stevenrummler.com' });
    const myRequest = new Request(url, { method: 'GET', headers: myHeaders, mode: 'cors', cache: 'default', });
    console.log(myRequest);
    fetch(myRequest)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
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
            document.getElementById("numPlayers").innerHTML = "Players: " + json.players;
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

    let raw = JSON.stringify({ "code": code, "host": host, "mode": mode, "players": 5 });

    let requestOptions = {
        method: 'POST',
        headers: createHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(apiurl, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    // Rebuild content section
    document.getElementById("content").innerHTML = `
    <div id="buttons">
        <button type="button" class="btn info custombtn">Joining Game</button>
    </div>`;
    // Call API
    let url = apiurl + code + "/";
    const myHeaders = new Headers({ 'Content-Type': 'application/json', 'Origin': 'stevenrummler.com' });
    const myRequest = new Request(url, { method: 'GET', headers: myHeaders, mode: 'cors', cache: 'default', });
    console.log(myRequest);
    fetch(myRequest)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
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
            document.getElementById("numPlayers").innerHTML = "Players: " + json.players;
            // Reset event listeners
            document.getElementById("mainMenu").addEventListener("click", mainMenu);
            document.getElementById("startBtn").addEventListener("click", startGame);
        });
}

function startGame() {
    console.log('game has started...')

    // Rebuild content section
    document.getElementById("content").innerHTML = `
    <div id="buttons">
        <button type="button" class="btn info custombtn">
        Your target is ...
        <span class="targetName">STEFAN</span>
        </button>
    </div>`;
}

function makeCode(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
document.getElementById("alert").addEventListener("click", () => { document.getElementById("alert").style.display = "none" })