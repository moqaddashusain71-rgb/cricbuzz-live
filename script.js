const API_KEY = "6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

async function loadMatches(){
  const container = document.getElementById("matches");

  try{
    const res = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}`);
    if(!res.ok) throw new Error("API not responding");

    const data = await res.json();
    container.innerHTML="";

    if(!data.data || data.data.length===0){
      container.innerHTML="No live matches right now";
      return;
    }

    data.data.forEach(match=>{
      const team1 = match["team-1"];
      const team2 = match["team-2"];
      const score = match.score || "-";
      const status = match.status || "Live";

      const div = document.createElement("div");
      div.className="match";

      div.innerHTML=`
        <div class="match-info">
          <strong>${team1} vs ${team2}</strong><br>
          ${score}
        </div>
        <div class="live">${status}</div>
      `;

      div.onclick = ()=>{
        window.location.href = `match.html?id=${match.unique_id}`;
      }

      container.appendChild(div);
    });

  } catch(error){
    container.innerHTML="❌ API Error - Live score unavailable";
    console.log("Fetch error:", error);
  }
}

// Initial load
loadMatches();

// Auto refresh every 15 sec
setInterval(loadMatches,15000);
