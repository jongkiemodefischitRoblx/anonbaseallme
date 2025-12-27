export default async function handler(req, res) {
  const API_KEY = "AIzaSyByXCPIVB-_I32pB1oYlocw6gmRAcSuVGE";
  const maxResults = 10;
  const query = "anime";

  let videoIds = [];
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    videoIds = data.items.map(item => item.id.videoId).filter(Boolean);
  } catch (err) {
    console.error("YouTube API error:", err);
    // fallback hardcode supaya function tetap jalan
    videoIds = ["k0gUQYcQ5JY","R54NeEHCvh4","mC7_S2Tpbf8"];
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ANONTVNIME</title>
<style>
body{background:#1a002a;color:#fff;font-family:Arial;margin:0;padding:0;}
header{text-align:center;padding:20px;}
header h1{color:#ff00ff;text-shadow:0 0 10px #ff00ff,0 0 20px #ff00ff;font-size:2em;margin:0;}
header p{color:#e0b0ff;margin:5px 0 0 0;}
input{padding:10px;width:80%;margin:20px auto;display:block;border-radius:8px;border:none;outline:none;font-size:16px;}
.anime-list{display:grid;gap:20px;padding:0 20px;margin-bottom:20px;}
.anime{background:#2a002f;padding:0;border-radius:12px;box-shadow:0 0 10px #ff00ff;overflow:hidden;cursor:pointer;}
iframe{width:100%;aspect-ratio:16/9;border:none;}
footer{text-align:center;padding:20px;font-size:14px;}
a.telegram{color:#1DA1F2;text-decoration:none;}
a.telegram:hover{text-decoration:underline;}
@media (min-width:320px){.anime-list{grid-template-columns:1fr;}}
@media (min-width:600px){.anime-list{grid-template-columns:repeat(2,1fr);}}
@media (min-width:900px){.anime-list{grid-template-columns:repeat(3,1fr);}}
@media (min-width:1200px){.anime-list{grid-template-columns:repeat(4,1fr);}}
#videoPopup{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(26,0,42,0.95);justify-content:center;align-items:center;z-index:9999;}
#videoPopup iframe{width:90%;height:80%;}
#closeBtn{position:absolute;top:20px;right:30px;color:#ff00ff;font-size:2em;font-weight:bold;cursor:pointer;}
</style>
</head>
<body>

<header>
<h1>ANONTVNIME</h1>
<p>STREAM BY YOUTUBE</p>
</header>

<input type="text" id="searchInput" placeholder='Search Your Anime "Naruto", "Titan Eren", etc.' />

<div class="anime-list" id="animeList"></div>

<div id="videoPopup">
<span id="closeBtn">&times;</span>
<iframe id="popupVideo" src="" allowfullscreen></iframe>
</div>

<footer>
<p>API BY ME ANON | <a class="telegram" href="https://t.me/alwyasanonfuck" target="_blank">CONTACT TELEGRAM</a></p>
</footer>

<script>
const animeListEl=document.getElementById('animeList');
const videoPopup=document.getElementById('videoPopup');
const popupVideo=document.getElementById('popupVideo');
const closeBtn=document.getElementById('closeBtn');

const defaultVideoIds=${JSON.stringify(videoIds)};
const animeTitles=[
{title:"Naruto",id:"k0gUQYcQ5JY"},
{title:"Attack on Titan",id:"R54NeEHCvh4"},
{title:"Demon Slayer",id:"mC7_S2Tpbf8"},
{title:"One Piece",id:"vZ3cTn2vtrI"},
{title:"My Hero Academia",id:"wK1cP4Xo-2g"}
];

function shuffle(array){
let currentIndex=array.length, randomIndex;
while(currentIndex!==0){
randomIndex=Math.floor(Math.random()*currentIndex);
currentIndex--;
[array[currentIndex],array[randomIndex]]=[array[randomIndex],array[currentIndex]];
}
return array;
}

function renderAnime(list){
animeListEl.innerHTML=list.map(id=>\`
<div class="anime" data-id="\${id}">
<iframe src="https://www.youtube.com/embed/\${id}" allowfullscreen></iframe>
</div>
\`).join('');
}

renderAnime(shuffle(defaultVideoIds));

animeListEl.addEventListener('click',e=>{
const animeDiv=e.target.closest(".anime");
if(animeDiv){
const id=animeDiv.dataset.id;
popupVideo.src="https://www.youtube.com/embed/"+id+"?autoplay=1";
videoPopup.style.display="flex";
}
});

closeBtn.addEventListener('click',()=>{
popupVideo.src="";
videoPopup.style.display="none";
});

setInterval(()=>{
if(!document.getElementById('searchInput').value) renderAnime(shuffle(defaultVideoIds));
},60000);

document.getElementById('searchInput').addEventListener('keyup',e=>{
const val=e.target.value.toLowerCase();
const filtered=animeTitles.filter(a=>a.title.toLowerCase().includes(val)).map(a=>a.id);
renderAnime(filtered.length ? filtered : shuffle(defaultVideoIds));
});
</script>

</body>
</html>`);
}
