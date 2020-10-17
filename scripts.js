function createGame() {
    // Rebuild content section
    document.getElementById("content").innerHTML = '<div id="buttons"><button id="joinLobby" type="button" class="btn btn-secondary custombtn">Coming Soon</button><button id="mainMenu" type="button" class="btn btn-danger custombtn">Main Menu</button></div>'
    // Reset event listeners
    document.getElementById("mainMenu").addEventListener("click", mainMenu);
}

function joinGame() {
    // Rebuild content section
    document.getElementById("content").innerHTML = '<div id="buttons"><button id="demoCode" type="button" class="btn btn-secondary custombtn">Demo Code: </button><input class="form-control custombtn" id="gameCode" placeholder="Enter Game Code"><button id="joinLobby" type="button" class="btn btn-success custombtn">Join Lobby</button><button id="mainMenu" type="button" class="btn btn-danger custombtn">Main Menu</button></div>'
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
    // Rebuild content section
    document.getElementById("content").innerHTML = '<div id="buttons"><button id="hostName" type="button" class="btn btn-secondary custombtn">Host Name</button><button id="gameMode" type="button" class="btn btn-secondary custombtn">Game Mode</button><button id="numPlayers" type="button" class="btn btn-secondary custombtn">Numbers of Players</button><button id="mainMenu" type="button" class="btn btn-danger custombtn">Leave Game</button></div>'
    // Reset event listeners
    document.getElementById("mainMenu").addEventListener("click", mainMenu);
}

document.getElementById("createGame").addEventListener("click", createGame);
document.getElementById("joinGame").addEventListener("click", joinGame);
document.getElementById("alert").addEventListener("click", ()=>{document.getElementById("alert").style.display = "none"})