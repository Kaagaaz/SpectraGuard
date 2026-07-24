const analyzeBtn = document.getElementById("analyzeBtn");

const results = document.getElementById("results");

const scannerAnimation = document.getElementById("scannerAnimation");

const scoreNumber = document.getElementById("scoreNumber");

const scoreCircle = document.querySelector(".score-circle");

const urlInput = document.getElementById("urlInput");


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


            if(!element) return;


            if(index > 0){

                const previous =
                document.getElementById(steps[index-1]);


                if(previous){

                    previous.classList.remove("active");

                    previous.classList.add("done");

                }

            }


            element.classList.add("active");


        }, index * 700);


    });

}



// =========================
// Connect With Cloudflare API
// =========================

async function fetchReport(url){


    try{


        const response = await fetch(

        "https://spectra-guard-api.kaagaazcoder-safe.workers.dev/scan?url="
        + encodeURIComponent(url)

        );



        const data = await response.json();



        // Update score

        animateScore(data.privacy_score);

        updateCircle(data.privacy_score);



        // Update report cards


        const tracker =
        document.getElementById("trackerResult");


        const cookies =
        document.getElementById("cookieResult");


        const https =
        document.getElementById("httpsResult");



        if(tracker){

            tracker.innerText =
            data.trackers + " trackers detected";

        }



        if(cookies){

            cookies.innerText =
            data.cookies + " cookies found";

        }



        if(https){

            https.innerText =
            data.https
            ? "HTTPS connection detected"
            : "HTTPS not detected";

        }



    }


    catch(error){


        console.log(error);


        alert(
        "Unable to connect with Spectra Guard API"
        );


    }


}



// =========================
// Analyze Button
// =========================

analyzeBtn.addEventListener("click",()=>{


    const url = urlInput.value.trim();



    if(url === ""){


        alert(
        "Please enter a website URL."
        );


        return;


    }



    analyzeBtn.innerText = "Scanning...";


    analyzeBtn.disabled = true;



    results.classList.add("hidden");



    scannerAnimation.classList.remove("hidden");



    runScanSteps();



    setTimeout(async ()=>{


        scannerAnimation.classList.add("hidden");


        results.classList.remove("hidden");



        await fetchReport(url);



        analyzeBtn.innerText = "Analyze";


        analyzeBtn.disabled = false;



    },3000);



});
