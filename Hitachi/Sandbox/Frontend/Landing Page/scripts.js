// Sidebar Menu
const navMenu = document.getElementById("nav-menu");
const navOpen = document.getElementById("nav-open");
const navClose = document.getElementById("nav-close");
const body = document;

// Show Menu
if (navOpen) {
  navOpen.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    console.log("Done");
    document.body.style.overflow = "hidden";
  });
}

// Hide Menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    document.body.style.overflow = "";
  });
}

const bgVideo = document.getElementById("bg-video");
bgVideo.playbackRate = 2;
