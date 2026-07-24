const analyzeBtn = document.getElementById("analyzeBtn");

const results = document.getElementById("results");

const scannerAnimation = document.getElementById("scannerAnimation");


analyzeBtn.addEventListener("click",()=>{


    analyzeBtn.innerText="Scanning...";

    analyzeBtn.disabled=true;


    scannerAnimation.classList.remove("hidden");


    setTimeout(()=>{


        scannerAnimation.classList.add("hidden");


        results.classList.remove("hidden");


        analyzeBtn.innerText="Analyze";

        analyzeBtn.disabled=false;


    },3000);


});
