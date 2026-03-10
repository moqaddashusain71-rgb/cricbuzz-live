const API_KEY = "6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

function loadMatches() {

fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`)
.then(response => response.json())
.then(data => {

const container = document.getElementById("matches");
container.innerHTML = "";

if(!data.data){
container.innerHTML = "<p>No live matches</p>";
return;
}

data.data.forEach(match => {

let scoreText = "No score yet";

if(match.score && match.score.length > 0){
scoreText = match.score[0].r + "/" + match.score[0].w +
" (" + match.score[0].o + " overs)";
}

container.innerHTML += `
<div class="match-card">
<h2>${match.name}</h2>
<p>Status: ${match.status}</p>
<p><strong>${scoreText}</strong></p>
</div>
`;

});

})
.catch(error => {
console.log("Error loading matches", error);
});

}

loadMatches();

setInterval(loadMatches, 10000);
