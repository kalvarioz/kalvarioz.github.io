document.getElementById("submitBtn").addEventListener("click", grade);

let score = 0;
let attempts = parseInt(localStorage.getItem("total_attempts")) || 0;

(function shuffleQ3() {
    const container = document.getElementById("q3Choices");
    const rows = Array.from(container.querySelectorAll(".choice-row"));
    for (let i = rows.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = rows[i];
        rows[i] = rows[j];
        rows[j] = temp;
    }
    rows.forEach(row => container.appendChild(row));
})();

function isValid() {
    const banner = document.getElementById("validation");
    if (document.getElementById("q1").value === "") {
        banner.textContent = "Please enter an answer in the textbox before submitting.";
        banner.className = "val-error"
        return false;
    }
    banner.textContent = "";
    banner.className = "val-hidden";
    return true;
}

function correct(index) {
    const fb = document.getElementById(`q${index}feedback`);
    const mark = document.getElementById(`mark${index}`);
    const block = fb.closest(".questionblock");
    fb.textContent = "Correct!";
    fb.className = "box box-correct";
    mark.src = "img/correct.png";
    mark.alt = "correct";
    mark.style.visibility = "visible"
    block.classList.add("questionblock-correct");
    block.classList.remove("questionblock-incorrect");
    score += 20;
}

function incorrect(index) {
    const fb = document.getElementById(`q${index}feedback`);
    const mark = document.getElementById(`mark${index}`);
    const block = fb.closest(".questionblock");
    fb.textContent = "Incorrect!";
    fb.className = "box box-incorrect";
    mark.src = "img/incorrect.png";
    mark.alt = "incorrect";
    mark.style.visibility = "visible"
    block.classList.add("questionblock-incorrect");
    block.classList.remove("questionblock-correct");
}

//uses ternary operators to determine correct or incorrect.
function grade() {
    if (!isValid()) {
        return
    }
    score = 0;

    //question 1
    const q1Response = document.getElementById("q1").value.trim().toLowerCase();
    ["carbon", "carbon fiber"].includes(q1Response) ? correct(1) : incorrect(1);

    //question 2
    const q2Response = document.getElementById("q2").value;
    q2Response === "Santa Cruz" ? correct(2) : incorrect(2);
    // question3
    const q3Checked = document.querySelector("input[name='q3']:checked");
    const q3Response = q3Checked ? q3Checked.value : "";
    q3Response === "tire-lever" ? correct(3) : incorrect(3);
    //question 4
    // const q4Response = document.getElementById("q4").value;
    const failureCorrect = document.getElementById("failiure-prone").checked;
    const qualityCorrect = document.getElementById("poor-quality").checked;
    const funnyWrong = document.getElementById("made-bike-funny").checked;
    const partyWrong = document.getElementById("party").checked;
    (failureCorrect && qualityCorrect && !funnyWrong && !partyWrong) ? correct(4) : incorrect(4);

    //question 5
    const q5Response = parseInt(document.getElementById("q5").value, 10);
    q5Response === 86 ? correct(5) : incorrect(5);

    const scoreQuiz = document.getElementById("totalScore");
    scoreQuiz.textContent = `total Score: ${score}/100`;
    scoreQuiz.className = score >= 80 ? "score-box good" : "score-box poor";

    const congrats = document.getElementById("congratsMsg");
    congrats.className = score > 80 ? "congrats-box" : "congrats-box congrats-hidden";
    attempts++;
    localStorage.setItem("total_attempts", attempts);
    document.getElementById("totalAttempts").textContent = `Times quiz has been taken: ${attempts}`;

}

