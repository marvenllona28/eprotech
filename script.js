// MOBILE MENU

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// PAGE SWITCHER

function showPage(pageId, element = null) {

  // hide all pages
  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.remove("active");
  });

  // show selected page
  document.getElementById(pageId).classList.add("active");

  // remove active nav state
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach(item => {
    item.classList.remove("active");
  });

  // set active nav item
  if (element) {
    element.classList.add("active");
  }

  // close mobile menu
  navLinks.classList.remove("active");

  // scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

// SCROLL ANIMATION

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

  const windowHeight = window.innerHeight;

  reveals.forEach(reveal => {

    const revealTop = reveal.getBoundingClientRect().top;

    if (revealTop < windowHeight - 100) {
      reveal.classList.add("active");
    }

  });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();