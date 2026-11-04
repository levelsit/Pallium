/* =========================================================
   PALLIUM SHARED FOOTER
   To change the footer or mobile booking bar, edit only this
   file. Each page places it with: <script src="footer.js"></script>
========================================================= */
(function () {
  var CONTACT_URL = "/contact";
  var BOOKING_URL = "/discovery-meeting";
  var PHONE_DISPLAY = "1300 339 123";
  var PHONE_LINK = "1300339123";

  var COLUMNS = [
    ["Who We Help", [
      ["who-we-help.html#builders", "Builders"],
      ["who-we-help.html#civil-contractors", "Civil Contractors"],
      ["who-we-help.html#trade-contractors", "Major Trade Contractors"],
      ["who-we-help.html#property-developers", "Property Developers"],
      ["who-we-help.html#construction-consultants", "Construction Industry Consultants"]
    ]],
    ["How We Help", [
      ["how-we-help.html#services", "All Services"],
      ["how-we-help.html#construction-accounting", "Construction Accounting"],
      ["how-we-help.html#project-profitability", "Project Profitability &amp; Job Costing"],
      ["how-we-help.html#tax-planning", "Tax Planning &amp; Structuring"],
      ["how-we-help.html#cfo-advisory", "CFO &amp; Strategic Advisory"],
      ["how-we-help.html#banking-finance", "Banking &amp; Finance Support"]
    ]],
    ["Pallium", [
      ["why-pallium.html", "Why Pallium"],
      ["client-stories.html", "Client Stories"],
      ["insights.html", "Insights"],
      [CONTACT_URL, "Contact"],
      [BOOKING_URL, "Book a Discovery Meeting"]
    ]]
  ];

  var columns = COLUMNS.map(function (column) {
    return "<div>" +
      '<h2 class="footer-title">' + column[0] + "</h2><ul>" +
      column[1].map(function (link) {
        return '<li><a href="' + link[0] + '">' + link[1] + "</a></li>";
      }).join("") +
      "</ul></div>";
  }).join("");

  document.currentScript.insertAdjacentHTML("beforebegin",
    '<footer class="footer"><div class="container"><div class="footer-grid">' +
      '<div><a href="index.html" aria-label="Pallium home">' +
        '<img src="pal-logo-white.png" class="footer-logo" alt="Pallium Construction Accountants" width="150" height="115">' +
      "</a>" +
      '<p class="footer-about">Accountants built exclusively for construction businesses.</p>' +
      '<a href="tel:' + PHONE_LINK + '" class="footer-phone">' + PHONE_DISPLAY + "</a></div>" +
      columns +
    "</div>" +
    '<div class="footer-bottom"><span>&copy; ' + new Date().getFullYear() +
      " Pallium Construction Accountants. All rights reserved.</span>" +
      "<span>Specialist accounting and advisory for construction.</span></div>" +
    "</div></footer>" +
    '<div class="mobile-cta" id="mobile-cta"><a href="' + BOOKING_URL + '" class="chrome-btn">Book a Discovery Meeting</a></div>');

  if (!("IntersectionObserver" in window)) return;

  /* Hide the mobile booking bar at the page's final call to action */
  var bar = document.getElementById("mobile-cta");
  var finalCta = document.getElementById("contact");
  if (finalCta) {
    new IntersectionObserver(function (entries) {
      bar.classList.toggle("hidden", entries[0].isIntersecting);
    }, { threshold: 0.15 }).observe(finalCta);
  }

  /* Footer columns fade up on pages using the scroll animations */
  if (document.documentElement.classList.contains("js-anim")) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("footer-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".footer-grid > *").forEach(function (column, index) {
      column.style.setProperty("--reveal-delay", index * 110 + "ms");
      observer.observe(column);
    });
  }
})();
