// CARD + TIMELINE ANIMATION
const cards = document.querySelectorAll(".card");
const timelineItems = document.querySelectorAll(".timeline-item");

function animate(){
  const trigger = window.innerHeight * 0.85;

  cards.forEach(c=>{
    if(c.getBoundingClientRect().top < trigger) c.classList.add("show");
  });

  timelineItems.forEach(t=>{
    if(t.getBoundingClientRect().top < trigger) t.classList.add("show");
  });
}
window.addEventListener("scroll", animate);
window.addEventListener("load", animate);

// LANGUAGE SWITCHER (FULL FIX)
document.querySelectorAll(".language-switcher button").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const lang = btn.dataset.lang;

    document.querySelectorAll("[data-text-en]").forEach(el=>{
      el.textContent = el.dataset["text"+lang.charAt(0).toUpperCase()+lang.slice(1)];
    });

    timelineItems.forEach(item=>{
      item.querySelector(".timeline-date").textContent = item.dataset["date"+lang.charAt(0).toUpperCase()+lang.slice(1)];
      item.querySelector("h3").textContent = item.dataset["title"+lang.charAt(0).toUpperCase()+lang.slice(1)];
    });
  });
});