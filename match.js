const API="https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

const urlParams=new URLSearchParams(window.location.search);
const matchId=urlParams.get("id");

async function loadScorecard(){

const res=await fetch(API);
const data=await res.json();

const match=data.data.find(m=>m.id===matchId);

const container=document.getElementById("scorecard");

container.innerHTML=`

<h2>${match.name}</h2>

<p>${match.status}</p>

`;

}

loadScorecard();
