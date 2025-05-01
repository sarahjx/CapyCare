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

// Global variable to store current pet
let currentPet = null;

function getRandomPersonality() {
  const randomIndex = Math.floor(Math.random() * personalities.length);
  currentPet = personalities[randomIndex];
  console.log("New pet initialized:", currentPet.intro);
  return currentPet;
}

let hunger = 70;
let energy = 70;
let hygiene = 70;
let happiness = 70;

// Personality-based status decrease functions
function decreaseHunger() {
  if (!currentPet) return;

  // Food lovers get hungry faster
  const decreaseAmount = currentPet.foodLover ? 15 : 10;
  if (hunger <= 0) {
    console.log("Hunger is empty!");
    hunger = 0;
  } else if (hunger > 0) {
    hunger -= decreaseAmount;
    console.log("Hunger: " + hunger);
  }
  warning();
  extremeWarning();
}

function decreaseEnergy() {
  if (!currentPet) return;

  // Active pets lose energy faster
  const decreaseAmount = currentPet.active ? 15 : 10;
  if (energy <= 0) {
    console.log("Energy is empty!");
    energy = 0;
  } else if (energy > 0) {
    energy -= decreaseAmount;
    console.log("Energy: " + energy);
  }
  warning();
  extremeWarning();
}

function decreaseHygiene() {
  if (!currentPet) return;

  // Clean pets lose hygiene slower
  const decreaseAmount = currentPet.clean ? 8 : 12;
  if (hygiene <= 0) {
    console.log("Hygiene is empty!");
    hygiene = 0;
  } else if (hygiene > 0) {
    hygiene -= decreaseAmount;
    console.log("Hygiene: " + hygiene);
  }
  warning();
  extremeWarning();
}

function decreaseHappiness() {
  if (!currentPet) return;

  // Clingy pets lose happiness faster when not attended to
  const decreaseAmount = currentPet.clingy ? 15 : 10;
  if (happiness <= 0) {
    console.log("Happiness is empty!");
    happiness = 0;
  } else if (happiness > 0) {
    happiness -= decreaseAmount;
    console.log("Happiness: " + happiness);
  }
  warning();
  extremeWarning();
}

// Update intervals with personality-based timing
function updateIntervals() {
  // Clear any existing intervals
  if (window.hungerInterval) clearInterval(window.hungerInterval);
  if (window.energyInterval) clearInterval(window.energyInterval);
  if (window.hygieneInterval) clearInterval(window.hygieneInterval);
  if (window.happinessInterval) clearInterval(window.happinessInterval);

  // Set new intervals based on personality
  window.hungerInterval = setInterval(
    decreaseHunger,
    currentPet.foodLover ? 6000 : 8000
  ); // Food lovers get hungry faster

  window.energyInterval = setInterval(
    decreaseEnergy,
    currentPet.active ? 8000 : 12000
  ); // Active pets lose energy faster

  window.hygieneInterval = setInterval(
    decreaseHygiene,
    currentPet.clean ? 18000 : 15000
  ); // Clean pets stay clean longer

  window.happinessInterval = setInterval(
    decreaseHappiness,
    currentPet.clingy ? 8000 : 10000
  ); // Clingy pets need attention more often

  console.log("Intervals updated for pet:", currentPet.intro);
}

// Initialize with a random pet and start intervals
currentPet = getRandomPersonality();
updateIntervals();

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
        happiness -= 10;
        console.log("Happiness: " + happiness);
      }
      break;
    default:
      console.log("Invalid category");
  }
}

function warning() {
  if (hunger <= 50 && hunger > 20) {
    console.log("Hunger is low!");
  }
  if (energy <= 50 && energy > 20) {
    console.log("Energy is low!");
  }
  if (hygiene <= 50 && hygiene > 20) {
    console.log("Hygiene is low!");
  }
  if (happiness <= 50 && happiness > 20) {
    console.log("Happiness is low!");
  }
}

function extremeWarning() {
  if (hunger <= 20 && hunger > 0) {
    console.log("Hunger is critical!");
  }
  if (energy <= 20 && energy > 0) {
    console.log("Energy is critical!");
  }
  if (hygiene <= 20 && hygiene > 0) {
    console.log("Hygiene is critical!");
  }
  if (happiness <= 20 && happiness > 0) {
    console.log("Happiness is critical!");
  }
}
