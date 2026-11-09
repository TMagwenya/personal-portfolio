/* ============================================================
   Tanatswa Magwenya — Personal Portfolio
   External JavaScript (js/script.js)

   Contents:
     1. Environment setup
     2. Mobile navigation
     3. Typing effect
     4. Scroll reveal (IntersectionObserver)
     5. Animated skill bars
     5b. Scroll fallback for reveal + skill bars
     6. Project filtering
     7. Back-to-top button
     8. Footer year
   ============================================================ */

/* ---------- 1. Environment setup ---------- */
// Replace the "no-js" class so CSS can safely use JavaScript-only styles.
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

// Respect the user's operating-system motion preference.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 2. Mobile navigation ---------- */
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

if (navToggle && primaryNav) {
  const closeNav = () => {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("nav-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    document.body.classList.toggle("nav-open", isOpen);
  });

  // Close the menu after a navigation link is chosen.
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  // Close the menu with the Escape key and return focus to the button.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
      closeNav();
      navToggle.focus();
    }
  });

  // If the window is resized to desktop width, reset the menu state.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeNav();
    }
  });
}

/* ---------- 3. Typing effect ---------- */
// Every element with [data-typing] reads its own list of roles from data-roles.
const typingElements = document.querySelectorAll("[data-typing]");

typingElements.forEach((element) => {
  let roles = [];

  try {
    roles = JSON.parse(element.dataset.roles || "[]");
  } catch (error) {
    roles = [];
  }

  if (!roles.length) {
    return;
  }

  // Reduced motion: show the first role without animating.
  if (prefersReducedMotion) {
    element.textContent = roles[0];
    return;
  }

  const typeSpeed = Number(element.dataset.speed) || 85;
  const deleteSpeed = 38;
  const holdTime = 1700;
  const betweenRoles = 420;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      // Add one character.
      charIndex += 1;
      element.textContent = currentRole.slice(0, charIndex);

      if (charIndex === currentRole.length) {
        // Pause at the full word before deleting it.
        deleting = true;
        window.setTimeout(tick, holdTime);
        return;
      }

      window.setTimeout(tick, typeSpeed);
    } else {
      // Remove one character.
      charIndex -= 1;
      element.textContent = currentRole.slice(0, charIndex);

      if (charIndex === 0) {
        // Move on to the next role.
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        window.setTimeout(tick, betweenRoles);
        return;
      }

      window.setTimeout(tick, deleteSpeed);
    }
  };

  // Small delay before each element starts so they do not all animate at once.
  window.setTimeout(tick, 500);
});

/* ---------- 4. Scroll reveal ---------- */
const revealElements = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  // No animation required: make everything visible immediately.
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

/* ---------- 5. Animated skill bars ---------- */
const skillFills = document.querySelectorAll(".skill-fill");

const fillSkill = (element) => {
  const level = element.dataset.level || "0";
  element.style.width = level + "%";
  element.classList.add("is-filled");
};

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  skillFills.forEach(fillSkill);
} else {
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fillSkill(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillFills.forEach((element) => skillObserver.observe(element));
}

/* ---------- 5b. Scroll fallback for reveal + skill bars ----------
   IntersectionObserver is the primary trigger, but this lightweight fallback
   keeps the page usable in browsers or preview panes where observer callbacks
   are delayed or throttled. It reveals anything that is currently in view. */
let visibilityTimer = null;

const checkVisibleElements = () => {
  const viewportHeight = window.innerHeight;

  revealElements.forEach((element) => {
    if (element.classList.contains("is-visible")) {
      return;
    }

    const rect = element.getBoundingClientRect();
    if (rect.top < viewportHeight - 30 && rect.bottom > 0) {
      element.classList.add("is-visible");
    }
  });

  skillFills.forEach((element) => {
    if (element.classList.contains("is-filled")) {
      return;
    }

    const rect = element.getBoundingClientRect();
    if (rect.top < viewportHeight && rect.bottom > 0) {
      fillSkill(element);
    }
  });
};

const requestVisibilityCheck = () => {
  if (visibilityTimer !== null) {
    return;
  }
  // A short timer is used instead of requestAnimationFrame so the fallback
  // still works in background tabs and preview panes that pause rendering.
  visibilityTimer = window.setTimeout(() => {
    visibilityTimer = null;
    checkVisibleElements();
  }, 80);
};

window.addEventListener("scroll", requestVisibilityCheck, { passive: true });
window.addEventListener("resize", requestVisibilityCheck);
window.setTimeout(checkVisibleElements, 600);

/* ---------- 6. Project filtering ---------- */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    // Update the active state and accessibility attributes of the buttons.
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    // Show the cards whose data-tags include the selected filter.
    projectCards.forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ");
      const shouldShow = selectedFilter === "all" || tags.includes(selectedFilter);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

/* ---------- 7. Back-to-top button ---------- */
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  const updateBackToTop = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 480);
  };

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}

/* ---------- 8. Footer year ---------- */
document.querySelectorAll("#year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
