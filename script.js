const API_KEY = "YOUR_API_KEY";

async function loadMatches(){

let url =
`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`;

let response = await fetch(url);

let data = await response.json();

let matchesHTML = "";

data.data.forEach(match => {

matchesHTML += `

<div class="match-card">

<h3>${match.name}</h3>

<div class="team">
<span>${match.teamInfo[0].name}</span>
<span>${match.score?.[0]?.r || "-"} / ${match.score?.[0]?.w || "-"}</span>
</div>

<div class="team">
<span>${match.teamInfo[1].name}</span>
<span>-</span>
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
