// ——————————————————————————————————————————————————————————————
// ——————————————————————— DOTS & BOXES —————————————————————————
// ——————————————————————————————————————————————————————————————

let grid = document.querySelector(".grid-container");

// _________________________________________ MATRIX TO GET BOX POSITION

let matrix = [
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5],
];

// _______________________________________________________ CREATE GRID

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix.length; col++) {
    const box = document.createElement("div");
    box.classList.add("grid-item");
    box.setAttribute("x", row);
    box.setAttribute("y", col);
    grid.appendChild(box);


    // const dot = document.createElement("div");
    // dot.classList.add("dots");
    // box.setAttribute("x", row);
    // box.setAttribute("y", col);
    // grid.appendChild(dot);
  }
}

let dot = document.querySelectorAll(".dots");

// _____________________________________________________ GAME VARIABLE

let boxes = document.querySelectorAll(".grid-item");
let playersTurn = "player1";
let turn = 0;
let player1Color = "#8CE48E";
let player2Color = "#6F5EEC";
let boxWasJustClosed = false;

// __________________________________________________________ PLAYERS

function initPlayers() {
  const players = {
    1: {
      name: "Player 1",
      color: player1Color,
      score: 0,
      turn: 0,
      highlightedColor: "#C6F8C7",
    },
    2: {
      name: "Player 2",
      color: player2Color,
      score: 0,
      turn: 1,
      highlightedColor: "#B0A7F2",
    },
  };

  return players;
}

const players = initPlayers();

console.log(players);
console.log(players[1]);
console.log(players[2]);

// __________________________________________ DISPLAYS PLAYER'S TURN

function startMessage(player) {
  const msg = document.querySelector(".msg");
  const bg = document.querySelector("#console");

  msg.textContent = `${players[1].name} starts`;
  msg.style.color = "white";
  if (player === "player1") {
    msg.textContent = `${players[1].name}`;
    bg.style.backgroundColor = players[1].highlightedColor;
    bg.style.borderColor = player1Color;
    msg.style.color = "#212325";
  } else if (player === "player2") {
    msg.textContent = `${players[2].name}`;
    bg.style.backgroundColor = players[2].highlightedColor;
    bg.style.borderColor = player2Color;
    msg.style.color = "#212325";
  }
  console.log(msg);
;}

// ____________________________________________________ CHANGES TURN

function changeTurn() {
  playersTurn = playersTurn === "player1" ? "player2" : "player1";
  startMessage(playersTurn);
  return playersTurn;
}

// ___________________________________________ COLOR CHANGES BY TURN

function changeColor() {

  let color;

  if (playersTurn === "player1") {
    color = player1Color;
    console.log("THIS IS PLAYER 1", players[1].color);
  } else {
    color = player2Color;
    console.log("THIS IS PLAYER 2", players[2].color);
  }

  return color;
}

// ______________________________________________________ ENDGAME

function endGame() {
  let winner = "";
  let maxScore = 36;
  let sumPlayers = players[1].score + players[2].score;
  const msg = document.querySelector(".msg");
  const bg = document.querySelector("#console");

  if (maxScore === sumPlayers) {
    if (players[1].score < players[2].score) {
      winner = "player2";
      msg.textContent = `${players[2].name} won`;
      bg.style.backgroundColor = "#f2eda7";
      bg.style.borderColor = player2Color;
      msg.style.color = "#212325";
    } else {
      winner = "player1";
      msg.textContent = `${players[1].name} won`;
      bg.style.backgroundColor = "#f2eda7";
      bg.style.borderColor = player1Color;
      msg.style.color = "#212325";
    }
  }
}

// ______________________________________________ STARTS THE MESSAGE

startMessage();

// ________________________________________________ GIVES EXTRA TURN

function extraTurn() {
  if (checkScore() === players[1].score) changeColor() = player1Color;
}

// _______________________________________________________ GAME LOOP

boxes.forEach((box) => {
  const pos = box.getBoundingClientRect();
  
  box.addEventListener("mouseenter", function (e) {
    e.target.style.color = changeColor();
  })

  box.onclick = (e) => {
    // ---Variables and definition of each side position---

    let audio = new Audio("./SOUND/click.wav");

    document.onclick = function () {
      audio.play();
    };

    const abs = box.getAttribute("x");
    const ord = box.getAttribute("y");

    // ---Get mouse position relative to the Grid---

    let x = e.clientX - pos.left; // Position absisse
    let y = e.clientY - pos.top; // Ordonnée
    let w = pos.right - pos.left; // Width
    let h = pos.top - pos.bottom; // Height


    // __________________________________ COLORIZE SIDE AND NEIGHBOR
    if ("mouseover", box.border) {
      
    }
    if (x < 10) {
      box.style.borderLeftColor = changeColor();

      const neighborLeft = document.querySelector(
        `[x='${abs}'][y='${ord - 1}']`
      );
      console.log(neighborLeft);
      if (neighborLeft) {
        neighborLeft.style.borderRightColor = changeColor();
        console.log(box.style.borderLeftColor);
        console.log(neighborLeft.style.borderRightColor);
        console.log("clicked on the left border!");
      }
    }
    if (y < 10) {
      box.style.borderTopColor = changeColor();
      console.log("this is abs and ord", abs, ord);
      const neighborTop = document.querySelector(
        `[x='${abs - 1}'][y='${ord}']`
      );
      console.log(neighborTop);
      if (neighborTop) {
        neighborTop.style.borderBottomColor = changeColor();
        console.log(box.style.borderTopColor);
        console.log(neighborTop.style.borderBottomColor);
        console.log("clicked on the top border!");
      }
    }
    if (y > 90) {
      box.style.borderBottomColor = changeColor();
      const neighborBottom = document.querySelector(
        `[x='${abs + 1}'][y='${ord}']`
      );
      console.log("clicked on the bottom border!");
      if (neighborBottom) {
        neighborBottom.style.borderTopColor = changeColor();
        console.log(neighborBottom.style.borderTopColor);
      }
    }
    if (x > 90) {
      box.style.borderRightColor = changeColor();
      const neighborRight = document.querySelector(
        `[x='${abs}'][y='${ord + 1}']`
      );
      if (neighborRight) {
        console.log(neighborRight);
        neighborRight.style.borderLeftColor = changeColor();
        console.log("clicked on the right border!");
      }
    }

    // _____________________________________ CHECK WHO WINS A POINT
    checkScore();
    if (!boxWasJustClosed) changeTurn();
    if (boxWasJustClosed) boxWasJustClosed = false;
  };
});

// _______________________________________________________ SCORING

function checkScore() {
  let audio = new Audio("./SOUND/point.wav");
  
  boxes.forEach((box) => {
    if (box.style.borderColor) {
      if (!box.classList.contains("locked")) {
        // turn += 1;
        box.classList.add("locked");
        if (playersTurn === "player1") {
          //box.style.color = player1Color;
          players[1].score += 1;
          audio.play();
          box.style.backgroundColor = players[1].highlightedColor;
          console.log("player1", players[1].score);
          boxWasJustClosed = true;
          endGame();
        } else {
          players[2].score += 1;
          audio.play();
          box.style.backgroundColor = players[2].highlightedColor;
          console.log("player2", players[2].score);
          boxWasJustClosed = true;
          endGame();
        }
      }
    }
  });

  document.getElementById("player1").innerHTML = players[1].score;
  document.getElementById("player2").innerHTML = players[2].score;
}