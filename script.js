const API = "https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

async function loadMatches() {

const res = await fetch(API);
const data = await res.json();

const matches = data.data;

const container = document.getElementById("matches");

container.innerHTML = "";

matches.forEach(match => {

const div = document.createElement("div");
div.className = "match";

let scoreHTML = "";

if(match.score){

match.score.forEach(s => {

scoreHTML += `
<p><b>${s.inning}</b> : ${s.r}/${s.w} (${s.o} overs)</p>
`;

});

}

div.innerHTML = `

<h3>${match.name}</h3>

${scoreHTML}

<p class="status">${match.status}</p>

`;

container.appendChild(div);

});

}

loadMatches();

setInterval(loadMatches, 20000);
