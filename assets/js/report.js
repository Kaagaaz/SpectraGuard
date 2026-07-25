// ======================================
// Spectra Guard Report Controller
// ======================================


const API_URL =
"https://spectra-guard-api.kaagaazcoder-safe.workers.dev";





const params = new URLSearchParams(
    window.location.search
);



const websiteURL =
params.get("url");







async function loadReport(){



if(!websiteURL){


document.getElementById("websiteName").innerText =
"No website provided";


return;


}






try{



const response = await fetch(

API_URL +
"/scan?url=" +
encodeURIComponent(websiteURL)

);






const data = await response.json();







if(!data.found){


document.getElementById("websiteName").innerText =
"Website not found";


return;


}







// Website name

document.getElementById("websiteName").innerText =
data.website;






// Score

document.getElementById("score").innerText =
data.score;






// Risk

document.getElementById("risk").innerText =
"Risk Level: " + data.risk;








// HTTPS

document.getElementById("https").innerText =

data.https

? "✓ HTTPS enabled"

: "✗ HTTPS not detected";








// Cookies

document.getElementById("cookies").innerText =

data.cookies +
" cookies detected";








// Trackers

document.getElementById("trackers").innerText =

data.trackers +
" trackers detected";









// Vulnerabilities

const vulnBox =
document.getElementById("vulnerabilities");



vulnBox.innerHTML = "";






if(
data.vulnerabilities &&
data.vulnerabilities.length > 0
){



data.vulnerabilities.forEach(v=>{


const item =
document.createElement("p");


item.innerHTML =
"⚠ " +
v.title +
" (" +
v.severity +
")";


vulnBox.appendChild(item);



});



}

else{


vulnBox.innerHTML =
"✓ No vulnerabilities detected";


}









// Recommendations


const list =
document.getElementById("recommendations");


list.innerHTML = "";





if(
data.recommendations
){



data.recommendations.forEach(r=>{


const li =
document.createElement("li");


li.innerText = r;


list.appendChild(li);


});


}





}


catch(error){



console.error(error);


document.getElementById("websiteName").innerText =
"Unable to connect to API";


}



}






loadReport();
