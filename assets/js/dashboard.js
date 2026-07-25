// Spectra Guard v4 Dashboard


const websiteCount =
document.querySelector(".stats-grid .dashboard-card:nth-child(1) span");


const averageScore =
document.querySelector(".stats-grid .dashboard-card:nth-child(2) span");


const threatCount =
document.querySelector(".stats-grid .dashboard-card:nth-child(3) span");



const emptyState =
document.querySelector(".empty-state");



const scans =
JSON.parse(localStorage.getItem("spectraScans")) || [];




// Update statistics


if(scans.length > 0){


websiteCount.innerText =
scans.length;



let total = 0;

let threats = 0;



scans.forEach(scan=>{


total += scan.score || 0;



if(scan.risk === "High" ||
scan.risk === "Critical"){

threats++;

}


});



averageScore.innerText =
Math.round(total/scans.length);



threatCount.innerText =
threats;



emptyState.innerHTML = "";



scans.forEach(scan=>{


const card =
document.createElement("div");



card.className =
"dashboard-card";



card.innerHTML = `

<h3>${scan.website}</h3>

<p>
Score:
<b>${scan.score}/100</b>
</p>

<p>
Risk:
${scan.risk}
</p>

<a href="report.html">
View Report
</a>

`;



emptyState.appendChild(card);



});



}
