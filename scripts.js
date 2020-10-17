function createGame() {
    // Rebuild content section
}

function joinGame() {
    // Rebuild content section
    document.getElementById("content").innerHTML = '<div id="buttons"><input class="form-control custombtn" id="gameCode" placeholder="Enter Game Code"><button id="joinLobby" type="button" class="btn btn-success custombtn">Join Lobby</button><button id="mainMenu" type="button" class="btn btn-danger custombtn">Main Menu</button></div>'
    // Reset event listeners
    document.getElementById("joinLobby").addEventListener("click", joinLobby);
    document.getElementById("mainMenu").addEventListener("click", mainMenu);
}

function mainMenu() {
    // Rebuild content section
    document.getElementById("content").innerHTML = '<div id="buttons"><button id="createGame" type="button" class="btn btn-secondary custombtn">Create Game</button><button id="joinGame" type="button" class="btn btn-secondary custombtn">Join Game</button></div>'
    // Reset event listeners
    document.getElementById("createGame").addEventListener("click", createGame);
    document.getElementById("joinGame").addEventListener("click", joinGame);
}

function joinLobby() {
    // Call API
    // Rebuild content section
}

document.getElementById("createGame").addEventListener("click", createGame);
document.getElementById("joinGame").addEventListener("click", joinGame);