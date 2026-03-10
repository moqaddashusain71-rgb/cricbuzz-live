const API_KEY = "6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

async function loadMatches(){

let url =
`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`;

let response = await fetch(url);

let data = await response.json();

let matchesHTML = "";

data.data.forEach(match => {

let score = "-";

if(match.score && match.score.length > 0){

score =
match.score[0].r + "/" +
match.score[0].w +
" (" + match.score[0].o + " ov)";

}

matchesHTML += `

<div class="match-card">

<h3>${match.name}</h3>

<div class="team">
<span>${match.teamInfo[0].name}</span>
<span>${score}</span>
</div>

<div class="team">
<span>${match.teamInfo[1].name}</span>
<span></span>
</div>

<div class="status">
${match.status}
</div>

</div>

`;

});

document.getElementById("matches").innerHTML = matchesHTML;

}

loadMatches();

setInterval(loadMatches,30000);
