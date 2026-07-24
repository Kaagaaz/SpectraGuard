const analyzeBtn = document.getElementById("analyzeBtn");

const results = document.getElementById("results");

const scannerAnimation = document.getElementById("scannerAnimation");

const scoreNumber = document.getElementById("scoreNumber");

const scoreCircle = document.querySelector(".score-circle");


// =========================
// Privacy Score Animation
// =========================

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



// =========================
// Score Circle Animation
// =========================

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



// =========================
// Scan Steps Animation
// =========================

function runScanSteps(){

    const steps = [
        "step1",
        "step2",
        "step3",
        "step4"
    ];


    steps.forEach((step,index)=>{


        setTimeout(()=>{


            const element = document.getElementById(step);


            if(index > 0){

                const previous =
                document.getElementById(steps[index-1]);


                previous.classList.remove("active");

                previous.classList.add("done");

            }


            element.classList.add("active");


        }, index * 700);


    });

}



// =========================
// Analyze Button
// =========================

analyzeBtn.addEventListener("click",()=>{


    // Button change

    analyzeBtn.innerText = "Scanning...";

    analyzeBtn.disabled = true;



    // Hide old results

    results.classList.add("hidden");



    // Show scanner

    scannerAnimation.classList.remove("hidden");



    // Start scan steps

    runScanSteps();



    // Fake scanning delay

    setTimeout(()=>{


        // Hide scanner

        scannerAnimation.classList.add("hidden");



        // Show results

        results.classList.remove("hidden");



        // Start score animations

        animateScore(82);

        updateCircle(82);



        // Reset button

        analyzeBtn.innerText = "Analyze";

        analyzeBtn.disabled = false;



    },3000);


});
