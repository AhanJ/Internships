// Sidebar Menu
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

// Show Menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// Hide Menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// if (navToggle) and if (navClose) ensure that the elements exist before adding event listeners to prevent errors
// The checks make the script more robust and prevent runtime errors if elements are missing or dynamically added

const navLinks = document.querySelectorAll(".nav__link");

// querySelectorAll returns a NodeList of all matching elements in the document
// navLinks will be a collection of all elements with the class .nav__link

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  })
);

// add an event listener to each link within a navigation menu so that clicking any of these links will hide the navigation menu

// forEach is used to iterate over each element in the navLinks NodeList
// for each link in navLinks, an event listener is added that listens for the click event
// at each iteration, the current item of navLinks is stored in link
// link is the iterator for navLinks
