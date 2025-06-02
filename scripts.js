//========================================
// Theme Toggle
//========================================
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const desktopIcon = document.getElementById("theme-icon");
  const mobileIcon = document.getElementById("theme-icon-mobile");

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    if (desktopIcon) desktopIcon.classList.replace("fa-sun", "fa-moon");
    if (mobileIcon) mobileIcon.classList.replace("fa-sun", "fa-moon");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    if (desktopIcon) desktopIcon.classList.replace("fa-moon", "fa-sun");
    if (mobileIcon) mobileIcon.classList.replace("fa-moon", "fa-sun");
  }
}

//========================================
// Tab Switching for "Jobs by Location"
//========================================
function showTab(tabId, clickedButton) {
  // 1) Hide all tab-content and deactivate all tab-buttons
  document
    .querySelectorAll(".tab-content")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));

  // 2) Show the chosen tab-content
  document.getElementById(`${tabId}-jobs`).classList.add("active");

  // 3) Mark the clicked button as active
  clickedButton.classList.add("active");
}

//========================================
// Main DOMContentLoaded: IntersectionObserver + Counters + Hamburger + Sliders
//========================================
document.addEventListener("DOMContentLoaded", () => {
  //========================================
  // 1) IntersectionObserver to hide/reveal cards
  //========================================
  function observeCards(selector) {
    const cards = document.querySelectorAll(selector);
    if (!("IntersectionObserver" in window) || cards.length === 0) {
      // If not supported or no cards, just make them visible
      cards.forEach((card) => {
        card.style.opacity = "1";
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const card = entry.target;
        if (entry.isIntersecting) {
          // When card enters viewport: slide in
          const all = Array.from(cards);
          const idx = all.indexOf(card);

          if (idx % 2 === 0) {
            card.classList.remove("slide-in-right");
            card.classList.add("slide-in-left");
          } else {
            card.classList.remove("slide-in-left");
            card.classList.add("slide-in-right");
          }
        } else {
          // When card leaves viewport: hide it
          card.style.opacity = "0";
          card.classList.remove("slide-in-left", "slide-in-right");
        }
      });
    }, observerOptions);

    cards.forEach((card) => {
      card.style.opacity = "0";
      observer.observe(card);
    });
  }

  observeCards(".stat-card");
  observeCards(".job-card");
  observeCards(".employer-card");
  observeCards(".category-card");
  observeCards(".location-card");

  //========================================
  // 2) Stat Counters Animation (on load)
  //========================================
  document.querySelectorAll(".stat-number").forEach((el) => {
    const target = +el.getAttribute("data-count");
    let count = 0;
    const increment = target / 200;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        el.innerText = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        el.innerText = target;
      }
    };
    updateCount();
  });

  //========================================
  // 3) Hamburger Toggle Logic
  //========================================
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("active");
    });
  }

  //========================================
  // 4) Slick‐style Slider Functionality (Single‐click scroll)
  //========================================
  document.querySelectorAll(".slider-container").forEach((container) => {
    const content = container.querySelector(".slider-content");
    const btnLeft = container.querySelector(".slider-arrow.left");
    const btnRight = container.querySelector(".slider-arrow.right");

    if (!content || !btnLeft || !btnRight) return;

    // Scroll amount per click: 100% of visible width (one “page”)
    const scrollAmount = () => {
      return content.clientWidth;
    };

    btnLeft.addEventListener("click", () => {
      content.scrollBy({
        left: -scrollAmount(),
        behavior: "smooth",
      });
    });
    btnRight.addEventListener("click", () => {
      content.scrollBy({
        left: scrollAmount(),
        behavior: "smooth",
      });
    });
  });
});
