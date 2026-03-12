const API="https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

async function loadMatches(){

try{

const res=await fetch(API);
const data=await res.json();

const matches=data.data;

let html="";

matches.forEach(match=>{

let team1 = match.teams?.[0] || "Team A";
let team2 = match.teams?.[1] || "Team B";

let status = match.status || "Match starting soon";

let score="Match not started";

if(match.score && match.score.length){

score = match.score.map(s=>{
return `${s.r}/${s.w} (${s.o} ov)`
}).join(" | ");

}

html+=`

<div class="match">

<h3>${team1} vs ${team2}</h3>

<p class="live">🔴 LIVE</p>

<p>🏏 Score: ${score}</p>

<p>📢 Status: ${status}</p>

</div>

`;

});

document.getElementById("matches").innerHTML=html;

}catch{

document.getElementById("matches").innerHTML="⚠️ Error loading matches";

}

}

loadMatches();

setInterval(loadMatches,30000);
