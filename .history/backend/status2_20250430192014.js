function StatusBar({ label, value }) {
    return (
      <div style={{ marginBottom: '10px' }}>
        <label>{label}: {value}/100</label>
        <div style={{ background: '#ccc', width: '100%', height: '20px', borderRadius: '10px' }}>
          <div
            style={{
              width: `${value}%`,
              height: '100%',
              background: value <= 20 ? 'red' : value <= 50 ? 'orange' : 'green',
              borderRadius: '10px',
              transition: 'width 0.5s ease',
            }}
          ></div>
        </div>
      </div>
    );
  }
  
  export default StatusBar;
  

  "use client";

import { useState, useEffect } from "react";
import { personalities } from "../back_end/personalities/Personalities";
import StatusBar from "../back_end/status/StatusBar";
import actionsContent from "../back_end/content/ActionsContent";  // Import content

function Pet() {
  const [pet] = useState(() => {
    const randomIndex = Math.floor(Math.random() * personalities.length);
    return personalities[randomIndex];
  });

  const [status, setStatus] = useState({
    hunger: 100,
    energy: 100,
    hygiene: 100,
    happiness: 100,
  });

  const [isDead, setIsDead] = useState(false);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isPaused, setIsPaused] = useState(false);  // Pause state

  const updateStatus = (category, change) => {
    setStatus((prev) => {
      const newValue = Math.max(0, Math.min(100, prev[category] + change));
      return { ...prev, [category]: newValue };
    });
  };

  const feedPet = () => {
    updateStatus("hunger", +10);
    if (pet.foodLover) {
      updateStatus("happiness", +10);
    } else {
      updateStatus("happiness", -10);
    }
  };

  const touchPet = () => {
    if (pet.clingy) {
      updateStatus("happiness", +10);
    } else {
      updateStatus("happiness", -10);
    }
  };

  const bathePet = () => {
    updateStatus("hygiene", +10);
    if (pet.clean) {
      updateStatus("happiness", +10);
    } else {
      updateStatus("happiness", -10);
    }
  };

  const bedtime = () => {
    updateStatus("energy", +10);
    if (pet.active) {
      updateStatus("happiness", -10);
    } else {
      updateStatus("happiness", +10);
    }
  };

  const handleDecrease = (category, amount) => {
    setStatus((prev) => {
      const newValue = Math.max(0, prev[category] - amount);

      if (newValue === 0) {
        setIsDead(true);
      } else if (newValue <= 20) {
        console.warn(`${category.toUpperCase()} is critical!`);
      } else if (newValue <= 50 && prev[category] > 50) {
        // Trigger prompt when it reaches 50
        showPrompt(category);
      }

      return { ...prev, [category]: newValue };
    });
  };

  const showPrompt = (category) => {
    let promptMessage = "";
    if (category === "hunger") {
      promptMessage = pet.foodLover
        ? actionsContent.HungerFlows.Hungry.true.prompt
        : actionsContent.HungerFlows.Hungry.false.prompt;
    } else if (category === "energy") {
      promptMessage = pet.active
        ? actionsContent.EnergyFlows.Sleepy.true.prompt
        : actionsContent.EnergyFlows.Sleepy.false.prompt;
    } else if (category === "hygiene") {
      promptMessage = pet.clean
        ? actionsContent.HygeneFlows.true.prompt
        : actionsContent.HygeneFlows.false.prompt;
    } else if (category === "happiness") {
      promptMessage = actionsContent.PettingFlow.true.prompt;
    }
    setCurrentPrompt(promptMessage);
    setIsPromptVisible(true);
  };

  // Individual passive decreases with intervals
  useEffect(() => {
    if (!isPaused) {
      const hungerInterval = setInterval(() => {
        handleDecrease("hunger", 5);
      }, 10000);
      return () => clearInterval(hungerInterval);
    }
  }, [isPaused]);

  useEffect(() => {
    if (!isPaused) {
      const energyInterval = setInterval(() => {
        handleDecrease("energy", 5);
      }, 12000);
      return () => clearInterval(energyInterval);
    }
  }, [isPaused]);

  useEffect(() => {
    if (!isPaused) {
      const hygieneInterval = setInterval(() => {
        handleDecrease("hygiene", 5);
      }, 15000);
      return () => clearInterval(hygieneInterval);
    }
  }, [isPaused]);

  useEffect(() => {
    if (!isPaused) {
      const happinessInterval = setInterval(() => {
        handleDecrease("happiness", 5);
      }, 18000);
      return () => clearInterval(happinessInterval);
    }
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  if (isDead) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Your pet has passed away 💔</h1>
        <p>Try again and keep a closer eye on them next time.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Meet your pet!</h2>
      <p>{pet.intro}</p>

      <StatusBar label="Hunger" value={status.hunger} />
      <StatusBar label="Energy" value={status.energy} />
      <StatusBar label="Hygiene" value={status.hygiene} />
      <StatusBar label="Happiness" value={status.happiness} />

      {/* Interaction Buttons */}
      <div
        style={{
          marginTop: "1rem",
          pointerEvents: isPaused ? "none" : "auto",
          opacity: isPaused ? 0.5 : 1,
        }}
      >
        <button onClick={feedPet} className="action-button">Feed</button>
        <button onClick={touchPet} className="action-button">Pet</button>
        <button onClick={bathePet} className="action-button">Bathe</button>
        <button onClick={bedtime} className="action-button">Sleep</button>
      </div>

      {/* Pause/Resume */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={togglePause} className="pause-button">
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>

      {/* Dialogue Box */}
      {isPromptVisible && (
        <div className="dialogue-box">
          <p>{currentPrompt}</p>
          <button onClick={() => setIsPromptVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Pet;
