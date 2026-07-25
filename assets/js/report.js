// Spectra Guard v4 Report


const scans =
JSON.parse(localStorage.getItem("spectraScans")) || [];



const latest =
scans[scans.length - 1];



if(!latest){


document.getElementById("websiteName").innerText =
"No scan available";


}
else{


document.getElementById("websiteName").innerText =
latest.website;



document.getElementById("reportScore").innerText =
latest.score;



document.getElementById("reportRisk").innerText =
latest.risk;



document.getElementById("reportHTTPS").innerText =
latest.https
?
"HTTPS Enabled"
:
"HTTPS Missing";



document.getElementById("reportTechnology").innerText =
latest.technologies?.join(", ")
||
"No data";



document.getElementById("reportCookies").innerText =
latest.cookies +
" cookies";



document.getElementById("reportTrackers").innerText =
latest.trackers +
" trackers";





const vulnerabilityBox =
document.getElementById("vulnerabilityBox");



if(latest.vulnerabilities?.length){


vulnerabilityBox.innerHTML =

latest.vulnerabilities.map(v=>`

<p>
⚠ ${v.severity} -
${v.title}
</p>

`).join("");

}

else{


vulnerabilityBox.innerHTML =
"<p>No vulnerabilities detected</p>";

}







const issueBox =
document.getElementById("issueBox");



if(latest.issues?.length){


issueBox.innerHTML =

latest.issues.map(i=>`

<p>
⚠ ${i.title}
</p>

`).join("");

}

else{


issueBox.innerHTML =
"<p>No issues detected</p>";

}








const recommendation =
document.getElementById(
"reportRecommendations"
);



if(latest.recommendations?.length){


recommendation.innerHTML =

latest.recommendations.map(r=>`

<li>
${r}
</li>

`).join("");

}

}
