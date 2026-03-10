async function loadMatches(){

const url="https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb&offset=0"
  ;const API="https://api.cricapi.com/v1/currentMatches?apikey=YOUR_API_KEY";

async function loadMatches(){

const res=await fetch(API);
const data=await res.json();

const matches=data.data;

const container=document.getElementById("matches");

container.innerHTML="";

matches.forEach(match=>{

const card=document.createElement("a");

card.href="match.html?id="+match.id;

card.innerHTML=`

<div class="match-card">

<h3>${match.name}</h3>

<div class="team">
<span>${match.teams[0]}</span>
</div>

<div class="team">
<span>${match.teams[1]}</span>
</div>

<div class="status">${match.status}</div>

</div>

`;

container.appendChild(card);

});

}

loadMatches();

setInterval(loadMatches,10000);
