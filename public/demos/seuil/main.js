// Seuil : démo Axion Studio (entreprise fictive).
import * as THREE from '../_lib/three.module.js';

const NBSP = ' ';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const { gsap, ScrollTrigger, SplitText, Lenis } = window;

setupForm();

if (reduced || !gsap || !ScrollTrigger) {
  document.querySelector('.loader')?.remove();
} else {
  init().catch((err) => {
    console.error(err);
    document.querySelector('.loader')?.remove();
  });
}

/* ------------------------------------------------------------------ */
async function init() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const loader = createLoader();

  setupLenis();

  const fontsReady = Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    wait(1500),
  ]);
  fontsReady.then(() => loader.mark('fonts'));

  if (document.readyState === 'complete') loader.mark('load');
  else window.addEventListener('load', () => loader.mark('load'), { once: true });

  const house = setupHouse();
  house.ready.then(() => loader.mark('scene'));

  await fontsReady;
  const intro = setupHero();
  setupApproach();
  setupHomes();
  setupDrift();
  setupSell();
  setupHeadings();
  ScrollTrigger.refresh();

  await loader.finished;
  intro.play();
}

function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

/* ---------- Chargement : compte de 0 à 100 lié aux vraies étapes ---------- */
function createLoader() {
  const el = document.querySelector('.loader');
  if (!el) return { mark() {}, finished: Promise.resolve() };
  el.classList.add('is-js');
  const num = el.querySelector('.loader__num');
  const bar = el.querySelector('.loader__bar span');
  const tasks = { fonts: false, load: false, scene: false };
  const shown = { v: 0 };
  let done = false;
  let resolveFinished;
  const finished = new Promise((r) => (resolveFinished = r));

  const render = () => {
    num.textContent = Math.round(shown.v);
    bar.style.transform = `scaleX(${shown.v / 100})`;
  };

  const exit = () => {
    if (done) return;
    done = true;
    gsap.to(shown, {
      v: 100, duration: 0.35, ease: 'power1.out', overwrite: true, onUpdate: render,
      onComplete: () => {
        gsap.to(el, {
          clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'power3.inOut',
          onComplete: () => el.remove(),
        });
        setTimeout(resolveFinished, 350);
      },
    });
  };

  const mark = (key) => {
    if (done || tasks[key]) return;
    tasks[key] = true;
    const vals = Object.values(tasks);
    const ratio = vals.filter(Boolean).length / vals.length;
    if (ratio === 1) return exit();
    gsap.to(shown, { v: ratio * 100 - 6, duration: 0.5, ease: 'power2.out', overwrite: true, onUpdate: render });
  };

  gsap.set(el, { clipPath: 'inset(0 0 0% 0)' });
  setTimeout(exit, 2400); // jamais plus de 2,4 s
  return { mark, finished };
}

/* ---------- Défilement fluide ---------- */
function setupLenis() {
  if (!Lenis) return null;
  const lenis = new Lenis({ autoRaf: false, lerp: 0.09, anchors: { offset: -64 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/* ---------- Accueil : mots dispersés qui se rassemblent ---------- */
function setupHero() {
  const words = gsap.utils.toArray('.hw');
  const small = () => window.innerWidth < 720;
  const scatter = [
    { x: 36, y: -8, r: 6, s: 0.55 },
    { x: -30, y: 12, r: -12, s: 1.25 },
    { x: -30, y: -34, r: 4, s: 0.7 },
  ];
  gsap.set('.hero__portal', { xPercent: -50, yPercent: -50 });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '.hero', start: 'top top', end: '+=140%', scrub: 1, pin: true, invalidateOnRefresh: true,
    },
  });
  tl.from(words, {
    x: (i) => `${scatter[i].x * (small() ? 0.4 : 1)}vw`,
    y: (i) => `${scatter[i].y * (small() ? 0.5 : 1)}vh`,
    rotation: (i) => scatter[i].r,
    scale: (i) => scatter[i].s,
    duration: 1,
  }, 0)
    .from('.hero__lede', { autoAlpha: 0, y: 40, duration: 0.35 }, 0.6)
    .to('.hero__portal', { scaleX: () => (window.innerWidth / 140) * 1.2, scaleY: 1.5, duration: 0.6, ease: 'power2.in' }, 0.75)
    .to('.hero__kicker, .hero__scroll', { autoAlpha: 0, duration: 0.2 }, 0.1);

  // Entrée après le chargement : chaque lettre monte depuis sa ligne.
  const split = SplitText.create('.hw__in', { type: 'chars', mask: 'chars' });
  const intro = gsap.timeline({ paused: true })
    .from(split.chars, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.035 })
    .from('.hero__portal', { scaleY: 0, transformOrigin: '50% 100%', duration: 1.4, ease: 'expo.inOut' }, 0)
    .from('.hero__kicker, .top', { autoAlpha: 0, y: -12, duration: 0.8, ease: 'power2.out' }, 0.4);
  gsap.set(split.chars, { yPercent: 110 });
  return intro;
}

/* ---------- Approche : mots qui s'éclairent, compteurs ---------- */
function setupApproach() {
  const statement = document.querySelector('.approach__statement');
  SplitText.create(statement, {
    type: 'words',
    autoSplit: true,
    onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.16 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: statement, start: 'top 80%', end: 'bottom 45%', scrub: true },
    }),
  });

  document.querySelectorAll('.count').forEach((el) => {
    const to = Number(el.dataset.to);
    const proxy = { v: 0 };
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => gsap.to(proxy, {
        v: to, duration: 1.6, ease: 'power3.out',
        onUpdate: () => (el.textContent = Math.round(proxy.v)),
      }),
    });
  });

  gsap.from('.pledge', {
    y: 50, autoAlpha: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.pledges', start: 'top 85%' },
  });
}

/* ---------- Biens : rideau, parallaxe dans les dessins ---------- */
function setupHomes() {
  gsap.utils.toArray('.card').forEach((card) => {
    const visual = card.querySelector('.card__visual');
    gsap.fromTo(visual, { clipPath: 'inset(100% 0% 0% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out',
      scrollTrigger: { trigger: card, start: 'top 85%' },
    });
    gsap.from(card.querySelector('.card__body'), {
      y: 30, autoAlpha: 0, duration: 1, delay: 0.25, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 85%' },
    });
    card.querySelectorAll('.px').forEach((g) => {
      const d = Number(g.dataset.depth) || 0;
      gsap.fromTo(g, { y: d * 24 }, {
        y: d * -24, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  });
}

/* ---------- Mots qui glissent en sens opposés ---------- */
function setupDrift() {
  const lines = [
    ['.drift__line--a', -18, 8],
    ['.drift__line--b', 14, -22],
    ['.drift__line--c', -10, 16],
  ];
  lines.forEach(([sel, from, to]) => {
    gsap.fromTo(sel, { x: `${from}vw` }, {
      x: `${to}vw`, ease: 'none',
      scrollTrigger: { trigger: '.drift', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

/* ---------- Vendre : la ligne se trace, les étapes arrivent ---------- */
function setupSell() {
  const list = document.querySelector('.sell__steps');
  gsap.fromTo(list, { '--p': 0 }, {
    '--p': 1, ease: 'none',
    scrollTrigger: { trigger: list, start: 'top 75%', end: 'bottom 60%', scrub: true },
  });
  gsap.from('.sstep', {
    y: 60, autoAlpha: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: list, start: 'top 80%' },
  });
}

/* ---------- Titres : lignes masquées ---------- */
function setupHeadings() {
  document.querySelectorAll('.h2, .build__title').forEach((el) => {
    SplitText.create(el, {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 105, duration: 1.1, stagger: 0.08, ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }),
    });
  });
}

/* ---------- Scène three.js : la maison s'assemble ---------- */
function setupHouse() {
  const section = document.querySelector('.build');
  const canvas = document.querySelector('.build__gl');
  const box = document.querySelector('.build__canvas');
  const steps = [...document.querySelectorAll('.step')];
  let resolveReady;
  const ready = new Promise((r) => (resolveReady = r));

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) {
    resolveReady();
    return { ready };
  }
  document.documentElement.classList.add('has-3d');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

  // Lumière du matin : ciel chaud, rebond sauge, soleil bas.
  const hemi = new THREE.HemisphereLight(0xfff6e8, 0xc3c9b4, 2.4);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffe1b3, 2.4);
  sun.position.set(-7, 10, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 40 });
  sun.shadow.bias = -0.0008;
  sun.shadow.radius = 4;
  scene.add(sun);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(16, 64),
    new THREE.ShadowMaterial({ color: 0x3e4636, opacity: 0.2 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const mat = {
    slab: new THREE.MeshStandardMaterial({ color: 0xcfc5b3, roughness: 1 }),
    wall: new THREE.MeshStandardMaterial({ color: 0xece4d6, roughness: 0.95 }),
    roof: new THREE.MeshStandardMaterial({ color: 0x5f6a62, roughness: 0.8 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x4f5b45, roughness: 0.7 }),
    stone: new THREE.MeshStandardMaterial({ color: 0xbdb19d, roughness: 1 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x3a4036, emissive: 0xf5c983, emissiveIntensity: 0, roughness: 0.25 }),
  };

  const W = 8, D = 5.6, H = 3, R = 2.2, T = 0.3, O = 0.45;

  const rect = (p, x, y, w, h) => {
    p.moveTo(x - w / 2, y); p.lineTo(x + w / 2, y); p.lineTo(x + w / 2, y + h); p.lineTo(x - w / 2, y + h); p.closePath();
    return p;
  };
  const extrude = (shape, holes) => {
    holes.forEach(([x, y, w, h]) => shape.holes.push(rect(new THREE.Path(), x, y, w, h)));
    const g = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false });
    g.translate(0, 0, -T / 2);
    return g;
  };
  const mesh = (geo, m) => {
    const o = new THREE.Mesh(geo, m);
    o.castShadow = true;
    o.receiveShadow = true;
    return o;
  };
  const addGlass = (wall, holes) => holes.forEach(([x, y, w, h]) => {
    const g = mesh(new THREE.BoxGeometry(w, h, 0.06), mat.glass);
    g.position.set(x, y + h / 2, 0);
    wall.add(g);
  });
  const wallWith = (w, holes, glassHoles) => {
    const m = mesh(extrude(rect(new THREE.Shape(), 0, 0, w, H), holes), mat.wall);
    addGlass(m, glassHoles);
    return m;
  };
  const gable = (holes) => {
    const s = new THREE.Shape();
    s.moveTo(-D / 2, 0); s.lineTo(D / 2, 0); s.lineTo(D / 2, H); s.lineTo(0, H + R); s.lineTo(-D / 2, H); s.closePath();
    const m = mesh(extrude(s, holes), mat.wall);
    addGlass(m, holes);
    return m;
  };

  const house = new THREE.Group();
  scene.add(house);
  const parts = [];
  const add = (obj, pos, rot, range, from) => {
    obj.position.copy(pos);
    obj.rotation.set(rot.x, rot.y, rot.z);
    house.add(obj);
    parts.push({
      obj, range,
      pos: pos.clone(),
      rot: rot.clone(),
      fromPos: pos.clone().add(from),
      fromRot: new THREE.Vector3(rot.x + from.x * 0.08, rot.y + from.z * 0.12, rot.z - from.x * 0.06),
    });
  };
  const v = (x, y, z) => new THREE.Vector3(x, y, z);

  const frontHoles = [[0, 0, 1.05, 2.2], [-2.5, 0.95, 1.1, 1.35], [2.5, 0.95, 1.1, 1.35]];
  const backHoles = [[-2.2, 0.95, 1.5, 1.35], [1.9, 0.95, 1.1, 1.35]];
  const sideHoles = [[0, H + 0.35, 0.75, 0.9], [1.1, 0.95, 0.95, 1.25]];

  add(mesh(new THREE.BoxGeometry(W + 1, 0.3, D + 1), mat.slab), v(0, 0.15, 0), v(0, 0, 0), [0, 0.16], v(0, -2, 0));
  add(mesh(new THREE.BoxGeometry(2.2, 0.16, 1.2), mat.stone), v(0, 0.08, D / 2 + 1), v(0, 0, 0), [0.06, 0.2], v(0, -1.5, 2));
  add(wallWith(W, backHoles, backHoles), v(0, 0.3, -D / 2 + T / 2), v(0, 0, 0), [0.16, 0.34], v(0, 6, -3));
  add(gable(sideHoles), v(-W / 2 + T / 2, 0.3, 0), v(0, -Math.PI / 2, 0), [0.22, 0.42], v(-4, 6, 0));
  add(gable(sideHoles), v(W / 2 - T / 2, 0.3, 0), v(0, Math.PI / 2, 0), [0.28, 0.48], v(4, 6, 0));
  add(wallWith(W, frontHoles, frontHoles.slice(1)), v(0, 0.3, D / 2 - T / 2), v(0, 0, 0), [0.34, 0.54], v(0, 6, 4));
  add(mesh(new THREE.BoxGeometry(1.0, 2.15, 0.1), mat.wood), v(0, 0.3 + 1.075, D / 2 - T / 2), v(0, 0, 0), [0.48, 0.58], v(0, 0, 2.5));

  const theta = Math.atan(R / (D / 2));
  const run = D / 2 + O;
  const len = run / Math.cos(theta);
  const roofGeo = new THREE.BoxGeometry(W + 0.7, 0.18, len);
  const roofY = 0.3 + H + R - (run / 2) * Math.tan(theta) + 0.12;
  add(mesh(roofGeo, mat.roof), v(0, roofY, -run / 2), v(-theta, 0, 0), [0.55, 0.72], v(0, 7, -3));
  add(mesh(roofGeo, mat.roof), v(0, roofY, run / 2), v(theta, 0, 0), [0.62, 0.8], v(0, 7, 3));
  add(mesh(new THREE.BoxGeometry(0.6, 1.9, 0.6), mat.stone), v(W / 2 - 1.5, 0.3 + H + R - 0.3, -0.9), v(0, 0, 0), [0.72, 0.84], v(0, 5, 0));

  house.rotation.y = -0.35;

  // Pilotage : progression de la section (lissée), heure du jour, étapes.
  let target = 0;
  let current = 0;
  let activeStep = 0;
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const clamp01 = (t) => Math.min(1, Math.max(0, t));
  const warm = new THREE.Color(0xffd29a);
  const pale = new THREE.Color(0xfff1dc);

  const apply = (p) => {
    for (const part of parts) {
      const [a, b] = part.range;
      const e = ease(clamp01((p - a) / (b - a)));
      part.obj.visible = e > 0.001;
      part.obj.position.lerpVectors(part.fromPos, part.pos, e);
      part.obj.rotation.set(
        part.fromRot.x + (part.rot.x - part.fromRot.x) * e,
        part.fromRot.y + (part.rot.y - part.fromRot.y) * e,
        part.fromRot.z + (part.rot.z - part.fromRot.z) * e,
      );
    }
    const light = ease(clamp01((p - 0.8) / 0.2));
    mat.glass.emissiveIntensity = light * 1.5;
    sun.color.copy(pale).lerp(warm, light);
    sun.intensity = 2.1 + light * 0.9;

    const idx = p < 0.2 ? 0 : p < 0.55 ? 1 : p < 0.82 ? 2 : 3;
    if (idx !== activeStep) {
      steps[activeStep]?.classList.remove('is-on');
      steps[idx]?.classList.add('is-on');
      activeStep = idx;
    }
  };

  const resize = () => {
    const w = box.clientWidth;
    const h = box.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(box);
  resize();

  const frame = (time) => {
    current += (target - current) * 0.08;
    apply(current);
    const t = time * 0.001;
    const radius = camera.aspect < 1 ? 22 / Math.max(camera.aspect, 0.55) : 20;
    const angle = -0.3 + t * 0.045 + current * 0.8;
    camera.position.set(Math.sin(angle) * radius, 6 + (1 - current) * 4, Math.cos(angle) * radius);
    camera.lookAt(0, 2.1, 0);
    renderer.render(scene, camera);
  };

  // Rendu en pause quand la section est hors écran ou l'onglet caché.
  let inView = false;
  const update = () => renderer.setAnimationLoop(inView && !document.hidden ? frame : null);
  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }, { rootMargin: '120px' })
    .observe(section);
  document.addEventListener('visibilitychange', update);

  ScrollTrigger.create({
    trigger: section, start: 'top top', end: 'bottom bottom',
    onUpdate: (self) => { target = self.progress; },
  });

  // Premier rendu (compile les shaders) pendant l'écran de chargement.
  requestAnimationFrame(() => {
    apply(0);
    frame(0);
    resolveReady();
  });

  return { ready };
}

/* ---------- Formulaire : n'envoie rien, explique ce qui se passerait ---------- */
function setupForm() {
  const form = document.getElementById('form');
  if (!form) return;
  const out = form.querySelector('.form__result');
  const nom = form.elements.nom;
  const email = form.elements.email;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    out.textContent = '';
    const bad = [];
    nom.setAttribute('aria-invalid', String(!nom.value.trim()));
    email.setAttribute('aria-invalid', String(!email.validity.valid || !email.value.trim()));
    if (!nom.value.trim()) bad.push(nom);
    if (!email.validity.valid || !email.value.trim()) bad.push(email);
    if (bad.length) {
      const p = document.createElement('p');
      p.textContent = `Merci d’indiquer ${bad.length === 2 ? 'votre nom et une adresse e-mail valide' : bad[0] === nom ? 'votre nom' : 'une adresse e-mail valide'}.`;
      out.append(p);
      bad[0].focus();
      return;
    }

    const motif = form.elements.motif.value === 'estimer' ? 'd’estimation' : 'de visite';
    const bien = form.elements.bien.selectedOptions[0].textContent.replace(/\s*\(bien fictif\)/, '');
    const creneaux = [...form.querySelectorAll('input[name="creneau"]:checked')]
      .map((c) => c.nextElementSibling.textContent.trim());

    const p1 = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = `Merci, ${nom.value.trim()}. C’est une démonstration${NBSP}: rien n’a été envoyé.`;
    p1.append(strong);
    const p2 = document.createElement('p');
    p2.textContent = `Votre demande ${motif} pour «${NBSP}${bien}${NBSP}»${creneaux.length ? ` (${creneaux.join(', ')})` : ''} resterait sur cette page.`;
    const p3 = document.createElement('p');
    p3.textContent = `Chez un vrai client, le contact serait classé automatiquement avec le bien concerné, un créneau vous serait proposé depuis son agenda, et une relance partirait si vous ne répondiez pas sous quelques jours.`;
    out.append(p1, p2, p3);
  });
}
