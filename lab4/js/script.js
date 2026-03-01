const zipInput = document.getElementById("zipCode");
const zipError = document.getElementById("zipError");
const citySpan = document.getElementById("city");
const latSpan = document.getElementById("latitude");
const lngSpan = document.getElementById("longitude");
const stateSelect = document.getElementById("stateSelect");
const countySelect = document.getElementById("countySelect");
const usernameInput = document.getElementById("username");
const usernameMessage = document.getElementById("usernameMessage");
const usernameError = document.getElementById("usernameError");
const passwordInput = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");
const passwordError = document.getElementById("passwordError");
const passwordMatchError = document.getElementById("passwordMatchError");
const suggestedDisplay = document.getElementById("suggestedDisplay");

zipInput.addEventListener("change", async function () {
    const zip = zipInput.value.trim();
    if (zip === "") return;
    try {
        const response = await fetch(`https://csumb.space/api/cityInfoAPI.php?zip=${zip}`);
        const data = await response.json();
        if (!data.city) {
            zipError.textContent = "Zip code not found.";
        } else {
            zipError.textContent = "";
            citySpan.textContent = data.city;
            citySpan.style.color = "#2b6cb0";
            latSpan.textContent = data.latitude;
            lngSpan.textContent = data.longitude;
        }
    } catch (error) {
        console.error("Error fetching zip data:", error);
        zipError.textContent = "Error looking up zip.";
    }
});

async function loadStates() {
    try {
        const response = await fetch("https://csumb.space/api/allStatesAPI.php");
        const states = await response.json();
        states.forEach(function (stateObj) {
            const option = document.createElement("option");
            option.value = stateObj.usps;
            option.textContent = stateObj.state;
            stateSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading states:", error);
    }
}
loadStates();

stateSelect.addEventListener("change", async function () {
    const selectedState = stateSelect.value;
    countySelect.innerHTML = "<option value=''>-- Select a County --</option>";
    if (selectedState === "") return;
    try {
        const response = await fetch(`https://csumb.space/api/countyListAPI.php?state=${selectedState}`);
        const counties = await response.json();
        counties.forEach(function (countyObj) {
            const option = document.createElement("option");
            option.value = countyObj.county;
            option.textContent = countyObj.county;
            countySelect.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading counties:", error);
    }
});


usernameInput.addEventListener("input", async function () {
    const username = usernameInput.value.trim();
    if (username === "") {
        usernameMessage.textContent = "";
        return;
    }
    try {
        const response = await fetch(`https://csumb.space/api/usernamesAPI.php?username=${username}`);
        const data = await response.json();
        if (data.available) {
            usernameMessage.textContent = "Username is available!";
            usernameMessage.style.color = "green";
        } else {
            usernameMessage.textContent = "Username is NOT available.";
            usernameMessage.style.color = "red";
        }
    } catch (error) {
        console.error("Error checking username:", error);
    }
});

passwordInput.addEventListener("focus", async function () {
    try {
        const response = await fetch("https://csumb.space/api/suggestedPassword.php?length=10");
        const data = await response.json();
        passwordInput.value = data.password;
        passwordConfirm.value = data.password;
        suggestedDisplay.textContent = "Suggested password: " + data.password;
        passwordError.textContent = "";
    } catch (error) {
        console.error("Error fetching suggested password:", error);
    }
});

passwordInput.addEventListener("input", function () {
});

document.getElementById("submitBtn").addEventListener("click", function () {
    let valid = true;
    function showError(span, message) {
        span.textContent = message;
        span.classList.add("visible");
        valid = false;
    }
    function clearError(span) {
        span.textContent = "";
        span.classList.remove("visible");
    }
    const usernameLength = usernameInput.value.trim().length;
    if (usernameLength < 3) {
        showError(usernameError, "Username must be at least 3 characters.");
    } else if (usernameLength > 20) {
        showError(usernameError, "Username cannot exceed 20 characters.");
    } else {
        clearError(usernameError);
    }
    if (passwordInput.value.length < 6) {
        showError(passwordError, "Password must be at least 6 characters.");
    } else {
        clearError(passwordError);
    }
    if (passwordInput.value !== passwordConfirm.value) {
        showError(passwordMatchError, "Passwords do not match.");
    } else {
        clearError(passwordMatchError);
    }
    if (valid) {
        alert("Form submitted successfully!");
    }
});