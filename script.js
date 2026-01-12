/* =========================
   MATRIX BACKGROUND
========================= */
const canvas = document.getElementById("matrix");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize = 16;
  let columns = canvas.width / fontSize;
  let drops = Array.from({ length: columns }).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#c77dff";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, y * fontSize);
      drops[i] =
        y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
    });
  }

  setInterval(drawMatrix, 33);
}

/* =========================
   SKILL BAR ANIMATION
========================= */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.level;
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll(".bar-fill").forEach((bar) => {
  observer.observe(bar);
});

/* =========================
   LANGUAGE SWITCHER
========================= */
document.querySelectorAll(".language-switcher button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;

    document.querySelectorAll("[data-text-en]").forEach((el) => {
      const key =
        "text" + lang.charAt(0).toUpperCase() + lang.slice(1);
      if (el.dataset[key]) {
        el.textContent = el.dataset[key];
      }
    });

    document.querySelectorAll(".timeline-item").forEach((item) => {
      if (item.dataset[lang]) {
        item.textContent = item.dataset[lang];
      }
    });
  });
});

/* =========================
   EASTER EGG AUDIO
========================= */
window.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("easter-trigger");
  const audio = document.getElementById("easter-audio");

  if (!trigger || !audio) return;

  let played = false;

  trigger.addEventListener("click", () => {
    if (played) return;
    audio.volume = 0.6;
    audio.play().catch(() => {});
    played = true;
  });
});