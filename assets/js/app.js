// ======================================
// Spectra Guard v5
// Single Page Scanner Controller
// ======================================


const analyzeBtn =
document.getElementById("analyzeBtn");


const urlInput =
document.getElementById("urlInput");


const results =
document.getElementById("results");


const scannerAnimation =
document.getElementById("scannerAnimation");



const API_URL =
"https://spectra-guard-api.kaagaazcoder-safe.workers.dev";







function runScanSteps(){


const steps=[

"step1",
"step2",
"step3",
"step4"

];



steps.forEach((step,index)=>{


setTimeout(()=>{


const current =
document.getElementById(step);



if(current){

current.classList.add("active");

}



if(index>0){


const previous =
document.getElementById(
steps[index-1]
);


if(previous){

previous.classList.remove("active");

previous.classList.add("done");

}


}



},index*700);



});


}








function animateScore(target){


const scoreNumber =
document.getElementById("scoreNumber");


if(!scoreNumber)
return;



let current=0;



const timer=setInterval(()=>{


current++;


scoreNumber.innerText=current;



if(current>=target){

clearInterval(timer);

}


},15);



}








async function scanWebsite(url){



try{



const response = await fetch(

API_URL+
"/scan?url="+
encodeURIComponent(url)

);



const data =
await response.json();






if(!data.found){


alert(
data.error ||
"Website not found"
);


results.classList.add("hidden");


return;


}







results.classList.remove("hidden");







// Score

animateScore(data.score);







// HTTPS


const httpsResult =
document.getElementById(
"httpsResult"
);



if(httpsResult){

httpsResult.innerText =

data.https

?
"HTTPS enabled"

:
"HTTPS not detected";

}









// Cookies


const cookieResult =
document.getElementById(
"cookieResult"
);



if(cookieResult){

cookieResult.innerText =

data.cookies+
" cookies detected";

}









// Trackers


const trackerResult =
document.getElementById(
"trackerResult"
);



if(trackerResult){

trackerResult.innerText =

data.trackers+
" trackers detected";

}









// Risk


const riskResult =
document.getElementById(
"riskResult"
);



if(riskResult){

riskResult.innerText =

data.risk;

}









// Issues


const issuesResult =
document.getElementById(
"issuesResult"
);



if(issuesResult){



if(
data.issues &&
data.issues.length>0
){


issuesResult.innerHTML =

data.issues.map(issue=>{


if(typeof issue==="object"){


return "⚠ "+
issue.title+
"<br>";

}


return "⚠ "+issue;


}).join("");



}

else{


issuesResult.innerHTML =

"✓ No issues detected";


}


}









// Vulnerabilities


const vulnerabilityResult =
document.getElementById(
"vulnerabilityResult"
);



if(vulnerabilityResult){



if(
data.vulnerabilities &&
data.vulnerabilities.length>0
){


vulnerabilityResult.innerHTML =

data.vulnerabilities.map(v=>{


if(typeof v==="object"){


return "⚠ "+
v.title+
"<br>";

}


return "⚠ "+v;


}).join("");



}

else{


vulnerabilityResult.innerHTML =

"✓ No vulnerabilities detected";


}



}









// Technologies


const technologyResult =
document.getElementById(
"technologyResult"
);



if(technologyResult){


technologyResult.innerText =

data.technologies &&
data.technologies.length

?

data.technologies.join(", ")

:

"Not detected";


}









// Recommendations


const recommendationList =
document.getElementById(
"recommendationList"
);



if(recommendationList){


recommendationList.innerHTML="";



if(data.recommendations){



data.recommendations.forEach(item=>{


const li =
document.createElement("li");


li.innerText=item;


recommendationList.appendChild(li);



});


}



}







}

catch(error){


console.error(error);


alert(
"Cannot connect to Spectra Guard API"
);


}

}









analyzeBtn.addEventListener(
"click",
()=>{


let url =
urlInput.value.trim();





if(!url){


alert(
"Enter a website URL"
);


return;


}






if(
!url.startsWith("http://")
&&
!url.startsWith("https://")
){


url =
"https://"+url;


}






analyzeBtn.innerText =
"Scanning...";


analyzeBtn.disabled=true;





results.classList.add("hidden");



if(scannerAnimation){

scannerAnimation.classList.remove(
"hidden"
);

}



runScanSteps();






setTimeout(()=>{


scanWebsite(url);



if(scannerAnimation){

scannerAnimation.classList.add(
"hidden"
);

}



analyzeBtn.innerText =
"Analyze";


analyzeBtn.disabled=false;



},3000);



});
