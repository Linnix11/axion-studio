// Ampère & Fils : démo Axion Studio. Apparitions discrètes, bouton mobile, formulaire qui n'envoie rien.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Apparitions au défilement
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  // Bouton « Demander un devis » mobile : masqué quand le formulaire est visible
  var cta = document.querySelector('.cta-mobile');
  var devis = document.getElementById('devis');
  if (cta && devis && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      cta.classList.toggle('is-hidden', entries[0].isIntersecting);
    }).observe(devis);
  }

  // Formulaire de devis : vérifie, puis n'envoie rien
  var form = document.getElementById('devis-form');
  if (!form) return;
  var statut = form.querySelector('.statut');
  var btn = form.querySelector('button[type="submit"]');
  btn.disabled = false;

  var checks = [
    ['f-type', 'e-type', function (v) { return v ? '' : 'Choisissez un type de travaux.'; }],
    ['f-cp', 'e-cp', function (v) { return /^\d{5}$/.test(v) ? '' : 'Indiquez un code postal à 5 chiffres.'; }],
    ['f-desc', 'e-desc', function (v) { return v.length >= 10 ? '' : 'Décrivez vos travaux en quelques mots.'; }],
    ['f-nom', 'e-nom', function (v) { return v ? '' : 'Indiquez votre nom.'; }],
    ['f-mail', 'e-mail', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Indiquez une adresse e-mail valide.'; }]
  ];

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var first = null;
    checks.forEach(function (c) {
      var input = document.getElementById(c[0]);
      var msg = c[2](input.value.trim());
      document.getElementById(c[1]).textContent = msg;
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg && !first) first = input;
    });
    var radio = form.querySelector('input[name="logement"]');
    var logementOk = !!form.querySelector('input[name="logement"]:checked');
    document.getElementById('e-logement').textContent = logementOk ? '' : 'Précisez le type de logement.';
    if (!logementOk && !first) first = radio;

    if (first) { statut.innerHTML = ''; first.focus(); return; }

    var n = document.getElementById('f-photos').files.length;
    statut.innerHTML = '<strong>Démo : rien n’a été envoyé.</strong>' +
      '<p>' + (n ? n + ' photo' + (n > 1 ? 's' : '') + ' sélectionnée' + (n > 1 ? 's' : '') + ', restée' + (n > 1 ? 's' : '') + ' sur votre appareil. ' : '') +
      'Chez un vrai client, la demande serait classée avec ses photos, un devis préparé à partir des informations reçues, ' +
      'une visite proposée dans l’agenda de l’entreprise, et une relance envoyée si le devis reste sans réponse.</p>';
  });
})();
