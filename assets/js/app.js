const analyzeBtn = document.getElementById("analyzeBtn");
const results = document.getElementById("results");
const scannerAnimation = document.getElementById("scannerAnimation");

const scoreNumber = document.getElementById("scoreNumber");
const scoreCircle = document.querySelector(".score-circle");

const urlInput = document.getElementById("urlInput");


let scoreTimer;


// =====================
// Score Animation
// =====================

function animateScore(target){

    clearInterval(scoreTimer);


    target = Number(target);


    if(isNaN(target)){
        target = 0;
    }


    if(target > 100){
        target = 100;
    }


    if(target < 0){
        target = 0;
    }



    let current = 0;


    scoreNumber.innerText = "0";


    scoreTimer = setInterval(()=>{


        current++;


        scoreNumber.innerText = current;



        if(current >= target){

            clearInterval(scoreTimer);

        }


    },20);

}



// =====================
// Circle
// =====================

function updateCircle(target){


    if(target > 100){
        target = 100;
    }


    scoreCircle.style.background =
    `conic-gradient(
        #00bfff ${target}%,
        #222 ${target}%
    )`;

}



// =====================
// Scan Steps
// =====================

function runScanSteps(){


const steps=[
"step1",
"step2",
"step3",
"step4"
];


steps.forEach((step,index)=>{


setTimeout(()=>{


let current =
document.getElementById(step);


current.classList.add("active");



if(index>0){

let previous =
document.getElementById(
steps[index-1]
);


previous.classList.remove("active");

previous.classList.add("done");

}



},index*700);



});


}



// =====================
// API
// =====================

async function fetchReport(url){


try{


const response =
await fetch(

"https://spectra-guard-api.kaagaazcoder-safe.workers.dev/scan?url="
+
encodeURIComponent(url)

);



const data =
await response.json();



// Website not found

if(data.found === false){


alert(
"❌ Website not found\n\n"
+
(data.error || "Invalid website")
);


results.classList.add("hidden");


return;

}





let score =
Number(data.privacy_score);



if(score>100){
score=100;
}


if(score<0){
score=0;
}




animateScore(score);

updateCircle(score);




// HTTPS

document.getElementById(
"httpsResult"
).innerText =


data.https

?
"HTTPS connection detected"

:

"HTTPS not detected";




// Trackers

document.getElementById(
"trackerResult"
).innerText =


(data.trackers || 0)
+
" trackers detected";





// Cookies

document.getElementById(
"cookieResult"
).innerText =


(data.cookies || 0)
+
" cookies found";





// Risk

document.getElementById(
"riskResult"
).innerText =


"Risk Level: "
+
(data.risk || "Unknown");





// Issues

const issues =
document.getElementById(
"issuesResult"
);



if(data.issues && data.issues.length){


issues.innerHTML =
data.issues
.map(
issue=>"⚠ "+issue
)
.join("<br>");


}

else{


issues.innerText =
"No security issues detected";


}





// Recommendations

const rec =
document.getElementById(
"recommendationList"
);



if(rec){


rec.innerHTML="";


if(data.issues && data.issues.length){


data.issues.forEach(issue=>{


let li =
document.createElement("li");


li.innerText =
"Improve: "
+
issue;


rec.appendChild(li);


});


}

else{


rec.innerHTML =
"<li>Website security looks good</li>";

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




// =====================
// Button
// =====================


analyzeBtn.addEventListener(
"click",
()=>{


const url =
urlInput.value.trim();



if(!url){

alert(
"Please enter a website URL"
);

return;

}




analyzeBtn.innerText =
"Scanning...";


analyzeBtn.disabled=true;



results.classList.add("hidden");


scannerAnimation.classList.remove("hidden");



runScanSteps();



setTimeout(async()=>{


scannerAnimation.classList.add("hidden");


results.classList.remove("hidden");


await fetchReport(url);



analyzeBtn.innerText =
"Analyze";


analyzeBtn.disabled=false;



},3000);



});
