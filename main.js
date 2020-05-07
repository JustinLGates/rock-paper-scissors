let rockElem = document.getElementById("rock");
let paperElem = document.getElementById("paper");
let sissorsElem = document.getElementById("sissors");
let scoreElem = document.getElementById("player-score");
let computerScoreElem = document.getElementById("computer-score");
let humanScore = 0;
let computerScore = 0;

let choices = [
  { name: "rock", beats: ["sissors", "lizard"] },
  { name: "paper", beats: ["rock", "spock"] },
  { name: "sissors", beats: ["paper", "lizard"] },
  { name: "spock", beats: ["sissors", "rock"] },
  { name: "lizard", beats: ["spock", "paper"] },
];
function randChar() {
  return choices[randomChoice(choices.length - 1)];
}
function pick(choice) {
  let canBeat = choices.find((c) => c.name == choice).beats;
  console.log("player has selected: " + choice);

  didPlayerWin(choice, canBeat);
}

function addButtons() {
  let template = "";
  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    template += `<div class="col-6 col-lg-4 d-flex justify-content-center"><button class="btn m-3 p-2 btn-dark"onclick="pick('${choice.name}')">${choice.name}</button></div>`;
  }
  document.getElementById("buttons").innerHTML = template;
}
addButtons();

/**
 * Takes a max value as an argument and returns a random value between 0 - (max-1)
 * default number is choices.length
 * @param {Number} max
 * @returns A random number between 0 and (max-1)
 */
function randomChoice(max = choices.length) {
  return Math.floor(Math.random() * max);
}
randomChoice(choices.length);

/**
 * returns computers choice of rock paper or sissors
 */
function computerChoice() {
  let computerChoice = randomChoice();
  return choices[computerChoice];
}

/**
 *
 * @param {Object} playersChoice
 * @returns Booleen
 */
function didPlayerWin(playersChoice, canBeat) {
  let computersSelection = computerChoice();
  console.log("computer selected: " + computersSelection.name);
  if (
    computersSelection.name === canBeat[0] ||
    computersSelection.name === canBeat[1]
  ) {
    displayTheWinner("Human", playersChoice, computersSelection.name);
    humanScore++;
  } else if (
    playersChoice === computersSelection.beats[0] ||
    playersChoice === computersSelection.beats[1]
  ) {
    displayTheWinner("Computer", computersSelection.name, playersChoice);
    computerScore++;
  } else {
    console.log("its a draw");
    displayTheWinner("tie");
  }
  drawScore();
}

function displayTheWinner(winner = "", wc = "", lc = "") {
  if (winner !== "tie") {
    document.getElementById(
      "display-winner"
    ).innerHTML = `<h1 class="text-center" >${winner} is the winner ${wc} beats ${lc} </h1>`;
  } else {
    document.getElementById(
      "display-winner"
    ).innerHTML = `<h1 class="text-center" >Its a draw</h1>`;
  }
}

function drawScore() {
  document.getElementById(
    "score"
  ).innerHTML = `<h1>Human Score: ${humanScore}</h1>`;
  document.getElementById(
    "computer-score"
  ).innerHTML = `<h1>Computer Score: ${computerScore}</h1>`;
}
drawScore();
