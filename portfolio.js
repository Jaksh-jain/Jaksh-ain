// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const icon = themeToggle.querySelector("i");

function setTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
  icon.className = mode === "light" ? "fas fa-moon" : "fas fa-sun";
}

setTheme(localStorage.getItem("theme") || "dark");

themeToggle.addEventListener("click", () => {
  const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  setTheme(newTheme);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
    }
  });
});

// EmailJS form submission
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm('service_p15zns3', 'template_ujtfuim', this, 'EIc7QqU6yiN8lzTvq')
      .then(() => {
        showToast("Message sent successfully!");
        this.reset();
      }, () => {
        showToast("Failed to send message. Please try again.");
      });
  });
}

// Toast Notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 30px; right: 30px;
    background: #2a9df4; color: white;
    padding: 15px 20px; border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 9999;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Mobile menu toggle
const mobileToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu on nav link click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("active"));
});

// Timeline dot animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.6 });

document.querySelectorAll(".timeline-dot").forEach((dot, i) => {
  observer.observe(dot);
  dot.style.transitionDelay = `${i * 150}ms`;
});

// Typing animation
const typingText = ["Developer", "Designer", "Creator"];
let i = 0, j = 0, current = "", isDeleting = false;

function typeEffect() {
  const speed = isDeleting ? 100 : 200;
  current = typingText[i].substring(0, j);
  document.getElementById("typing-text").textContent = current;

  if (!isDeleting && j < typingText[i].length) {
    j++;
  } else if (isDeleting && j > 0) {
    j--;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % typingText.length;
  }
  setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Spline iframe load fade-in
window.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("spline-frame");
  if (iframe) {
    iframe.addEventListener("load", () => {
      setTimeout(() => {
        iframe.style.opacity = "0.5";
      }, 300);
    });
  }
});
