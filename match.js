const API_KEY = "6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";
const matchId = new URLSearchParams(window.location.search).get("id");
const container = document.getElementById("details");

async function loadMatchDetails(id){
  try{
    const res = await fetch(`https://api.cricapi.com/v1/matches/${id}?apikey=${API_KEY}`);
    if(!res.ok) throw new Error("API not responding");

    const data = await res.json();
    container.innerHTML="";

    const match = data.data || {};
    container.innerHTML=`
      <h2>${match["team-1"]} vs ${match["team-2"]}</h2>
      <p>${match.score || "-"}</p>
      <p>Status: ${match.status || "-"}</p>
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
