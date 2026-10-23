// WhatsApp business number (country code + digits only)
const BUSINESS_WHATSAPP = "917800759597";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Dynamic experience calculation from 23 January 2020
(function calculateExperience() {
  const established = new Date(2020, 0, 23); // 23 January 2020
  const now = new Date();
  let years = now.getFullYear() - established.getFullYear();
  // Adjust if anniversary hasn't occurred yet this year
  if (now.getMonth() < established.getMonth() ||
    (now.getMonth() === established.getMonth() && now.getDate() < established.getDate())) {
    years--;
  }

  document.querySelectorAll(".experience-years").forEach((el) => {
    el.textContent = String(Math.max(years, 0));
  });
})();

// WhatsApp helper
function whatsappLink(message) {
  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

// Floating WhatsApp button
document.getElementById("whatsappFloat").href = whatsappLink(
  "Hello A FORCE SECURITY & ALLIED SERVICES, I would like to enquire about your security/allied services."
);

// Contact form → WhatsApp enquiry
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !service) {
    alert("Please fill in your name, phone number and service required.");
    return;
  }

  const enquiry =
    `Hello A FORCE SECURITY & ALLIED SERVICES,\n\n` +
    `I would like to enquire about your security/allied services.\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Service Required: ${service}\n` +
    `Requirements: ${message || "Not provided"}\n\n` +
    `Thank you.`;

  window.open(whatsappLink(enquiry), "_blank", "noopener");
});

// Scroll-based animations for cards
(function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  const animatedElements = document.querySelectorAll(
    ".service-card, .client-card, .why-item, .op-card, .gallery-item, .aim-card"
  );
  animatedElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.5s ease ${index % 4 * 0.1}s, transform 0.5s ease ${index % 4 * 0.1}s`;
    observer.observe(el);
  });
})();