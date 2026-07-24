const analyzeBtn = document.getElementById("analyzeBtn");

const results = document.getElementById("results");

const scannerAnimation = document.getElementById("scannerAnimation");

const scoreNumber = document.getElementById("scoreNumber");

const scoreCircle = document.querySelector(".score-circle");


// Animate privacy score number
function animateScore(target){

    let current = 0;

    const interval = setInterval(()=>{

        current++;

        scoreNumber.innerText = current;


        if(current >= target){

            clearInterval(interval);

        }

    },20);

}



// Animate score circle
function updateCircle(target){

    let progress = 0;


    const animation = setInterval(()=>{


        progress++;


        scoreCircle.style.background =
        `conic-gradient(
            #00bfff ${progress}%,
            #222 0%
        )`;


        if(progress >= target){

            clearInterval(animation);

        }


    },20);

}



// Analyze button click
analyzeBtn.addEventListener("click",()=>{


    // Change button
    analyzeBtn.innerText = "Scanning...";

    analyzeBtn.disabled = true;



    // Reset previous result

    results.classList.add("hidden");


    // Show scanner animation

    scannerAnimation.classList.remove("hidden");



    // Simulate scanning time

    setTimeout(()=>{


        // Hide scanner

        scannerAnimation.classList.add("hidden");



        // Show results

        results.classList.remove("hidden");



        // Start animations

        animateScore(82);

        updateCircle(82);



        // Restore button

        analyzeBtn.innerText = "Analyze";

        analyzeBtn.disabled = false;



    },3000);


});
