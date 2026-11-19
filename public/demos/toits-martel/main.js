(function () {
  'use strict';

  // Apparition discrète au défilement
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });

    // Masquer le bouton fixe quand le formulaire est à l'écran
    var cta = document.querySelector('.cta-mobile');
    var devis = document.getElementById('devis');
    if (cta && devis) {
      new IntersectionObserver(function (entries) {
        cta.classList.toggle('is-hidden', entries[0].isIntersecting);
      }).observe(devis);
    }
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Lien « Signaler une urgence » : coche « oui »
  var urgentLink = document.querySelector('[data-urgent]');
  var urgentOui = document.getElementById('f-urgent-oui');
  if (urgentLink && urgentOui) {
    urgentLink.addEventListener('click', function () { urgentOui.checked = true; });
  }

  // Formulaire de démonstration : rien n'est envoyé
  var form = document.getElementById('form-devis');
  var erreur = document.getElementById('form-erreur');
  var ok = document.getElementById('form-ok');
  if (!form) return;

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var invalides = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.willValidate) return;
      var bad = !el.checkValidity();
      if (el.type !== 'radio') el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) invalides.push(el);
    });
    if (invalides.length) {
      ok.hidden = true;
      erreur.textContent = 'Merci de compléter les champs obligatoires (le code postal compte 5 chiffres).';
      erreur.hidden = false;
      invalides[0].focus();
      return;
    }
    erreur.hidden = true;
    ok.hidden = false;
    ok.focus();
  });
})();
