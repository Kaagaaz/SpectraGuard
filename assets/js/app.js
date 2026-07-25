const analyzeBtn = document.getElementById("analyzeBtn");

const results = document.getElementById("results");

const scannerAnimation = document.getElementById("scannerAnimation");

const scoreNumber = document.getElementById("scoreNumber");

const scoreCircle = document.querySelector(".score-circle");

const urlInput = document.getElementById("urlInput");


// Score animation

function animateScore(target){

    let current = 0;

    scoreNumber.innerText = 0;


    const interval = setInterval(()=>{

        current++;

        scoreNumber.innerText = current;


        if(current >= target){

            clearInterval(interval);

        }

    },20);

}



// Circle animation

function updateCircle(target){

    let progress = 0;


    const animation = setInterval(()=>{

        progress++;


        scoreCircle.style.background =
        `conic-gradient(
            #00bfff ${progress}%,
            #222 ${progress}%
        )`;


        if(progress >= target){

            clearInterval(animation);

        }


    },15);

}



// Scan animation

function runScanSteps(){

    const steps = [
        "step1",
        "step2",
        "step3",
        "step4"
    ];


    steps.forEach((step,index)=>{


        setTimeout(()=>{


            const element =
            document.getElementById(step);


            if(index > 0){

                document
                .getElementById(steps[index-1])
                .classList.remove("active");

                document
                .getElementById(steps[index-1])
                .classList.add("done");

            }


            element.classList.add("active");


        },index * 700);


    });

}



// Fetch API

async function fetchReport(url){


try{


const response = await fetch(

"https://spectra-guard-api.kaagaazcoder-safe.workers.dev/scan?url="
+ encodeURIComponent(url)

);



const data = await response.json();



// Score

animateScore(data.privacy_score);

updateCircle(data.privacy_score);




// HTTPS

document.getElementById("httpsResult").innerText =

data.https

? "HTTPS connection detected"

: "HTTPS not detected";




// Trackers

document.getElementById("trackerResult").innerText =

(data.trackers ?? 0)
+
" trackers detected";




// Cookies

document.getElementById("cookieResult").innerText =

(data.cookies ?? 0)
+
" cookies found";




// Risk (if you have a risk element)

const riskElement =
document.getElementById("riskResult");


if(riskElement){

riskElement.innerText =
"Risk Level: "
+
(data.risk ?? "Unknown");

}




// Issues

const issueElement =
document.getElementById("issuesResult");


if(issueElement){


if(data.issues && data.issues.length > 0){


issueElement.innerHTML =
data.issues
.map(issue=>"⚠ "+issue)
.join("<br>");


}
else{


issueElement.innerText =
"No security issues detected";


}


}




}

catch(error){


console.log(error);

alert(
"Unable to connect with Spectra Guard API"
);


}


}




// Button

analyzeBtn.addEventListener("click",()=>{


const url =
urlInput.value.trim();



if(url === ""){


alert(
"Please enter a website URL"
);


return;


}



analyzeBtn.innerText =
"Scanning...";


analyzeBtn.disabled = true;



results.classList.add("hidden");


scannerAnimation.classList.remove("hidden");



runScanSteps();



setTimeout(()=>{


scannerAnimation.classList.add("hidden");


results.classList.remove("hidden");



fetchReport(url);



analyzeBtn.innerText =
"Analyze";


analyzeBtn.disabled = false;



},3000);



});
