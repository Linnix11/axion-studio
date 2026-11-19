// Seuil : démo Axion Studio (entreprise fictive).
const NBSP = ' ';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const { gsap, ScrollTrigger, SplitText, Lenis } = window;
// Progression de la section « maison », partagée avec la scène 3D (chargée plus tard).
const buildState = { target: 0 };

setupForm();

if (!reduced && gsap && ScrollTrigger && SplitText) init();

// 3D : seulement sur grand écran, après le premier affichage.
if (!reduced && gsap && ScrollTrigger && window.matchMedia('(min-width: 900px)').matches) {
  afterLoad(async () => {
    try {
      const THREE = await import('../_lib/three.min.js');
      setupHouse(THREE);
      ScrollTrigger.refresh();
    } catch { /* le dessin SVG reste */ }
  });
}

function afterLoad(cb) {
  const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 2000 }) : setTimeout(cb, 200));
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}

/* ------------------------------------------------------------------ */
function init() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  setupLenis();
  setupHero();
  setupApproach();
  setupBuild();
  setupHomes();
  setupDrift();
  setupSell();
  setupHeadings();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

/* ---------- Défilement fluide discret, seulement à la souris ---------- */
function setupLenis() {
  const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (!Lenis || touch) return null;
  const lenis = new Lenis({ autoRaf: false, lerp: 0.13, syncTouch: false, anchors: { offset: -64 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/* ---------- Accueil : le seuil s'ouvre (grand écran, épinglage court) ---------- */
function setupHero() {
  gsap.set('.hero__portal', { xPercent: -50, yPercent: -50 });
  const scatter = [
    { x: 6, y: -3, r: 3 },
    { x: -5, y: 2, r: -5 },
    { x: -4, y: 4, r: 2 },
  ];
  gsap.matchMedia().add('(min-width: 900px)', () => {
    gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.hero', start: 'top top', end: '+=60%', scrub: 0.6, pin: true, invalidateOnRefresh: true,
      },
    })
      .to('.hw', {
        x: (i) => `${scatter[i].x}vw`,
        y: (i) => `${scatter[i].y}vh`,
        rotation: (i) => scatter[i].r,
        duration: 1,
      }, 0)
      .to('.hero__portal', { scaleX: () => (window.innerWidth / 140) * 1.2, scaleY: 1.5, duration: 1, ease: 'power2.in' }, 0)
      .to('.hero__kicker, .hero__scroll', { autoAlpha: 0, duration: 0.2 }, 0);
  });
}

/* ---------- Approche : mots qui s'éclairent ---------- */
function setupApproach() {
  const statement = document.querySelector('.approach__statement');
  SplitText.create(statement, {
    type: 'words',
    autoSplit: true,
    onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.3 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: statement, start: 'top 85%', end: 'bottom 55%', scrub: true },
    }),
  });
  gsap.from('.pledge', {
    y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
    scrollTrigger: { trigger: '.pledges', start: 'top 88%' },
  });
}

/* ---------- Maison : étapes (et 3D sur grand écran) ---------- */
function setupBuild() {
  const steps = [...document.querySelectorAll('.step')];
  const root = document.documentElement;
  gsap.matchMedia().add('(min-width: 900px)', () => {
    root.classList.add('pin-build');
    let active = 0;
    const st = ScrollTrigger.create({
      trigger: '.build', start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        buildState.target = p;
        const idx = p < 0.2 ? 0 : p < 0.5 ? 1 : p < 0.78 ? 2 : 3;
        if (idx !== active) {
          steps[active].classList.remove('is-on');
          steps[idx].classList.add('is-on');
          active = idx;
        }
      },
    });
    return () => { st.kill(); root.classList.remove('pin-build'); steps.forEach((s, i) => s.classList.toggle('is-on', i === 0)); };
  });
}

/* ---------- Biens : rideau ---------- */
function setupHomes() {
  gsap.utils.toArray('.card').forEach((card) => {
    gsap.fromTo(card.querySelector('.card__visual'), { clipPath: 'inset(100% 0% 0% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%' },
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
  const tl = gsap.timeline({ scrollTrigger: { trigger: '.drift', start: 'top bottom', end: 'bottom top', scrub: true } });
  lines.forEach(([sel, from, to]) => tl.fromTo(sel, { x: `${from}vw` }, { x: `${to}vw`, ease: 'none' }, 0));
}

/* ---------- Vendre : la ligne se trace, les étapes arrivent ---------- */
function setupSell() {
  const list = document.querySelector('.sell__steps');
  gsap.fromTo(list, { '--p': 0 }, {
    '--p': 1, ease: 'none',
    scrollTrigger: { trigger: list, start: 'top 80%', end: 'bottom 65%', scrub: true },
  });
  gsap.from('.sstep', {
    y: 36, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: list, start: 'top 88%' },
  });
}

/* ---------- Titres : lignes masquées ---------- */
function setupHeadings() {
  document.querySelectorAll('.h2, .build__title').forEach((el) => {
    SplitText.create(el, {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 105, duration: 0.8, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }),
    });
  });
}

/* ---------- Scène three.js : la maison s'assemble ---------- */
function setupHouse(THREE) {
  const section = document.querySelector('.build');
  const canvas = document.querySelector('.build__gl');
  const box = document.querySelector('.build__canvas');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return;
  }
  document.documentElement.classList.add('has-3d');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
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
  sun.shadow.mapSize.set(512, 512);
  Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 40 });
  sun.shadow.bias = -0.0008;
  sun.shadow.radius = 4;
  scene.add(sun);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(16, 32),
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

  // Pilotage : progression de la section (lissée) et heure du jour.
  let current = 0;
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
    current += (buildState.target - current) * 0.08;
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

  apply(0);
  frame(0);
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
