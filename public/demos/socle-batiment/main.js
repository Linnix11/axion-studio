(function () {
  'use strict';
  var items = document.querySelectorAll('.reveal, .frise');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });

    // Cache le bouton fixe quand le formulaire est à l'écran.
    var cta = document.querySelector('.sticky-cta');
    var projet = document.getElementById('projet');
    if (cta && projet) {
      new IntersectionObserver(function (entries) {
        cta.classList.toggle('is-hidden', entries[0].isIntersecting);
      }).observe(projet);
    }
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Démo : le formulaire n'envoie rien.
  var form = document.getElementById('form-projet');
  var done = document.getElementById('form-done');
  if (form && done) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      done.hidden = false;
      done.focus();
    });
  }
})();
