// MATRIX BACKGROUND
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({length: columns}).fill(1);

function draw(){
  ctx.fillStyle="rgba(0,0,0,0.06)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#c77dff";
  ctx.font=fontSize+"px monospace";

  drops.forEach((y,i)=>{
    const text = chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text,i*fontSize,y*fontSize);
    drops[i] = y*fontSize > canvas.height && Math.random()>0.975 ? 0 : y+1;
  });
}
setInterval(draw,33);

// SKILL BAR ANIMATION
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.width = entry.target.dataset.level;
    }
  });
},{threshold:0.6});

document.querySelectorAll(".bar-fill").forEach(bar=>{
  observer.observe(bar);
});

// LANGUAGE SWITCHER
document.querySelectorAll(".language-switcher button").forEach(btn=>{
  btn.onclick = ()=>{
    const lang = btn.dataset.lang;
    document.querySelectorAll("[data-text-en]").forEach(el=>{
      el.textContent = el.dataset["text"+lang.charAt(0).toUpperCase()+lang.slice(1)];
    });
    document.querySelectorAll(".timeline-item").forEach(item=>{
      item.textContent = item.dataset[lang];
    });

// EASTER EGG AUDIO
const trigger = document.getElementById("easter-trigger");
const audio = document.getElementById("easter-audio");

let played = false;

trigger.addEventListener("click", () => {
  if (!played) {
    audio.volume = 0.6;
    audio.play().catch(()=>{});
    played = true;
  }
});