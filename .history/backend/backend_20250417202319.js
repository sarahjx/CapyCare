function Personality(favFood, active, clean, clingy, foodLover, introText) {
    this.favFood = favFood;
    this.active = active;
    this.clean = clean;
    this.clingy = clingy;
    this.foodLover = foodLover;
    this.intro = introText;
}

const mix1 = new Personality(
    "Sunfruit", true, true, true, true,
    "This pet is energetic and playful, always ready to explore or play. They love the taste of Sunfruit and will happily eat it when offered, but they’ll need constant attention, so expect lots of petting and cuddling. Despite their active nature, they stay clean and are easy to bathe. This pet loves affection and will return it in kind!"
);
const mix2 = new Personality(
    "Snakberry", true, true, false, true,
    "This pet is full of energy and loves to make the most of their days. They are particularly fond of Snakberries, which they will devour happily, but they tend to get hungry more often due to their high energy levels. Despite their active nature, they keep themselves clean and are easy to bathe. They’re not overly clingy, so while they’ll happily spend time with you, they won’t be demanding affection constantly."
);
const mix3 = new Personality(
    "Dreamleaf", false, false, true, false,
    "This pet is laid-back and enjoys spending time with you, always seeking your company. They love Dreamleaf as a treat, but they’re not particularly food-driven and don’t get hungry as often. While they may get a little dirty from time to time, they tend to move around when you try to bathe them. Expect them to seek out your attention frequently, and be ready to shower them with love when they come to you for pets."
);

const personalities = [mix1, mix2, mix3];

function getRandomPersonality() {
    const randomIndex = Math.floor(Math.random() * personalities.length);
    return personalities[randomIndex];
}

let hunger = 100;
let energy = 100;
let hygiene = 100;
let happiness = 100;

function loseStatus(category){
    switch(category) {
        case "hunger":
            if (hunger <= 0) {
                console.log("Hunger is empty!");
                hunger = 0;
            } else if (hunger > 0) {
                hunger -= 10;
                console.log ("Hunger: " + hunger);
            }
            break;
        case "energy":
            if (energy <= 0) {
                console.log("Energy is empty!");
                energy = 0;
            } else if (energy > 0) {
                energy -= 10;
                console.log ("Energy: " + energy);
            }
            break;
        case "hygiene":
            if (hygiene <= 0) {
                console.log("Hygiene is empty!");
                hygiene = 0;
            } else if (hygiene > 0) {
                hygiene -= 10;
                console.log ("Hygiene: " + hygiene);
            }
            break;
        case "happiness":
            if (happiness <= 0) {
                console.log("Happiness is empty!");
                happiness = 0;
            } else if (happiness > 0) {
                happiness -= 10;
                console.log ("Happiness: " + happiness);
            }
            break;
        default:
            console.log("Invalid category");
    }
};

function gainStatus(category) {
    switch (category) {
        case "hunger":
            if (hunger >= 100) {
                console.log("Hunger is full!");
            } else if (hunger < 100) {
                hunger += 10;
                console.log ("Hunger: " + hunger);
            } 
            break;
        case "energy":
            if (energy >= 100) {
                console.log("Energy is full!");
            } else if (energy < 100) {
                energy += 10;
                console.log ("Energy: " + energy);
            }
            break;
        case "hygiene":
            if (hygiene >= 100) {
                console.log("Hygiene is full!");
            } else if (hygiene < 100) {
                hygiene += 10;
                console.log ("Hygiene: " + hygiene);
            }
            break;
        case "happiness":
            if (happiness >= 100) {
                console.log("Happiness is full!");
            } else if (happiness < 100) {
                happiness += 10;
                console.log ("Happiness: " + happiness);
            }
            break;
        default:
            console.log("Invalid category");
    }

};

function touchPet(personality) {
    switch (personality.clingy) {
        case true:
            gainStatus("happiness");
            break;
        case false:
            loseStatus("happiness");
            break;
        default:
            console.log("Invalid personality trait");
    }
};

function feedPet(personality) {
    switch (personality.foodLover) {
        case true:
            gainStatus("hunger");
            break;
        case false:
            loseStatus("hunger");
            break;
        default:
            console.log("Invalid personality trait");
    }
};

function bathePet(personality) {
    switch (personality.clean) {
        case true:
            gainStatus("hygiene");
            break;
        case false:
            loseStatus("hygiene");
            break;
        default:
            console.log("Invalid personality trait");
    }
};

function bedtime(personality) {
    switch (personality.active) {
        case true:
            gainStatus("energy");
            break;
        case false:
            loseStatus("energy");
            break;
        default:
            console.log("Invalid personality trait");
    }
};

function passiveLoseStatus() {
    loseStatus("hunger");
    loseStatus("energy");
    loseStatus("hygiene");
    loseStatus("happiness");
};

function warning() {
    if (hunger <= 50) {
        console.log("Hunger is low!");
    }
    if (energy <= 50) {
        console.log("Energy is low!");
    }
    if (hygiene <= 50) {
        console.log("Hygiene is low!");
    }
    if (happiness <= 50) {
        console.log("Happiness is low!");
    }
};

function extremeWarning() {
    if (hunger <= 20) {
        console.log("Hunger is critical!");
    }
    if (energy <= 20) {
        console.log("Energy is critical!");
    }
    if (hygiene <= 20) {
        console.log("Hygiene is critical!");
    }
    if (happiness <= 20) {
        console.log("Happiness is critical!");
    }
}

// setInterval(passiveLoseStatus, 10000);

touchPet(mix1);
feedPet(mix1);
bathePet(mix1);
bedtime(mix1);
