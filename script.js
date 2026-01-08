// MATRIX
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
    ctx.fillText(letters[Math.floor(Math.random()*letters.length)],i*fontSize,y*fontSize);
    if(y*fontSize>canvas.height && Math.random()>0.975)drops[i]=0;
    drops[i]++;
  });
}
setInterval(draw,50);
window.addEventListener("resize",()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});

// SCROLL ANIMATION
const cards=document.querySelectorAll(".card");
const skills=document.querySelectorAll(".skill");
const timelineItems=document.querySelectorAll(".timeline-item");

function animate(){
  const trigger=window.innerHeight*0.85;
  cards.forEach(card=>{if(card.getBoundingClientRect().top<trigger)card.classList.add("show");});
  skills.forEach(skill=>{
    if(skill.getBoundingClientRect().top<trigger){
      const bar=skill.querySelector(".bar");
      bar.style.width=bar.dataset.level;
    }
  });
  timelineItems.forEach(item=>{
    if(item.getBoundingClientRect().top<trigger)item.classList.add("show");
  });
}
window.addEventListener("scroll",animate);
window.addEventListener("load",animate);

// LANGUAGE SWITCHER
const langButtons=document.querySelectorAll(".language-switcher button");
langButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const lang=btn.dataset.lang;
    document.querySelectorAll("[data-text-en]").forEach(el=>{
      if(el.dataset["text"+lang.charAt(0).toUpperCase()+lang.slice(1)]){
        if(el.tagName==="H3" || el.tagName==="SPAN") el.textContent=el.dataset["text"+lang.charAt(0).toUpperCase()+lang.slice(1)];
        else el.textContent=el.dataset["text"+lang.charAt(0).toUpperCase()+lang.slice(1)];
      }
    });
  });
});