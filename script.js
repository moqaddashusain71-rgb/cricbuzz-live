const API="https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

let matches=[];

async function fetchMatches(){

const container=document.getElementById("content");

try{

const res=await fetch(API);
const data=await res.json();

if(!data.data){
container.innerHTML="API limit finished or error";
return;
}

matches=data.data;

loadLive();

}catch(err){

container.innerHTML="Error loading matches";

}

}

function createCard(match){

return `
<div class="card">

<h3>${match.name}</h3>

<p>${match.status}</p>

</div>
`;

}

function loadLive(){

const container=document.getElementById("content");

container.innerHTML="";

matches.forEach(m=>{

if(m.matchStarted){
container.innerHTML+=createCard(m);
}

});

}

function loadUpcoming(){

const container=document.getElementById("content");

container.innerHTML="";

matches.forEach(m=>{

if(!m.matchStarted){
container.innerHTML+=createCard(m);
}

});

}

fetchMatches();

setInterval(fetchMatches,30000);
