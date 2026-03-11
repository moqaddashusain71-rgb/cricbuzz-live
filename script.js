const API="https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

async function loadMatches(){

try{

const res = await fetch(API);
const data = await res.json();

const container = document.getElementById("matches");

container.innerHTML="";

data.data.forEach(match=>{

let scores="";

if(match.score){

match.score.forEach(s=>{
scores+=`${s.inning} : ${s.r}/${s.w} (${s.o} ov)<br>`;
});

}

container.innerHTML+=`

<div class="match">

<h3>${match.name}</h3>

<div class="score">
${scores}
</div>

<p>${match.status}</p>

</div>

`;

});

}catch(err){

document.getElementById("matches").innerHTML="Error loading matches";

}

}

loadMatches();

setInterval(loadMatches,5000);
