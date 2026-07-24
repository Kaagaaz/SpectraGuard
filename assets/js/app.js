const analyzeBtn = document.getElementById("analyzeBtn");
const results = document.getElementById("results");


analyzeBtn.addEventListener("click", () => {

    analyzeBtn.innerText = "Scanning...";

    analyzeBtn.disabled = true;


    setTimeout(() => {

        results.classList.remove("hidden");

        analyzeBtn.innerText = "Analyze";

        analyzeBtn.disabled = false;


    }, 2000);


});
