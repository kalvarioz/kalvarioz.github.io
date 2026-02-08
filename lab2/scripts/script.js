const secretNumber = 42;
let guessesRemaining = 7;

const guessInput = document.querySelector('#guessInput');
const submitBtn = document.querySelector('#submitBtn');
const resetBtn = document.querySelector('#resetBtn');
const guessesLeftDisplay = document.querySelector('#guessesLeft');
const messageDiv = document.querySelector('#message');
function updateGuessesDisplay() {
    guessesLeftDisplay.textContent = guessesRemaining;
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
    guessesRemaining--;
    updateGuessesDisplay();
    if (guess === secretNumber) {
        showMessage(`Congratulations!`, 'success');
        endGame();
        return;
    }
    if (guessesRemaining === 0) {
        showMessage(`Game Over! The number was ${secretNumber}`, 'fail');
        endGame();
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

function endGame() {
    guessInput.disabled = true;
    submitBtn.disabled = true;
    resetBtn.style.display = 'block';
}

function resetGame() {
    guessInput.disabled = false;
    submitBtn.disabled = false;
    resetBtn.style.display = 'none';
    guessInput.value = '';
    messageDiv.textContent = '';
    messageDiv.className = 'message';
    guessesRemaining = 7;
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
