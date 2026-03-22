const API_KEY = "6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb";

async function loadMatches() {
  const container = document.getElementById("matches");
  container.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
    );
    const data = await res.json();

    container.innerHTML = "";

    data.data.forEach(match => {
      const div = document.createElement("div");
      div.className = "match";

      div.innerHTML = `
        <h3>${match.name}</h3>
        <p>${match.status}</p>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    container.innerHTML = "❌ Error loading matches";
  }
}

loadMatches();
