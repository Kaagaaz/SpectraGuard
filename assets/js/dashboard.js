// =================================
// Spectra Guard v4 Dashboard
// =================================


const scans =
JSON.parse(
localStorage.getItem("spectraScans")
)
||
[];





const websiteCount =
document.getElementById(
"websiteCount"
);


const averageScore =
document.getElementById(
"averageScore"
);


const threatCount =
document.getElementById(
"threatCount"
);


const websiteList =
document.getElementById(
"websiteList"
);


const scanHistory =
document.getElementById(
"scanHistory"
);







// ================================
// Statistics
// ================================


if(scans.length > 0){


websiteCount.innerText =
scans.length;



let totalScore = 0;

let threats = 0;



scans.forEach(scan=>{


totalScore +=
Number(scan.score || 0);



if(
scan.risk === "High" ||
scan.risk === "Critical"
){

threats++;

}


});



averageScore.innerText =
Math.round(
totalScore / scans.length
);



threatCount.innerText =
threats;



}







// ================================
// Website Cards
// ================================


if(scans.length > 0){


websiteList.innerHTML = "";



scans.reverse().forEach(scan=>{



const card =
document.createElement("div");



card.className =
"info-card";



card.innerHTML = `


<h3>
🌐 ${scan.website}
</h3>


<p>
Security Score:
<b>
${scan.score}/100
</b>
</p>


<p>
Risk:
${scan.risk}
</p>


<p>
Last Scan:
${scan.date}
</p>


<a href="report.html"
class="report-button">

View Report

</a>


`;



websiteList.appendChild(card);



});



}









// ================================
// Scan History
// ================================


if(scans.length > 0){


scanHistory.innerHTML = "";



scans.forEach(scan=>{


const item =
document.createElement("div");



item.className =
"info-card";



item.innerHTML = `


<h3>
${scan.website}
</h3>


<p>
Score:
${scan.score}/100
</p>


<p>
Risk:
${scan.risk}
</p>


<small>
${scan.date}
</small>


`;



scanHistory.appendChild(item);



});



}
