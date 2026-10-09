"use strict";

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#primary-navigation");
if (menuButton && menu) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menu.classList.remove("is-open");
  };
  menuButton.addEventListener("click", () => {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute(
      "aria-label",
      opening ? "Close navigation" : "Open navigation",
    );
    menu.classList.toggle("is-open", opening);
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-wrap")) closeMenu();
  });
  window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);
}

// An illustrative, local-only interaction. It never connects to a Shopify store.
const simulation = document.querySelector("[data-simulation]");
if (simulation) {
  let quantity = 42;
  const counts = simulation.querySelectorAll("[data-count]");
  const status = simulation.querySelector("[data-simulation-status]");
  const saleButton = simulation.querySelector('[data-change="-1"]');
  simulation.querySelectorAll("[data-change]").forEach((button) => {
    button.addEventListener("click", () => {
      const change = Number(button.dataset.change);
      quantity = Math.max(0, quantity + change);
      counts.forEach((count) => {
        count.textContent = quantity;
      });
      status.textContent =
        change < 0
          ? `Example sale: both Available quantities are now ${quantity}.`
          : `Example restock: both Available quantities are now ${quantity}.`;
      saleButton.disabled = quantity === 0;
    });
  });
}

if (new URLSearchParams(window.location.search).get("contact") === "sent") {
  const notice = document.querySelector("#contact-result");
  if (notice) {
    notice.hidden = false;
    notice.focus();
  }
}
