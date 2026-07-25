const analyzeBtn = document.getElementById("analyzeBtn");

const results = document.getElementById("results");

const scannerAnimation =
document.getElementById("scannerAnimation");

const scoreNumber =
document.getElementById("scoreNumber");

const scoreCircle =
document.querySelector(".score-circle");

const urlInput =
document.getElementById("urlInput");


let scoreAnimation;


// =====================
// Score Animation
// =====================

function animateScore(target){


clearInterval(scoreAnimation);


target = Number(target);


if(isNaN(target)){
target = 0;
}


target = Math.max(0, Math.min(100,target));



let current = 0;


scoreNumber.innerText = "0";



scoreAnimation =
setInterval(()=>{


current++;


scoreNumber.innerText =
current;



if(current >= target){

clearInterval(scoreAnimation);

}


},20);



}




// =====================
// Circle Update
// =====================


function updateCircle(score){


score =
Math.max(0,Math.min(100,score));



scoreCircle.style.background =

`conic-gradient(
#00bfff ${score}%,
#222 ${score}%
)`;

}





// =====================
// Scanner Animation
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


const element =
document.getElementById(step);



element.classList.add("active");



if(index>0){


const previous =
document.getElementById(
steps[index-1]
);



previous.classList.remove(
"active"
);


previous.classList.add(
"done"
);


}



},index*700);


});


}








// =====================
// API SCAN
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






// Website invalid


if(data.found === false){


alert(
"❌ "
+
(data.error ||
"Website not found")
);



results.classList.add("hidden");


return;


}






// SCORE


animateScore(
data.score
||
data.privacy_score
);



updateCircle(
data.score
||
data.privacy_score
);







// HTTPS


document.getElementById(
"httpsResult"
).innerText =


data.https

?

"HTTPS connection detected"

:

"HTTPS not detected";








// TRACKERS


document.getElementById(
"trackerResult"
).innerText =


(data.trackers || 0)
+
" trackers detected";








// COOKIES


document.getElementById(
"cookieResult"
).innerText =


(data.cookies || 0)
+
" cookies found";









// RISK


document.getElementById(
"riskResult"
).innerText =


data.risk
||
"Unknown";









// TECHNOLOGY


const tech =
document.getElementById(
"technologyResult"
);



if(data.technologies &&
data.technologies.length){


tech.innerText =
data.technologies.join(", ");


}

else{


tech.innerText =
"No technologies detected";

}








// EXPOSED FILES


const exposed =
document.getElementById(
"exposedResult"
);



if(data.exposed_files &&
data.exposed_files.length){


exposed.innerText =
data.exposed_files.join(", ");


}

else{


exposed.innerText =
"No exposed files found";

}








// ISSUES


const issues =
document.getElementById(
"issuesResult"
);



if(data.issues &&
data.issues.length){



issues.innerHTML =
data.issues.map(issue=>{


return (

"⚠ <b>"
+
issue.severity
+
"</b> - "
+
issue.title
+
"<br>"
+
issue.description

);


}).join("<br><br>");



}

else{


issues.innerText =
"No security issues detected";


}










// RECOMMENDATIONS


const recommendation =
document.getElementById(
"recommendationList"
);



recommendation.innerHTML="";



if(data.recommendations &&
data.recommendations.length){



data.recommendations.forEach(item=>{


let li =
document.createElement("li");


li.innerText =
item;


recommendation.appendChild(li);


});


}

else{


recommendation.innerHTML =
"<li>Security configuration looks good</li>";

}






}



catch(error){


console.log(error);


alert(
"Unable to connect to Spectra Guard API"
);


}





}









// =====================
// BUTTON
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





results.classList.add(
"hidden"
);



scannerAnimation.classList.remove(
"hidden"
);



runScanSteps();





setTimeout(async()=>{


scannerAnimation.classList.add(
"hidden"
);



results.classList.remove(
"hidden"
);



await fetchReport(url);





analyzeBtn.innerText =
"Analyze";


analyzeBtn.disabled=false;



},3000);




});
