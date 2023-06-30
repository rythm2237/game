
const boxColor = ["#3D5AFE", "#8C9EFF", "#2979FF","#29B6F6", "#BBDEFB", "#2962FF", "#283593", "#0277BD", "#0D47A1", "#304FFE"]
let matchPoint = [5, 10, 15, 20, 25, 30, 35, 40]
let body = document.querySelector("body")
//getting elements
let cell = document.querySelectorAll(".item")
let result = document.getElementById("result")
let celeberat = document.getElementById('my-canvas')
let modal = document.querySelector(".modal-container")
let modalText = document.querySelector(".modal-container h3")
let gameOver = document.querySelector(".modal-container div")
let modalScore = document.querySelector(".finalScore")
let startBtn = document.querySelector("#start")
let startAgain = document.querySelector(".start")
let grid = document.querySelector("#grid")
let container = document.querySelector('.container')
let info = document.querySelector('.info')
let setTimeout
let target 
let point = 0
let row = 4
let width = 5.5
let i = 0
let lightenC = 50
let finalTime
const d = new Date();
let seconds = d.getSeconds();
var randomColor = boxColor[Math.floor(Math.random() * boxColor.length)]

 

// Stopwatch variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let display = document.getElementById('display');
let modalTime = document.querySelector('.finalTime')
display.textContent = '00:00.00';


// functions

function innitialGame(){
    body.classList.remove("anim")
    point = 0
    i=0
    row = 4
    lightenC = 50
    result.innerText = 0
    cell.forEach((box) => {
        box.style.width = `5.5rem`
        box.style.height = `5.5rem`
        box.style.backgroundColor = 'white'
    })
    container.style.width = "22.7rem"
    container.style.height = "22.7rem"
}


function colorize(){
    
    cell.forEach(item => item.style.backgroundColor = randomColor)
    target = Math.floor(Math.random() * cell.length)
    cell[target].style.backgroundColor = lightenColor(randomColor, lightenC)

    cell.forEach((item, number) => {
        if (target === number){
                item.removeEventListener("click",loseGame);
                item.addEventListener("click", nextStep);
                
            } else {
                item.removeEventListener("click",nextStep);
                item.addEventListener("click", loseGame);
                
            }
        })
}

    function nextStep(){
        point++
        result.innerText = point
        if (point === matchPoint[i] ) levelUp()
        else colorize()  
    }
   
    // next level
    function levelUp(){
        if (lightenC > 10) 
        {lightenC = lightenC - 5}
        colorize()
        i++
        row ++
           if (i===2){
                for (j=0; j < (Math.pow(row, 2)- (cell.length)); j++){
                    let newDiv = document.createElement("div")
                    newDiv.className = "item"
                    grid.appendChild(newDiv)
                    newDiv.style.width = `${width - 1}rem`
                     newDiv.style.height = `${width - 1}rem`
                    newDiv.style.backgroundColor = randomColor
                }
                 
                container.style.width = "23.5rem"
                container.style.height = "23.5rem"
                cell.forEach((box) => {
                    box.style.width = `${width - 1}rem`
                    box.style.height = `${width - 1}rem`   
                })
            }else if (i===4){
                body.classList.add("anim")
               
            }else if(i===6){
                
                
            }else if (i === 8){
                celebration()  
            }
      
            
            
    }
    
    function loseGame(){
        stop() 
        formatTime(elapsedTime)
        modal.style.display = "block"
        gameOver.classList.add("gameOver")
        gameOver.style.backgroundColor= 'red'
        container.style.visibility = 'hidden'
        info.style.visibility = 'hidden'
        modalScore.innerText = "score:  " + point
        modalText.innerText = "Game Over"
        modalTime.textContent = "Time: "+ finalTime;
        reset()
    }
   
//buttons
    startBtn.addEventListener("click", function(){
        gameOver.classList.remove("gameOver")
        modal.style.display = "none"
        innitialGame()
        start()
        colorize()
    })
    startAgain.addEventListener("click", function(){
        gameOver.classList.remove("gameOver")
        modal.style.display = "none";
        celeberat.style.visibility = "hidden";
        container.style.visibility = 'visible'
        info.style.visibility = 'visible'
        reset()
        innitialGame()

    })

    
    function lightenColor(color, amount){ 
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }


// Stop watch

// Stop the stopwatch
function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  startBtn.disabled = true;
//   stopButton.disabled = false;
}
function stop() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    // stopButton.disabled = true;
  }
// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00.00';
    elapsedTime = 0;
    startBtn.disabled = false;
  //   stopButton.disabled = true;
  }
  
  // Update the stopwatch display
  function updateTime() {
    var now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
  }

  // Format the elapsed time as HH:MM:SS.sss
  function formatTime(time) {
    var minutes = Math.floor((time % 3600000) / 60000);
    var seconds = Math.floor((time % 60000) / 1000);
    var milliseconds = Math.floor ((time % 1000)/10);
    if (minutes > 0){

        finalTime = 
            
            pad(minutes, 2) +
            ':' +
            pad(seconds, 2) +
            '.' +
            pad(milliseconds, 2)
            ;
        } else{
            finalTime = 
                
                pad(seconds, 2) +
                '.' +
                pad(milliseconds, 2);

        }
        return finalTime
        }
  
  // Pad a number with leading zeros
  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }


// celebrat effect codes

var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

function celebration(){
    modal.style.display = "block"
    gameOver.classList.add("gameOver")
    celeberat.style.visibility = "visible"
    container.style.visibility = 'hidden'
    info.style.visibility = 'hidden'
    modalText.innerText = 'congratulations'
    modalScore.innerText = "Record:  " + finalTime
    gameOver.style.backgroundColor = "green"
    modalTime.textContent= ""
    startAgain.style.backgroundColor= "#fff"
    startAgain.style.color= "#000"

   }





