/** @format */

function Personality(favFood, active, clean, clingy, foodLover, introText) {
  this.favFood = favFood;
  this.active = active;
  this.clean = clean;
  this.clingy = clingy;
  this.foodLover = foodLover;
  this.intro = introText;
}

const mix1 = new Personality(
  "Sunfruit",
  true,
  true,
  true,
  true,
  "This pet is energetic and playful, always ready to explore or play. They love the taste of Sunfruit and will happily eat it when offered, but they'll need constant attention, so expect lots of petting and cuddling. Despite their active nature, they stay clean and are easy to bathe. This pet loves affection and will return it in kind!"
);
const mix2 = new Personality(
  "Snakberry",
  true,
  true,
  false,
  true,
  "This pet is full of energy and loves to make the most of their days. They are particularly fond of Snakberries, which they will devour happily, but they tend to get hungry more often due to their high energy levels. Despite their active nature, they keep themselves clean and are easy to bathe. They're not overly clingy, so while they'll happily spend time with you, they won't be demanding affection constantly."
);
const mix3 = new Personality(
  "Dreamleaf",
  false,
  false,
  true,
  false,
  "This pet is laid-back and enjoys spending time with you, always seeking your company. They love Dreamleaf as a treat, but they're not particularly food-driven and don't get hungry as often. While they may get a little dirty from time to time, they tend to move around when you try to bathe them. Expect them to seek out your attention frequently, and be ready to shower them with love when they come to you for pets."
);

const personalities = [mix1, mix2, mix3];

// Global variables
let currentPet = null;
let hunger = 100;
let energy = 100;
let hygiene = 100;
let happiness = 100;
let isGameOver = false;
let isPaused = false;
let petName = "";

// Store interval IDs globally
let hungerInterval = null;
let energyInterval = null;
let hygieneInterval = null;
let happinessInterval = null;

// Initialize the game
function initializeGame() {
  currentPet = getRandomPersonality();
  hunger = 100;
  energy = 100;
  hygiene = 100;
  happiness = 100;
  updateStatusBars();
  updateIntervals();
}

function getRandomPersonality() {
  const randomIndex = Math.floor(Math.random() * personalities.length);
  currentPet = personalities[randomIndex];
  console.log("New pet initialized:", currentPet.intro);
  updatePersonalityDescription();
  return currentPet;
}

// Personality-based status decrease functions
function decreaseHunger() {
  if (!currentPet || isGameOver) return;
  const decreaseAmount = currentPet.foodLover ? 15 : 10;
  hunger = Math.max(0, hunger - decreaseAmount);
  updateStatusBars();
  if (hunger === 0 && checkGameOver()) return;
}

function decreaseEnergy() {
  if (!currentPet || isGameOver) return;
  const decreaseAmount = currentPet.active ? 15 : 10;
  energy = Math.max(0, energy - decreaseAmount);
  updateStatusBars();
  if (energy === 0 && checkGameOver()) return;
}

function decreaseHygiene() {
  if (!currentPet || isGameOver) return;
  const decreaseAmount = currentPet.clean ? 8 : 12;
  hygiene = Math.max(0, hygiene - decreaseAmount);
  updateStatusBars();
  if (hygiene === 0 && checkGameOver()) return;
}

function decreaseHappiness() {
  if (!currentPet || isGameOver) return;
  const decreaseAmount = currentPet.clingy ? 15 : 10;
  happiness = Math.max(0, happiness - decreaseAmount);
  updateStatusBars();
  if (happiness === 0 && checkGameOver()) return;
}

// Update intervals with personality-based timing
function updateIntervals() {
  // Clear any existing intervals
  if (hungerInterval) clearInterval(hungerInterval);
  if (energyInterval) clearInterval(energyInterval);
  if (hygieneInterval) clearInterval(hygieneInterval);
  if (happinessInterval) clearInterval(happinessInterval);

  // Set new intervals based on personality (reduced for demo)
  hungerInterval = setInterval(
    () => {
      decreaseHunger();
      warning();
    },
    currentPet.foodLover ? 1500 : 2000 // Reduced from 6000/8000
  );

  energyInterval = setInterval(
    () => {
      decreaseEnergy();
      warning();
    },
    currentPet.active ? 3750 : 5000 // Reduced from 15000/20000
  );

  hygieneInterval = setInterval(
    () => {
      decreaseHygiene();
      warning();
    },
    currentPet.clean ? 2500 : 2000 // Reduced from 10000/8000
  );

  happinessInterval = setInterval(
    () => {
      decreaseHappiness();
      warning();
    },
    currentPet.clingy ? 2000 : 2500 // Reduced from 8000/10000
  );

  console.log("Intervals updated for pet:", currentPet.intro);
}

// Pause game function
function pauseGame() {
  if (hungerInterval) clearInterval(hungerInterval);
  if (energyInterval) clearInterval(energyInterval);
  if (hygieneInterval) clearInterval(hygieneInterval);
  if (happinessInterval) clearInterval(happinessInterval);
  console.log("Game paused");
}

// Resume game function
function resumeGame() {
  updateIntervals();
  console.log("Game resumed");
}

function touchPet(personality) {
  if (personality.clingy) {
    gainStatus("happiness");
    console.log("Your pet loves the attention!");
  } else {
    loseStatus("happiness");
    console.log("Your pet prefers their space.");
  }
}

function feedPet(personality) {
  gainStatus("hunger"); // Always increase hunger
  if (personality.foodLover) {
    gainStatus("happiness");
    console.log("Your pet loves the food!");
  } else {
    loseStatus("happiness");
    console.log("Your pet isn't very interested in food.");
  }
}

function bathePet(personality) {
  gainStatus("hygiene"); // Always increase hygiene
  if (personality.clean) {
    gainStatus("happiness");
    console.log("Your pet enjoys being clean!");
  } else {
    loseStatus("happiness");
    console.log("Your pet doesn't like baths.");
  }
}

function bedtime(personality) {
  const petImage = document.querySelector(".pet-image");
  if (petImage) {
    document.body.style.backgroundImage = "url('../images/LightsOff.PNG')";
    document.getElementById("bedtimeOverlay").style.display = "block";
    updatePetImage(); // This will now show the correct sleeping state

    // After 3 seconds, restore the previous state
    setTimeout(() => {
      document.body.style.backgroundImage = "url('../images/LightsOn.PNG')";
      document.getElementById("bedtimeOverlay").style.display = "none";
      updatePetImage(); // This will restore the normal state
    }, 3000);
  }

  gainStatus("energy"); // Always increase energy
  if (personality.active) {
    loseStatus("happiness");
    console.log("Your pet is too energetic to sleep!");
  } else {
    gainStatus("happiness");
    console.log("Your pet enjoys resting.");
  }
}

function gainStatus(category) {
  switch (category) {
    case "hunger":
      if (hunger >= 100) {
        console.log("Hunger is full!");
      } else if (hunger < 100) {
        hunger += 10;
        console.log("Hunger: " + hunger);
      }
      break;
    case "energy":
      if (energy >= 100) {
        console.log("Energy is full!");
      } else if (energy < 100) {
        energy += 10;
        console.log("Energy: " + energy);
      }
      break;
    case "hygiene":
      if (hygiene >= 100) {
        console.log("Hygiene is full!");
      } else if (hygiene < 100) {
        hygiene += 10;
        console.log("Hygiene: " + hygiene);
      }
      break;
    case "happiness":
      if (happiness >= 100) {
        console.log("Happiness is full!");
      } else if (happiness < 100) {
        happiness += 10;
        console.log("Happiness: " + happiness);
      }
      break;
    default:
      console.log("Invalid category");
  }
}

function loseStatus(category) {
  switch (category) {
    case "hunger":
      if (hunger <= 0) {
        console.log("Hunger is empty!");
        hunger = 0;
      } else if (hunger > 0) {
        hunger -= 10;
        console.log("Hunger: " + hunger);
      }
      break;
    case "energy":
      if (energy <= 0) {
        console.log("Energy is empty!");
        energy = 0;
      } else if (energy > 0) {
        energy -= 10;
        console.log("Energy: " + energy);
      }
      break;
    case "hygiene":
      if (hygiene <= 0) {
        console.log("Hygiene is empty!");
        hygiene = 0;
      } else if (hygiene > 0) {
        hygiene -= 10;
        console.log("Hygiene: " + hygiene);
      }
      break;
    case "happiness":
      if (happiness <= 0) {
        console.log("Happiness is empty!");
        happiness = 0;
      } else if (happiness > 0) {
        happiness -= 3;
        console.log("Happiness: " + happiness);
      }
      break;
    default:
      console.log("Invalid category");
  }
}

function warning() {
  // Hunger warnings
  if (hunger <= 50 && hunger > 20) {
    document.getElementById("hunger-warning").textContent =
      "Your pet is getting hungry!";
    document.getElementById("hunger-warning").className = "warning";
  } else if (hunger <= 20 && hunger > 0) {
    document.getElementById("hunger-warning").textContent =
      "Your pet is starving!";
    document.getElementById("hunger-warning").className = "critical";
  } else {
    document.getElementById("hunger-warning").textContent = "";
  }

  // Energy warnings
  if (energy <= 50 && energy > 20) {
    document.getElementById("energy-warning").textContent =
      "Your pet is getting tired!";
    document.getElementById("energy-warning").className = "warning";
  } else if (energy <= 20 && energy > 0) {
    document.getElementById("energy-warning").textContent =
      "Your pet is exhausted!";
    document.getElementById("energy-warning").className = "critical";
  } else {
    document.getElementById("energy-warning").textContent = "";
  }

  // Hygiene warnings
  if (hygiene <= 50 && hygiene > 20) {
    document.getElementById("hygiene-warning").textContent =
      "Your pet needs a bath!";
    document.getElementById("hygiene-warning").className = "warning";
  } else if (hygiene <= 20 && hygiene > 0) {
    document.getElementById("hygiene-warning").textContent =
      "Your pet is filthy!";
    document.getElementById("hygiene-warning").className = "critical";
  } else {
    document.getElementById("hygiene-warning").textContent = "";
  }

  // Happiness warnings
  if (happiness <= 50 && happiness > 20) {
    document.getElementById("happiness-warning").textContent =
      "Your pet is getting sad!";
    document.getElementById("happiness-warning").className = "warning";
  } else if (happiness <= 20 && happiness > 0) {
    document.getElementById("happiness-warning").textContent =
      "Your pet is depressed!";
    document.getElementById("happiness-warning").className = "critical";
  } else {
    document.getElementById("happiness-warning").textContent = "";
  }
}

function checkGameOver() {
  if (hunger <= 0 || energy <= 0 || hygiene <= 0 || happiness <= 0) {
    isGameOver = true;
    pauseGame();
    showGameOver();
    return true;
  }
  return false;
}

function showGameOver() {
  let reason = "";
  if (hunger <= 0) reason = "Your pet starved to death!";
  else if (energy <= 0) reason = "Your pet died from exhaustion!";
  else if (hygiene <= 0) reason = "Your pet died from poor hygiene!";
  else if (happiness <= 0) reason = "Your pet died from sadness!";

  console.log("GAME OVER: " + reason);
  document.getElementById("gameOverMessage").textContent = reason;
  document.getElementById("gameOverOverlay").style.display = "block";
  document.querySelector(".game-over-content").style.display = "flex";
}

function resetGame() {
  isGameOver = false;
  isPaused = false;
  updateStatusBars();
  updateIntervals();
  // Show name input popup again
  document.getElementById("nameInputPopup").style.display = "flex";
  document.getElementById("petName").textContent = "";
}

function togglePause() {
  isPaused = !isPaused;
  const pauseButton = document.getElementById("pauseButton");
  const buttons = document.querySelectorAll(".action-button:not(#pauseButton)");

  if (isPaused) {
    pauseButton.textContent = "Resume";
    pauseButton.classList.add("paused");
    buttons.forEach((button) => (button.disabled = true));
    pauseGame();
  } else {
    pauseButton.textContent = "Pause";
    pauseButton.classList.remove("paused");
    buttons.forEach((button) => (button.disabled = false));
    resumeGame();
  }
}

// Update status bars
function updateStatusBars() {
  // Update the width of each status bar
  document.getElementById("hunger-fill").style.width = hunger + "%";
  document.getElementById("energy-fill").style.width = energy + "%";
  document.getElementById("happiness-fill").style.width = happiness + "%";
  document.getElementById("hygiene-fill").style.width = hygiene + "%";

  // Update pet image based on status
  updatePetImage();
}

// Override console.log to update UI
const originalConsoleLog = console.log;
console.log = function () {
  originalConsoleLog.apply(console, arguments);
  updateStatusBars();
};

// Simple toggle function
function toggleActions() {
  document.getElementById("action-buttons-column").classList.toggle("hidden");
  document.getElementById("toggle-button").classList.toggle("hidden");
}

// Initialize the game when the page loads
window.addEventListener("load", function () {
  // Show name input popup first
  document.getElementById("nameInputPopup").style.display = "flex";
});

function setupPersonalityButton() {
  const button = document.getElementById("personalityButton");
  button.addEventListener("click", showPersonalityPopup);
  updatePersonalityDescription();
}

function showPersonalityPopup() {
  const popup = document.getElementById("personalityPopup");
  popup.style.display = "flex";
}

function closePersonalityPopup() {
  const popup = document.getElementById("personalityPopup");
  popup.style.display = "none";
}

function updatePersonalityDescription() {
  const description = document.getElementById("personalityDescription");
  if (currentPet) {
    description.textContent = currentPet.intro;
  }
}

// stopwatch

let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;

function updateDisplay() {
  document.getElementById("display").innerText =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

function stopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

function start() {
  if (timer !== null) return;
  timer = setInterval(stopwatch, 1000);
}

function stop() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  stop();
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
}

updateDisplay();

function updatePetImage() {
  const petImage = document.querySelector(".pet-image");
  if (isGameOver) {
    petImage.src = "../images/Fuckingdead.PNG";
    return;
  }

  // Check if it's bedtime (overlay is visible)
  if (document.getElementById("bedtimeOverlay").style.display === "block") {
    // Show sleeping animation based on conditions
    if (hunger <= 60 && hygiene <= 60 && energy <= 60) {
      petImage.src = "../images/Sleeping:Dirty:hungry:Tired.PNG";
    } else if (hunger <= 60 && hygiene <= 60) {
      petImage.src = "../images/Sleeping:Dirty:Hungry.PNG";
    } else if (hunger <= 60 && energy <= 60) {
      petImage.src = "../images/Sleeping:Hungry:Tired.PNG";
    } else if (hygiene <= 60 && energy <= 60) {
      petImage.src = "../images/Sleeping:Dirty:Tired.PNG";
    } else if (energy <= 60) {
      petImage.src = "../images/Sleeping:Tired.PNG";
    } else if (hunger <= 60) {
      petImage.src = "../images/Sleeping:Hungry.PNG";
    } else if (hygiene <= 60) {
      petImage.src = "../images/Sleeping:Dirty.PNG";
    } else {
      petImage.src = "../images/Sleeping.PNG";
    }
    return;
  }

  // Check if any status is 0 (dead)
  if (hunger <= 0 || energy <= 0 || hygiene <= 0 || happiness <= 0) {
    petImage.src = "../images/Fuckingdead.PNG";
    return;
  }

  // Check for multiple states with sadness
  if (hunger <= 60 && hygiene <= 60 && energy <= 60 && happiness <= 60) {
    petImage.src = "../images/Sad:Dirty:Hungry:Tired.PNG";
  } else if (hunger <= 60 && hygiene <= 60 && happiness <= 60) {
    petImage.src = "../images/Sad:Dirty:Hungry.PNG";
  } else if (hunger <= 60 && energy <= 60 && happiness <= 60) {
    petImage.src = "../images/Sad:Hungry:Tired.PNG";
  } else if (hygiene <= 60 && energy <= 60 && happiness <= 60) {
    petImage.src = "../images/Sad:Dirty:Tired.PNG";
  } else if (energy <= 60 && happiness <= 60) {
    petImage.src = "../images/Sad:Tired.PNG";
  } else if (hunger <= 60 && happiness <= 60) {
    petImage.src = "../images/Sad:Hungry.PNG";
  } else if (hygiene <= 60 && happiness <= 60) {
    petImage.src = "../images/Sad:Dirty.PNG";
  } else if (happiness <= 60) {
    petImage.src = "../images/Sad.PNG";
  }
  // Check for multiple states without sadness
  else if (hunger <= 60 && hygiene <= 60 && energy <= 60) {
    petImage.src = "../images/Dirty:Hungry:Tired.PNG";
  } else if (hunger <= 60 && hygiene <= 60) {
    petImage.src = "../images/Dirty:hungry.PNG";
  } else if (hunger <= 60 && energy <= 60) {
    petImage.src = "../images/Hungry:Tired.PNG";
  } else if (hygiene <= 60 && energy <= 60) {
    petImage.src = "../images/Dirty:Tired.PNG";
  } else if (energy <= 60) {
    petImage.src = "../images/Sleepy.PNG";
  } else if (hunger <= 60) {
    petImage.src = "../images/Hungry.PNG";
  } else if (hygiene <= 60) {
    petImage.src = "../images/Dirty.PNG";
  } else {
    petImage.src = "../images/Idle.PNG";
  }
}

// Set pet name function
function setPetName() {
  const nameInput = document.getElementById("petNameInput");
  const name = nameInput.value.trim();

  if (name) {
    petName = name;
    const nameElement = document.getElementById("petName");
    nameElement.textContent = petName;
    // Make the name clickable
    nameElement.onclick = showPersonalityPopup;
    document.getElementById("nameInputPopup").style.display = "none";
    initializeGame();
    // Update status bars every second
    setInterval(updateStatusBars, 1000);
    // Set up personality button
    setupPersonalityButton();
  } else {
    alert("Please enter a name for your pet!");
  }
}
