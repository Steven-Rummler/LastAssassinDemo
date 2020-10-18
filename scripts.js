function createGame() {
    // Rebuild content section
    document.getElementById("content").innerHTML = '<div id="buttons"><button id="joinLobby" type="button" class="btn btn-secondary custombtn">Coming Soon</button><button id="mainMenu" type="button" class="btn btn-danger custombtn">Main Menu</button></div>'
    // Reset event listeners
    document.getElementById("mainMenu").addEventListener("click", mainMenu);
}

function joinGame(invalidCode = false) {
    // Rebuild content section
    document.getElementById("content").innerHTML = '<div id="buttons"><button id="demoCode" type="button" class="btn btn-secondary custombtn">Demo Code: abc</button><input class="form-control custombtn" id="gameCode" placeholder="Enter Game Code"><button id="joinLobby" type="button" class="btn btn-success custombtn">Join Lobby</button><button id="mainMenu" type="button" class="btn btn-danger custombtn">Main Menu</button></div>';
    if (invalidCode === true) {
        document.getElementById("gameCode").placeholder = "Invalid Code"
    }
    // Reset event listeners
    document.getElementById("joinLobby").addEventListener("click", joinLobby);
    document.getElementById("mainMenu").addEventListener("click", mainMenu);
}

function mainMenu() {
    // Rebuild content section
    document.getElementById("content").innerHTML = '<div id="buttons"><button id="createGame" type="button" class="btn btn-success custombtn">Create Game</button><button id="joinGame" type="button" class="btn btn-success custombtn">Join Game</button></div>'
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
    let url = "http://stevenrummler.com:8000/games/" + value;
    // Rebuild content section
    document.getElementById("content").innerHTML = '<div id="buttons"><button type="button" class="btn btn-secondary custombtn">Joining Game</button></div>';
    // Display API data
    const myHeaders = new Headers({'Content-Type':'application/json','Origin':'stevenrummler.com'});
    const myRequest = new Request(url, {method:'GET',headers:myHeaders,mode:'cors',cache:'default',});
    console.log(myRequest);
    fetch(myRequest)
        .then(function(response) {
            return response.json();
        }) .then(function(json) {
            if (json.detail === "Not found.") {
                joinGame(true);
                return;
            }
            document.getElementById("content").innerHTML = '<div id="buttons"><button id="hostName" type="button" class="btn btn-secondary custombtn">Host Name</button><button id="gameMode" type="button" class="btn btn-secondary custombtn">Game Mode</button><button id="numPlayers" type="button" class="btn btn-secondary custombtn">Numbers of Players</button><button id="mainMenu" type="button" class="btn btn-danger custombtn">Leave Game</button></div>';
            document.getElementById("hostName").innerHTML = "Host: " + json.host;
            document.getElementById("gameMode").innerHTML = "Mode: " + json.mode;
            document.getElementById("numPlayers").innerHTML = "Players: " + json.players;
        });
    // Reset event listeners
    document.getElementById("mainMenu").addEventListener("click", mainMenu);
}

document.getElementById("createGame").addEventListener("click", createGame);
document.getElementById("joinGame").addEventListener("click", joinGame);
document.getElementById("alert").addEventListener("click", ()=>{document.getElementById("alert").style.display = "none"})