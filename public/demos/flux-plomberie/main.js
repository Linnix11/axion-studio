(function () {
  'use strict';
  var root = document.documentElement;

  // Apparition discrète au défilement (rien si mouvement réduit)
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('js-anim');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }

  var form = document.getElementById('form');
  if (!form) return;
  var erreur = document.getElementById('erreur');
  var ok = document.getElementById('ok');

  // Les liens « Devis » ou « Demander un dépannage » présélectionnent le type de demande
  document.querySelectorAll('a[data-mode]').forEach(function (a) {
    a.addEventListener('click', function () {
      var r = form.querySelector('input[name="mode"][value="' + a.dataset.mode + '"]');
      if (r) r.checked = true;
    });
  });

  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid')) e.target.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var champs = form.querySelectorAll('input, select, textarea');
    var premier = null;
    champs.forEach(function (c) {
      if (c.willValidate && !c.checkValidity()) {
        c.setAttribute('aria-invalid', 'true');
        if (!premier) premier = c;
      } else {
        c.removeAttribute('aria-invalid');
      }
    });
    if (premier) {
      var label = form.querySelector('label[for="' + premier.id + '"]');
      erreur.textContent = 'Vérifiez le champ « ' + (label ? label.textContent.replace(' *', '') : 'obligatoire') + ' ».';
      erreur.hidden = false;
      ok.hidden = true;
      premier.focus();
      return;
    }
    erreur.hidden = true;
    form.reset();
    ok.hidden = false;
    ok.focus();
  });
})();
