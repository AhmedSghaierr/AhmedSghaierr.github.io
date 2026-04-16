document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MATRIX BACKGROUND
  ========================== */
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
     CARD ANIMATION
  ========================== */
  const cards = document.querySelectorAll(".card");

  if ("IntersectionObserver" in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => cardObserver.observe(card));
  }

  /* =========================
     SKILL BARS
  ========================== */
  const bars = document.querySelectorAll(".bar-fill");

  if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.level || "100%";
        }
      });
    }, { threshold: 0.6 });

    bars.forEach(bar => skillObserver.observe(bar));
  }

  /* =========================
     LANGUAGE SYSTEM (FIXED)
  ========================== */
  const translations = {
    en: {
      name: "Ahmed Sghaier",
      role: "Web Developer",
      about: "About Me",
      aboutText: "Ahmed Sghaier,19 years old from Sousse,Tunsia.Focused on studying web development and and building real world projects",
      skills: "Skills",
      timeline: "Timeline",
      projects: "Live Projects",
      languages: "Languages",
      contact: "Contact"
    },

    tn: {
      name: "أحمد الصغير",
      role: "مطور ويب",
      about: "عني",
      aboutText: "أحمد صغير، 19 عامًا من سوسة، تونس.,أركز على دراسة تطوير مواقع الويب وبناء مشاريع واقعية.",
      skills: "المهارات",
      timeline: "المسار",
      projects: "مشاريع حية",
      languages: "اللغات",
      contact: "التواصل"
    },

    fr: {
      name: "Ahmed Sghaier",
      role: "Développeur Web",
      about: "À propos de moi",
      aboutText: "Ahmed Sghaier, 19 ans, originaire de Sousse, en Tunisie.Je concentre sur l'étude du développement web et la réalisation de projets concrets.",
      skills: "Compétences",
      timeline: "Parcours",
      projects: "Projets en direct",
      languages: "Langues",
      contact: "Contact"
    }
  };

  function setLanguage(lang) {
    const t = translations[lang];

    if (!t) return;

    const heroName = document.querySelector(".hero-text h1");
    const heroRole = document.querySelector(".hero-text h2");

    if (heroName) heroName.textContent = t.name;
    if (heroRole) heroRole.textContent = t.role;

    const sectionCards = document.querySelectorAll(".card");

    if (sectionCards[0]) {
      sectionCards[0].querySelector("h2").textContent = t.about;
      sectionCards[0].querySelector("p").textContent = t.aboutText;
    }

    if (sectionCards[1]) sectionCards[1].querySelector("h2").textContent = t.skills;
    if (sectionCards[2]) sectionCards[2].querySelector("h2").textContent = t.timeline;
    if (sectionCards[3]) sectionCards[3].querySelector("h2").textContent = t.projects;
    if (sectionCards[4]) sectionCards[4].querySelector("h2").textContent = t.languages;
    if (sectionCards[5]) sectionCards[5].querySelector("h2").textContent = t.contact;
  }

  document.querySelectorAll(".language-switcher button").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  /* =========================
     EASTER EGG
  ========================== */
  const trigger = document.getElementById("easter-trigger");
  const audio = document.getElementById("easter-audio");
  const heroPic = document.getElementById("hero-pic");

  if (trigger && audio && heroPic) {
    trigger.addEventListener("click", () => {

      audio.currentTime = 0;
      audio.volume = 0.6;
      audio.play().catch(() => {});

      const originalSrc = heroPic.dataset.original || heroPic.src;
      heroPic.dataset.original = originalSrc;

      heroPic.style.transition = "opacity 0.5s ease";
      heroPic.style.opacity = 0;

      setTimeout(() => {
        heroPic.src = "assets/meme.jpg";
        heroPic.style.opacity = 1;
      }, 500);

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