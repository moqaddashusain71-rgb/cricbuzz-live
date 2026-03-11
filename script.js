const API="https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

async function loadMatches(){

const res = await fetch(API);
const data = await res.json();

const matches = data.data;

const container = document.getElementById("matches");

container.innerHTML="";

matches.forEach(m=>{

let team1 = m.teams[0];
let team2 = m.teams[1];

let scoreHTML="";

if(m.score){

m.score.forEach(s=>{

let teamName="";

if(s.inning.toLowerCase().includes(team1.toLowerCase())){
teamName=team1;
}else if(s.inning.toLowerCase().includes(team2.toLowerCase())){
teamName=team2;
}

scoreHTML+=`
${teamName} : ${s.r}/${s.w} (${s.o} ov)<br>
`;

});

}

let live="";

if(m.status.toLowerCase().includes("live")){
live=`<span class="live">🔴 LIVE</span>`;
}

container.innerHTML+=`

<div class="match">

<h3>${team1} vs ${team2} ${live}</h3>

<div class="score">
${scoreHTML}
</div>

<div class="status">
${m.status}
</div>

</div>

`;

});

}

loadMatches();

setInterval(loadMatches,5000);
