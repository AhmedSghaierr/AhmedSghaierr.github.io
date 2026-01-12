/* =========================
   DOM READY
========================= */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MATRIX BACKGROUND
  ========================= */
  const canvas = document.getElementById("matrix");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }


    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#c77dff";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 33);
  }

  /* =========================
     SKILL BAR ANIMATION
  ========================= */
  const bars = document.querySelectorAll(".bar-fill");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.level || "100%";
          }
        });
      },
      { threshold: 0.6 }
    );

    bars.forEach(bar => observer.observe(bar));
  }

  /* =========================
     LANGUAGE SWITCHER
  ========================= */
  document.querySelectorAll(".language-switcher button").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;

      document.querySelectorAll("[data-text-en]").forEach(el => {
        const key = "text" + lang.charAt(0).toUpperCase() + lang.slice(1);
        if (el.dataset[key]) {
          el.textContent = el.dataset[key];
        }
      });

      document.querySelectorAll(".timeline-item").forEach(item => {
        if (item.dataset[lang]) {
          item.textContent = item.dataset[lang];
        }
      });
    });
  });

  /* =========================
     EASTER EGG AUDIO + MEME IMAGE WITH FADE
  ========================= */
  const trigger = document.getElementById("easter-trigger");
  const audio = document.getElementById("easter-audio");
  const heroPic = document.getElementById("hero-pic");

  if (trigger && audio && heroPic) {
    trigger.addEventListener("click", () => {
      // Play audio
      audio.currentTime = 0;
      audio.volume = 0.6;
      audio.play().catch(() => {});

      // Save original src if not saved
      const originalSrc = heroPic.dataset.original || heroPic.src;
      heroPic.dataset.original = originalSrc;

      // Fade out, change to meme, fade in
      heroPic.style.transition = "opacity 0.5s ease";
      heroPic.style.opacity = 0;

      setTimeout(() => {
        heroPic.src = "assets/meme.jpg";
        heroPic.style.opacity = 1;
      }, 500); // wait 0.5s for fade out

      // After 5 seconds, restore original picture with fade
      setTimeout(() => {
        heroPic.style.opacity = 0;
        setTimeout(() => {
          heroPic.src = originalSrc;
          heroPic.style.opacity = 1;
        }, 500);
      }, 5000);
    });
  }

});