const analyzeBtn = document.getElementById("analyzeBtn");

const results = document.getElementById("results");

const scannerAnimation = document.getElementById("scannerAnimation");

const scoreNumber = document.getElementById("scoreNumber");


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



analyzeBtn.addEventListener("click",()=>{


    analyzeBtn.innerText="Scanning...";

    analyzeBtn.disabled=true;


    scannerAnimation.classList.remove("hidden");


    results.classList.add("hidden");



    setTimeout(()=>{


        scannerAnimation.classList.add("hidden");


        results.classList.remove("hidden");


        animateScore(82);


        analyzeBtn.innerText="Analyze";

        analyzeBtn.disabled=false;



    },3000);


});
