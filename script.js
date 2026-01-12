document.addEventListener("DOMContentLoaded", () => {

  /* MATRIX */
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize = 16;
  const cols = canvas.width / fontSize;
  const drops = Array(Math.floor(cols)).fill(1);

  setInterval(() => {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#c77dff";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
      ctx.fillText(chars[Math.random() * chars.length | 0], i * fontSize, y * fontSize);
      drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
    });
  }, 33);

  /* SKILLS */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.style.width = e.target.dataset.level;
    });
  });

  document.querySelectorAll(".bar-fill").forEach(b => observer.observe(b));

  /* EASTER EGG */
  const trigger = document.getElementById("easter-trigger");
  const audio = document.getElementById("easter-audio");

  trigger.onclick = () => {
    audio.currentTime = 0;
    audio.play();
  };

});