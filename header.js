/* =========================================================
   PALLIUM SHARED HEADER
   To change the menu or top bar, edit only this file.
   Each page places it with: <script src="header.js"></script>
========================================================= */
(function () {
  var CONTACT_URL = "/contact";
  var BOOKING_URL = "/discovery-meeting";

  var MENU = [
    ["index.html", "Home"],
    ["who-we-help.html", "Who We Help"],
    ["how-we-help.html", "How We Help"],
    ["why-pallium.html", "Why Pallium"],
    ["client-stories.html", "Client Stories"],
    ["insights.html", "Insights"]
  ];

  var page = location.pathname.split("/").pop() || "index.html";
  if (page.indexOf(".") === -1) page += ".html";

  var links = MENU.map(function (item) {
    var current = item[0] === page;
    return '<a href="' + item[0] + '"' +
      (current ? ' class="active" aria-current="page"' : "") + ">" + item[1] + "</a>";
  }).join("");

  document.currentScript.insertAdjacentHTML("beforebegin",
    '<a href="#main" class="skip-link">Skip to content</a>' +
    '<div class="topbar"><div class="container topbar-inner">' +
      "<span>Construction accounting, financial intelligence and advisory</span>" +
      '<div class="topbar-links"><a href="' + CONTACT_URL + '">Contact Us</a></div>' +
    "</div></div>" +
    '<header class="header" id="site-header"><div class="container header-inner">' +
      '<a href="index.html" class="logo" aria-label="Pallium Construction Accountants home">' +
        '<img src="pal-logo-header.png" alt="Pallium Construction Accountants" width="98" height="98">' +
      "</a>" +
      '<nav class="nav" id="main-nav" aria-label="Main navigation">' + links +
        '<a href="' + BOOKING_URL + '" class="chrome-btn nav-mobile-cta">Book a Discovery Meeting</a>' +
      "</nav>" +
      '<div class="header-actions"><a href="' + BOOKING_URL + '" class="chrome-btn">Book a Discovery Meeting</a></div>' +
      '<button class="menu-toggle" type="button" aria-label="Open menu" aria-controls="main-nav" aria-expanded="false">' +
        '<span class="hamburger" aria-hidden="true"><span></span><span></span><span></span></span>' +
      "</button>" +
    "</div></header>");

  var header = document.getElementById("site-header");
  var toggle = header.querySelector(".menu-toggle");
  var nav = document.getElementById("main-nav");

  function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", function (event) {
    if (!header.contains(event.target)) setMenu(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1200) setMenu(false);
  });
})();
