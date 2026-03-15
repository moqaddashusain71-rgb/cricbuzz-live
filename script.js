const API="https://api.cricapi.com/v1/currentMatches?apikey6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb=;

let matches=[];

async function fetchMatches(){

const res=await fetch(API);
const data=await res.json();

matches=data.data;

loadLive();

}

function createCard(match){

return `

<div class="card">

<h3>${match.name}</h3>

<p>${match.status}</p>

<p>${match.date}</p>

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

function loadResults(){

const container=document.getElementById("content");

container.innerHTML="";

matches.forEach(m=>{

if(m.status.includes("won")){

container.innerHTML+=createCard(m);

}

});

}

function loadNews(){

const container=document.getElementById("content");

container.innerHTML=`

<div class="card">

<h3>Top Cricket News</h3>

<p>India squad announced</p>
<p>IPL auction updates</p>
<p>World Cup preparations</p>

</div>

`;

}

function loadPoints(){

const container=document.getElementById("content");

container.innerHTML=`

<div class="card">

<h3>IPL Points Table</h3>

<p>1. CSK</p>
<p>2. MI</p>
<p>3. RCB</p>
<p>4. GT</p>

</div>

`;

}

function loadStream(){

const container=document.getElementById("content");

container.innerHTML=`

<div class="card">

<h3>Watch Cricket Live</h3>

<iframe width="100%" height="220"
src="https://www.youtube.com/embed/live_stream?channel=CHANNEL_ID"
frameborder="0" allowfullscreen></iframe>

</div>

`;

}

document.getElementById("search").addEventListener("input",function(){

const val=this.value.toLowerCase();

const container=document.getElementById("content");

container.innerHTML="";

matches.forEach(m=>{

if(m.name.toLowerCase().includes(val)){

container.innerHTML+=createCard(m);

}

});

});

fetchMatches();

setInterval(fetchMatches,30000);
