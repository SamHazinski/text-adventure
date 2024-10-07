var story;
function getStory(name) {
    return {
        currentScene: "attack",
        attack: {
            title: "Chapter 1",
            story: `${name} wakes up in front of a hole in a sheer cliff face. Its the middle of a night, you hear the howls of wolves behind you, thinking quickly you seek shelter in the hole in the cliff face.`,
            choices: [
                {
                    choice: "Pick up glowing sword",
                    destination: 'illuminatedHole'
                },
                {
                    choice: "Stumble around in the dark",
                    destination: 'darkHole'
                }
            ]
        },
        //light route
        illuminatedHole: {
            title: "Chapter 2",
            story: `You move to approach the glowing sword. Every step you take brings you closer into the pulsating warmth of the strangely etherial object. 
        As you wrap your hand around the leather handle, you feel a warm aura radiate from your body banishing the shadows of the cave. Walking forward you 
        have no trouble navigaving the rocky surface of the cavern as you venture deeper into the safety of the cave as the howls fade away. You approach a fork in the cave,
         and feel an urge to take the path to your right.`,
            choices: [
                {
                    choice: "Go to the right",
                    destination: 'right' //done
                },
                {
                    choice: "Keep left",
                    destination: 'left' //done
                }
            ],
            image: "glowing_sword.jpg",
        },
        left: {
            title: "Chapter 3",
            story: `You ignore the urge and take the path on the left, however you soon reach a deadend. You turn back and return to the junction and go to the right. Your sword begins to 
            emmit a faint hum. You continue walking down the path and eventually reach an exit of the cave system you hadn't noticed before. As you step out into the woods, you remember the reason you
            fled into the caves in the first place. Then just as quickly as your fear of the wolves returned, it faded away as a sense of bravery washed over you. The sword hums with approval as you continue into the forest.`,
            choices: [
                {
                    choice: "Continue deeper into the forest",
                    destination: 'forest'//done
                }]
            },
        right: {
            title: "Chapter 3",
            story: `You follow the urge and take the path on the right, as you move deeper you feel a sense of comfort wash over you as you progress deeper down the route. Your sword begins to 
            emmit a faint hum. You continue walking down the path and eventually reach an exit of the cave system you hadn't noticed before. As you step out into the woods, you remember the reason you
            fled into the caves in the first place. Then just as quickly as your fear of the wolves returned, it faded away as a sense of bravery washed over you. The sword hums with approval as you continue into the forest.`,
            choices: [
                {
                    choice: "Continue deeper into the forest",
                    destination: 'forest'//done
                }]
        },
        forest: {
            title: "Chapter 4",
            story: `You walk through the woods with a sense of urgency. For reasons you don't understand, your steps are hasty and you're scaning all of your surroundings. As you progress you notice blood splattered over trees and rocks as you
            go deeper into the woods. Despite any misgivings you have, you continue down the path when you notice a dead wolf still bleeding into the ground.`,
            image: "forest.jpg",
            choices: [
                {
                    choice: "Go deeper into the forest, past the wolf",
                    destination: 'deeper'
                },
                {
                    choice: "Turn around and walk the other way",
                    destination: 'cowardice'
                }
            ]
        },
        deeper: {
            title: "Chapter 5",
            story: `You walk around the freshly dead wolf corpse and venture deeper. Suddenly those wolves you heard before this whole ordeal are the least of your worries. You feel the hairs on the back of your neck raise up. 
            The uncanny sensation of being watched overwhelms you from head to toe. You hyperfocus on every single sound. Every gust of wind, every movement of leaves, and every snapped twig. Your head pivots from each disturbance to the next
            in fits of paranoia. You feel another comforting sense pulsate through you, you tune out the majority of the ambient noise of your surroundings. Suddenly a sound stands out from the rest
            of the natural sounds.` ///CONTINUE HERE **************************************************************************
        },
        //dark route
        darkHole: {
            title: "Chapter 2",
            story: `You stumble around in the dark, tripping and nearly hurting yourself multiple times. You run your hands along the walls to help keep your balance. 
        Somehow the deeper you go into the cave, the less dark it becomes. You round a corner and enter a chamber where the darkness is pierced by an otherworldly glow. A sword pierces the stone floor, 
        despite your hesitation, you feel a faint whisper urging you to approach and grab the sword.`,
            image: "demon_sword.jpg",
            choices: [
                {
                    choice: "Approach",
                    destination: 'evilSword'
                },
                {
                    choice: "Avoid",
                    destination: 'evilDeny'
                }
            ],
        },
        evilDeny: {
            title: "Chapter 2",
            story: `You attempt to turn around and walk away from the sword due to the eerie feeling it gives you, but just as you think you get away, it appears again. You feel the faint whisper urging you to grab the sword 
            even stronger now`,
            image: "demon_sword.jpg",
            choices: [
                {
                    choice: "Approach",
                    destination: 'evilSword'
                }
            ]
        },
        evilSword: {
            title: "Chapter 3",
            story: "",

        }

    }
}

document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('#start-button')
    var content = document.querySelector('#content')
    button.addEventListener('click', function () {
        var name = document.querySelector('#name-input')
        story = getStory(name.value)
        renderScene()
    })
})

function renderScene() {
    var text = "Next"
    var image = "";
    if (story[story.currentScene].image) {
        image = "<img></img>"
    }
    if (story[story.currentScene].buttonText) {
        text = story[story.currentScene].buttonText
    }
    content.innerHTML = `
  <h1>${story[story.currentScene].title}</h1>
  <p>${story[story.currentScene].story}</p>
  ${image}
  ${getInputs()}
  <button id = "submit-button">${text}</button>
  `
    if (story[story.currentScene].image) {
        document.querySelector("img").src = `./img/${story[story.currentScene].image}`
    }
    var button = document.querySelector("#submit-button");
    button.addEventListener('click', function () {
        getInputValue()
    })
}

function getInputValue() {
    var inputs = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            story.currentScene = inputs[i].getAttribute('data-destination')
            renderScene();
            return;
        }
    }
    story.currentScene = story[story.currentScene].defaultDestination
    renderScene()
}

function getInputs() {
    var input = ""
    if (!story[story.currentScene].choices) {
        return ""
    }
    for (var i = 0; i < story[story.currentScene].choices.length; i++) {
        input += `
    <div>
      <input data-destination = ${story[story.currentScene].choices[i].destination} id = "radio${i}" type = "radio" name = "choices" />
      <label for "radio${i}">${story[story.currentScene].choices[i].choice}</label>
    </div>`
    }
    return input;
}