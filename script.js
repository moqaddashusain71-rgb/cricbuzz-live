const API_KEY = "6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

async function loadMatches(){
  const container = document.getElementById("matches");
  try{
    const res = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}`);
    const data = await res.json();
    container.innerHTML="";
    if(!data.data || data.data.length===0){
      container.innerHTML="No live matches right now";
      return;
    }
    data.data.forEach(match=>{
      const div = document.createElement("div");
      div.className="match";
      div.innerHTML = `<h3>${match["team-1"]} vs ${match["team-2"]}</h3><p>Score: ${match.score||"-"}</p><p>Status: ${match.status||"Live"}</p>`;
      div.onclick = ()=>{ window.location.href = `match.html?id=${match.unique_id}`; }
      container.appendChild(div);
    });
  } catch(err){
    container.innerHTML="❌ API Error - Live score unavailable";
    console.log(err);
  }
}

loadMatches();
setInterval(loadMatches,15000);
