let actionsContent = {

    HungerFlows:{

        Hungry: {
            true: {
                FoodLover: true,
                prompt: "Looks like your little one is really hungry again! They’re a real food lover, so they’ll likely need to eat more frequently than other pets. Let’s get them something to munch on!",
            },
            false: {
                FoodLover: false,
                prompt: "Your pet is a little hungry, but not as much as some others. They don’t really care for food as much, so be sure not to overfeed them.",
            },
        },
        ExtremeHunger: {
            true: {
                FoodLover: true,
                prompt: "Uh-oh, your pet’s in a really bad state! They’re absolutely starving. If we don’t get food into them soon, it could be too late!"
            },
            false: {
                FoodLover: false,
                prompt: "Your pet isn’t one to beg for food, but this is serious. They need something soon, or they could be in danger. Quick, let’s get them something to eat!" 
            }
        },
        Choose: {
            prompt: "Choose a fruit to feed your pet"
        },
        PhewMessage: {
            prompt: "Phew! That was close. Be sure to stay on top of feeding your pet! No more skipping meals for them!"
        },
        DeathCause: {
            prompt: "I'm so sorry, but your pet has passed away from starvation. They didn’t get enough food, and it’s too late to bring them back now. It’s tough, but sometimes things don’t go as planned. You’ll need to be more careful about keeping your pet well-fed in the future."
            
        }
    },


    EnergyFlows: {
        Sleepy: {
            true: {
                Active: true,
                prompt: "Your active pet doesn’t usually take naps, but it seems like they’ve reached their limit. They’ll be more energized after a good rest."
            },
            false: {
                Active: false,
                prompt: "Your pet seems really sleepy today. It’s probably because they prefer to relax and take it easy. A nice, dark spot to sleep should do the trick!"
            }
        },
        ExtremeSleepyness: {
            true: {
                Active: true,
                prompt: "Your pet is reaching extreme levels of exhaustion. They’re nearing the point of no return. If they don’t get rest right away, it may be too late to save them."
            },
            false: {
                prompt:"Your pet is reaching extreme levels of exhaustion. They’re nearing the point of no return. If they don’t get rest right away, it may be too late to save them."
            }
        },
        PhewMessage:{
            prompt:"Phew! That was close. Be sure to stay on top of giving your pet their rest! No more all nighters for them"
        },
        DeathCause:{
            prompt: "I’m so sorry but it looks like your pet passed away from exhaustion. They worked themselves too hard and didn’t get the rest they needed. It’s a reminder that pets need balance—playtime and rest are equally important for their well-being."
        }

    },


    HygeneFlows:{
        true: {
            Clean: true,
            prompt: "Your pet’s dirty, but they’re usually pretty easy to clean. A bath will do the trick without too much trouble. Let’s get them nice and fresh!"
        },
        false: {
            Clean: false,
            prompt: "Your pet’s dirty, but a bit more stubborn when it comes to bath time. They don’t like to stay still, so be ready for some difficulty when we try to clean them",
            Runaway: {
                prompt: "Oh no! Your pet ran away! Let’s call them back and try that again."
            }
        }

    },

    PettingFlow : {
        true: {
            clingy: true,
            prompt: "Your clingy pet looks down today. It really craves affection. Maybe give them a little extra attention with some cuddles, or pet them a bit more than usual."
        },
        false: {
            clingy: false,
            prompt: "Your pet isn’t one to ask for affection, but it looks like they’re feeling a little down today. Don’t overwhelm them with too much attention though, they prefer some space."
        },

        PettingWarning: {
            prompt: "Hey, I noticed your pet seems a little uncomfortable right now. They’ve been getting a lot of affection, and while pets love attention, it’s important to remember that too much can cause stress. Just like people, they need their personal space too",

        },
        DeathCause:{
            prompt: "I’m sorry to say that your pet has passed away due to too much affection. Sometimes, pets need space, and over-petting can actually cause stress. It’s important to give them the right balance of attention without overwhelming them."
        }

    },





    


        DeathFlow: {
            DeathOptions:{
                prompt: "You can take your time here. You have two choices: You can bury your pet in the graveyard, or you can skip that and restart with a new pet. The choice is yours."
            },
            ReStartConfimration: {
                prompt: "Understood. Let’s get you set up with a new companion. This is a new beginning, and your next pet will benefit from what you’ve learned."
            },
            Grave: {
                prompt: "Thank you for taking the time to say goodbye. It’s always hard to lose a companion, but you can rest assured they had a good life with you. When you’re ready, we can start fresh with a new pet."

            }
        }



    

}

export default actionsContent;