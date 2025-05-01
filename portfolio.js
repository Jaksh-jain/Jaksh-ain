// Improved Theme Toggle with Animation and Mode Switching
const themeToggle = document.querySelector(".theme-toggle");
const icon = themeToggle.querySelector("i");

function setTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
  icon.className = mode === "light" ? "fas fa-moon" : "fas fa-sun";
}

// Load saved theme or default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

// Toggle Theme
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      });
    }
  });
});

// Form submission alert
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
  });
}

// Mobile Menu Toggle
const mobileToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

function NewEventCaller(cb) {
  this.observer = new MutationObserver(this.handleMutations.bind(this));
  this.observeConfig = {
    childList: true, // Observes changes to the children of a node.
    subtree: true, // Observes changes in all descendants of a node.
    attributes: true, // Observes changes to attributes.
    characterData: true, // Observes changes to character data of a node.
  };
  this.bind();
}

NewEventCaller.prototype.bind = function () {
  // Use MutationObserver instead of Mutation Events
  this.observer.observe(document, this.observeConfig); // Start observing the document
};

NewEventCaller.prototype.handleMutations = function (mutationsList) {
  // Process each mutation record
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      // Check for added nodes
      if (mutation.addedNodes.length > 0) {
        this.isCalled = true;
        // console.log('A child node has been added.');
      }
      // Check for removed nodes
      if (mutation.removedNodes.length > 0) {
        this.isCalled = true;
        // console.log('A child node has been removed.');
      }
    } else if (
      mutation.type === "attributes" ||
      mutation.type === "characterData"
    ) {
      this.isCalled = true;
      // console.log('An attribute or characterData has been modified');
    }
  }
};

NewEventCaller.prototype.unbind = function () {
  // Disconnect the MutationObserver
  this.observer.disconnect();
};

function CustomEventHandler(e) {
  this.event = e;
  this.contextmenuEvent = this.createEvent(this.event.type);
}

// Improved Spline iframe fade-in after internal load
window.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("spline-frame");
  if (iframe) {
    iframe.addEventListener("load", () => {
      setTimeout(() => {
        iframe.style.opacity = "1";
      }, 300); // Optional delay for smoother experience
    });
  }
});

// Activate glowing effect on journey timeline dots
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.6,
  }
);

document.querySelectorAll(".timeline-dot").forEach((dot) => {
  observer.observe(dot);
});

// Sequential glow effect for journey timeline
const timelineDots = document.querySelectorAll(".timeline-dot");
let delay = 0;
timelineDots.forEach((dot, i) => {
  observer.observe(dot);
  dot.style.transitionDelay = `${i * 150}ms`;
});
