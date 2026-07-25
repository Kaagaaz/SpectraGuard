// ======================================
// Spectra Guard v5.1
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


const steps = [

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



if(index > 0){


const previous =
document.getElementById(
steps[index-1]
);



if(previous){

previous.classList.remove("active");

previous.classList.add("done");

}


}



}, index * 700);



});


}







function animateScore(score){


const scoreNumber =
document.getElementById(
"scoreNumber"
);



let current = 0;



const timer =
setInterval(()=>{


current++;


scoreNumber.innerText =
current;



if(current >= score){


clearInterval(timer);


}


},15);



}







function updateRisk(risk){


const element =
document.getElementById(
"riskResult"
);



element.className = "";




if(risk==="Low"){


element.innerHTML =
"🟢 Low Risk";


element.classList.add(
"risk-low"
);


}


else if(risk==="Medium"){


element.innerHTML =
"🟡 Medium Risk";


element.classList.add(
"risk-medium"
);


}


else if(risk==="High"){


element.innerHTML =
"🟠 High Risk";


element.classList.add(
"risk-high"
);


}


else{


element.innerHTML =
"🔴 Critical Risk";


element.classList.add(
"risk-critical"
);


}


}









async function scanWebsite(url){


try{


const response =
await fetch(

API_URL+
"/scan?url="+
encodeURIComponent(url)

);



const data =
await response.json();





if(!data.found){


alert(
data.error
||
"Website not found"
);


results.classList.add(
"hidden"
);


return;


}






results.classList.remove(
"hidden"
);






// Score

animateScore(
data.score
);



// Risk

updateRisk(
data.risk
);






// HTTPS

document.getElementById(
"httpsResult"
).innerText =


data.https

?

"✓ HTTPS enabled"

:

"✗ HTTPS missing";









// Cookies count

document.getElementById(
"cookieResult"
).innerText =


data.cookies.count

+

" cookies detected";









// Trackers count

document.getElementById(
"trackerResult"
).innerText =


data.trackers.length

+

" trackers detected";









// Technologies

document.getElementById(
"technologyResult"
).innerText =


data.technologies.length

?

data.technologies.join(", ")

:

"Not detected";









// Security headers


let headers = "";



Object.entries(
data.securityHeaders
).forEach(([key,value])=>{


headers +=

value

?

"✓ "

:

"⚠ "

+

key

+

"<br>";


});



document.getElementById(
"securityHeaderResult"
).innerHTML =
headers;









// Cookie security


const cookie =
data.cookies;



document.getElementById(
"cookieSecurityResult"
).innerHTML =


"Secure: "

+

(
cookie.secure
?
"✓"
:
"⚠"
)

+

"<br>HttpOnly: "

+

(
cookie.httpOnly
?
"✓"
:
"⚠"
)

+

"<br>SameSite: "

+

(
cookie.sameSite
?
"✓"
:
"⚠"
);









// Tracker details


document.getElementById(
"trackerDetailResult"
).innerHTML =


data.trackers.length

?

data.trackers.join("<br>")

:

"✓ No trackers detected";









// Issues


const issuesBox =
document.getElementById(
"issuesResult"
);



issuesBox.innerHTML = "";




if(data.issues.length){


data.issues.forEach(issue=>{


issuesBox.innerHTML +=

"⚠ "

+

issue.title

+

"<br>";


});


}

else{


issuesBox.innerHTML =
"✓ No issues detected";


}









// Vulnerabilities


const vulnBox =
document.getElementById(
"vulnerabilityResult"
);



vulnBox.innerHTML="";




if(data.vulnerabilities.length){


data.vulnerabilities.forEach(v=>{


vulnBox.innerHTML +=

"⚠ "

+

v.title

+

"<br>";


});


}

else{


vulnBox.innerHTML =
"✓ No vulnerabilities detected";


}









// Recommendations


const list =
document.getElementById(
"recommendationList"
);



list.innerHTML="";



data.recommendations.forEach(item=>{


const li =
document.createElement(
"li"
);


li.innerText=item;


list.appendChild(li);


});







}

catch(error){


console.error(error);


alert(
"API connection failed"
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


analyzeBtn.disabled =
true;



results.classList.add(
"hidden"
);



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


analyzeBtn.disabled =
false;



},3000);



});
