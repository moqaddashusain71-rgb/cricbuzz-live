const API = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live";

async function loadMatches() {
  const container = document.getElementById("matches");

  try {
    const res = await fetch("https://cricbuzz-live.vercel.app/v1/matches/live");
    const data = await res.json();

    container.innerHTML = "";

    data.typeMatches.forEach(type => {
      type.seriesMatches.forEach(series => {
        if (!series.seriesAdWrapper) return;

        series.seriesAdWrapper.matches.forEach(match => {
          const info = match.matchInfo;
          const score = match.matchScore;

          let team1 = info.team1.teamName;
          let team2 = info.team2.teamName;

          let score1 = score?.team1Score?.inngs1?.runs || "";
          let wk1 = score?.team1Score?.inngs1?.wickets || "";
          let ov1 = score?.team1Score?.inngs1?.overs || "";

          let score2 = score?.team2Score?.inngs1?.runs || "";
          let wk2 = score?.team2Score?.inngs1?.wickets || "";
          let ov2 = score?.team2Score?.inngs1?.overs || "";

          const status = info.status;

          const div = document.createElement("div");
          div.className = "match";

          div.innerHTML = `
            <h3>${team1} vs ${team2}</h3>
            <p>${score1}/${wk1} (${ov1})</p>
            <p>${score2}/${wk2} (${ov2})</p>
            <p>${status}</p>
          `;

          container.appendChild(div);
        });
      });
    });

  } catch (err) {
    container.innerHTML = "Error loading matches";
    console.log(err);
  }
}

loadMatches();
setInterval(loadMatches, 30000);
