// Sidebar Menu
const navMenu = document.getElementById("nav-menu");
const navOpen = document.getElementById("nav-open");
const navClose = document.getElementById("nav-close");

// Show Menu
if (navOpen) {
  navOpen.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    console.log("Done");
  });
}

// Hide Menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}
