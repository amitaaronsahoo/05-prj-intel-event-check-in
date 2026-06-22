// --- 1. Select all the HTML elements we need ---
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");

const attendeeCountElement = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

const waterCountElement = document.getElementById("waterCount");
const zeroCountElement = document.getElementById("zeroCount");
const powerCountElement = document.getElementById("powerCount");

// --- 2. Set up our starting variables ---
let totalAttendees = 0;
let waterCount = 0;
let zeroCount = 0;
let powerCount = 0;
const goal = 50;

// --- LEVEL UP: Attendee List ---
// Create a new area to show the list of attendees using only JS
const teamStatsContainer = document.querySelector(".team-stats");
const listContainer = document.createElement("div");
listContainer.innerHTML = "<h3 style='margin-top: 30px; color: #64748b;'>Recent Attendees</h3><ul id='attendeeList' style='list-style: none; padding: 0;'></ul>";
teamStatsContainer.appendChild(listContainer);
const attendeeListElement = document.getElementById("attendeeList");

// --- LEVEL UP: Save Your Progress (Local Storage) ---
// Function to load saved data when the page refreshes
function loadSavedData() {
    const savedTotal = localStorage.getItem("totalAttendees");

    if (savedTotal !== null) {
        totalAttendees = Number(savedTotal);
        waterCount = Number(localStorage.getItem("waterCount"));
        zeroCount = Number(localStorage.getItem("zeroCount"));
        powerCount = Number(localStorage.getItem("powerCount"));

        // Update the numbers on the page
        attendeeCountElement.textContent = totalAttendees;
        waterCountElement.textContent = waterCount;
        zeroCountElement.textContent = zeroCount;
        powerCountElement.textContent = powerCount;

        // Update the progress bar
        let progressPercentage = (totalAttendees / goal) * 100;
        if (progressPercentage > 100) {
            progressPercentage = 100;
        }
        progressBar.style.width = `${progressPercentage}%`;
    }
}

// Function to save current data to the browser
function saveData() {
    localStorage.setItem("totalAttendees", totalAttendees);
    localStorage.setItem("waterCount", waterCount);
    localStorage.setItem("zeroCount", zeroCount);
    localStorage.setItem("powerCount", powerCount);
}

// Load data immediately when the script runs
loadSavedData();


// --- 3. Listen for a form submission and run some code ---
form.addEventListener("submit", function(event) {
    // Prevent the page from reloading
    event.preventDefault();

    // Get the values from the input and dropdown
    const attendeeName = nameInput.value;
    const selectedTeam = teamSelect.value;
    let fullTeamName = "";

    // Increment total and store it in a variable
    totalAttendees = totalAttendees + 1;
    attendeeCountElement.textContent = totalAttendees;

    // Update the correct team's count on the page
    if (selectedTeam === "water") {
        waterCount = waterCount + 1;
        waterCountElement.textContent = waterCount;
        fullTeamName = "Team Water Wise";
    } else if (selectedTeam === "zero") {
        zeroCount = zeroCount + 1;
        zeroCountElement.textContent = zeroCount;
        fullTeamName = "Team Net Zero";
    } else if (selectedTeam === "power") {
        powerCount = powerCount + 1;
        powerCountElement.textContent = powerCount;
        fullTeamName = "Team Renewables";
    }

    // Calculate the percentage of a goal completed
    let progressPercentage = (totalAttendees / goal) * 100;
    if (progressPercentage > 100) {
        progressPercentage = 100;
    }

    // Update the width of the progress bar using a percentage
    progressBar.style.width = `${progressPercentage}%`;

    // Combine a name and team into a welcome message
    greeting.textContent = `Welcome, ${attendeeName}! Thank you for joining ${fullTeamName}.`;
    greeting.style.display = "block";
    greeting.classList.add("success-message");

    // LEVEL UP: Add to Attendee List
    const listItem = document.createElement("li");
    listItem.style.padding = "8px";
    listItem.style.borderBottom = "1px solid #e0e0e0";
    listItem.textContent = `${attendeeName} - ${fullTeamName}`;
    attendeeListElement.appendChild(listItem);

    // LEVEL UP: Save the new counts
    saveData();

    // LEVEL UP: Celebration Feature
    if (totalAttendees === goal) {
        let winningTeam = "";

        // Find out who is winning
        if (waterCount > zeroCount && waterCount > powerCount) {
            winningTeam = "Team Water Wise";
        } else if (zeroCount > waterCount && zeroCount > powerCount) {
            winningTeam = "Team Net Zero";
        } else if (powerCount > waterCount && powerCount > zeroCount) {
            winningTeam = "Team Renewables";
        } else {
            winningTeam = "Multiple Teams Tied";
        }

        alert(`🎉 Congratulations! We reached our goal of 50 attendees! The current winning team is ${winningTeam}!`);
    }

    // Reset the form after it’s submitted
    form.reset();
});