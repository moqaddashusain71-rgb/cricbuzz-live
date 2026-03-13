const API="https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

async function loadMatches(){

const res=await fetch(API);
const data=await res.json();

const container=document.getElementById("matches");

container.innerHTML="";

if(!data.data || data.data.length===0){

container.innerHTML="<h3>No matches available</h3>";
return;

}

data.data.forEach(m=>{

container.innerHTML+=`

<div class="card">

<h3>${m.name}</h3>

<p>${m.status}</p>

<a href="match.html?id=${m.id}">
<button>View Match</button>
</a>

</div>

`;

});

}

loadMatches();

setInterval(loadMatches,15000);
