// ======================================
// Spectra Guard Frontend Controller v4
// ======================================


const analyzeBtn = document.getElementById("analyzeBtn");

const urlInput = document.getElementById("urlInput");

const scannerAnimation =
document.getElementById("scannerAnimation");

const results =
document.getElementById("results");





const API_URL =
"https://spectra-guard-api.kaagaazcoder-safe.workers.dev";









// Scanner animation steps

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



if(index > 0){


document
.getElementById(steps[index-1])
.classList.remove("active");

document
.getElementById(steps[index-1])
.classList.add("done");


}



current.classList.add("active");



}, index * 700);



});


}









// Main API request

async function scanWebsite(url){



try{



const response = await fetch(

API_URL +
"/scan?url=" +
encodeURIComponent(url)

);





const data =
await response.json();







if(!data.found){


alert(
"Website not found"
);


return;


}






// Save report

localStorage.setItem(

"scanResult",

JSON.stringify(data)

);






// Open report page

window.location.href =
"report.html";






}

catch(error){



console.error(error);


alert(

"Unable to connect to Spectra Guard API"

);



}



}









// Analyze button


if(analyzeBtn){


analyzeBtn.addEventListener(
"click",
()=>{


const website =
urlInput.value.trim();





if(!website){


alert(
"Please enter a website URL"
);


return;


}







let formattedURL =
website;






// Add https automatically

if(
!formattedURL.startsWith("http://")
&&
!formattedURL.startsWith("https://")
){


formattedURL =
"https://" + formattedURL;


}








analyzeBtn.innerText =
"Scanning...";


analyzeBtn.disabled =
true;







if(scannerAnimation){

scannerAnimation.classList.remove(
"hidden"
);

}



runScanSteps();







setTimeout(()=>{


scanWebsite(formattedURL);



},3000);




});


}
