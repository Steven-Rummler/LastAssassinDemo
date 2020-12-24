let player_info = {
  tags: 0,
  target: "",
  powers: {
    radar_jam: 0,
    invincible: 0,
    all_seeing: 0,
    spider_sense: 0,
  },
};

let games = {
  OSNG: {
    host: "Steven",
    mode: "Classic",
    players: {
      Steven: Object.assign({}, player_info),
      PlayerOne: Object.assign({}, player_info),
      PlayerTwo: Object.assign({}, player_info),
      PlayerThree: Object.assign({}, player_info),
    },
  },
};

let tutorialMessages = [
  "Welcome to Last Assassin", 
  "The goal of the game is to eliminate all your targets",
  "When you eliminate a target, you are assigned a new target",
  "The game ends when there is only one player left",
  "The assassin with the most kills wins the game"
]
let message = 0;

let player = "";

let direction = 0;
let momentum = 0;
let distance = 60;

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
        <button id="demoCode" type="button" class="btn action custombtn">Use Demo Info</button>
        <input class="form-control custombtn entry" id="playerName" placeholder="Enter Player Name">
        <input class="form-control custombtn entry" id="gameCode" placeholder="Enter Game Code">
        <button id="joinLobby" type="button" class="btn action custombtn">Join Lobby</button>
        <button id="mainMenu" type="button" class="btn exit custombtn">Main Menu</button>
    </div>`;
  if (typeof error == "string") {
    document.getElementById("gameCode").placeholder = error;
  }
  // Reset event listeners
  document.getElementById("demoCode").addEventListener("click", demoCode);
  document.getElementById("joinLobby").addEventListener("click", function () {
    joinLobby(
      document.getElementById("gameCode").value,
      document.getElementById("playerName").value
    );
  });
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

function joinLobby(code, playerName) {
  // Check that a code was entered.
  if (code === "") return;

  // Add player to game, set player
  player = playerName;

  games[code]["players"][playerName] = Object.assign({}, player_info);

  // Rebuild content section
  document.getElementById("content").innerHTML = `
  <div class="preloader">
    <svg id="ninjastar" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 0L122.451 69.0983H195.106L136.327 111.803L158.779 180.902L100 138.197L41.2215 180.902L63.6729 111.803L4.89435 69.0983H77.5486L100 0Z" fill="#6C090C"/>
    <path d="M100 0L122.451 69.0983H195.106L136.327 111.803L158.779 180.902L100 138.197L41.2215 180.902L63.6729 111.803L4.89435 69.0983H77.5486L100 0Z" stroke="#6C090C"/>
    <circle cx="73" cy="62" r="20" fill="#e9eef3"/>
    <circle cx="56" cy="114" r="20" fill="#e9eef3"/>
    <circle cx="128" cy="62" r="20" fill="#e9eef3"/>
    <circle cx="99.5" cy="100.5" r="12.5" fill="#e9eef3"/>
    <circle cx="100" cy="148" r="20" fill="#e9eef3"/>
    <circle cx="144" cy="114" r="20" fill="#e9eef3"/>
    </svg>
    <button type="button" class="btn info custombtn">Joining Game</button>
  </div>`;
  console.log(games, code);
  setTimeout(function () {
    let content = '<div id="buttons">';
    if (player != games[code]["host"]) {
      content +=
        '<div id="message" class="message">Waiting For Host To Start The Game...</div>';
    }
    content += `
        <button id="hostName" type="button" class="btn info custombtn">Host Name</button>
        <button id="gameMode" type="button" class="btn info custombtn">Game Mode</button>
        <button id="numPlayers" type="button" class="btn info custombtn">Numbers of Players</button>`;
    if (player == games[code]["host"]) {
      content +=
        '<button id="startBtn" type="button" class="btn start custombtn">Start Game</button>';
    }
    content += `
            <button id="mainMenu" type="button" class="btn exit custombtn">Leave Game</button>
         </div>`;
    document.getElementById("content").innerHTML = content;

    document.getElementById("hostName").innerHTML =
      "Host: " + games[code]["host"];
    document.getElementById("gameMode").innerHTML =
      "Mode: " + games[code]["mode"];
    document.getElementById("numPlayers").innerHTML =
      "Players: " + Object.keys(games[code]["players"]).length;
    // Reset event listeners
    if (player == games[code]["host"]) {
      document.getElementById("startBtn").addEventListener("click", startGame);
    }
    document.getElementById("mainMenu").addEventListener("click", mainMenu);
  }, 1000);
}

function startLobby() {
  // Get values and generate game code
  let code = makeCode(4);
  let hostName = document.getElementById("hostName").value;
  let gameMode = document.getElementById("gameMode").value;
  // Go to the loading screen
  document.getElementById("content").innerHTML = `
  <div class="preloader">
    <svg id="ninjastar" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 0L122.451 69.0983H195.106L136.327 111.803L158.779 180.902L100 138.197L41.2215 180.902L63.6729 111.803L4.89435 69.0983H77.5486L100 0Z" fill="#6C090C"/>
    <path d="M100 0L122.451 69.0983H195.106L136.327 111.803L158.779 180.902L100 138.197L41.2215 180.902L63.6729 111.803L4.89435 69.0983H77.5486L100 0Z" stroke="#6C090C"/>
    <circle cx="73" cy="62" r="20" fill="#e9eef3"/>
    <circle cx="56" cy="114" r="20" fill="#e9eef3"/>
    <circle cx="128" cy="62" r="20" fill="#e9eef3"/>
    <circle cx="99.5" cy="100.5" r="12.5" fill="#e9eef3"/>
    <circle cx="100" cy="148" r="20" fill="#e9eef3"/>
    <circle cx="144" cy="114" r="20" fill="#e9eef3"/>
    </svg>
    <button type="button" class="btn info custombtn">Creating Game</button>
  </div>`;
  // Create the new game
  if (code in games) {
    console.log("Game already exists, joining game.");
  } else {
    player = hostName;
    games[code] = {
      host: hostName,
      mode: gameMode,
      players: {
        PlayerOne: Object.assign({}, player_info),
        PlayerTwo: Object.assign({}, player_info),
        PlayerThree: Object.assign({}, player_info),
      },
    };
    games[code]["players"][hostName] = Object.assign({}, player_info);
  }

  // Join the Game
  joinLobby(code, hostName);
}

function startGame() {
  // If we don't need the game title here, should we remove it to save screen space ? 
  pt = document.getElementById("page_title");
  pt.classList.add("hide");
  document.getElementById("content").style.top = 0;

  // Rebuild content section
  document.getElementById("content").innerHTML = `
    <div class="gameDetails">
        <div>
            Your target:
            <span id="nameDetail" class="detail">STEFAN</span>
        </div>
        <div>Kills: <span id="killsDetail" class="detail">0</span></div>
        <div>Targets Remaining: <span id="targetsDetail" class="detail">3</span></div>
        <div id="tutorialbtn">?</div>
    </div>

    <div id="instructions" class="alert alert-warning" role="alert">
        Hit Power 'B' to 'tag someone'. This is a user experience demo, functionality is limited. Thanks for your help!
    </div>

    <div id="powerMessage" class="powerMessage">
        Message goes here
        <span id="timer">30s</span>
    </div>

    <?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" class="compass" id="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 477.883 477.883" style="enable-background:new 0 0 477.883 477.883;" xml:space="preserve"><g>	<g>		<path d="M468.456,1.808c-4.811-2.411-10.478-2.411-15.289,0l0,0L9.433,223.675c-8.429,4.219-11.842,14.471-7.624,22.9			c2.401,4.798,6.919,8.188,12.197,9.151l176.111,32.034l32.034,176.111c1.311,7.219,7.091,12.793,14.353,13.841			c0.803,0.116,1.613,0.173,2.423,0.171c6.469,0.003,12.383-3.651,15.275-9.438L476.07,24.711			C480.292,16.284,476.883,6.03,468.456,1.808z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>

    <div class="compass" id="distance">60m</div>

    <div id='taggedbtn' class="taggedbtn action">I was Assassinated</div>

    <div id="powerUpsTab" class="tab">PowerUps</div>
    <div id="powerups" class="powerups">
      <div id="power1" class="power">Stealth Mode</div>
      <div id="power2" class="power">Invincible</div>
      <div id="power3" class="power">All Seeing</div>
      <div id="power4" class="power">Spider Sense</div>
    </div>

    <div id="achievmentsTab" class="tab">Achievements</div>
    <div id="achievments" class="achievments">
      <div id="achievment1" class="achievment">First Kill</div>
      <div id="achievment2" class="achievment">Get Killed</div>
      <div id="achievment3" class="achievment">Stealth Ninja</div>
      <div id="achievment4" class="achievment">Last Assassin</div>
    </div>

    `;

  el = document.getElementById("powerMessage");
  el.classList.add("hide");
  el.classList.remove("show");

  document.getElementById("tutorialbtn").addEventListener("click", tutorial);
  document.getElementById("powerUpsTab").addEventListener("click", showPowerups);
  document.getElementById("achievmentsTab").addEventListener("click", showAchievments);

  document.getElementById("power1").addEventListener("click", power1);
  document.getElementById("power2").addEventListener("click", power2);
  // document.getElementById("power3").addEventListener("click", power3);
  // document.getElementById("power4").addEventListener("click", power4);
  // document.getElementById("power5").addEventListener("click", power5);

  document.getElementById("taggedbtn").addEventListener("click", dead);

  document.getElementById("instructions").addEventListener("click", () => {
    document.getElementById("instructions").remove();
  });

  document.getElementById("power1").classList.add("available");
  document.getElementById("power2").classList.add("available");

  let arrow = document.getElementById("arrow");
  let range = document.getElementById("distance");

  setInterval(() => {
    direction += getRandomInt(-5, 10);
    if (momentum > 4) {
      momentum -= 1;
    }
    if (momentum < -4) {
      momentum += 1;
    }
    if (distance < 10) {
      momentum = 0;
    }
    if (distance < 30) {
      momentum += getRandomInt(-1, 3);
    } else if (distance < 60) {
      momentum += getRandomInt(-2, 3);
    } else {
      momentum += getRandomInt(-2, 2);
    }
    distance += momentum;
    arrow.style.transform = "rotate(" + Math.trunc(direction) + "deg)";
    range.innerText = distance + "m";
  }, 1000);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function showPowerups() {
  pu = document.getElementById("powerups");
  put = document.getElementById("powerUpsTab");
  ac = document.getElementById("achievments");
  act = document.getElementById("achievmentsTab");

  if(ac.classList.contains("animateSlideIn")){
    ac.classList.remove("animateSlideIn");
    ac.classList.add("animateSlideOut");
    act.classList.remove("animateSlideIn2");
    act.classList.add("animateSlideOut2");
  }
  
  if(pu.classList.contains("animateSlideIn")){
    pu.classList.remove("animateSlideIn");
    pu.classList.add("animateSlideOut");
    put.classList.remove("animateSlideIn2");
    put.classList.add("animateSlideOut2");
  }
  else {
    pu.classList.remove("animateSlideOut");
    pu.classList.add("animateSlideIn");
    put.classList.remove("animateSlideOut2");
    put.classList.add("animateSlideIn2");
  }
}

function showAchievments() {
  ac = document.getElementById("achievments");
  act = document.getElementById("achievmentsTab");
  pu = document.getElementById("powerups");
  put = document.getElementById("powerUpsTab");
  
  if(pu.classList.contains("animateSlideIn")){
    pu.classList.remove("animateSlideIn");
    pu.classList.add("animateSlideOut");
    put.classList.remove("animateSlideIn2");
    put.classList.add("animateSlideOut2");
  }

  if(ac.classList.contains("animateSlideIn")){
    ac.classList.remove("animateSlideIn");
    ac.classList.add("animateSlideOut");
    act.classList.remove("animateSlideIn2");
    act.classList.add("animateSlideOut2");
  }
  else {
    ac.classList.remove("animateSlideOut");
    ac.classList.add("animateSlideIn");
    act.classList.remove("animateSlideOut2");
    act.classList.add("animateSlideIn2");
  }
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}

function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

function tutorial() {
  overlayOn();
  document.getElementById("tutorialText").innerHTML = tutorialMessages[message];
}

function nextMessage() {
  
  if(tutorialMessages[message + 1]){
    message += 1;
    document.getElementById("tutorialText").innerHTML = tutorialMessages[message];
    
    la = document.getElementById("leftArrow");
    la.classList.add("show");
    la.classList.remove("hide");

    if(! tutorialMessages[message + 1]){
      ra = document.getElementById("rightArrow");
      ra.classList.add("hide");
      ra.classList.remove("show");
    }
  }

}

function previousMessage() {
  if(tutorialMessages[message - 1]){
    message -= 1;
    document.getElementById("tutorialText").innerHTML = tutorialMessages[message];

    ra = document.getElementById("rightArrow");
    ra.classList.add("show");
    ra.classList.remove("hide");

    if(! tutorialMessages[message - 1]){
      la = document.getElementById("leftArrow");
      la.classList.add("hide");
      la.classList.remove("show");
    }
  }

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

  document.getElementById("powerMessage").innerHTML = "You're Invincible!";
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

function dead() {
  let taggedbtn = document.getElementById("taggedbtn");
  taggedbtn.removeEventListener("click", dead);
  taggedbtn.innerText = "On Ben's Team";
  taggedbtn.classList.add("info");
  taggedbtn.classList.remove("action");
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
  document.getElementById("playerName").value = "Steven";
}

document.getElementById("createGame").addEventListener("click", createGame);
document.getElementById("joinGame").addEventListener("click", joinGame);
document.getElementById("alert").addEventListener("click", () => {
  document.getElementById("alert").style.display = "none";
});
