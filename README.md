# Dinamiche Verticali Formazione - Scheda Tecnica

## Obiettivo

Sito statico professionale per corsi in quota (IRATA, GWO, PTI, DPI), ottimizzato per SEO, conversione e usabilita su mobile, tablet e desktop.

## Stack e librerie

- HTML5 semantico
- CSS modulare (reset, token, componenti, breakpoint, stili pagina)
- JavaScript vanilla
- Swiper.js per animazioni e scroll orizzontale degli slider (corsi, testimonial, alloggi)
- FullCalendar per visualizzazione e gestione del calendario corsi (home + pagina calendario)

## Struttura progetto

- index.html: home
- site/: pagine principali, corsi singoli, blog e articoli
- style/: reset.css, variables.css, components.css, breakpoints.css, css specifici pagina
- scripts/script.js: logica condivisa UI
- img/: asset grafici

## Implementazione

### Architettura frontend

- CSS a layer separati per manutenibilita e scalabilita.
- Token colori rinominati semanticamente: --blue-navy e --blue-navy-dark.
- Componenti condivisi + override per pagina per limitare regressioni.

### Logica JavaScript

- Navbar/footer dinamici, setup slider, interazioni globali.
- Modal pre-iscrizione corsi con pricing dinamico:
  - formula individuale
  - formula aziendale
  - sconto aziendale 10%
  - totale calcolato in tempo reale e riepilogo nel mailto

## SEO tecnico

- Metadati base su tutte le pagine: title, description, canonical, robots.
- Open Graph e Twitter Cards completi.
- JSON-LD (Article) sui contenuti editoriali.
- Correzioni strutturali su link/CTA/attributi per coerenza semantica.

## Responsive e UX

- Breakpoint principali: 1080, 900, 768, 520.
- Riduzione rigidita componenti (meno height fisse, piu min-height/auto).
- Aspect-ratio controllati per immagini e card.
- Ottimizzazione spaziature, dimensioni hero e densita card su piccoli schermi.
- Verifiche anti-overflow su viewport reali.

## QA e validazione

- Controlli errori editor sui file modificati.
- Test visuali su mobile/tablet/desktop.
- Audit SEO/social metadata completato.
- Verifica regressioni su card, hover, bottoni, modal e layout.

## Avvio locale

1. Aprire la cartella in VS Code.
2. Aprire index.html o usare un server statico locale.
3. Visitare: site/corsi.html, site/blog.html, site/calendario.html, site/contatti.html.

## Traccia breve per presentazione coding

1. Problema iniziale: SEO incompleto + incoerenze UI/responsive.
2. Strategia: architettura modulare + audit iterativi.
3. Implementazione: metadata SEO, ottimizzazione responsive, modal pricing avanzato.
4. Risultato: piattaforma piu indicizzabile, flessibile e pronta a evoluzioni.
