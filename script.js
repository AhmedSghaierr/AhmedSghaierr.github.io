const canvas=document.getElementById("matrix");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize=18;
const columns=canvas.width/fontSize;
const drops=Array.from({length:columns}).fill(1);

function draw(){
  ctx.fillStyle="rgba(13,11,20,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#bb8fef";
  ctx.font=fontSize+"px monospace";
  drops.forEach((y,i)=>{
    const text=letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text,i*fontSize,y*fontSize);
    if(y*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
    drops[i]++;
  });
}
setInterval(draw,50);

const cards=document.querySelectorAll(".card");
const skills=document.querySelectorAll(".skill");

function animate(){
  const trigger=window.innerHeight*0.85;

  cards.forEach(card=>{
    if(card.getBoundingClientRect().top<trigger){
      card.classList.add("show");
    }
  });

  skills.forEach(skill=>{
    const bar=skill.querySelector(".bar");
    if(skill.getBoundingClientRect().top<trigger){
      bar.style.width=bar.dataset.level;
    }
  });
}

window.addEventListener("scroll",animate);
window.addEventListener("load",animate);