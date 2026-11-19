const { gsap, ScrollTrigger, SplitText, Lenis } = window;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const wide = window.matchMedia('(min-width: 900px)');
// État partagé entre le défilement et la scène 3D (chargée plus tard).
const sceneState = { scrollTarget: 0, visible: true };

initForm();

if (!reduce && gsap && ScrollTrigger && SplitText) initMotion();

// 3D : seulement sur grand écran, après le premier affichage.
if (!reduce && wide.matches) {
  afterLoad(async () => {
    try {
      const THREE = await import('../_lib/three.min.js');
      initScene(THREE, document.querySelector('.hero__canvas'), document.querySelector('.hero'));
    } catch { /* le fond CSS reste */ }
  });
}

function afterLoad(cb) {
  const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 2000 }) : setTimeout(cb, 200));
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}

/* ------------------------------------------------------------------ */
/* Formulaire de réservation (démo : n'envoie rien)                     */
/* ------------------------------------------------------------------ */
function initForm() {
  const form = document.getElementById('resa-form');
  if (!form) return;
  const date = form.elements.date;
  const status = form.querySelector('.resa__statut');
  const btn = form.querySelector('button[type="submit"]');
  const pad = (n) => String(n).padStart(2, '0');
  const now = new Date();
  date.min = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  btn.disabled = false;

  const labels = { date: 'la date', heure: 'l’heure', couverts: 'le nombre de couverts', nom: 'votre nom', email: 'votre e-mail' };

  form.addEventListener('input', (e) => {
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) e.target.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = [];
    for (const name of Object.keys(labels)) {
      const field = form.elements[name];
      const ok = field.checkValidity() && field.value.trim() !== '';
      if (ok) field.removeAttribute('aria-invalid');
      else { field.setAttribute('aria-invalid', 'true'); invalid.push(field); }
    }
    status.textContent = '';
    if (invalid.length) {
      status.textContent = `À compléter ou corriger : ${invalid.map((f) => labels[f.name]).join(', ')}.`;
      invalid[0].focus();
      return;
    }
    const [y, m, d] = date.value.split('-').map(Number);
    const jour = new Date(y, m - 1, d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    const n = Number(form.elements.couverts.value);

    const strong = document.createElement('strong');
    strong.textContent = 'Démo : rien n’a été envoyé.';
    const recap = document.createElement('span');
    recap.textContent = ` Demande notée pour ${form.elements.nom.value.trim()}, ${n} couvert${n > 1 ? 's' : ''}, le ${jour} à ${form.elements.heure.value}.`;
    const real = document.createElement('span');
    real.textContent = ' Chez un vrai restaurant, la table serait inscrite directement dans l’agenda de la salle, un e-mail de confirmation partirait aussitôt et un rappel serait envoyé la veille.';
    status.append(strong, recap, document.createElement('br'), real);
  });
}

/* ------------------------------------------------------------------ */
/* Scène three.js : braises qui montent et fumée légère                 */
/* ------------------------------------------------------------------ */
function initScene(THREE, canvas, section) {
  if (!canvas || !section) return;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'low-power' });
  } catch {
    return;
  }
  const pr = Math.min(window.devicePixelRatio || 1, 1);
  renderer.setPixelRatio(pr);
  renderer.setClearColor(0x000000, 0);
  document.documentElement.classList.add('has-3d');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  const count = 320;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = -6 + Math.random() * 9;
    seeds[i * 4] = 0.35 + Math.random() * 0.9; // vitesse
    seeds[i * 4 + 1] = 0.4 + Math.random() * 1.2; // taille
    seeds[i * 4 + 2] = Math.random(); // phase
    seeds[i * 4 + 3] = Math.random(); // teinte
  }
  const uniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uPR: { value: pr },
  };

  const embersGeo = new THREE.BufferGeometry();
  embersGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  embersGeo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 4));
  const embers = new THREE.Points(embersGeo, new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */`
      uniform float uTime;
      uniform float uScroll;
      uniform float uPR;
      uniform vec2 uMouse;
      attribute vec4 aSeed;
      varying float vAlpha;
      varying float vHue;
      void main() {
        vec3 p = position;
        float t = uTime * aSeed.x * 0.7 * (1.0 + uScroll * 2.5) + aSeed.z * 20.0;
        p.y = mod(position.y + 7.0 + t, 14.0) - 7.0;
        p.x += sin(t * 0.8 + aSeed.z * 6.2831) * 0.5 + sin(uTime * 0.3 + aSeed.z * 4.0) * 0.3;
        vec2 d = p.xy - uMouse * vec2(8.0, 5.0);
        float push = exp(-dot(d, d) * 0.3);
        p.xy += normalize(d + 0.0001) * push * 1.4;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float life = (p.y + 7.0) / 14.0;
        float flicker = 0.55 + 0.45 * sin(uTime * 4.0 * aSeed.x + aSeed.z * 40.0);
        vAlpha = smoothstep(0.0, 0.15, life) * (1.0 - smoothstep(0.5, 1.0, life)) * flicker;
        vHue = aSeed.w;
        gl_PointSize = aSeed.y * 28.0 * uPR * (1.0 - life * 0.6) / -mv.z;
      }`,
    fragmentShader: /* glsl */`
      varying float vAlpha;
      varying float vHue;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        vec3 col = mix(vec3(1.0, 0.38, 0.1), vec3(1.0, 0.75, 0.38), vHue);
        gl_FragColor = vec4(col * (0.8 + a), a * a * vAlpha);
      }`,
  }));

  const smoke = new THREE.Mesh(new THREE.PlaneGeometry(30, 18), new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */`
      uniform float uTime;
      uniform float uScroll;
      uniform vec2 uMouse;
      varying vec2 vUv;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      float fbm(vec2 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }
      void main() {
        vec2 p = vUv * vec2(3.2, 2.0);
        p.y -= uTime * 0.05 * (1.0 + uScroll * 2.0);
        p.x += uMouse.x * 0.12 + sin(uTime * 0.05) * 0.3;
        float n = fbm(p + fbm(p + uTime * 0.03));
        float mask = smoothstep(0.0, 0.45, vUv.y) * (1.0 - smoothstep(0.55, 1.0, vUv.y)) * (1.0 - abs(vUv.x - 0.5) * 1.3);
        float a = smoothstep(0.45, 0.85, n) * mask * (0.13 + uScroll * 0.08);
        vec3 col = mix(vec3(0.62, 0.56, 0.52), vec3(0.95, 0.5, 0.25), (1.0 - vUv.y) * 0.5);
        gl_FragColor = vec4(col, a);
      }`,
  }));
  smoke.position.z = -5;
  scene.add(smoke, embers);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
  }, { passive: true });

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  const state = sceneState;
  let last = performance.now();
  let elapsed = 0;
  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    elapsed += dt;
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;
    uniforms.uTime.value = elapsed;
    uniforms.uMouse.value.set(mouse.x, mouse.y);
    uniforms.uScroll.value += (state.scrollTarget - uniforms.uScroll.value) * 0.08;
    camera.position.x = mouse.x * 0.6;
    camera.position.y = mouse.y * 0.4 - uniforms.uScroll.value * 1.5;
    camera.lookAt(0, -uniforms.uScroll.value * 1.5, 0);
    renderer.render(scene, camera);
  };

  const update = () => {
    const run = state.visible && !document.hidden;
    if (run) last = performance.now();
    renderer.setAnimationLoop(run ? frame : null);
  };
  new IntersectionObserver(([entry]) => { state.visible = entry.isIntersecting; update(); }).observe(section);
  document.addEventListener('visibilitychange', update);
  update();
  return state;
}

/* ------------------------------------------------------------------ */
/* Défilement fluide et scènes pilotées par le défilement               */
/* ------------------------------------------------------------------ */
function initMotion() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Défilement fluide discret, seulement à la souris (pas au doigt).
  let lenis = null;
  const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (Lenis && !touch) {
    lenis = new Lenis({ autoRaf: false, lerp: 0.13, syncTouch: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Ancres : défilement puis focus sur la section (clavier).
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1 });
      else target.scrollIntoView();
      const focusable = target.matches('main') ? target : (target.querySelector('h1, h2') || target);
      if (!focusable.hasAttribute('tabindex')) focusable.setAttribute('tabindex', '-1');
      focusable.focus({ preventScroll: true });
    });
  });

  // En-tête : se cache en descendant, revient en remontant.
  const top = document.querySelector('.top');
  const hideTop = gsap.to(top, { yPercent: -110, duration: 0.4, ease: 'power2.out', paused: true });
  ScrollTrigger.create({
    start: 200,
    end: 'max',
    onUpdate: (self) => (self.direction === 1 ? hideTop.play() : hideTop.reverse()),
    onLeaveBack: () => hideTop.reverse(),
  });
  top.addEventListener('focusin', () => hideTop.reverse());

  const words = gsap.utils.toArray('.hero__words .w');
  const trait = document.querySelector('.ardoise__trait path');
  const traitLen = trait.getTotalLength();
  gsap.set(trait, { strokeDasharray: traitLen, strokeDashoffset: traitLen });

  const mm = gsap.matchMedia();

  /* --- Grand écran : épinglages courts (aucun sous 900 px) --- */
  mm.add('(min-width: 900px)', () => {
    // Les mots dérivent légèrement avec la souris.
    const driftX = gsap.quickTo('.hero__words', 'x', { duration: 1.2, ease: 'power3' });
    const driftY = gsap.quickTo('.hero__words', 'y', { duration: 1.2, ease: 'power3' });
    const onMove = (e) => {
      driftX((e.clientX / window.innerWidth - 0.5) * -30);
      driftY((e.clientY / window.innerHeight - 0.5) * -20);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    // Accueil : les mots se rassemblent dans le feu ; le titre reste lisible.
    gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=50%',
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => { sceneState.scrollTarget = self.progress; },
      },
    })
      .to(words, {
        x: (i, el) => (window.innerWidth / 2 - (el.offsetLeft + el.offsetWidth / 2)) * 0.9,
        y: (i, el) => (window.innerHeight * 0.62 - (el.offsetTop + el.offsetHeight / 2)) * 0.9,
        scale: 0.25,
        opacity: 0,
        ease: 'power2.in',
        stagger: 0.03,
      }, 0)
      .to('.hero__inner', { yPercent: -6, ease: 'none' }, 0)
      .to('.hero__glow', { scale: 1.5, opacity: 1, ease: 'none' }, 0)
      .to('.hero__scroll', { opacity: 0, duration: 0.2 }, 0);

    return () => window.removeEventListener('pointermove', onMove);
  });

  mm.add('(min-width: 900px) and (min-height: 700px)', () => {
    // Carte : courte pause sur l'ardoise.
    const carte = document.querySelector('.carte');
    carte.classList.add('is-pinned');
    gsap.timeline({
      scrollTrigger: { trigger: '.carte', start: 'top top', end: '+=60%', pin: true, scrub: 0.6 },
    })
      .from('.ardoise', { rotate: -2, y: 30, scale: 0.97, ease: 'power2.out', duration: 1 }, 0)
      .from('.plat', { autoAlpha: 0, x: 30, stagger: 0.25, duration: 0.8, ease: 'power2.out' }, 0.1)
      .to(trait, { strokeDashoffset: 0, duration: 0.8, ease: 'none' }, '>-0.3');

    // Producteurs : défilement horizontal court.
    const section = document.querySelector('.producteurs');
    const piste = section.querySelector('.piste');
    section.classList.add('is-horizontal');
    const distance = () => Math.max(0, piste.scrollWidth - window.innerWidth);
    gsap.to(piste, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    return () => {
      section.classList.remove('is-horizontal');
      carte.classList.remove('is-pinned');
    };
  });

  /* --- Petit écran : flux normal, simples apparitions --- */
  mm.add('(max-width: 899px), (max-height: 699px)', () => {
    gsap.utils.toArray('.plat, .prod').forEach((el) => {
      gsap.from(el, { autoAlpha: 0, y: 30, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
    gsap.to(trait, { strokeDashoffset: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: trait, start: 'top 90%' } });
  });

  /* --- La maison : la phrase s'allume mot à mot --- */
  const maisonSplit = SplitText.create('.maison__titre', { type: 'words' });
  gsap.fromTo(maisonSplit.words, { opacity: 0.3 }, {
    opacity: 1,
    stagger: 0.1,
    ease: 'none',
    scrollTrigger: { trigger: '.maison__titre', start: 'top 85%', end: 'bottom 55%', scrub: true },
  });
  gsap.fromTo('.maison__big', { xPercent: 5 }, {
    xPercent: -45,
    ease: 'none',
    scrollTrigger: { trigger: '.maison', start: 'top bottom', end: 'bottom top', scrub: true },
  });
  gsap.from('.principes li', {
    y: 40,
    autoAlpha: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.principes', start: 'top 88%' },
  });

  /* --- Bandeau : une ligne qui glisse --- */
  gsap.fromTo('.defile__ligne', { xPercent: 0 }, {
    xPercent: -30,
    ease: 'none',
    scrollTrigger: { trigger: '.defile', start: 'top bottom', end: 'bottom top', scrub: true },
  });

  /* --- Titres : révélation par lignes --- */
  document.querySelectorAll('.carte__intro h2, .producteurs__tete h2, .reserver__texte h2').forEach((h) => {
    SplitText.create(h, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 105,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: h, start: 'top 90%' },
      }),
    });
  });

  /* --- Réserver --- */
  gsap.from('.resa > *', {
    autoAlpha: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.04,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.resa', start: 'top 85%' },
  });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
