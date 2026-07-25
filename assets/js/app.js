// =====================================
// Spectra Guard v4 - Main Scanner
// =====================================


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



let scoreInterval;





// =====================================
// Score Animation
// =====================================


function animateScore(target){


clearInterval(scoreInterval);


target =
Math.max(
0,
Math.min(100,Number(target))
);



let current = 0;


scoreNumber.innerText = "0";



scoreInterval =
setInterval(()=>{


current++;


scoreNumber.innerText =
current;



if(current >= target){


clearInterval(scoreInterval);


}


},20);



}








// =====================================
// Circle Animation
// =====================================


function updateCircle(score){


score =
Math.max(
0,
Math.min(100,score)
);



scoreCircle.style.background =

`conic-gradient(
#00bfff ${score}%,
#222 ${score}%
)`;



}








// =====================================
// Scanner Steps
// =====================================


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



if(element){

element.classList.add("active");

}



},index*700);



});


}









// =====================================
// Save Scan
// =====================================


function saveScan(data,url){



let scans =

JSON.parse(
localStorage.getItem("spectraScans")
)
||
[];





const scan = {


website:
data.website || url,


score:
data.score ||
data.privacy_score ||
0,


risk:
data.risk ||
"Unknown",



https:
data.https || false,


cookies:
data.cookies || 0,


trackers:
data.trackers || 0,


technologies:
data.technologies || [],


vulnerabilities:
data.vulnerabilities || [],


issues:
data.issues || [],


recommendations:
data.recommendations || [],


date:
new Date()
.toLocaleDateString()



};






// Remove duplicate same website


scans =
scans.filter(item=>
item.website !== scan.website
);



scans.push(scan);





localStorage.setItem(

"spectraScans",

JSON.stringify(scans)

);



}









// =====================================
// Fetch API Report
// =====================================


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






if(data.found === false){


alert(
"❌ "
+
data.error
);


return;


}







// Score


const score =

data.score ||
data.privacy_score ||
0;



animateScore(score);


updateCircle(score);










// HTTPS


document.getElementById(
"httpsResult"
).innerText =


data.https

?

"HTTPS Enabled"

:

"HTTPS Missing";









// Risk


document.getElementById(
"riskResult"
).innerText =


data.risk;









// Trackers


document.getElementById(
"trackerResult"
).innerText =


(data.trackers || 0)
+
" trackers";









// Cookies


document.getElementById(
"cookieResult"
).innerText =


(data.cookies || 0)
+
" cookies";









// Technology


const tech =
document.getElementById(
"technologyResult"
);



if(tech){


tech.innerText =


data.technologies &&
data.technologies.length

?

data.technologies.join(", ")

:

"No technologies detected";


}









// Exposure


const exposure =
document.getElementById(
"exposedResult"
);



if(exposure){


exposure.innerText =


data.exposed_files &&
data.exposed_files.length

?

data.exposed_files.join(", ")

:

"No exposed files";


}










// Issues


const issues =
document.getElementById(
"issuesResult"
);



if(issues){



if(data.issues &&
data.issues.length){



issues.innerHTML =


data.issues.map(issue=>{


return `

<p>

⚠ <b>
${issue.severity}
</b>

<br>

${issue.title}

<br>

${issue.description}

</p>

`;


}).join("");



}

else{


issues.innerHTML =
"No issues detected";

}


}









// Recommendations


const recommendationList =

document.getElementById(
"recommendationList"
);



if(recommendationList){


recommendationList.innerHTML="";



if(
data.recommendations &&
data.recommendations.length
){



data.recommendations.forEach(item=>{


let li =
document.createElement("li");


li.innerText=item;


recommendationList.appendChild(li);



});


}

else{


recommendationList.innerHTML =

"<li>No recommendations</li>";


}


}








// Save for dashboard/report


saveScan(data,url);






}

catch(error){


console.log(error);



alert(
"Unable to connect to Spectra Guard API"
);



}



}









// =====================================
// Scan Button
// =====================================


analyzeBtn.addEventListener(

"click",

()=>{



const url =
urlInput.value.trim();





if(!url){


alert(
"Please enter a website"
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
"Scan Website";



analyzeBtn.disabled=false;




},3000);




});
