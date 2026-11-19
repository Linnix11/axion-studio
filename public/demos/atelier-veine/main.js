// Atelier Veine : concept de démonstration Axion Studio (entreprise fictive).
// GSAP, ScrollTrigger, SplitText et Lenis sont chargés en scripts classiques (globals).

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const { gsap, ScrollTrigger, SplitText, Lenis } = window;
// État partagé entre le défilement et la scène 3D (chargée plus tard).
const sceneState = { progress: 0, velocity: 0 };

setupForm();

if (!reduceMotion && gsap && ScrollTrigger && SplitText) init();
else root.classList.remove('motion');

// 3D : seulement sur grand écran, après le premier affichage.
if (!reduceMotion && window.matchMedia('(min-width: 900px)').matches) {
  afterLoad(() => initScene(document.querySelector('.scene-canvas')).catch(() => {}));
}

function afterLoad(cb) {
  const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 2000 }) : setTimeout(cb, 200));
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}

/* ---------------- Formulaire (démo : rien n'est envoyé) ---------------- */
function setupForm() {
  const form = document.querySelector('.devis-form');
  const status = document.getElementById('devis-demo');
  if (!form || !status) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.classList.add('is-visible');
    status.focus({ preventScroll: true });
    status.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}

/* ---------------- Animation ---------------- */
function init() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  root.classList.add('ready');

  // Défilement fluide discret, seulement à la souris (pas au doigt).
  let lenis = null;
  const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (Lenis && !touch) {
    lenis = new Lenis({ autoRaf: false, lerp: 0.13, syncTouch: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: id === '#accueil' ? 0 : -60 });
      else target.scrollIntoView();
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  buildScroll();
}

/* ---------------- Scènes au défilement ---------------- */
function buildScroll() {
  // Progression de la scène 3D (accueil + geste), lue par la scène si elle est chargée.
  ScrollTrigger.create({
    trigger: '.scene',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      sceneState.progress = self.progress;
      sceneState.velocity = self.getVelocity();
    },
  });
  gsap.to('.scene-canvas', {
    opacity: 0.22,
    ease: 'none',
    scrollTrigger: { trigger: '.geste', start: 'top 85%', end: 'top 25%', scrub: true },
  });

  // Titres de section : lignes qui montent derrière un masque
  document.querySelectorAll('.split-title').forEach((title) => {
    SplitText.create(title, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 105,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: title, start: 'top 90%' },
      }),
    });
  });

  // Le geste : le texte se révèle mot à mot
  SplitText.create('.geste-lead', {
    type: 'words',
    autoSplit: true,
    onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.3 }, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: '.geste-lead', start: 'top 85%', end: 'bottom 55%', scrub: true },
    }),
  });
  gsap.from('.gestes > div', {
    y: 24, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08,
    scrollTrigger: { trigger: '.gestes', start: 'top 88%' },
  });

  // Un seul bandeau de mots géants qui glisse
  gsap.fromTo('.band-row', { xPercent: 0 }, {
    xPercent: -28, ease: 'none',
    scrollTrigger: { trigger: '.bands', start: 'top bottom', end: 'bottom top', scrub: true },
  });

  gsap.from('.service', {
    y: 36, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08,
    scrollTrigger: { trigger: '.services', start: 'top 85%' },
  });

  const mm = gsap.matchMedia();

  // Grand écran : épinglages courts.
  mm.add('(min-width: 900px) and (min-height: 650px)', () => {
    // Accueil : le titre est lisible tout de suite ; au défilement, les mots s'écartent un peu.
    const scatter = [
      [0.10, -0.04, -4], [0.04, 0.03, 3], [0.08, -0.02, -2],
      [0.12, 0.05, 4], [0.05, -0.06, -3], [0.14, 0.04, 3], [0.06, 0.02, -4],
    ];
    gsap.to('.hero-title .w', {
      x: (i) => scatter[i % scatter.length][0] * window.innerWidth,
      y: (i) => scatter[i % scatter.length][1] * window.innerHeight,
      rotation: (i) => scatter[i % scatter.length][2],
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
    });
    gsap.to('.scroll-hint', {
      opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=20%', scrub: true },
    });

    // Méthode : les quatre étapes se succèdent sur une hauteur d'écran.
    root.classList.add('pin-methode');
    const steps = gsap.utils.toArray('.step');
    gsap.set(steps.slice(1), { opacity: 0, y: 30 });
    const methodTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.methode', start: 'top top', end: '+=100%', pin: true, scrub: 0.5, invalidateOnRefresh: true,
      },
    });
    steps.forEach((step, i) => {
      if (i === 0) return;
      methodTl
        .to(steps[i - 1], { opacity: 0, y: -30, duration: 0.35 }, i)
        .to(step, { opacity: 1, y: 0, duration: 0.45 }, i + 0.3);
    });
    methodTl.fromTo('.methode-bar i', { scaleX: 0.25 }, { scaleX: 1, ease: 'none', duration: steps.length - 0.25 }, 0.25);

    // Galerie : défilement horizontal court.
    root.classList.add('pin-pieces');
    const track = document.querySelector('.gallery-track');
    const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.pieces', start: 'top top', end: () => '+=' + distance(), pin: true, scrub: 0.6, invalidateOnRefresh: true,
      },
    });
    return () => root.classList.remove('pin-methode', 'pin-pieces');
  });

  // Petit écran : flux normal, simples apparitions.
  mm.add('(max-width: 899px), (max-height: 649px)', () => {
    gsap.utils.toArray('.step, .piece').forEach((el) => {
      gsap.from(el, { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
  });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

/* ---------------- Scène three.js : planche et veines en shader ---------------- */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vObjNormal;
  void main() {
    vUv = uv;
    vObjNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform float uWave;
  uniform float uAspect;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying vec3 vObjNormal;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.02 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }
  // x : veine (cerne), y : fibre fine
  vec2 wood(vec2 uv) {
    vec2 p = vec2(uv.x * uAspect, uv.y);
    float w = fbm(p * vec2(0.55, 2.4));
    float wave = sin(p.x * 2.2 - uTime * 0.9 + p.y * 3.0) * 0.045 * uWave;
    float r = (p.y + w * 0.62 + wave + sin(p.x * 0.7) * 0.08) * 11.0;
    float ring = 0.5 + 0.5 * sin(r * 6.2831);
    float vein = pow(ring, 7.0);
    float fibre = noise(vec2(p.x * 1.2, p.y * 140.0 + w * 30.0));
    return vec2(vein, fibre);
  }
  float revealMask(vec2 uv, float edgeN) {
    return 1.0 - smoothstep(uReveal - 0.12, uReveal, uv.x + (edgeN - 0.5) * 0.18);
  }
  float heightAt(vec2 uv, float m) {
    vec2 w = wood(uv);
    return w.x * m * 0.9 + w.y * 0.22;
  }

  void main() {
    vec2 uv = vUv;
    float edgeN = fbm(vec2(uv.y * 6.0, uv.x * 2.0));
    float m = revealMask(uv, edgeN);
    vec2 wd = wood(uv);

    float e = 0.002;
    float h = wd.x * m * 0.9 + wd.y * 0.22;
    float hx = heightAt(uv + vec2(e, 0.0), m);
    float hy = heightAt(uv + vec2(0.0, e), m);
    vec3 n = normalize(vec3((h - hx) * 6.0, (h - hy) * 6.0, 1.0));

    // Lumière rasante : direction pilotée par la souris, très basse sur l'horizon
    vec3 L = normalize(vec3(uMouse.x * 1.4, uMouse.y * 1.4, 0.3));
    float diff = clamp(dot(n, L), 0.0, 1.0);
    vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(dot(n, H), 0.0), 36.0);

    vec2 lp = uMouse * 0.5 + 0.5;
    float d = distance(vec2(uv.x * uAspect, uv.y), vec2(lp.x * uAspect, lp.y));
    float spot = exp(-d * d * 0.35);

    vec3 pale = vec3(0.87, 0.74, 0.55);
    vec3 oak = vec3(0.73, 0.55, 0.36);
    vec3 walnut = vec3(0.32, 0.19, 0.11);
    vec3 base = mix(pale, oak, wd.y * 0.35 + edgeN * 0.25);
    base = mix(base, walnut, wd.x * m * 0.8);

    vec3 col = base * (0.3 + 1.7 * diff * (0.5 + 0.7 * spot));
    col += spec * spot * 0.22 * vec3(1.0, 0.9, 0.75);

    // Trait chaud là où la veine est en train d'apparaître
    float front = uv.x + (edgeN - 0.5) * 0.18 - uReveal + 0.06;
    col += vec3(0.95, 0.62, 0.3) * exp(-front * front * 900.0) * 0.18 * step(uReveal, 1.08);

    // Chants : bois de bout, plus sombre
    if (abs(vObjNormal.z) < 0.5) col = base * (0.22 + 0.25 * spot);

    gl_FragColor = vec4(col, 1.0);
  }
`;

async function initScene(canvas) {
  if (!canvas) return null;
  const THREE = await import('../_lib/three.min.js');

  const isSmall = () => window.innerWidth < 900;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
  root.classList.add('has-3d');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0, 7);

  const plankW = 4.6;
  const plankH = 1.28;
  const uniforms = {
    uTime: { value: 0 },
    uReveal: { value: 0.05 },
    uWave: { value: 0.2 },
    uAspect: { value: plankW / plankH },
    uMouse: { value: new THREE.Vector2(0.45, 0.35) },
  };
  const plank = new THREE.Mesh(
    new THREE.BoxGeometry(plankW, plankH, 0.1),
    new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader }),
  );
  scene.add(plank);

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  // Souris (ou orbite lente sur écran tactile)
  const mouse = { x: 0.45, y: 0.35, tx: 0.45, ty: 0.35 };
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
  }, { passive: true });

  const state = sceneState;
  let p = 0;
  let wave = 0.2;
  let visible = true;
  let running = false;
  let last = performance.now();
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => t * t * (3 - 2 * t);

  const frame = (now) => {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    uniforms.uTime.value += dt;

    if (!finePointer) {
      const t = uniforms.uTime.value * 0.35;
      mouse.tx = Math.cos(t) * 0.7;
      mouse.ty = 0.3 + Math.sin(t * 1.3) * 0.35;
    }
    mouse.x = lerp(mouse.x, mouse.tx, 0.06);
    mouse.y = lerp(mouse.y, mouse.ty, 0.06);
    uniforms.uMouse.value.set(mouse.x, mouse.y);

    p = lerp(p, state.progress, 0.08);
    const k1 = ease(Math.min(p / 0.45, 1));
    const k2 = ease(Math.min(Math.max((p - 0.45) / 0.4, 0), 1));
    uniforms.uReveal.value = 0.05 + Math.min(p / 0.55, 1) * 1.1;
    const targetWave = 0.25 + Math.min(Math.abs(state.velocity) / 1800, 1) * 1.4;
    wave = lerp(wave, targetWave, 0.05);
    uniforms.uWave.value = wave;

    const small = isSmall();
    // Accueil : planche à droite, presque à plat. Geste : elle glisse à gauche, sous le texte.
    plank.rotation.x = lerp(-1.2, -0.42, k1) + k2 * 0.2 + mouse.y * 0.05;
    plank.rotation.y = lerp(0.12, -0.02, k1) + mouse.x * 0.08;
    plank.rotation.z = lerp(0.24, 0.06, k1) - k2 * 0.1;
    plank.position.x = small ? 0 : lerp(2.0, 1.75, k1) - k2 * 3.95;
    plank.position.y = small ? lerp(-1.35, -1.0, k1) + k2 * 0.6 : lerp(-1.05, -0.75, k1) + k2 * 0.65;
    plank.scale.setScalar(small ? 0.62 : 0.82);

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };

  const update = () => {
    const shouldRun = visible && !document.hidden;
    if (shouldRun && !running) {
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    } else if (!shouldRun) {
      running = false;
    }
  };
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    update();
  }).observe(canvas.parentElement);
  document.addEventListener('visibilitychange', update);

  renderer.render(scene, camera);
  update();

}
