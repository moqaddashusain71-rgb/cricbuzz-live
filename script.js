const API="https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

async function loadMatches(){

const res=await fetch(API);

const data=await res.json();

const matches=data.data;

let html="";

matches.forEach(match=>{

let score="Match not started";

if(match.score && match.score.length>0){

score=match.score[0].r+"/"+match.score[0].w+" ("+match.score[0].o+" ov)";

}

html+=`

<div class="match">

<h3>${match.name}</h3>

<p>🔴 ${match.status}</p>

<p>Score: ${score}</p>

<p>Top Scorer: Player1 0(0)</p>

<p>Wickets: Bowler1 0/0</p>

</div>

`;

});

document.getElementById("matches").innerHTML=html;

}

loadMatches();

setInterval(loadMatches,30000);
