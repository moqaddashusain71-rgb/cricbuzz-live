const API="https://api.cricapi.com/v1/currentMatches?apikey=6b6d143f-b3b8-4a38-97c5-2ba6f5fbb7eb&offset=0";

let matches=[];

async function loadMatches(){

const box=document.getElementById("matches");

box.innerHTML="Loading matches...";

try{

const res=await fetch(API);
const data=await res.json();

console.log(data);

matches=data.data;

if(!matches || matches.length===0){

showDemo();
return;

}

showMatches(matches);

}catch{

showDemo();

}

}

function showMatches(list){

const box=document.getElementById("matches");

box.innerHTML="";

list.forEach(m=>{

box.innerHTML+=`

<div class="match">

<h3>${m.name}</h3>

<div class="score">${m.status}</div>

</div>

`;

});

}

function showDemo(){

const box=document.getElementById("matches");

box.innerHTML=`

<div class="match">
<h3>India vs Australia</h3>
<div class="score">Live match example</div>
</div>

<div class="match">
<h3>England vs Pakistan</h3>
<div class="score">Upcoming match example</div>
</div>

`;

}

loadMatches();

setInterval(loadMatches,60000);
