const RSS="https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cricbuzz.com/cricket-news/rss");

async function loadNews(){

const res = await fetch(RSS);
const data = await res.json();

const parser = new DOMParser();
const xml = parser.parseFromString(data.contents,"text/xml");

const items = xml.querySelectorAll("item");

const container = document.getElementById("matches");

container.innerHTML="";

items.forEach((item,i)=>{

if(i<15){

let title=item.querySelector("title").textContent;
let link=item.querySelector("link").textContent;

container.innerHTML+=`

<div class="match">

<h3>${title}</h3>

<a href="${link}" target="_blank">Read More</a>

</div>

`;

}

});

}

loadNews();
