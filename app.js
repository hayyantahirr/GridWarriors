console.log("welcome to The Grid warriors!");
let music = new Audio("/Assets/music.mp3");
let turnAudio = new Audio("/Assets/ting.mp3");
let gameOver = new Audio("/Assets/gameover.mp3");
let currentTurn = "X";

let isgameover = false;
const changeTurn = () => {
  return currentTurn === "X" ? "0" : "X";
};

//  function to check win
// music.play()
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won";
      isgameover = true;
      document
        .querySelector(".img-div")
        .getElementsByTagName("img")[0].style.width = "60%";
      music.pause();
      gameOver.play();
    }
  });
};

// main logic
// music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = currentTurn;
      turnAudio.play();
      currentTurn = changeTurn();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + currentTurn;
      }
    }
  });
});

// reset button logic
function reset(params) {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  isgameover = false;
  currentTurn = "X";
  document.getElementsByClassName("info")[0].innerText =
    "Turn for " + currentTurn;
  document
    .querySelector(".img-div")
    .getElementsByTagName("img")[0].style.width = "0%";
  music.play();
}
