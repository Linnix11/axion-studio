(function () {
  // Apparitions discrètes au défilement
  var blocs = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('vu'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    blocs.forEach(function (b) { io.observe(b); });
  } else {
    blocs.forEach(function (b) { b.classList.add('vu'); });
  }

  // Formulaire de devis : n'envoie rien
  var form = document.getElementById('devis-form');
  if (!form) return;
  var btn = form.querySelector('button[type="submit"]');
  var statut = form.querySelector('.form__statut');
  var photos = document.getElementById('f-photos');
  var aide = document.getElementById('f-photos-info');
  btn.disabled = false;

  photos.addEventListener('change', function () {
    var n = photos.files.length;
    aide.textContent = n
      ? n + (n > 1 ? ' photos choisies' : ' photo choisie') + '. Elles restent sur votre appareil dans cette démo.'
      : 'Les photos restent sur votre appareil dans cette démo.';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var premier = null;
    form.querySelectorAll('[required]').forEach(function (champ) {
      var ok = champ.type === 'radio' ? !!form.querySelector('[name="' + champ.name + '"]:checked') : champ.checkValidity();
      if (champ.type !== 'radio') champ.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !premier) premier = champ;
    });
    statut.className = 'form__statut';
    if (premier) {
      statut.classList.add('erreur');
      statut.textContent = 'Merci de compléter les champs obligatoires (code postal à 5 chiffres).';
      premier.focus();
      return;
    }
    statut.classList.add('ok');
    statut.textContent = '';
    var fort = document.createElement('strong');
    fort.textContent = 'Démo : rien n’a été envoyé.';
    statut.appendChild(fort);
    statut.appendChild(document.createTextNode(
      ' Chez un vrai paysagiste, la demande serait classée automatiquement (création ou entretien, commune, photos jointes), ' +
      'une date de visite vous serait proposée, le devis serait préparé à partir de vos réponses, ' +
      'et pour un contrat d’entretien les passages seraient planifiés directement dans l’agenda.'
    ));
    form.reset();
    aide.textContent = 'Les photos restent sur votre appareil dans cette démo.';
  });
})();
