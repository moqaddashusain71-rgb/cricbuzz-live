async function loadMatches(){

const url="https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb&offset=0";

const res=await fetch(url);
const data=await res.json();

const container=document.getElementById("matches");

container.innerHTML="";

data.data.forEach(match=>{

let score="";

if(match.score){
score=match.score[0].r + "/" + match.score[0].w + " (" + match.score[0].o + " ov)";
}

container.innerHTML+=`

<div class="match">
<h3>${match.name}</h3>
<div class="score">${score}</div>
<div class="status">${match.status}</div>
</div>

`;

});

}

loadMatches();

setInterval(loadMatches,30000);
