const search = document.getElementById("search");

if (search) {
  search.addEventListener("keyup", () => {
    const value = search.value.toLowerCase();

    document.querySelectorAll(".course-card").forEach((card) => {
      card.style.display = card.innerText.toLowerCase().includes(value)
        ? "block"
        : "none";
    });
  });
}

const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    document.querySelectorAll(".course-card").forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
      } else {
        if (card.classList.contains(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });
  });
});

function navBar(base, activePage) {
  base = base || "";
  const currentPage =
    activePage ||
    (window.location.pathname.split("/").pop() || "home.html").toLowerCase();

  const navLink = (href, label, icon) => {
    const isActive = currentPage === href;
    return `<li><a href="${base}${href}"${isActive ? ' class="is-active" aria-current="page"' : ""}>
      <span class="material-symbols-outlined nav-icon" aria-hidden="true">${icon}</span>
      <span class="nav-label">${label}</span>
    </a></li>`;
  };

  document.querySelector("body").innerHTML = `<nav class="navbar">
      <div class="container">
        <img src="${base}../img/logo.svg" class="logo" alt="Dinamiche Verticali" />
        <ul class="nav-links" id="mobile-menu">
          ${navLink("home.html", "Home", "home")}
          ${navLink("corsi.html", "Corsi", "school")}
          ${navLink("calendario.html", "Calendario", "calendar_month")}
          ${navLink("blog.html", "Blog", "article")}
          ${navLink("contatti.html", "Contatti", "mail")}
        </ul>
      </div>
    </nav>`;

  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const navToggle = navbar.querySelector(".nav-toggle");
  const navLinks = navbar.querySelector(".nav-links");

  const toggleStickyBorder = () => {
    navbar.classList.toggle("is-stuck", window.scrollY > 0);
  };

  toggleStickyBorder();
  window.addEventListener("scroll", toggleStickyBorder, { passive: true });

  if (navToggle && navLinks) {
    const closeMenu = () => {
      navbar.classList.remove("is-menu-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Apri menu");
    };

    const openMenu = () => {
      navbar.classList.add("is-menu-open");
      document.body.classList.add("nav-open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Chiudi menu");
    };

    navToggle.addEventListener("click", () => {
      if (navbar.classList.contains("is-menu-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }
}

/* Auto-inject "Vedi nel calendario" nelle pagine singolo corso */
document.addEventListener("DOMContentLoaded", function () {
  var ctaBlock = document.querySelector(".course-cta-block");
  if (!ctaBlock) return;
  var parts = window.location.pathname.split("/");
  var slug = parts[parts.length - 1].replace(".html", "");
  var inCorsi = parts[parts.length - 2] === "corsi";
  if (!inCorsi) return;
  var link = document.createElement("a");
  link.href = "../calendario.html?corso=" + slug;
  link.className = "course-cal-link";
  link.innerHTML =
    '<span class="material-symbols-outlined" aria-hidden="true">calendar_month</span>Vedi nel calendario';
  ctaBlock.appendChild(link);
});

function siteFooter(base) {
  base = base || "";
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.outerHTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <h3>Dinamiche Verticali</h3>
        <p>Centro specializzato in formazione per lavori in quota e accesso su fune.</p>
        <p class="footer-address">
          <span class="material-symbols-outlined footer-loc-icon">location_on</span>
          Torino, Italia
        </p>
      </div>
      <div class="footer-col">
        <h3>Corsi</h3>
        <ul>
          <li><a href="${base}irata.html" class="footer-course-pill" style="--cat:#1e40af;"><span class="filter-dot" aria-hidden="true"></span>IRATA</a></li>
          <li><a href="${base}gwo.html" class="footer-course-pill" style="--cat:#db2777;"><span class="filter-dot" aria-hidden="true"></span>GWO</a></li>
          <li><a href="${base}dpi.html" class="footer-course-pill" style="--cat:#0891b2;"><span class="filter-dot" aria-hidden="true"></span>DPI III Categoria</a></li>
          <li><a href="${base}quota.html" class="footer-course-pill" style="--cat:#ca8a04;"><span class="filter-dot" aria-hidden="true"></span>Lavori in Quota</a></li>
          <li><a href="${base}confinati.html" class="footer-course-pill" style="--cat:#dc2626;"><span class="filter-dot" aria-hidden="true"></span>Spazi Confinati</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Certificazioni</h3>
        <div class="footer-cert-logos">
          <a href="https://www.dvformazione.it/corsi-petzl-dinamiche-verticali.html" target="_blank" rel="noopener noreferrer">
            <img src="https://www.dvformazione.it/img/loghi/logo-petzl-technical-institute.jpg" alt="Petzl Technical Institute" class="footer-cert-logo">
          </a>
          <a href="https://www.dvformazione.it/corsi-irata-dinamiche-verticali.html" target="_blank" rel="noopener noreferrer">
            <img src="https://www.dvformazione.it/img/loghi/logo-irata-international.jpg" alt="IRATA International" class="footer-cert-logo">
          </a>
          <a href="https://www.dvformazione.it/gwo-formazione-certificazione.html" target="_blank" rel="noopener noreferrer">
            <img src="https://www.dvformazione.it/img/loghi/logo-global-wind-organisation.jpg" alt="Global Wind Organisation" class="footer-cert-logo">
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Dinamiche Verticali Formazione. Tutti i diritti riservati.</p>
    </div>
  </div>
</footer>`;
}
