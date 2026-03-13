const params=new URLSearchParams(location.search);
const id=params.get("id");

const API=`https://api.cricapi.com/v1/match_info?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb&id=${id}`;

async function loadMatch(){

const res=await fetch(API);
const data=await res.json();

const m=data.data;

document.getElementById("match").innerHTML=`

<h2>${m.name}</h2>

<p>Status: ${m.status}</p>

<p>Venue: ${m.venue}</p>

`;

}

loadMatch();
