const API="https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

let allMatches=[];
let currentTab="live";

async function loadMatches(){

const res=await fetch(API);
const data=await res.json();

allMatches=data.data;

renderMatches();

}

function renderMatches(){

let html="";

let search=document.getElementById("search").value.toLowerCase();

allMatches.forEach(match=>{

let team1=match.teams?.[0] || "";
let team2=match.teams?.[1] || "";
let status=match.status || "";

let score="Match not started";

if(match.score && match.score.length){

score=match.score.map(s=>`${s.r}/${s.w} (${s.o} ov)`).join(" | ");

}

let type="live";

if(status.toLowerCase().includes("won")) type="result";
if(status.toLowerCase().includes("start")) type="upcoming";

if(type!==currentTab) return;

if(!(team1+" "+team2).toLowerCase().includes(search)) return;

html+=`

<div class="match">

<h3>${team1} vs ${team2}</h3>

<p class="live-dot">🔴 ${type.toUpperCase()}</p>

<p>🏏 ${score}</p>

<p>${status}</p>

</div>

`;

});

document.getElementById("matches").innerHTML=html || "No matches found";

}

function showTab(tab){

currentTab=tab;

renderMatches();

}

document.getElementById("search").addEventListener("input",renderMatches);

loadMatches();

setInterval(loadMatches,30000);
