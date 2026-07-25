// ======================================
// Spectra Guard Report Renderer v4
// ======================================



const result = 
JSON.parse(
    localStorage.getItem("scanResult")
);






if(!result){


document.getElementById("websiteName").innerText =
"No scan data found";


throw new Error(
"No scan result"
);


}









// Website

document.getElementById("websiteName").innerText =

result.website;








// Score

document.getElementById("score").innerText =

result.score;








// Risk

const risk =
document.getElementById("risk");



risk.innerText =

"Risk Level: " + result.risk;









// HTTPS

document.getElementById("https").innerText =

result.https

?
"✓ HTTPS enabled"

:
"✗ HTTPS not detected";









// Cookies

document.getElementById("cookies").innerText =

result.cookies +
" cookies detected";








// Trackers

document.getElementById("trackers").innerText =

result.trackers +
" trackers detected";









// Issues

const issuesBox =
document.getElementById("issues");



issuesBox.innerHTML = "";






if(
result.issues &&
result.issues.length > 0
){



result.issues.forEach(issue=>{


const div =
document.createElement("p");


if(typeof issue === "object"){


div.innerHTML =

"⚠ " +
issue.title +
"<br><small>" +
issue.description +
"</small>";


}
else{


div.innerText =
"⚠ " + issue;


}



issuesBox.appendChild(div);



});


}

else{


issuesBox.innerHTML =
"✓ No issues detected";


}









// Vulnerabilities

const vulnBox =
document.getElementById("vulnerabilities");



vulnBox.innerHTML = "";






if(
result.vulnerabilities &&
result.vulnerabilities.length > 0
){



result.vulnerabilities.forEach(v=>{


const div =
document.createElement("p");



if(typeof v === "object"){


div.innerHTML =

"⚠ " +
v.title +
" (" +
v.severity +
")";


}
else{


div.innerText =
"⚠ " + v;


}



vulnBox.appendChild(div);



});


}

else{


vulnBox.innerHTML =

"✓ No vulnerabilities detected";


}









// Recommendations


const recommendationList =

document.getElementById("recommendations");



recommendationList.innerHTML = "";






if(
result.recommendations &&
result.recommendations.length > 0
){



result.recommendations.forEach(item=>{


const li =
document.createElement("li");


li.innerText = item;


recommendationList.appendChild(li);



});


}

else{


recommendationList.innerHTML =

"<li>No recommendations</li>";


}
