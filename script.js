/* MATRIX BACKGROUND */
const canvas=document.getElementById("matrix");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize=18;
const columns=canvas.width/fontSize;
const drops=[];
for(let x=0;x<columns;x++)drops[x]=1;
function drawMatrix(){
  ctx.fillStyle="rgba(13,11,20,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#bb8fef";
  ctx.font=fontSize+"px monospace";
  for(let i=0;i<drops.length;i++){
    const text=letters.charAt(Math.floor(Math.random()*letters.length));
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);
    if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)drops[i]=0;
    drops[i]++;
  }
}
setInterval(drawMatrix,50);
window.addEventListener("resize",()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
});

/* SCROLL ANIMATION */
const cards=document.querySelectorAll(".card");
const skills=document.querySelectorAll(".skill");
function animateOnScroll(){
  const triggerBottom=window.innerHeight*0.85;
  cards.forEach(card=>{
    const cardTop=card.getBoundingClientRect().top;
    if(cardTop<triggerBottom&&!card.classList.contains("show"))card.classList.add("show");
  });
  skills.forEach(skill=>{
    const bar=skill.querySelector(".bar");
    const skillTop=skill.getBoundingClientRect().top;
    if(skillTop<triggerBottom&&!skill.classList.contains("animated")){
      skill.classList.add("animated");
      const level=bar.getAttribute("data-level");
      bar.style.width=level;
    }
  });
}

window.addEventListener("scroll",animateOnScroll);
window.addEventListener("load",animateOnScroll);

/* LANGUAGE SWITCHER */
const langButtons=document.querySelectorAll(".language-switcher button");
langButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const lang=btn.getAttribute("data-lang");
    document.querySelectorAll("[data-text-en]").forEach(el=>{
      el.textContent=el.getAttribute("data-text-"+lang);
    });
  });
});
