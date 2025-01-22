const error = document.getElementById("errors")
const button = document.getElementById("sumbitbtn");
const play = document.getElementById("play")
const rounds = document.getElementById("rounds")

const ul = document.getElementById("Tplayers")

const gamestate = {
    round :0,           // for rounds
    player:[],
    Yourchoice:null,
    rules:{             // rules
        rock:'scissors',
        paper:'rock',
        scissors:'paper'
    }
}

function random(){
    const game = ['rock','paper','scissors']
    const randomm = game[Math.floor(Math.random()*game.length)]
    return randomm
}

function Createplayers(numplayers){
    for(let i = 0 ; i < numplayers; i++ ){
        gamestate.player.push({
            name: `Opponent${i+1}`,
            choice: random(),
            score: 0
        })
    }
}

// function setChoice(choice){
//     const yourplayerindex = gamestate.player.findIndex(player => player.name === 'Your')

//     if(yourplayerindex !== -1){
//         gamestate.player[yourplayerindex].choice = choice;
//     }
//     else{
//     gamestate.Yourchoice = choice;
//     gamestate.player.unshift({
//         name:"You",
//         choice:gamestate.Yourchoice,
//         score:0
//     })}
// }

function setChoice(choice) {
    // Remove 'selected' class from all images
    document.querySelectorAll('img').forEach(img => img.classList.remove('selected'));

    // Add 'selected' class to the clicked choice
    const selectedImg = document.querySelector(`img[onclick="setChoice('${choice}')"]`);
    if (selectedImg) {
        selectedImg.classList.add('selected');
    }

    const yourplayerindex = gamestate.player.findIndex(player => player.name === 'You');

    if (yourplayerindex !== -1) {
        gamestate.player[yourplayerindex].choice = choice;
    } 
    else {
        gamestate.Yourchoice = choice;
        gamestate.player.unshift({
            name: "You",
            choice: gamestate.Yourchoice,
            score: 0,
        });
    }
}


function playerschoice(){
    error.textContent = ""
    gamestate.player.splice(1)
    gamestate.player.forEach(player => {
        player.score = 0
    })
    // gamestate.round = 0

    const inputvalue = parseInt(document.getElementById("input").value);

    if (isNaN(inputvalue) || inputvalue <= 0) {
        error.textContent = "Please enter a valid number of players.";
        return;
    }

    Createplayers(inputvalue)
}

// console.log(players)

function Creategame(){
    error.textContent = "";
    ul.innerHTML = ""

    if(gamestate.player.length < 2){
        error.textContent = `You need at least one opponent. Make sure to select your choice.`
        return
    }

    if(gamestate.Yourchoice == null){
        error.textContent = `Please choose Rock, Paper, or Scissors to start the game.`
        return
    }

    gamestate.round++

    gamestate.player.forEach(player => {
    if(player.name !== 'You'){
        player.choice = random()
    }})

    for(let i = 0 ; i < gamestate.player.length; i++){
        for(let j = i + 1; j< gamestate.player.length;j++ ){
            let player1 = gamestate.player[i];
            let player2 = gamestate.player[j];

            // console.log(`Player1: ${player1.name} (${player1.choice}), Player2: ${player2.name} (${player2.choice})`);
            if(player1.choice === player2.choice){
                console.log(`${player1.name} (${player1.choice}) and ${player2.name} (${player2.choice}) resulted in a draw.`)
            }
            else if(gamestate.rules[player1.choice] === player2.choice){
                console.log(`${player1.name} (${player1.choice}) defeated ${player2.name} (${player2.choice}).`)
                player1.score++
            }
            else{
                console.log(`${player2.name} (${player2.choice}) defeated ${player1.name} (${player1.choice}).`)
                player2.score++
            }
        }
    }
    console.log("\nFinal Scores:");
        gamestate.player.forEach(players => {
        console.log(`${players.name}: ${players.score} points `);
    }); // for debugging only 

 
    gamestate.player.forEach(player =>{
        const li = document.createElement("li");
        li.classList.add("player-item")

        const img = document.createElement("img")
        img.src = `${player.choice}.png`
        img.classList.add("player-img")

        const namespan = document.createElement("span")
        namespan.textContent = `${player.name}`
        namespan.classList.add("player-name")

        const scorespan = document.createElement("span")
        scorespan.textContent = `${player.score}`
        scorespan.classList.add("player-score")

        li.appendChild(img)
        li.appendChild(namespan)
        li.appendChild(scorespan)

        ul.appendChild(li)
    })

    rounds.textContent = `Rounds Played: ${gamestate.round}`
}

function reset(){
    gamestate.player = []
    gamestate.round = 0
    gamestate.Yourchoice = null
    ul.textContent = ''
    error.textContent = "";
    rounds.textContent = `Rounds Played: ${gamestate.round}`
    document.getElementById("input").value = "";
    document.querySelectorAll('img').forEach(img => img.classList.remove('selected'));

}

// Buttons
button.addEventListener('click', playerschoice)
play.addEventListener('click', Creategame)
