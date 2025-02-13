let exercisecontainer = document.querySelector(".exercise-container"); 
//timer
const semicircle = document.querySelectorAll('.semi-circle');
let timer = document.querySelector(`.timer`);
let maintimercontainer = document.querySelector(".main-timer-container"); 

//starting timer for getting ready
const hr = 0;
const min = 0;
const sec = 5;//initializing time

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
let setTime = hours + minutes + seconds;
let settimep;
let futureTime; 

let timersFrozen = false; // Variable to freeze timers
let remainingPausedTime = setTime; // Store remaining time
let lastPausedSeconds = sec; // Store last displayed value

//for dash and gifs
let gifBox = document.querySelectorAll(".gif-box");
let dashcontainer = document.getElementById("dash-container"); //for exercise counter display on the top
let dashElements = []; // Store the <hr> elements for later reference

//progress bar
let mainprogressbarcontainer = document.querySelector(".main-progress-container"); 
let progressBar = document.getElementById("progress-bar");
let pauseBtn = document.getElementById("pause-btn");
let playBtn = document.getElementById("play-btn");
let totalseconds,currenttimep;
let asking = document.querySelector(".asking");
let timep = document.querySelector(".time");


//prev next buttons
let prevbtn = document.querySelector(".prevbtn");
let nextbtn = document.querySelector(".nextbtn"); 

let currentIndex = 0; // Track the current video index

//buttons vala sction for rep exercises
let mainbuttoncontainer = document.querySelector(".main-button-container");
let donebtn = document.querySelector(".donebtn");
let repsinfo = document.querySelector(".repsinfo");
let instructionmaincontainer = document.querySelector(".instruction-main-container"); 
let nextexercisename = document.querySelectorAll(".next-exercise-name");

let exercisecount = 0; //  total exercise count

let firsttime = 0;

let myTimer; // New variable name
let timerLoop;

let resttimemaincontainer = document.querySelector(".resttime-main-container");
let samay = document.querySelector(".samay");
let skip = document.querySelector(".skip");
let setTimer = 30 * 1000; // 30 seconds in milliseconds (initial countdown time)
let remainingTimer = setTimer; // Initial remaining time (starts at 30 seconds)
let futureTimer = Date.now() + setTimer; // The target time when the countdown ends
let timerInterval;


let videos = [
    {
        videoPath: "./gifs/ladkajumpingjacks.mp4", // Path to the video file
        heading:"JUMPING JACKS1",
        instruction1: "Watch the video carefully.",
        instruction2: "Focus on the key concepts.",
        instruction3: "Take notes while watching.",
        set: 0, // Set identifier
        rep:0,
        tminutes: 0, // Total minutes for the video
        tseconds: 30, // Total seconds for the video
    },
    {
        videoPath: "./gifs/ladkisitups.mp4",
        heading:"SIT UPS2",
        instruction1: "Observe the experiment.",
        instruction2: "Understand the procedure.",
        instruction3: "Analyze the results.",
        set: 3,
        rep:12,
        tminutes: 0,
        tseconds: 0,
    },
    {
        videoPath: "./gifs/ladkajumpingjacks.mp4",
        heading:"JUMPING JACKS3",
        instruction1: "Listen to the explanation.",
        instruction2: "Pay attention to the examples.",
        instruction3: "Try to relate the concepts to real life.",
        set: 2,
        rep:12,
        tminutes: 0,
        tseconds: 0,
    },
    {
        videoPath: "./gifs/ladkisitups.mp4",
        heading:"SIT UPS4",
        instruction1: "Identify the main points.",
        instruction2: "Pause and reflect if needed.",
        instruction3: "Summarize the content after watching.",
        set: 0,
        rep:0,
        tminutes: 1,
        tseconds: 0,
    },
    {
        videoPath: "./gifs/ladkajumpingjacks.mp4",
        heading:"JUMPING JACKS5",
        instruction1: "Observe the problem-solving steps.",
        instruction2: "Try solving a similar problem.",
        instruction3: "Check your understanding with examples.",
        set: 3,
        rep:12,
        tminutes: 0,
        tseconds: 0,
    }
];

function countDownTimer() {

    resttimemaincontainer.style.display = 'none';
    dashcontainer.style.display = 'none';
    exercisecontainer.style.display = 'flex';
    // If the timer is frozen, skip the rest of the function
    if (timersFrozen) return;

    if(firsttime == 0){
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

    const secs = Math.floor((remainingTime / (1000 )) % 60);
    timer.innerHTML= `
    <div>${secs}</div>
    `;

    //progress indicator
    if (angle > 180) {
        semicircle[2].style.display = 'none';
        semicircle[0].style.transform = 'rotate(180deg)';
        semicircle[1].style.transform = `rotate(${angle}deg)`; // Corrected syntax
    } else {
        semicircle[2].style.display = 'block';
        semicircle[0].style.transform = `rotate(${angle}deg)`; // Corrected syntax
        semicircle[1].style.transform = `rotate(${angle}deg)`; // Corrected syntax
    }

    // 5 sec condition
    if(remainingTime <= 5000){
        semicircle[0].style.backgroundColor = 'red';
        semicircle[1].style.backgroundColor = 'red';
        timer.style.color = 'red';
    }

    //end
    if (remainingTime < 0){
        clearInterval(timerLoop);
        semicircle[0].style.display = 'none';
        semicircle[1].style.display = 'none';
        semicircle[2].style.display = 'none';
        counter = 1;
        timer.innerHTML= `
        <div>0</div>
        `;
        firsttime = 1;
        updateVideo();
    }
    if (remainingTime > 0){
        lastPausedSeconds = Math.floor((remainingTime / 1000) % 60); // Store last displayed time
        timer.innerHTML = `<div>${lastPausedSeconds}</div>`;
    }
}
}

function startprogressbar(hours,minutes,seconds) {
    const hoursMs = hours * 3600000;
    const minutesMs = minutes * 60000;
    const secondsMs = seconds * 1000;
    setTime = hoursMs + minutesMs + secondsMs;

    const startTime = Date.now();
    futureTime = startTime + setTime;
    // Reset progress bar to 0% before starting
    progressBar.style.width = "0%"
    myTimer = updateProgressBar();
}

function updateProgressBar() {

    if (timersFrozen) return;

    resttimemaincontainer.style.display = 'none';
    exercisecontainer.style.display = 'flex';
    repsinfo.style.display = 'none';
    mainbuttoncontainer.style.display = 'none';
    maintimercontainer.style.display= 'none';
    asking.style.display = 'none';
    dashcontainer.style.display = 'flex';
    timep.style.display = 'flex';
    mainprogressbarcontainer.style.display = 'flex';

    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const percent = ((setTime - remainingTime) / setTime) * 100;

    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, userGrouping:false});
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, userGrouping:false});
    // const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    timep.innerHTML = `
    <div>${mins}</div>
    <div class ="colonp" >:</div>
    <div>${secs}</div>
    `

    progressBar.style.width = `${percent}%`;

    if (remainingTime > 0) {
        timer = requestAnimationFrame(updateProgressBar);
        lastPausedSeconds = Math.floor((remainingTime / 1000) % 60); // Store last displayed time
        timer.innerHTML = `
        <div>${mins}</div>
        <div class ="colonp" >:</div>
        <div>${lastPausedSeconds}</div>`;
    } else {
        progressBar.style.width = "100%"; // Ensure full width at end
        timep.innerHTML = ` 
        <div>00</div>
        <div class ="colonp" >:</div>
        <div>00</div>
        `;
        increment();
    }
}


//function for rep exercises
function repexercise() {
    if (timersFrozen) {
        clearInterval(myTimer); // Stop the timer if it's running
    }
    maintimercontainer.style.display= 'none';
    asking.style.display = 'none';
    timep.style.display = 'none';
    mainprogressbarcontainer.style.display = 'none';
    mainbuttoncontainer.style.display = 'flex';
    repsinfo.style.display = 'flex';
    dashcontainer.style.display = 'flex';

}

// Loop through the videos array and create elements
videos.forEach((video, index) => {
    let hr = document.createElement("hr");
    dashcontainer.appendChild(hr);
    hr.classList.add("dash");
    
    dashElements.push(hr);

    hr.addEventListener("click", function() {
        currentIndex = index; 
        updateVideo(); 
    });
});

// Function to update the video in the gifBox
function updateVideo() {
    let currentVideo = videos[currentIndex]; 

    console.log(currentIndex);

    if (gifBox.length > 0) {
        gifBox.forEach(gifBox => {
    gifBox.innerHTML = `
        <video class="full-screen-video" src="${currentVideo.videoPath}" autoplay loop muted playsinline></video>
         `;
      });
    }
    let instructionList = document.querySelector(".instructionlist"); 
    instructionList.innerHTML = ""; 
    for (let i = 1; i <= 3; i++) {
        let instructionText = currentVideo[`instruction${i}`]; 

        if (instructionText) { 
            let li = document.createElement("li");
            li.textContent = instructionText; 
            instructionList.appendChild(li); 
        }
    }
    
    // nextexercisename.innerHTML = currentVideo.heading;
    nextexercisename.forEach(element => {
        element.innerHTML = currentVideo.heading;
    });
    
    repsinfo.innerHTML = `${currentVideo.set} x ${currentVideo.rep}`;

    dashElements.forEach((dash, index) => {
        if (index <= currentIndex) {
            dash.classList.add("active");
        } else {
            dash.classList.remove("active"); 
        }
    });

    updateButtonsAndTimer(currentVideo);
}

function updateButtonsAndTimer(currentVideo) {
    // Handle "Previous" button visibility
    prevbtn.style.display = (currentIndex === 0) ? 'none' : "inline-block";

    // Handle "Next" button visibility
    nextbtn.style.display = (currentIndex === videos.length - 1) ? 'none' : "inline-block";

    // Timer and exercise logic
    if (firsttime === 0) {
        nextbtn.style.display = 'none';
        timerLoop = setInterval(countDownTimer);
    } else if (currentVideo.set !== 0) {
        if (!timersFrozen) { 
            timersFrozen = true;
            clearInterval(timerLoop); // Stop any running timer
        }
        repexercise();
    } else if (currentVideo.set === 0) {
        if (timersFrozen) {
            timersFrozen = false;
        }
        startprogressbar(0, currentVideo.tminutes, currentVideo.tseconds);
    }
}

function resttimetimer() {
    
    resttimemaincontainer.style.display = 'flex';
    exercisecontainer.style.display = 'none'; 

    const currentTime = Date.now();
    const remainingTime = futureTimer - currentTime;// Time left in milliseconds

    // Calculate minutes and seconds
    if (remainingTime <= 0) {
        clearInterval(timerInterval); // Stop the interval when time is up
        samay.innerHTML = `
            <div>00</div>
            <div class="colonp">:</div>
            <div>00</div>
        `;
    } else {
        const minutes = Math.floor(remainingTime / 60000).toLocaleString('en-US', { minimumIntegerDigits: 2, userGrouping: false });
        const seconds = Math.floor((remainingTime % 60000) / 1000).toLocaleString('en-US', { minimumIntegerDigits: 2, userGrouping: false });

        samay.innerHTML = `
            <div>${minutes}</div>
            <div class="colonp">:</div>
            <div>${seconds}</div>
        `;
}
}

document.getElementById("add20sec").addEventListener("click", () => {
    futureTimer += 30 * 1000; // Add 30 seconds to the target time (futureTimer)
});

document.getElementById("skip").addEventListener("click", () => {
    clearInterval(timerInterval); // Stop the timer
    resttimemaincontainer.style.display = 'none';
    exercisecontainer.style.display = 'flex';
    let currentVideo = videos[currentIndex];
    updateButtonsAndTimer(currentVideo);
    // goToNextVideo(); // Call another function
});

// Event listener for "Next" button
// nextbtn.addEventListener("click", () => {
//     if (currentIndex < videos.length - 1) {
//         currentIndex++;
//     } 

//     updateVideo();
// });

function goToNextVideo() {
    if (currentIndex < videos.length - 1) {
        currentIndex++;
    } 
    updateVideo();
}

// Event listener for "Next" button
nextbtn.addEventListener("click", goToNextVideo);

// Event listener for "Previous" button
prevbtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--; 
    } 
    updateVideo();
});

// Freeze/Unfreeze the timer
function toggleFreezeTimer() {
    timersFrozen = !timersFrozen; 
    if (timersFrozen) {
        clearInterval(timerLoop); 
        remainingPausedTime = futureTime - Date.now(); 
        timer.innerHTML = `<div>${lastPausedSeconds}</div>`; 
        instructionmaincontainer.style.display = 'flex';
    } else {
        if (videos[currentIndex].set === 0) {
            startTimer();
        }
        instructionmaincontainer.style.display = 'none';
    }
}

// Example: Add button to freeze/unfreeze the timer
document.querySelectorAll(".close").forEach(button => {
    button.addEventListener("click", toggleFreezeTimer);
});

document.querySelectorAll(".controls").forEach(button => {
    button.addEventListener("click", toggleFreezeTimer);
});

function increment() {
    resttimemaincontainer.style.display = 'none';
    exercisecontainer.style.display = 'flex';
    currentIndex++;
    updateVideo();
    exercisecount++; // Increment by 1
    if (timerInterval) { 
        clearInterval(timerInterval); // Stop any existing timer
    } 
        // Reset the future time (e.g., restart the countdown from 30 sec)
        futureTimer = Date.now() + 30 * 1000;

    timerInterval = setInterval(resttimetimer); // Start a new timer
}

function startTimer() {
    futureTime = Date.now() + remainingPausedTime; 
    if(firsttime === 0){
        updateVideo();
    }
    else{
        updateProgressBar();
    }
    
}

// Start the timer when the page loads
startTimer();
