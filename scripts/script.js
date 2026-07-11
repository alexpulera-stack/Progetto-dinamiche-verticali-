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

/* Attiva un filtro su corsi.html se è presente il parametro `filter` (es. corsi.html?filter=irata) */
document.addEventListener("DOMContentLoaded", function () {
  var page = window.location.pathname.split("/").pop();
  if (page !== "corsi.html") return;
  var params = new URLSearchParams(window.location.search);
  var f =
    params.get("filter") ||
    (window.location.hash ? window.location.hash.replace("#", "") : null);
  if (!f) return;
  var btn = document.querySelector(
    '.courses-filter-btn[data-filter="' + f + '"]',
  );
  if (btn) {
    btn.click();
    var controls = document.querySelector(".formazione-controls");
    if (controls && typeof controls.scrollIntoView === "function")
      controls.scrollIntoView({ behavior: "smooth" });
  }
});

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

function buildCourseEnrollmentModal(courseTitle, sessions) {
  var modal = document.createElement("div");
  modal.className = "enroll-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="enroll-modal-backdrop" data-enroll-close="true"></div>
    <div class="enroll-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="enroll-modal-title">
      <button type="button" class="enroll-modal-close" aria-label="Chiudi modulo" data-enroll-close="true">
        <span class="material-symbols-outlined" aria-hidden="true">close</span>
      </button>
      <div class="enroll-modal-head">
        <p class="enroll-modal-kicker">Pre-iscrizione corso</p>
        <h3 id="enroll-modal-title">${courseTitle}</h3>
        <p>Compila il modulo e ti ricontatteremo rapidamente per confermare disponibilita e iscrizione.</p>
      </div>
      <div class="enroll-modal-body">
        <form class="enroll-modal-form" novalidate>
          <div class="enroll-form-row">
            <label>
              Nome e Cognome
              <input type="text" name="nome" placeholder="Mario Rossi" required />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="mario@esempio.it" required />
            </label>
          </div>
          <div class="enroll-form-row">
            <label>
              Telefono
              <input type="tel" name="telefono" placeholder="+39 ..." />
            </label>
            <div class="enroll-session-picker">
              <p class="enroll-session-title" id="enroll-session-title">Sessione preferita</p>
              <input type="hidden" name="sessione" value="${sessions[0] ? sessions[0].value : "Da concordare"}" />
              <div class="enroll-session-options" role="radiogroup" aria-labelledby="enroll-session-title">
                ${sessions
                  .map(function (s, i) {
                    return `<button type="button" class="enroll-session-option${i === 0 ? " is-selected" : ""}" role="radio" aria-checked="${i === 0 ? "true" : "false"}" tabindex="${i === 0 ? "0" : "-1"}" data-session-value="${s.value}"><span class="enroll-session-option-date">${s.value}</span><span class="enroll-session-option-meta">${[s.spots, s.price].filter(Boolean).join(" • ") || "Data da concordare"}</span></button>`;
                  })
                  .join("")}
              </div>
            </div>
          </div>
          <label>
            Messaggio
            <textarea name="messaggio" rows="4" placeholder="Note aggiuntive (es. preferenze date/alloggio)"></textarea>
          </label>
          <div class="enroll-modal-actions">
            <button type="submit" class="btn btn-primary">Invia pre-iscrizione</button>
          </div>
        </form>
      </div>
    </div>
  `;
  return modal;
}

function buildCourseStayBox() {
  var box = document.createElement("aside");
  box.className = "enroll-stay-box";
  box.setAttribute("data-stay-box", "true");
  box.innerHTML = `
    <div class="enroll-stay-summary">
      <div class="enroll-stay-summary-copy">
        <h4>Hai bisogno di un alloggio durante il corso?</h4>
        <p class="enroll-stay-sub">Abbiamo selezionato strutture convenzionate vicino alla sede di formazione per rendere piu semplice la tua partecipazione.</p>
      </div>
      <button type="button" class="enroll-stay-toggle" aria-expanded="false">
        <span>Visualizza alloggi</span>
        <span class="material-symbols-outlined" aria-hidden="true">expand_more</span>
      </button>
    </div>

    <div class="enroll-stay-panel">
      <div class="enroll-stay-group">
        <div class="enroll-stay-group-head">
          <h5>Convenzionati</h5>
        </div>
        <div class="enroll-stay-scroller" role="list">
          <article class="enroll-stay-card" role="listitem">
            <img src="https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?auto=format&fit=crop&w=960&q=80" alt="Holiday Inn Hotel Torino" loading="lazy" />
            <div class="enroll-stay-card-body">
              <strong>Holiday Inn Hotel</strong>
              <p class="enroll-stay-meta">Hotel - 10 min dalla sede</p>
              <span>Piazza Massaua 21, Torino</span>
              <p class="enroll-stay-benefit">Tariffa convenzionata per corsisti su disponibilita.</p>
              <div class="enroll-stay-card-actions">
                <a href="tel:011740187"><span class="material-symbols-outlined" aria-hidden="true">call</span>Chiama</a>
                <a href="https://www.hiturin.it/" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined" aria-hidden="true">language</span>Visita sito</a>
              </div>
            </div>
          </article>

          <article class="enroll-stay-card" role="listitem">
            <img src="https://www.lasforzata.com/site/wp-content/uploads/2019/11/DSC03322-1024x764-613x600.jpg" alt="Agriturismo La Sforzata" loading="lazy" />
            <div class="enroll-stay-card-body">
              <strong>Agriturismo La Sforzata</strong>
              <p class="enroll-stay-meta">Agriturismo - 14 min dalla sede</p>
              <span>Via Pianezza 69, Collegno</span>
              <p class="enroll-stay-benefit">Supporto prenotazione dedicato ai partecipanti.</p>
              <div class="enroll-stay-card-actions">
                <a href="tel:0114559880"><span class="material-symbols-outlined" aria-hidden="true">call</span>Chiama</a>
                <a href="https://www.lasforzata.com/site/" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined" aria-hidden="true">language</span>Visita sito</a>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="enroll-stay-group">
        <div class="enroll-stay-group-head">
          <h5>Altro nelle vicinanze</h5>
        </div>
        <div class="enroll-stay-scroller" role="list">
          <article class="enroll-stay-card" role="listitem">
            <img src="https://www.cascinamarchesaresort.com/images/fotogallery/FG13_fg001.jpg" alt="Cascina Marchesa" loading="lazy" />
            <div class="enroll-stay-card-body">
              <strong>Cascina Marchesa</strong>
              <p class="enroll-stay-meta">Residence/Hotel - 9 min dalla sede</p>
              <span>Corso Regina Margherita 371/10, Torino</span>
              <p class="enroll-stay-benefit">Posizione comoda per raggiungere il centro formazione.</p>
              <div class="enroll-stay-card-actions">
                <a href="tel:0114553515"><span class="material-symbols-outlined" aria-hidden="true">call</span>Chiama</a>
                <a href="https://www.cascinamarchesaresort.com/" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined" aria-hidden="true">language</span>Visita sito</a>
              </div>
            </div>
          </article>

          <article class="enroll-stay-card" role="listitem">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=960&q=80" alt="Residenza delle Alpi" loading="lazy" />
            <div class="enroll-stay-card-body">
              <strong>Residenza delle Alpi</strong>
              <p class="enroll-stay-meta">Residence - 12 min dalla sede</p>
              <span>Via Privata Caselette 17, Torino</span>
              <p class="enroll-stay-benefit">Buona soluzione per permanenze su piu giorni.</p>
              <div class="enroll-stay-card-actions">
                <a href="tel:0114553515"><span class="material-symbols-outlined" aria-hidden="true">call</span>Chiama</a>
                <a href="http://www.residenzadellealpi.it/" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined" aria-hidden="true">language</span>Visita sito</a>
              </div>
            </div>
          </article>

          <article class="enroll-stay-card" role="listitem">
            <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=960&q=80" alt="Vadala Bed and Breakfast" loading="lazy" />
            <div class="enroll-stay-card-body">
              <strong>Vadala Bed & Breakfast</strong>
              <p class="enroll-stay-meta">B&B - 8 min dalla sede</p>
              <span>Via Pianezza 178B, Torino</span>
              <p class="enroll-stay-benefit">Soluzione essenziale e vicina per trasferta breve.</p>
              <div class="enroll-stay-card-actions">
                <a href="tel:01173911686"><span class="material-symbols-outlined" aria-hidden="true">call</span>Chiama</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  `;

  return box;
}

function initCourseStayDropdown(scope) {
  var root = scope || document;
  var boxes =
    root.matches && root.matches(".enroll-stay-box[data-stay-box='true']")
      ? [root]
      : root.querySelectorAll(".enroll-stay-box[data-stay-box='true']");
  if (!boxes.length) return;

  boxes.forEach(function (box, index) {
    if (box.dataset.stayDropdownReady === "true") return;

    var toggle = box.querySelector(".enroll-stay-toggle");
    var panel = box.querySelector(".enroll-stay-panel");
    if (!toggle || !panel) return;

    var panelId = "enroll-stay-panel-" + index + "-" + Date.now();
    panel.id = panelId;
    toggle.setAttribute("aria-controls", panelId);

    box.classList.add("is-collapsed");

    toggle.addEventListener("click", function () {
      var isExpanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
      box.classList.toggle("is-collapsed", isExpanded);
      box.classList.toggle("is-expanded", !isExpanded);
      toggle.querySelector("span").textContent = isExpanded
        ? "Visualizza alloggi"
        : "Nascondi alloggi";
    });

    box.dataset.stayDropdownReady = "true";
  });
}

var courseStaySwiperAssetsPromise = null;

function ensureCourseStaySwiperAssets() {
  if (window.Swiper) return Promise.resolve();
  if (courseStaySwiperAssetsPromise) return courseStaySwiperAssetsPromise;

  courseStaySwiperAssetsPromise = new Promise(function (resolve, reject) {
    if (!document.querySelector("link[data-course-stay-swiper-css='true']")) {
      var cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
      cssLink.setAttribute("data-course-stay-swiper-css", "true");
      document.head.appendChild(cssLink);
    }

    if (window.Swiper) {
      resolve();
      return;
    }

    var scriptEl = document.createElement("script");
    scriptEl.src =
      "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    scriptEl.onload = function () {
      resolve();
    };
    scriptEl.onerror = function () {
      reject(new Error("Impossibile caricare Swiper"));
    };
    document.body.appendChild(scriptEl);
  });

  return courseStaySwiperAssetsPromise;
}

function initCourseStaySwipers(scope) {
  var root = scope || document;
  var scrollers = root.querySelectorAll(".enroll-stay-scroller");
  if (!scrollers.length) return;

  ensureCourseStaySwiperAssets()
    .then(function () {
      Array.from(scrollers).forEach(function (scroller) {
        if (scroller.dataset.staySwiperReady === "true") return;

        var cards = Array.from(scroller.querySelectorAll(".enroll-stay-card"));
        if (!cards.length) return;

        var wrapper = document.createElement("div");
        wrapper.className = "swiper-wrapper";

        cards.forEach(function (card) {
          card.classList.add("swiper-slide");
          wrapper.appendChild(card);
        });

        scroller.innerHTML = "";
        scroller.classList.add("enroll-stay-swiper", "swiper");
        scroller.appendChild(wrapper);

        new Swiper(scroller, {
          slidesPerView: "auto",
          spaceBetween: 10,
          grabCursor: true,
        });

        scroller.dataset.staySwiperReady = "true";
      });
    })
    .catch(function () {
      /* Mantiene fallback CSS scroll se Swiper non carica. */
    });
}

function enhanceCourseDateSection(ctaBlock) {
  var bookingCard = document.querySelector(".course-booking-card");
  if (!bookingCard || !ctaBlock) return;

  bookingCard.classList.add("course-booking-card--enhanced");

  var title = bookingCard.querySelector("h3");
  if (title) {
    title.textContent = "Prossime date disponibili";
  }

  var subtitle = bookingCard.querySelector(".course-booking-sub");
  if (!subtitle && title) {
    subtitle = document.createElement("p");
    subtitle.className = "course-booking-sub";
    subtitle.textContent =
      "Scegli la sessione piu adatta e assicurati il tuo posto al corso.";
    title.insertAdjacentElement("afterend", subtitle);
  }

  var primaryButton = ctaBlock.querySelector(".btn.btn-primary");
  if (primaryButton) {
    primaryButton.classList.remove("course-primary-fallback");
    primaryButton.removeAttribute("aria-hidden");
    primaryButton.textContent = "Iscriviti ora";
  }

  var secondaryInfoButton = ctaBlock.querySelector(".btn-secondary");
  if (secondaryInfoButton) {
    secondaryInfoButton.classList.add("course-info-hidden");
    secondaryInfoButton.setAttribute("aria-hidden", "true");
    secondaryInfoButton.tabIndex = -1;
  }

  var sessions = bookingCard.querySelectorAll(".session-card");
  sessions.forEach(function (card) {
    card.classList.add("session-card--enhanced");

    var spots = card.querySelector(".session-spots");
    if (spots) {
      spots.classList.add("session-spots-badge");
    }

    var sessionButton = card.querySelector(".session-enroll-btn");
    if (sessionButton) {
      sessionButton.remove();
    }
  });
}

function setupCourseEnrollmentFlow(ctaBlock, courseTitle) {
  enhanceCourseDateSection(ctaBlock);

  var enrollButton = ctaBlock.querySelector(".btn.btn-primary");
  if (!enrollButton) return;

  var sessions = Array.from(document.querySelectorAll(".session-card")).map(
    function (card, index) {
      var range = card.querySelector(".session-range");
      var spots = card.querySelector(".session-spots");
      var price = card.querySelector(".session-price-tag");
      var rangeText = range
        ? range.textContent.trim()
        : "Sessione " + (index + 1);
      var spotsText = spots ? spots.textContent.trim() : "";
      var priceText = price ? price.textContent.trim() : "";
      return {
        value: rangeText,
        spots: spotsText,
        price: priceText,
      };
    },
  );

  if (!sessions.length) {
    sessions = [{ value: "Da concordare", spots: "", price: "" }];
  }

  var modal = buildCourseEnrollmentModal(courseTitle, sessions);
  document.body.appendChild(modal);

  var closeModal = function () {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("enroll-modal-open");
  };

  var openModal = function () {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("enroll-modal-open");
    var firstField = modal.querySelector("input[name='nome']");
    if (firstField) firstField.focus();
  };

  enrollButton.addEventListener("click", function (event) {
    event.preventDefault();
    openModal();
  });

  modal.addEventListener("click", function (event) {
    if (event.target.closest("[data-enroll-close='true']")) {
      closeModal();
    }
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  var form = modal.querySelector(".enroll-modal-form");
  if (!form) return;

  var sessionInput = form.querySelector("input[name='sessione']");
  var sessionOptions = Array.from(
    form.querySelectorAll(".enroll-session-option"),
  );

  var selectSessionOption = function (targetOption) {
    if (!targetOption || !sessionInput) return;
    sessionOptions.forEach(function (option) {
      var isSelected = option === targetOption;
      option.classList.toggle("is-selected", isSelected);
      option.setAttribute("aria-checked", isSelected ? "true" : "false");
      option.tabIndex = isSelected ? 0 : -1;
    });
    sessionInput.value = targetOption.getAttribute("data-session-value") || "";
  };

  sessionOptions.forEach(function (option, index) {
    option.addEventListener("click", function () {
      selectSessionOption(option);
    });

    option.addEventListener("keydown", function (event) {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        selectSessionOption(option);
        return;
      }

      if (
        event.key !== "ArrowRight" &&
        event.key !== "ArrowDown" &&
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowUp"
      ) {
        return;
      }

      event.preventDefault();
      var direction =
        event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
      var nextIndex =
        (index + direction + sessionOptions.length) % sessionOptions.length;
      var nextOption = sessionOptions[nextIndex];
      selectSessionOption(nextOption);
      nextOption.focus();
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var nome = (data.get("nome") || "").toString().trim();
    var email = (data.get("email") || "").toString().trim();
    if (!nome || !email) {
      form.reportValidity();
      return;
    }

    var telefono = (data.get("telefono") || "").toString().trim();
    var sessione = (data.get("sessione") || "").toString().trim();
    var messaggio = (data.get("messaggio") || "").toString().trim();

    var subject = `Pre-iscrizione ${courseTitle}`;
    var body = [
      `Nome: ${nome}`,
      `Email: ${email}`,
      `Telefono: ${telefono || "-"}`,
      `Corso: ${courseTitle}`,
      `Sessione preferita: ${sessione || "-"}`,
      "",
      "Messaggio:",
      messaggio || "-",
    ].join("\n");

    window.location.href = `mailto:formazione@petzl.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    closeModal();
  });

  if (ctaBlock.querySelector(".enroll-stay-box")) return;

  var stayBox = buildCourseStayBox();
  stayBox.classList.add("enroll-stay-box--cta");

  enrollButton.insertAdjacentElement("afterend", stayBox);
  initCourseStayDropdown(stayBox);
  initCourseStaySwipers(stayBox);
}

/* Auto-inject "Vedi nel calendario" nelle pagine singolo corso */
document.addEventListener("DOMContentLoaded", function () {
  var ctaBlock = document.querySelector(".course-cta-block");
  if (!ctaBlock) return;
  var parts = window.location.pathname.split("/");
  var slug = parts[parts.length - 1].replace(".html", "");
  var inCorsi = parts[parts.length - 2] === "corsi";
  if (!inCorsi) return;

  var backWrap = document.querySelector(".course-back");
  var heroContainer = document.querySelector(".course-page-hero .container");
  if (backWrap && heroContainer) {
    backWrap.classList.add("course-back--top");
    heroContainer.insertBefore(backWrap, heroContainer.firstChild);
  }

  var titleEl = document.querySelector(".course-page-title");
  var courseTitle = titleEl ? titleEl.textContent.trim() : "Corso";
  setupCourseEnrollmentFlow(ctaBlock, courseTitle);

  var link = document.createElement("a");
  link.href = "../calendario.html?corso=" + slug;
  link.className = "course-cal-link";
  link.innerHTML =
    '<span class="material-symbols-outlined" aria-hidden="true">calendar_month</span>Vedi calendario completo';

  var bookingCard = ctaBlock.closest(".course-booking-card");
  var sessionCards = bookingCard
    ? bookingCard.querySelectorAll(".session-card")
    : null;
  var lastSessionCard =
    sessionCards && sessionCards.length
      ? sessionCards[sessionCards.length - 1]
      : null;

  if (lastSessionCard && lastSessionCard.parentNode) {
    lastSessionCard.insertAdjacentElement("afterend", link);
  } else {
    ctaBlock.insertBefore(link, ctaBlock.firstChild);
  }

  initCourseStaySwipers(document);
});

function pillarRedirectInit() {
  var body = document.body;
  if (!body || !body.classList.contains("pillar-redirect-page")) return;

  var params = new URLSearchParams(window.location.search);
  var target = (params.get("target") || "").trim();
  var fallback = (body.getAttribute("data-default-target") || "").trim();
  var selected = target || fallback;

  if (!selected) return;

  var isSafeLocalTarget = /^[a-z0-9-]+\.html$/i.test(selected);
  if (!isSafeLocalTarget) return;

  window.setTimeout(function () {
    window.location.href = selected;
  }, 150);
}

function siteFooter(base) {
  base = base || "";
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.outerHTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col footer-col--company">
        <a href="${base}home.html" class="footer-brand" aria-label="Dinamiche Verticali">
          <img src="${base}../img/logo.svg" alt="Dinamiche Verticali" class="footer-brand-logo">
        </a>
        <p class="footer-company-note">Centro specializzato in formazione per lavori in quota e accesso su fune.</p>
        <p><strong>P.IVA:</strong> 11991170017</p>
        <div class="footer-social" aria-label="Social links">
          <a href="https://www.facebook.com/dinamicheverticalisrl" class="footer-social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M16 8.05C16 3.6 12.42 0 8 0S0 3.6 0 8.05C0 12.08 2.93 15.42 6.75 16v-5.63H4.72V8.05h2.03V6.28c0-2.02 1.2-3.14 3.04-3.14.88 0 1.8.16 1.8.16v1.98h-1.02c-1 0-1.32.63-1.32 1.27v1.5h2.25l-.36 2.32H9.25V16C13.07 15.42 16 12.08 16 8.05z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/dinamiche_verticali/" class="footer-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M8 1.44c2.14 0 2.39.01 3.23.05.78.03 1.2.16 1.49.27.38.15.65.32.94.61.29.29.46.56.61.94.11.29.24.71.27 1.49.04.84.05 1.09.05 3.23s-.01 2.39-.05 3.23c-.03.78-.16 1.2-.27 1.49-.15.38-.32.65-.61.94-.29.29-.56.46-.94.61-.29.11-.71.24-1.49.27-.84.04-1.09.05-3.23.05s-2.39-.01-3.23-.05c-.78-.03-1.2-.16-1.49-.27a2.5 2.5 0 0 1-.94-.61 2.5 2.5 0 0 1-.61-.94c-.11-.29-.24-.71-.27-1.49C1.45 10.39 1.44 10.14 1.44 8s.01-2.39.05-3.23c.03-.78.16-1.2.27-1.49.15-.38.32-.65.61-.94.29-.29.56-.46.94-.61.29-.11.71-.24 1.49-.27C5.61 1.45 5.86 1.44 8 1.44M8 0C5.82 0 5.55.01 4.71.05c-.83.04-1.39.17-1.89.37-.53.2-.98.48-1.42.92-.44.44-.72.89-.92 1.42-.2.5-.33 1.06-.37 1.89C.01 5.55 0 5.82 0 8s.01 2.45.05 3.29c.04.83.17 1.39.37 1.89.2.53.48.98.92 1.42.44.44.89.72 1.42.92.5.2 1.06.33 1.89.37.84.04 1.11.05 3.29.05s2.45-.01 3.29-.05c.83-.04 1.39-.17 1.89-.37.53-.2.98-.48 1.42-.92.44-.44.72-.89.92-1.42.2-.5.33-1.06.37-1.89.04-.84.05-1.11.05-3.29s-.01-2.45-.05-3.29c-.04-.83-.17-1.39-.37-1.89a3.94 3.94 0 0 0-.92-1.42 3.94 3.94 0 0 0-1.42-.92c-.5-.2-1.06-.33-1.89-.37C10.45.01 10.18 0 8 0z"/>
              <path d="M8 3.89A4.11 4.11 0 1 0 8 12.1 4.11 4.11 0 0 0 8 3.89zm0 6.78A2.67 2.67 0 1 1 8 5.33a2.67 2.67 0 0 1 0 5.34z"/>
              <circle cx="12.27" cy="3.73" r="0.96"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/dinamiche-verticali-srl/" class="footer-social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M1.15 2.1a1.1 1.1 0 1 1 2.2 0 1.1 1.1 0 0 1-2.2 0zM1.4 4.2h1.7V14H1.4zM5.2 4.2h1.63v1.34h.02c.23-.43.78-1.34 2.67-1.34 2.85 0 3.38 1.87 3.38 4.31V14h-1.7V9.08c0-1.17-.02-2.68-1.63-2.68-1.63 0-1.88 1.27-1.88 2.59V14H5.2z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/@DV_Formazione" class="footer-social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M15.67 4.66a2 2 0 0 0-1.4-1.42C13.03 2.9 8 2.9 8 2.9s-5.03 0-6.27.34a2 2 0 0 0-1.4 1.42C0 5.93 0 8 0 8s0 2.07.33 3.34a2 2 0 0 0 1.4 1.42C2.97 13.1 8 13.1 8 13.1s5.03 0 6.27-.34a2 2 0 0 0 1.4-1.42C16 10.07 16 8 16 8s0-2.07-.33-3.34zM6.4 10.4V5.6L10.4 8l-4 2.4z"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h3>Corsi</h3>
        <ul>
          <li><a href="${base}corsi.html?filter=irata" class="footer-course-pill" style="--cat:#1e40af;"><span class="filter-dot" aria-hidden="true"></span>IRATA</a></li>
          <li><a href="${base}corsi.html?filter=gwo" class="footer-course-pill" style="--cat:#db2777;"><span class="filter-dot" aria-hidden="true"></span>GWO</a></li>
          <li><a href="${base}corsi.html?filter=accreditati" class="footer-course-pill" style="--cat:#0891b2;"><span class="filter-dot" aria-hidden="true"></span>DPI III Categoria</a></li>
          <li><a href="${base}corsi.html?filter=quota" class="footer-course-pill" style="--cat:#ca8a04;"><span class="filter-dot" aria-hidden="true"></span>Lavori in Quota</a></li>
          <li><a href="${base}corsi.html?filter=soccorso" class="footer-course-pill" style="--cat:#dc2626;"><span class="filter-dot" aria-hidden="true"></span>Spazi Confinati</a></li>
        </ul>
      </div>
      <div class="footer-col footer-col--certs">
        <h3>Certificazioni</h3>
        <div class="footer-cert-logos">
          <img src="https://www.dvformazione.it/img/loghi/logo-petzl-technical-institute.jpg" alt="Petzl Technical Institute" class="footer-cert-logo">
          <img src="https://www.dvformazione.it/img/loghi/logo-irata-international.jpg" alt="IRATA International" class="footer-cert-logo">
          <img src="https://www.dvformazione.it/img/loghi/logo-global-wind-organisation.jpg" alt="Global Wind Organisation" class="footer-cert-logo">
        </div>
      </div>
      <div class="footer-col footer-col--contacts">
        <h3>Contatti</h3>
        <ul class="footer-contact-list">
          <li class="footer-contact-item">
            <span class="material-symbols-outlined footer-contact-icon" aria-hidden="true">location_on</span>
            <span>Via G. Battista Feroggio, 54, 10151 Torino</span>
          </li>
          <li class="footer-contact-item">
            <span class="material-symbols-outlined footer-contact-icon" aria-hidden="true">call</span>
            <a href="tel:+390112732500">+39 011 27 32 500</a>
          </li>
          <li class="footer-contact-item">
            <span class="material-symbols-outlined footer-contact-icon" aria-hidden="true">mail</span>
            <a href="mailto:formazione@petzl.it">formazione@petzl.it</a>
          </li>
          <li class="footer-contact-item">
            <span class="material-symbols-outlined footer-contact-icon" aria-hidden="true">schedule</span>
            <span>(dal Lun al Ven) 08:30 - 17:30</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Dinamiche Verticali Formazione srl. Tutti i diritti riservati.</p>
      <p class="footer-legal-links">
        <a href="#">Privacy Policy</a>
        <span aria-hidden="true">|</span>
        <a href="#">Cookie Policy</a>
        <span aria-hidden="true">|</span>
        <a href="#">Preferenze sui cookie</a>
      </p>
    </div>
  </div>
</footer>`;
}
