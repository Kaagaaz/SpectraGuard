const analyzeBtn =
document.getElementById("analyzeBtn");

const results =
document.getElementById("results");

const scannerAnimation =
document.getElementById("scannerAnimation");

const scoreNumber =
document.getElementById("scoreNumber");

const scoreCircle =
document.querySelector(".score-circle");

const urlInput =
document.getElementById("urlInput");


let scoreTimer;




function animateScore(target){


clearInterval(scoreTimer);


target =
Math.max(0,Math.min(100,Number(target)));



let current=0;


scoreNumber.innerText="0";



scoreTimer=setInterval(()=>{


current++;


scoreNumber.innerText=current;



if(current>=target){

clearInterval(scoreTimer);

}


},20);


}





function updateCircle(score){


score=
Math.max(0,Math.min(100,score));


scoreCircle.style.background=

`conic-gradient(
#00bfff ${score}%,
#222 ${score}%
)`;


}








function runScanSteps(){


[
"step1",
"step2",
"step3",
"step4"

].forEach((step,index)=>{


setTimeout(()=>{


document
.getElementById(step)
.classList.add("active");



},index*700);



});


}








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






if(data.found===false){


alert(
"❌ "
+
data.error
);


results.classList.add("hidden");


return;


}






let score =
data.score ||
data.privacy_score ||
0;



animateScore(score);

updateCircle(score);







document.getElementById(
"httpsResult"
).innerText =


data.https

?
"HTTPS connection detected"

:

"HTTPS not detected";







document.getElementById(
"trackerResult"
).innerText =

(data.trackers || 0)
+
" trackers detected";








document.getElementById(
"cookieResult"
).innerText =

(data.cookies || 0)
+
" cookies found";









document.getElementById(
"riskResult"
).innerText =

data.risk;









const tech =
document.getElementById(
"technologyResult"
);



tech.innerText =


data.technologies &&
data.technologies.length

?

data.technologies.join(", ")

:

"No technologies detected";









const exposed =
document.getElementById(
"exposedResult"
);



exposed.innerText =


data.exposed_files &&
data.exposed_files.length

?

data.exposed_files.join(", ")

:

"No exposed files";










const securityTXT =
document.getElementById(
"securityTxtResult"
);



if(securityTXT){


securityTXT.innerText =

data.security_txt

?

"Security contact found"

:

"No security.txt found";


}









const vulnerability =
document.getElementById(
"vulnerabilityResult"
);



if(vulnerability){



if(
data.vulnerabilities &&
data.vulnerabilities.length
){



vulnerability.innerHTML =

data.vulnerabilities

.map(v=>

"⚠ "
+
v.severity
+
" - "
+
v.title

)

.join("<br>");



}

else{


vulnerability.innerText =
"No vulnerabilities detected";

}


}









const issues =
document.getElementById(
"issuesResult"
);



if(data.issues && data.issues.length){



issues.innerHTML =

data.issues.map(issue=>


"⚠ <b>"
+
issue.severity
+
"</b> "
+
issue.title
+
"<br>"
+
issue.description


).join("<br><br>");



}

else{


issues.innerText =
"No security issues detected";


}









const recommendations =
document.getElementById(
"recommendationList"
);



recommendations.innerHTML="";





if(
data.recommendations &&
data.recommendations.length
){



data.recommendations.forEach(item=>{


let li =
document.createElement("li");


li.innerText=item;


recommendations.appendChild(li);


});


}

else{


recommendations.innerHTML=

"<li>No recommendations</li>";

}



}




catch(error){


console.log(error);


alert(
"API connection failed"
);


}



}








analyzeBtn.addEventListener(
"click",
()=>{


const url =
urlInput.value.trim();



if(!url){


alert(
"Enter a website URL"
);


return;


}



analyzeBtn.innerText=
"Scanning...";


analyzeBtn.disabled=true;



results.classList.add("hidden");


scannerAnimation.classList.remove("hidden");



runScanSteps();





setTimeout(async()=>{


scannerAnimation.classList.add("hidden");


results.classList.remove("hidden");



await fetchReport(url);



analyzeBtn.innerText=
"Analyze";


analyzeBtn.disabled=false;



},3000);



});
