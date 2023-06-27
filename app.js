
const boxColor = ["#3D5AFE", "#8C9EFF", "#2979FF","#29B6F6", "#BBDEFB", "#2962FF", "#283593", "#0277BD", "#0D47A1", "#304FFE"]
let cell = document.querySelectorAll(".item")
let result = document.getElementById("result")
let setTimeout

let target 
let point = 0
let modal = document.querySelector(".modal-container")
let gameOver = document.querySelector(".modal-container div")
let modalTex = document.querySelector(".modal-container p")
let startBtn = document.querySelector("#start")
let startAgain = document.querySelector(".start")
let grid = document.querySelector("#grid")
let container = document.querySelector('.container')
let matchPoint = [5, 10, 15, 20, 25, 30, 35, 40]
let row = 4
let width = 5.5
let cont = document.querySelector(".container")
let i 
let lightenC = 50

const d = new Date();
let seconds = d.getSeconds();

let randomColor = boxColor[Math.floor(Math.random() * boxColor.length)] 

// Stopwatch variables
var startTime;
var elapsedTime = 0;
var timerInterval;
var display = document.getElementById('display');
let finalTime = document.getElementById('finalTime')

display.textContent = '00:00.00';

// functions



function innitialGame(){
    
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
    cont.style.width = "22.7rem"
    cont.style.height = "22.7rem"
    
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

 
    // add column
    function levelUp(){
        colorize()
        i++
        row ++
        for (j=0; j < (Math.pow(row, 2)- (cell.length)); j++){
            let newDiv = document.createElement("div")
            newDiv.className = "item"
            grid.appendChild(newDiv)
            newDiv.style.width = `${width - 1}rem`
            newDiv.style.height = `${width - 1}rem`
            newDiv.style.backgroundColor = randomColor
            if (i === 1){
                lightenC = 40
               
            } else if (i===2){
                lightenC = 40
                cont.style.width = "23.5rem"
                cont.style.height = "23.5rem"
                cell.forEach((box) => {
                    box.style.width = `${width - 1}rem`
                    box.style.height = `${width - 1}rem`
                    
                })
            
            }else if (i===3){
                lightenC = 35
            }else if (i===4){
                lightenC = 35
                cont.style.width = "28.2rem"
                cont.style.height = "28.2rem"
                
            }else if(i===5){
                lightenC = 30
            }else if(i===6){
                lightenC = 30
                cont.style.width = "32.8rem"
                cont.style.height = "32.8rem"
            }else if(i===7){
                lightenC = 20
            }
    }  
            
            
    }
    
    function loseGame(){
        stop() 
        modal.style.display = "block"
        gameOver.classList.add("gameOver")
        modalTex.innerText = "Your score is:" + point
        finalTime.textContent = formatTime(elapsedTime);
        reset()
    }

    startBtn.addEventListener("click", function(){
        gameOver.classList.remove("gameOver")
        modal.style.display = "none"
        innitialGame()
        start()
        colorize()

    })
    startAgain.addEventListener("click", function(){
        gameOver.classList.remove("gameOver")
        modal.style.display = "none"
        reset()
        innitialGame()

    })

    
    function lightenColor(color, amount){ 
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }


    // stop watch

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
  
    return (
     
      pad(minutes, 2) +
      ':' +
      pad(seconds, 2) +
      '.' +
      pad(milliseconds, 2)
    );
  }
  
  // Pad a number with leading zeros
  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }









