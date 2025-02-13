const semicircle = document.querySelectorAll('.semi-circle');
const timer = document.querySelector(`.timer`);
 

//input
const hr = 0;
const min = 0;
const sec = 15;

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;
const startTime = Date.now();
const futureTime = startTime + setTime;


const timerLoop = setInterval(countDownTimer); // Set interval to 100ms for smoother animation
countDownTimer();

function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;
    
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
    
    //timer section
    const hrs = Math.floor((remainingTime / (1000 * 60 *60)) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2,userGrouping:false});
    const mins = Math.floor((remainingTime / (1000 *60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2,userGrouping:false});;
    // const secs = Math.floor((remainingTime / (1000 )) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2,userGrouping:false});;
    const secs = Math.floor((remainingTime / (1000 )) % 60);
    //add the below part to timer.innerHTML if u want to display time in hours also
    // <div>${hrs}</div>
    // <div class="colon">:</div>
    // <div>${mins}</div>
    // <div class="colon">:</div>
    timer.innerHTML= `
    <div>${secs}</div>
    `;

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
        
        //add the below part to timer.innerHTML if u want to display time in hours also
        // <div>00</div>
        // <div class="colon">:</div>
        // <div>00</div>
        // <div class="colon">:</div>
        timer.innerHTML= `
        <div>0</div>
        `;
    }
}