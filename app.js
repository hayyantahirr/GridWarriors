// Display a welcome message in the console
console.log("welcome to The Grid warriors!");

// Create an Audio object for background music and load the music file
let music = new Audio("/Assets/music.mp3");

// Create an Audio object for the turn sound effect and load the sound file
let turnAudio = new Audio("/Assets/ting.mp3");

// Create an Audio object for the game-over sound effect and load the sound file
let gameOver = new Audio("/Assets/gameover.mp3");

// Initialize the current player's turn as "X"
let currentTurn = "X";

// Variable to check if the game is over
let isgameover = false;

// Function to change the turn to the next player
const changeTurn = () => {
  // If the current turn is "X", change it to "O", otherwise change it to "X"
  return currentTurn === "X" ? "0" : "X";
};

// Function to check if a player has won the game
const checkWin = () => {
  // Get all elements with the class "boxtext" (these hold the players' moves)
  let boxtext = document.getElementsByClassName("boxtext");

  // Define all possible winning combinations (indices in the grid)
  let wins = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal (top-left to bottom-right)
    [2, 4, 6], // Diagonal (top-right to bottom-left)
  ];

  // Loop through all winning combinations
  wins.forEach((e) => {
    // Check if all three boxes in a combination have the same non-empty text
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      // Display the winning message in the "info" section
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won";

      // Set the game over flag to true
      isgameover = true;

      // Show a winning image by resizing the image's width
      document
        .querySelector(".img-div")
        .getElementsByTagName("img")[0].style.width = "60%";

      // Stop the background music
      music.pause();

      // Play the game-over sound
      gameOver.play();
    }
  });
};

// Main game logic
// Get all elements with the class "box" (individual grid cells)
let boxes = document.getElementsByClassName("box");

// Convert the HTMLCollection to an array and loop through each box
Array.from(boxes).forEach((element) => {
  // Get the "boxtext" element inside the current box
  let boxtext = element.querySelector(".boxtext");

  // Add a click event listener to the current box
  element.addEventListener("click", () => {
    // Only allow the player to make a move if the box is empty
    if (boxtext.innerText === "") {
      // Set the current player's symbol ("X" or "O") in the box
      boxtext.innerText = currentTurn;

      // Play the turn sound effect
      turnAudio.play();

      // Change the turn to the next player
      currentTurn = changeTurn();

      // Check if the current move resulted in a win
      checkWin();

      // If the game is not over, update the "info" section with the next turn
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + currentTurn;
      }
    }
  });
});

// Function to reset the game to its initial state
function reset(params) {
  // Get all "boxtext" elements (grid cells)
  let boxtexts = document.querySelectorAll(".boxtext");

  // Clear the text in each box
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });

  // Reset the game over flag
  isgameover = false;

  // Set the current turn back to "X"
  currentTurn = "X";

  // Update the "info" section to indicate "X"'s turn
  document.getElementsByClassName("info")[0].innerText =
    "Turn for " + currentTurn;

  // Hide the winning image by setting its width to 0
  document
    .querySelector(".img-div")
    .getElementsByTagName("img")[0].style.width = "0%";

  // Restart the background music
  music.play();
}
