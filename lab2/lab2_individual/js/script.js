let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number: " + randomNumber);
    attempts = 0;
    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value = "";

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    document.querySelector("#guesses").textContent = "";
    updateAttemptsDisplay();
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99!";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    console.log("Attempts: " + attempts);
    updateAttemptsDisplay();
    document.querySelector("#guesses").textContent += guess + " ";
    feedback.style.color = "orange";
    
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";
        wins++;
        document.querySelector("#wins").textContent = wins;
        gameOver();
    } else {
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
            feedback.style.color = "red";
            losses++;
            document.querySelector("#losses").textContent = losses;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}

function updateAttemptsDisplay() {
    let attemptsLeft = 7 - attempts;
    document.querySelector("#attemptsLeft").textContent = attemptsLeft;
}