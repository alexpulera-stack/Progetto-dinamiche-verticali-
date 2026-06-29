/**
 * corsi-data.js
 * Fonte dati centralizzata per tutti i 12 corsi.
 * Usata da: site/calendario.html
 * Le date (sessioni.fine) seguono la convenzione FullCalendar: fine ESCLUSIVA.
 */

"use strict";

var CORSI = [
  {
    id: "irata-livello-1",
    titolo: "IRATA Livello 1",
    categoria: "irata",
    colore: "#1e40af",
    prezzo: 890,
    durata: "5 giorni",
    slug: "corsi/irata-livello-1.html",
    sessioni: [
      { inizio: "2026-07-14", fine: "2026-07-19", posti: 3, pochi: true },
      { inizio: "2026-08-04", fine: "2026-08-09", posti: 6 },
      { inizio: "2026-09-08", fine: "2026-09-13", posti: 8 },
    ],
  },
  {
    id: "irata-livello-2",
    titolo: "IRATA Livello 2",
    categoria: "irata",
    colore: "#1e40af",
    prezzo: 1190,
    durata: "5 giorni",
    slug: "corsi/irata-livello-2.html",
    sessioni: [
      { inizio: "2026-07-21", fine: "2026-07-26", posti: 6 },
      { inizio: "2026-08-11", fine: "2026-08-16", posti: 8 },
      { inizio: "2026-09-15", fine: "2026-09-20", posti: 8 },
    ],
  },
  {
    id: "irata-livello-3",
    titolo: "IRATA Livello 3",
    categoria: "irata",
    colore: "#1e40af",
    prezzo: 1490,
    durata: "5 giorni",
    slug: "corsi/irata-livello-3.html",
    sessioni: [
      { inizio: "2026-07-28", fine: "2026-08-02", posti: 4, pochi: true },
      { inizio: "2026-08-18", fine: "2026-08-23", posti: 6 },
      { inizio: "2026-09-22", fine: "2026-09-27", posti: 8 },
    ],
  },
  {
    id: "gwo-bst",
    titolo: "GWO Basic Safety Training",
    categoria: "gwo",
    colore: "#db2777",
    prezzo: 750,
    durata: "4 giorni",
    slug: "corsi/gwo-bst.html",
    sessioni: [
      { inizio: "2026-07-07", fine: "2026-07-11", posti: 8 },
      { inizio: "2026-08-04", fine: "2026-08-08", posti: 10 },
      { inizio: "2026-09-14", fine: "2026-09-18", posti: 10 },
    ],
  },
  {
    id: "fune-accesso",
    titolo: "Accesso e Posizionamento su Fune",
    categoria: "fune",
    colore: "#16a34a",
    prezzo: 390,
    durata: "2 giorni",
    slug: "corsi/fune-accesso.html",
    sessioni: [
      { inizio: "2026-07-10", fine: "2026-07-12", posti: 8 },
      { inizio: "2026-08-07", fine: "2026-08-09", posti: 10 },
      { inizio: "2026-09-17", fine: "2026-09-19", posti: 10 },
    ],
  },
  {
    id: "fune-salvataggio",
    titolo: "Salvataggio su Fune",
    categoria: "fune",
    colore: "#16a34a",
    prezzo: 490,
    durata: "2 giorni",
    slug: "corsi/fune-salvataggio.html",
    sessioni: [
      { inizio: "2026-07-17", fine: "2026-07-19", posti: 6 },
      { inizio: "2026-08-14", fine: "2026-08-16", posti: 8 },
      { inizio: "2026-09-24", fine: "2026-09-26", posti: 10 },
    ],
  },
  {
    id: "fune-aggiornamento",
    titolo: "Aggiornamento Addetto Fune",
    categoria: "fune",
    colore: "#16a34a",
    prezzo: 190,
    durata: "1 giorno",
    slug: "corsi/fune-aggiornamento.html",
    sessioni: [
      { inizio: "2026-07-04", fine: "2026-07-05", posti: 12 },
      { inizio: "2026-08-01", fine: "2026-08-02", posti: 12 },
      { inizio: "2026-09-12", fine: "2026-09-13", posti: 12 },
    ],
  },
  {
    id: "lavori-quota",
    titolo: "Lavori in Quota D.Lgs. 81/08",
    categoria: "quota",
    colore: "#ca8a04",
    prezzo: 280,
    durata: "1 giorno",
    slug: "corsi/lavori-quota.html",
    sessioni: [
      { inizio: "2026-07-11", fine: "2026-07-12", posti: 15 },
      { inizio: "2026-08-08", fine: "2026-08-09", posti: 15 },
      { inizio: "2026-09-19", fine: "2026-09-20", posti: 15 },
    ],
  },
  {
    id: "pti-livello-1",
    titolo: "PTI Livello 1",
    categoria: "pti",
    colore: "#1c1c1e",
    prezzo: 620,
    durata: "4 giorni",
    slug: "corsi/pti-livello-1.html",
    sessioni: [
      { inizio: "2026-07-14", fine: "2026-07-18", posti: 6 },
      { inizio: "2026-08-04", fine: "2026-08-08", posti: 8 },
      { inizio: "2026-09-07", fine: "2026-09-11", posti: 8 },
    ],
  },
  {
    id: "pti-livello-2",
    titolo: "PTI Livello 2",
    categoria: "pti",
    colore: "#1c1c1e",
    prezzo: 820,
    durata: "4 giorni",
    slug: "corsi/pti-livello-2.html",
    sessioni: [
      { inizio: "2026-07-21", fine: "2026-07-25", posti: 4, pochi: true },
      { inizio: "2026-08-11", fine: "2026-08-15", posti: 6 },
      { inizio: "2026-09-14", fine: "2026-09-18", posti: 8 },
    ],
  },
  {
    id: "soccorso-fune",
    titolo: "Tecniche di Soccorso su Fune",
    categoria: "soccorso",
    colore: "#dc2626",
    prezzo: 350,
    durata: "1 giorno",
    slug: "corsi/soccorso-fune.html",
    sessioni: [
      { inizio: "2026-07-12", fine: "2026-07-13", posti: 10 },
      { inizio: "2026-08-09", fine: "2026-08-10", posti: 12 },
      { inizio: "2026-09-20", fine: "2026-09-21", posti: 12 },
    ],
  },
  {
    id: "dpi-anticaduta",
    titolo: "DPI III Categoria \u2013 Anticaduta",
    categoria: "accreditati",
    colore: "#0891b2",
    prezzo: 240,
    durata: "1 giorno",
    slug: "corsi/dpi-anticaduta.html",
    sessioni: [
      { inizio: "2026-07-05", fine: "2026-07-06", posti: 15 },
      { inizio: "2026-08-02", fine: "2026-08-03", posti: 15 },
      { inizio: "2026-09-13", fine: "2026-09-14", posti: 15 },
    ],
  },
];
