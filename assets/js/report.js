// =================================
// Spectra Guard v4 Report System
// =================================



const scans =

JSON.parse(
localStorage.getItem("spectraScans")
)

||

[];





const latestScan =
scans[scans.length - 1];






if(!latestScan){



document.getElementById(
"websiteName"
).innerText =

"No scan data available";



}

else{







// Website


document.getElementById(
"websiteName"
).innerText =

latestScan.website;








// Score


document.getElementById(
"reportScore"
).innerText =

latestScan.score;








// Risk


document.getElementById(
"reportRisk"
).innerText =

latestScan.risk;








// HTTPS


document.getElementById(
"reportHTTPS"
).innerText =


latestScan.https

?

"Secure HTTPS connection"

:

"HTTPS not detected";









// Cookies


document.getElementById(
"reportCookies"
).innerText =


(latestScan.cookies || 0)

+
" cookies detected";









// Trackers


document.getElementById(
"reportTrackers"
).innerText =


(latestScan.trackers || 0)

+
" trackers detected";









// Technologies


document.getElementById(
"reportTechnology"
).innerText =


latestScan.technologies &&

latestScan.technologies.length

?

latestScan.technologies.join(", ")

:

"No technologies detected";











// Vulnerabilities


const vulnerabilityBox =

document.getElementById(
"vulnerabilityBox"
);



if(
latestScan.vulnerabilities &&

latestScan.vulnerabilities.length

){



vulnerabilityBox.innerHTML =



latestScan.vulnerabilities.map(v=>`


<div class="info-card">


<h3>
⚠ ${v.severity}
</h3>


<p>
${v.title}
</p>


<small>
${v.description || ""}
</small>


</div>


`).join("");



}

else{


vulnerabilityBox.innerHTML =

`

<div class="info-card">

<p>
No vulnerabilities detected
</p>

</div>

`;

}









// Issues


const issueBox =

document.getElementById(
"issueBox"
);



if(

latestScan.issues &&

latestScan.issues.length

){



issueBox.innerHTML =



latestScan.issues.map(issue=>`


<div class="info-card">


<h3>
⚠ ${issue.severity}
</h3>


<p>
${issue.title}
</p>


<small>
${issue.description || ""}
</small>


</div>


`).join("");



}

else{


issueBox.innerHTML =

`

<div class="info-card">

<p>
No security issues detected
</p>

</div>

`;

}









// Recommendations


const recommendations =

document.getElementById(
"reportRecommendations"
);



if(

latestScan.recommendations &&

latestScan.recommendations.length

){



recommendations.innerHTML =



latestScan.recommendations.map(item=>`

<li>
${item}
</li>

`).join("");



}

else{


recommendations.innerHTML =

`

<li>
No recommendations available
</li>

`;

}



}
