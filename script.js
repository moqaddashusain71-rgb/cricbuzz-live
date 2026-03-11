async function loadMatches(){
  const container = document.getElementById("matches");

  try{
    const res = await fetch("https://cricbuzz-live.vercel.app/v1/matches/live");
    if(!res.ok) throw new Error("API not responding");

    const data = await res.json();
    container.innerHTML = "";

    if(!data?.typeMatches || data.typeMatches.length === 0){
      container.innerHTML = "No live matches right now";
      return;
    }

    data.typeMatches.forEach(type=>{
      type.seriesMatches.forEach(series=>{
        if(!series.seriesAdWrapper) return;
        series.seriesAdWrapper.matches.forEach(match=>{
          const info = match.matchInfo;
          const score = match.matchScore;

          const team1 = info.team1.teamName;
          const team2 = info.team2.teamName;

          const score1 = score?.team1Score?.inngs1?.runs || "-";
          const wk1 = score?.team1Score?.inngs1?.wickets || "-";
          const ov1 = score?.team1Score?.inngs1?.overs || "-";

          const score2 = score?.team2Score?.inngs1?.runs || "-";
          const wk2 = score?.team2Score?.inngs1?.wickets || "-";
          const ov2 = score?.team2Score?.inngs1?.overs || "-";

          const status = info.status;

          const div = document.createElement("div");
          div.className = "match";
          div.innerHTML = `
            <h3>${team1} vs ${team2}</h3>
            <p>${score1}/${wk1} (${ov1} ov)</p>
            <p>${score2}/${wk2} (${ov2} ov)</p>
            <p class="live">${status}</p>
          `;
          container.appendChild(div);
        });
      });
    });

  } catch(error){
    container.innerHTML = "❌ API Error - Live score unavailable";
    console.log("Fetch error:", error);
  }
}

// initial load
loadMatches();

// auto refresh every 15 sec
setInterval(loadMatches, 15000);
