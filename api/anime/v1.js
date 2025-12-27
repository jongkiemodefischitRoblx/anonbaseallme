export default async function handler(req, res) {
  const API_KEY = "AIzaSyByXCPIVB-_I32pB1oYlocw6gmRAcSuVGE";
  const maxResults = 10;
  const query = "anime";

  let videos = [];
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    videos = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      desc: item.snippet.description,
      thumb: item.snippet.thumbnails.high.url
    })).filter(v => v.id);
  } catch (err) {
    console.error("YouTube API error:", err);
    videos = [
      {id:"k0gUQYcQ5JY", title:"Naruto", desc:"Naruto Anime", thumb:"https://i.ytimg.com/vi/k0gUQYcQ5JY/hqdefault.jpg"},
      {id:"R54NeEHCvh4", title:"Attack on Titan", desc:"AOT Anime", thumb:"https://i.ytimg.com/vi/R54NeEHCvh4/hqdefault.jpg"},
      {id:"mC7_S2Tpbf8", title:"Demon Slayer", desc:"Demon Slayer Anime", thumb:"https://i.ytimg.com/vi/mC7_S2Tpbf8/hqdefault.jpg"}
    ];
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ANONTVNIME</title>
<style>
body{margin:0;padding:0;font-family:Arial;background:#1a002a;color:#fff;}
header{text-align:center;padding:20px;}
header h1{color:#ff00ff;text-shadow:0 0 10px #ff00ff,0 0 20px #ff00ff;margin:0;font-size:2em;}
header p{color:#e0b0ff;margin:5px 0 0 0;}
input{display:block;width:80%;margin:20px auto;padding:10px;border-radius:8px;border:none;outline:none;font-size:16px;}
.anime-list{display:grid;gap:20px;padding:0 20px;margin-bottom:20px;}
.anime{background:#2a002f;padding:10px;border-radius:12px;box-shadow:0 0 10px #ff00ff;cursor:pointer;text-align:center;}
.anime img{width:100%;border-radius:8px;}
.anime h3{margin:10px 0 5px 0;color:#ff00ff;font-size:1em;}
.anime p{font-size:0.9em;color:#e0b0ff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;}
footer{text-align:center;padding:20px;font-size:14px;}
a.telegram{color:#1DA1F2;text-decoration:none;}
a.telegram:hover{text-decoration:underline;}
@media(min-width:320px){.anime-list{grid-template-columns:1fr;}}
@media(min-width:600px){.anime-list{grid-template-columns:repeat(2,1fr);}}
@media(min-width:900px){.anime-list{grid-template-columns:repeat(3,1fr);}}
@media(min-width:1200px){.anime-list{grid-template-columns:repeat(4,1fr);}}
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

const videos=${JSON.stringify(videos)};

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
animeListEl.innerHTML=list.map(v=>\`
<div class="anime" data-id="\${v.id}">
<img src="\${v.thumb}" alt="\${v.title}"/>
<h3>\${v.title}</h3>
<p>\${v.desc}</p>
</div>
\`).join('');
}

// initial render
renderAnime(shuffle(videos));

// click anime → fullscreen popup
animeListEl.addEventListener('click',e=>{
const animeDiv=e.target.closest(".anime");
if(animeDiv){
const v=videos.find(vv=>vv.id===animeDiv.dataset.id);
popupVideo.src="https://www.youtube.com/embed/"+v.id+"?autoplay=1&modestbranding=1&rel=0&showinfo=0";
videoPopup.style.display="flex";
}
});

closeBtn.addEventListener('click',()=>{
popupVideo.src="";
videoPopup.style.display="none";
});

// auto-refresh tiap 60 detik jika search kosong
setInterval(()=>{
if(!document.getElementById('searchInput').value) renderAnime(shuffle(videos));
},60000);

// search internal
document.getElementById('searchInput').addEventListener('keyup',e=>{
const val=e.target.value.toLowerCase();
const filtered=videos.filter(v=>v.title.toLowerCase().includes(val));
renderAnime(filtered.length?filtered:shuffle(videos));
});
</script>

</body>
</html>`);
}
