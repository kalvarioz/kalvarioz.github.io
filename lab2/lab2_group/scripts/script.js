const secretNumber = 42;
let guessesRemaining = 7;
let guessHistory = [];
let win = 0;
let losses = 0;

const guessInput = document.querySelector('#guessInput');
const submitBtn = document.querySelector('#submitBtn');
const resetBtn = document.querySelector('#resetBtn');
const guessesLeftDisplay = document.querySelector('#guessesLeft');
const messageDiv = document.querySelector('#message');
const guessListDiv = document.querySelector('#guessList');
const winsDisplay = document.querySelector('#wins');
const lossesDisplay = document.querySelector('#losses');



function updateGuessesDisplay() {
    guessesLeftDisplay.textContent = guessesRemaining;
}
function displayGuesses() {
    guessListDiv.innerHTML = '';
    guessHistory.forEach(guess => {
        const li = document.createElement('li');
        li.textContent = guess;
        guessListDiv.appendChild(li);
    });
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
}
function makeGuess() {
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 99) {
        showMessage('Please enter a number between 1 and 99', 'hint');
        return;
    }
    guessHistory.push(guess);
    displayGuesses();
    guessesRemaining--;
    updateGuessesDisplay();
    if (guess === secretNumber) {
        showMessage(`Congratulations!`, 'success');
        endGame(true);
        return;
    }
    if (guessesRemaining === 0) {
        showMessage(`Game Over! The number was ${secretNumber}`, 'fail');
        endGame(false);
        return;
    }
    if (guess < secretNumber) {
        showMessage('Too low! Try a higher number.', 'hint');
    } else {
        showMessage('Too high! Try a lower number.', 'hint');
    }
    guessInput.value = '';
    guessInput.focus();
}

function endGame(winner) {
    guessInput.disabled = true;
    submitBtn.disabled = true;
    resetBtn.style.display = 'block';
    if(winner){
        win++;
        winsDisplay.textContent = win;
    }else{
        losses++;
        lossesDisplay.textContent = losses;
    }
}

function resetGame() {
    guessInput.disabled = false;
    submitBtn.disabled = false;
    resetBtn.style.display = 'none';
    guessInput.value = '';
    messageDiv.textContent = '';
    messageDiv.className = 'message';
    guessesRemaining = 7;
    guessHistory = [];
    displayGuesses();
    updateGuessesDisplay();
}
submitBtn.addEventListener('click', function() {
    makeGuess();
});

resetBtn.addEventListener('click', function() {
    resetGame();
});

guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        makeGuess();
    }
});
