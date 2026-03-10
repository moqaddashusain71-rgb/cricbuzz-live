const API = "https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

async function loadMatches(){

const res = await fetch(API);
const data = await res.json();

const matches = data.data;

const container = document.getElementById("matches");

container.innerHTML="";

matches.forEach(match=>{

const div=document.createElement("div");
div.className="match";

div.innerHTML=`

<h3>${match.name}</h3>
<p>${match.status}</p>

`;

container.appendChild(div);

});

}

loadMatches();

setInterval(loadMatches,30000);
