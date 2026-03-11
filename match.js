const matchId = new URLSearchParams(window.location.search).get("id");
const container = document.getElementById("details");

async function loadMatchDetails(id){
  try{
    const res = await fetch(`https://cricbuzz-live.vercel.app/v1/match/${id}`);
    if(!res.ok) throw new Error("API not responding");

    const data = await res.json();
    container.innerHTML="";

    const info = data.matchInfo;
    const score = data.matchScore;

    const team1 = info.team1.teamName;
    const team2 = info.team2.teamName;

    const score1 = score?.team1Score?.inngs1?.runs || "-";
    const wk1 = score?.team1Score?.inngs1?.wickets || "-";
    const ov1 = score?.team1Score?.inngs1?.overs || "-";

    const score2 = score?.team2Score?.inngs1?.runs || "-";
    const wk2 = score?.team2Score?.inngs1?.wickets || "-";
    const ov2 = score?.team2Score?.inngs1?.overs || "-";

    container.innerHTML=`
      <h2>${team1} vs ${team2}</h2>
      <p>${score1}/${wk1} (${ov1} ov)</p>
      <p>${score2}/${wk2} (${ov2} ov)</p>
    `;

  } catch(err){
    container.innerHTML="❌ Error loading match details";
    console.log(err);
  }
}

if(matchId){
  loadMatchDetails(matchId);
} else {
  container.innerHTML="Invalid match ID";
}
