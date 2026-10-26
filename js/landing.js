/* Generated from the canvas artboard Main.dc.html — Preact + htm, no build step. */
const { html, render, Component } = window.htmPreact;

/* ===== Simulador de visión (demo) =====
   Misma lógica que el simulador de referencia: escena + condición + lente, y comparar dos lentes.
   Acá el efecto se calcula en vivo sobre el video; no son videos pregrabados por combinación.
   Los valores son de demostración y los tiene que validar el oftalmólogo. */
var SIM_ESCENAS = [
  { k: 'noche', label: 'Conducción nocturna', archivo: 'video/noche.mp4' },
  { k: 'dia',   label: 'Avenida de día',      archivo: 'video/dia.mp4' }
];
var SIM_CONDICIONES = [
  { k: 'cat',    label: 'Cataratas',                   desenfoque: 5.0, halo: 0.60, astig: 0,    velo: 0.40 },
  { k: 'cat_as', label: 'Cataratas + astigmatismo',    desenfoque: 5.0, halo: 0.60, astig: 0.55, velo: 0.40 },
  { k: 'pres',   label: 'Presbicia',                    desenfoque: 2.6, halo: 0.25, astig: 0,    velo: 0.10 },
  { k: 'pres_as',label: 'Presbicia + astigmatismo',     desenfoque: 2.6, halo: 0.25, astig: 0.55, velo: 0.10 }
];
/* corrige: cuánto del defecto quita (0 nada, 1 todo). haloExtra: halos propios del lente de noche. */
var SIM_LENTES = [
  { k: '',    label: 'Sin corregir',          corrige: 0,    corrigeCat: 0,    haloExtra: 0 },
  { k: 'las', label: 'Procedimiento Láser',   corrige: 0.88, corrigeCat: 0.15, haloExtra: 0 },
  { k: 'ese', label: 'Presbilens Esencial',   corrige: 0.72, corrigeCat: 0.92, haloExtra: 0 },
  { k: 'ava', label: 'Presbilens Avanzado',   corrige: 0.90, corrigeCat: 0.95, haloExtra: 0 },
  { k: 'pre', label: 'Presbilens Premium',    corrige: 0.97, corrigeCat: 0.97, haloExtra: 0.38 }
];
function simBuscar(lista, k) { for (var i = 0; i < lista.length; i++) if (lista[i].k === k) return lista[i]; return lista[0]; }
/* Mezcla condición + lente y devuelve los números con los que se pinta un lado del lienzo. */
function simEfecto(cond, lente, escena) {
  var esCat = cond.k.indexOf('cat') === 0;
  var q = esCat ? lente.corrigeCat : lente.corrige;      // el láser no opera la catarata
  var resto = 1 - q;
  return {
    desenfoque: cond.desenfoque * resto,
    velo: cond.velo * resto,
    astig: cond.astig * resto,
    halo: cond.halo * resto + (escena.k === 'noche' ? lente.haloExtra : 0)
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { proc: 'laser', monthly: 800, years: 15, open: 0, active: 0 };
    this.state.yt = '';
    this.state.sim = false; this.state.simEsc = 'noche'; this.state.simCond = 'cat';
    this.state.simLente = ''; this.state.simLenteB = 'pre'; this.state.simComp = true;
    this.state.simError = '';
    var self = this;
    this.storyRef = function (el) { self.storyEl = el; };
    this.procRef = function (el) { self.procCv = el; };
    this.iolRef = function (el) { self.iolCv = el; };
    this.ctaRef = function (el) { self.ctaCv = el; };
    this.rootRef = function (el) { self.rootEl = el; };
    this.faqRef = function (el) { self.faqCv = el; };
    this.faqListRef = function (el) { self.faqListEl = el; };
    this.heroRef = function (el) { self.heroEl = el; };
    this.heroCvRef = function (el) { self.heroCv = el; };
    this.heroInnerRef = function (el) { self.heroInner = el; };
    this.state.navSolid = false; this.state.s3g = ''; this.state.s3p = 0;
    this.s3L = []; this.s3P = [];
    this.s3Ref = function (el) { self.s3El = el; };
    this.s3CvRef = function (el) { self.s3Cv = el; };
    this.s3LabelsRef = function (el) { self.s3LabelsEl = el; };
    this.s3PanelRef = function (el) { if (el && self.s3P.indexOf(el) < 0) self.s3P.push(el); };
    this.s3L0 = function (el) { self.s3L[0] = el; }; this.s3L1 = function (el) { self.s3L[1] = el; };
    this.s3L2 = function (el) { self.s3L[2] = el; }; this.s3L3 = function (el) { self.s3L[3] = el; };
    this.FAQCAT = [0, 0, 1, 1, 1, 2, 3, 3, 4, 2, 2, 5, 5, 5, 4, 6, 0, 4, 5, 2, 3, 5, 4, 6, 6];
    this.state.faqCat = 0; this.state.menu = false;
    this.toggleMenu = function () { self.setState({ menu: !self.state.menu }); };
    this.closeMenu = function () { self.setState({ menu: false }); };
    this.lbl = [];
    this.lblRef0 = function (el) { self.lbl[0] = el; };
    this.lblRef1 = function (el) { self.lbl[1] = el; };
    this.lblRef2 = function (el) { self.lbl[2] = el; };
  }
  updateActive() {
    var st = this.storyEl; if (!st) return;
    var stage = st.querySelector('.stage3d'), els = st.querySelectorAll('[data-idx]');
    if (!stage || !els.length) return;
    var sr = stage.getBoundingClientRect(), vh = window.innerHeight;
    var ref = window.innerWidth < 860 ? sr.bottom + (vh - sr.bottom) * 0.35 : sr.top + sr.height / 2;
    var best = 0, bd = Infinity;
    for (var i = 0; i < els.length; i++) {
      var r = els[i].getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - ref);
      if (d < bd) { bd = d; best = i; }
    }
    if (best !== this.state.active) { this.setState({ active: best }); if (this._kick) this._kick(); }
  }
  updateNav() {
    if (!this.heroEl) return;
    var solid = this.heroEl.getBoundingClientRect().bottom < 90;
    if (solid !== this.state.navSolid) this.setState({ navSolid: solid });
  }
  initHero() {
    var self = this, cv = this.heroCv, hero = this.heroEl;
    var ctx = cv && cv.getContext ? cv.getContext('2d') : null;
    if (!ctx || !hero) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var seed = 7;
    var rnd = function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    var S = window.innerWidth < 800 ? 1280 : 2048, C = S / 2, R = S / 2, P = S * 0.115, k = S / 2048;
    var tex = null;
    var build = function () {
      var t = document.createElement('canvas'); t.width = t.height = S;
      var x = t.getContext('2d');
      var L = document.createElement('canvas'); L.width = L.height = S;
      var l = L.getContext('2d');
      var g = x.createRadialGradient(C, C, 0, C, C, R);
      g.addColorStop(0, '#041a17'); g.addColorStop(0.12, '#0a3d35'); g.addColorStop(0.24, '#14705e');
      g.addColorStop(0.42, '#1b8f75'); g.addColorStop(0.62, '#157a63'); g.addColorStop(0.82, '#0d5446'); g.addColorStop(1, '#052620');
      x.fillStyle = g; x.fillRect(0, 0, S, S);
      var pal = [[96, 214, 182], [120, 232, 196], [176, 220, 112], [214, 236, 150], [4, 38, 32], [6, 52, 44]];
      var fiber = function (ctx2, wMin, wMax, aMin, aMax) {
        var a = rnd() * Math.PI * 2, r0 = P * (0.9 + rnd() * 0.6), r1 = R * (0.32 + rnd() * 0.66);
        var amp = 0.006 + rnd() * 0.03, ph = rnd() * 6.28, fr = 2 + rnd() * 4;
        var c = pal[(rnd() * pal.length) | 0], al = aMin + rnd() * (aMax - aMin);
        ctx2.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + al.toFixed(3) + ')';
        ctx2.lineWidth = (wMin + rnd() * (wMax - wMin)) * k;
        ctx2.beginPath();
        for (var i = 0; i <= 10; i++) {
          var u = i / 10, r = r0 + (r1 - r0) * u, aa = a + Math.sin(u * fr + ph) * amp;
          var px = C + Math.cos(aa) * r, py = C + Math.sin(aa) * r;
          if (i) ctx2.lineTo(px, py); else ctx2.moveTo(px, py);
        }
        ctx2.stroke();
      };
      var flush = function (blur) { x.filter = blur ? 'blur(' + (blur * k).toFixed(1) + 'px)' : 'none'; x.drawImage(L, 0, 0); x.filter = 'none'; l.clearRect(0, 0, S, S); };
      l.lineCap = 'round';
      var i;
      for (i = 0; i < 1500; i++) fiber(l, 7, 16, 0.06, 0.16); flush(5);
      for (i = 0; i < 5200; i++) fiber(l, 1.6, 4, 0.08, 0.24); flush(1.4);
      for (i = 0; i < 7000; i++) fiber(l, 0.6, 1.6, 0.1, 0.34); flush(0);
      // crypts
      for (i = 0; i < 150; i++) {
        var ca = rnd() * 6.28, cr = P * 1.5 + rnd() * R * 0.6, cs = (10 + rnd() * 50) * k;
        l.save(); l.translate(C + Math.cos(ca) * cr, C + Math.sin(ca) * cr); l.rotate(ca);
        l.fillStyle = 'rgba(2,26,22,' + (0.3 + rnd() * 0.35).toFixed(2) + ')';
        l.beginPath(); l.ellipse(0, 0, cs * 1.8, cs * 0.6, 0, 0, Math.PI * 2); l.fill(); l.restore();
      }
      flush(6);
      // collarette
      for (i = 0; i < 220; i++) {
        var za = rnd() * 6.28, zr = P * (1.9 + rnd() * 0.25);
        l.strokeStyle = 'rgba(214,240,160,' + (0.12 + rnd() * 0.22).toFixed(2) + ')'; l.lineWidth = (4 + rnd() * 10) * k;
        l.beginPath(); l.moveTo(C + Math.cos(za) * zr * 0.82, C + Math.sin(za) * zr * 0.82);
        l.lineTo(C + Math.cos(za + 0.02) * zr * 1.2, C + Math.sin(za + 0.02) * zr * 1.2); l.stroke();
      }
      l.strokeStyle = 'rgba(210,240,170,.14)'; l.lineWidth = 26 * k; l.beginPath(); l.arc(C, C, P * 2, 0, 6.29); l.stroke();
      flush(4);
      // light speckles
      for (i = 0; i < 380; i++) {
        var sa = rnd() * 6.28, sr = P * 1.3 + rnd() * R * 0.7;
        l.fillStyle = 'rgba(220,250,210,' + (0.08 + rnd() * 0.2).toFixed(2) + ')';
        l.beginPath(); l.arc(C + Math.cos(sa) * sr, C + Math.sin(sa) * sr, (2 + rnd() * 6) * k, 0, 6.29); l.fill();
      }
      flush(3);
      // dark ruff around the pupil + limbal ring
      var rg = x.createRadialGradient(C, C, P * 0.8, C, C, P * 1.7);
      rg.addColorStop(0, 'rgba(2,16,14,.95)'); rg.addColorStop(1, 'rgba(2,16,14,0)');
      x.fillStyle = rg; x.fillRect(0, 0, S, S);
      var lg = x.createRadialGradient(C, C, R * 0.72, C, C, R);
      lg.addColorStop(0, 'rgba(2,18,16,0)'); lg.addColorStop(1, 'rgba(2,18,16,.95)');
      x.fillStyle = lg; x.fillRect(0, 0, S, S);
      tex = t;
    };
    var mx = 0, my = 0, tmx = 0, tmy = 0;
    this._onHeroMove = function (e) { tmx = e.clientX / window.innerWidth - 0.5; tmy = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', this._onHeroMove);
    var last = performance.now(), t0 = last;
    var frame = function (now) {
      if (!self._alive) return;
      self._heroRaf = requestAnimationFrame(frame);
      var hr = hero.getBoundingClientRect();
      if (hr.bottom < 0) return;
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      var t = reduce ? 0 : (now - t0) / 1000;
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      var W = Math.round(cv.clientWidth * dpr), H = Math.round(cv.clientHeight * dpr);
      if (!W || !H) return;
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
      var p = Math.max(0, Math.min(1, -hr.top / Math.max(1, hr.height)));
      var e = 1 - Math.exp(-dt * 3); mx += (tmx - mx) * e; my += (tmy - my) * e;
      var cx = W * 0.5 - mx * W * 0.025, cy = H * 0.44 - my * H * 0.03;
      var Rv = Math.max(W, H) * 0.8 * (1 + p * 0.45);
      ctx.fillStyle = '#041d19'; ctx.fillRect(0, 0, W, H);
      if (tex) {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.01 + p * 0.3);
        ctx.drawImage(tex, -Rv, -Rv, Rv * 2, Rv * 2); ctx.restore();
      } else {
        var fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Rv); fg.addColorStop(0, '#0a3d35'); fg.addColorStop(0.4, '#1b8f75'); fg.addColorStop(1, '#052620');
        ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H);
      }
      var pr = Rv * 0.23 * (1 + 0.035 * Math.sin(t * 0.7) + p * 2.2);
      var pg = ctx.createRadialGradient(cx, cy, pr * 0.55, cx, cy, pr * 1.08);
      pg.addColorStop(0, '#000'); pg.addColorStop(0.82, '#010806'); pg.addColorStop(1, 'rgba(1,8,6,0)');
      ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(cx, cy, pr * 1.1, 0, 6.29); ctx.fill();
      var hx = cx - pr * 0.42 + mx * pr * 0.2, hy = cy - pr * 0.45 + my * pr * 0.2;
      var hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, pr * 0.2);
      hg.addColorStop(0, 'rgba(255,255,255,.32)'); hg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(hx, hy, pr * 0.2, 0, 6.29); ctx.fill();
      if (self.heroInner) {
        self.heroInner.style.transform = 'translateY(' + (p * 140).toFixed(1) + 'px)';
        self.heroInner.style.opacity = String(Math.max(0, 1 - p * 1.4));
      }
    };
    this._heroRaf = requestAnimationFrame(frame);
    this._heroT = setTimeout(function () { if (self._alive) { try { build(); } catch (er) { console.error(er); } } }, 30);
  }
  updateFaq() {
    var list = this.faqListEl; if (!list) return;
    var items = list.querySelectorAll('.faq-item'); if (!items.length) return;
    var vh = window.innerHeight, c = vh * 0.45, best = 0, bd = Infinity;
    for (var i = 0; i < items.length; i++) {
      var r = items[i].getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - c);
      if (d < bd) { bd = d; best = i; }
    }
    var lr = list.getBoundingClientRect();
    this._faqProg = Math.max(0, Math.min(1, (vh * 0.5 - lr.top) / lr.height));
    var cat = this.FAQCAT[best] || 0;
    if (cat !== this.state.faqCat) this.setState({ faqCat: cat });
  }
  setupReveal() {
    var root = this.rootEl;
    if (!root || !('IntersectionObserver' in window)) return;
    var targets = [];
    var add = function (el, type) { if (el.hasAttribute('data-rv')) return; el.setAttribute('data-rv', type); targets.push(el); };
    root.querySelectorAll('.rv, .rv-l, .rv-s, .rv-h').forEach(function (el) {
      var isGroup = el.classList.contains('rv') && el.querySelector('h2, h3') && !el.matches('.incl-item, .sede, .tcard, .step, .dg');
      if (isGroup) {
        el.querySelectorAll('.eyebrow, h2, h3, p, .btn, .checks li').forEach(function (c) { add(c, c.matches('h2, h3') ? 'mask' : 'up'); });
      } else {
        add(el, el.classList.contains('rv-l') ? 'left' : el.classList.contains('rv-s') ? 'zoom' : el.classList.contains('rv-h') ? 'mask' : 'up');
        el.querySelectorAll('.ticon, .incl-n, .num, .ok, .x, .open').forEach(function (c) { c.setAttribute('data-pop', ''); });
      }
    });
    var io = new IntersectionObserver(function (entries) {
      var vis = entries.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) {
        return (a.boundingClientRect.top - b.boundingClientRect.top) || (a.boundingClientRect.left - b.boundingClientRect.left);
      });
      vis.forEach(function (e, i) {
        e.target.style.animationDelay = (i * 0.1) + 's';
        e.target.setAttribute('data-in', '');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
    root.setAttribute('data-anim', 'on');
    this._rio = io;
  }
  componentDidMount() {
    var self = this;
    this._alive = true;
    var tries = 0;
    var boot = function () {
      if (!self._alive) return;
      if (window.THREE && self.iolCv && self.faqCv && self.s3Cv && self.s3El) {
        try { self.init3D(); } catch (e) { console.error(e); }
      } else if (tries++ < 300) { self._bootT = setTimeout(boot, 100); }
    };
    boot();
    var pending = false;
    this._onScroll = function () {
      if (pending) return; pending = true;
      requestAnimationFrame(function () { pending = false; if (self._alive) { self.updateFaq(); self.updateNav(); } });
    };
    window.addEventListener('scroll', this._onScroll, true);
    window.addEventListener('resize', this._onScroll);
    var tries2 = 0;
    var later = function () {
      if (!self._alive) return;
      if (!self.rootEl) { if (tries2++ < 100) self._obsT = setTimeout(later, 100); return; }
      self.updateNav(); self.setupReveal(); self.initHero();
    };
    this._obsT = setTimeout(later, 50);
  }
  componentWillUnmount() {
    this._alive = false;
    clearTimeout(this._bootT); clearTimeout(this._obsT);
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._rio) this._rio.disconnect();
    clearTimeout(this._stT);
    if (this._st) this._st.kill();
    if (this._stFinal) this._stFinal.kill();
    if (this._tl) this._tl.kill();
    if (this._heroRaf) cancelAnimationFrame(this._heroRaf);
    clearTimeout(this._heroT);
    if (this._onHeroMove) window.removeEventListener('pointermove', this._onHeroMove);
    if (this._onScroll) { window.removeEventListener('scroll', this._onScroll, true); window.removeEventListener('resize', this._onScroll); }
    if (this._onMove) window.removeEventListener('pointermove', this._onMove);
    (this.views || []).forEach(function (v) { v.dispose(); });
  }
  init3D() {
    var T = window.THREE, self = this;
    var ease = function (c, t, dt, k) { return c + (t - c) * (1 - Math.exp(-dt * k)); };
    var irisTex = function () {
      var c = document.createElement('canvas'); c.width = 512; c.height = 512;
      var x = c.getContext('2d'), R = 256;
      var g = x.createRadialGradient(R, R, 0, R, R, R);
      g.addColorStop(0, '#050b18'); g.addColorStop(0.27, '#0a1d4a'); g.addColorStop(0.35, '#123fa8');
      g.addColorStop(0.55, '#1f7fd0'); g.addColorStop(0.74, '#3fd0e8'); g.addColorStop(0.9, '#15527e'); g.addColorStop(1, '#06122a');
      x.fillStyle = g; x.fillRect(0, 0, 512, 512);
      for (var i = 0; i < 1500; i++) {
        var a = Math.random() * Math.PI * 2, r0 = R * (0.28 + Math.random() * 0.1), r1 = R * (0.6 + Math.random() * 0.38), b = (Math.random() - 0.5) * 0.25;
        x.strokeStyle = Math.random() < 0.6 ? 'rgba(200,245,255,' + (0.05 + Math.random() * 0.18) + ')' : 'rgba(4,12,30,' + (0.1 + Math.random() * 0.25) + ')';
        x.lineWidth = 0.6 + Math.random() * 1.4;
        x.beginPath(); x.moveTo(R + Math.cos(a) * r0, R + Math.sin(a) * r0);
        x.quadraticCurveTo(R + Math.cos(a + b) * (r0 + r1) / 2, R + Math.sin(a + b) * (r0 + r1) / 2, R + Math.cos(a + b * 0.5) * r1, R + Math.sin(a + b * 0.5) * r1);
        x.stroke();
      }
      x.strokeStyle = 'rgba(190,240,255,.35)'; x.lineWidth = 6; x.beginPath(); x.arc(R, R, R * 0.45, 0, Math.PI * 2); x.stroke();
      x.strokeStyle = 'rgba(3,10,25,.9)'; x.lineWidth = 22; x.beginPath(); x.arc(R, R, R * 0.97, 0, Math.PI * 2); x.stroke();
      var t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4; return t;
    };
    var scleraTex = function () {
      var c = document.createElement('canvas'); c.width = 1024; c.height = 512;
      var x = c.getContext('2d');
      var g = x.createLinearGradient(0, 0, 0, 512);
      g.addColorStop(0, '#eadbd2'); g.addColorStop(0.5, '#fbf8f4'); g.addColorStop(1, '#eadbd2');
      x.fillStyle = g; x.fillRect(0, 0, 1024, 512);
      for (var i = 0; i < 70; i++) {
        var px = Math.random() * 1024, py = 256 + (Math.random() - 0.5) * 400;
        x.strokeStyle = 'rgba(178,52,52,' + (0.06 + Math.random() * 0.14) + ')'; x.lineWidth = 0.5 + Math.random() * 1.6;
        x.beginPath(); x.moveTo(px, py);
        for (var j = 0; j < 9; j++) { px += (Math.random() - 0.5) * 50; py += (Math.random() - 0.5) * 40; x.lineTo(px, py); }
        x.stroke();
      }
      var t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; return t;
    };
    var makeView = function (canvas, o) {
      var renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputEncoding = T.sRGBEncoding;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.localClippingEnabled = true;
      var scene = new T.Scene();
      var env = new T.Scene();
      env.add(new T.Mesh(new T.BoxGeometry(12, 12, 12), new T.MeshBasicMaterial({ color: 0x0b2347, side: T.BackSide })));
      var pa = new T.Mesh(new T.PlaneGeometry(6, 3), new T.MeshBasicMaterial({ color: new T.Color(6, 6, 6), side: T.DoubleSide })); pa.position.set(0, 5, 2); pa.rotation.x = Math.PI / 2; env.add(pa);
      var pb = new T.Mesh(new T.PlaneGeometry(3, 4), new T.MeshBasicMaterial({ color: new T.Color(0.6, 2.6, 3), side: T.DoubleSide })); pb.position.set(-5, 0, 1); pb.rotation.y = Math.PI / 2; env.add(pb);
      var pc = new T.Mesh(new T.PlaneGeometry(4, 4), new T.MeshBasicMaterial({ color: new T.Color(3, 3, 3.4), side: T.DoubleSide })); pc.position.set(3, 1, 5); pc.lookAt(0, 0, 0); env.add(pc);
      var pm = new T.PMREMGenerator(renderer);
      scene.environment = pm.fromScene(env, 0.04).texture; pm.dispose();
      scene.add(new T.HemisphereLight(0xffffff, 0x1846c8, 0.5));
      var dl = new T.DirectionalLight(0xffffff, 1.6); dl.position.set(3, 4, 5); scene.add(dl);
      var rim = new T.PointLight(0x3fd0e8, 2.2, 12); rim.position.set(-3, -1, -2.5); scene.add(rim);
      var cam = new T.PerspectiveCamera(o.fov || 30, 1, 0.1, 100);
      cam.position.fromArray(o.cam); cam.lookAt(o.look ? new T.Vector3().fromArray(o.look) : new T.Vector3());
      var root = new T.Group(); scene.add(root);
      var v = { renderer: renderer, scene: scene, cam: cam, root: root, visible: true, rx: o.rx || 0, ry: o.ry || 0, bx: o.rx || 0, by: o.ry || 0, vx: 0, vy: 0, drag: false, lx: 0, ly: 0 };
      var down = function (e) { v.drag = true; v.lx = e.clientX; v.ly = e.clientY; canvas.style.cursor = 'grabbing'; try { canvas.setPointerCapture(e.pointerId); } catch (er) {} };
      var move = function (e) { if (!v.drag) return; var dx = e.clientX - v.lx, dy = e.clientY - v.ly; v.lx = e.clientX; v.ly = e.clientY; v.vy = dx * 0.006; v.vx = dy * 0.006; v.ry += v.vy; v.rx += v.vx; };
      var up = function () { v.drag = false; canvas.style.cursor = 'grab'; };
      canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move);
      canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
      var fit = function () {
        var r = canvas.parentNode.getBoundingClientRect(); if (!r.width || !r.height) return;
        renderer.setSize(r.width, r.height, false); cam.aspect = r.width / r.height; cam.updateProjectionMatrix();
      };
      fit();
      v.ro = new ResizeObserver(fit); v.ro.observe(canvas.parentNode);
      v.io = new IntersectionObserver(function (en) { v.visible = en[0].isIntersecting; }); v.io.observe(canvas);
      v.physics = function (dt, t) {
        if (!v.drag) {
          v.ry += v.vy; v.rx += v.vx;
          var damp = Math.exp(-dt * 3.2); v.vy *= damp; v.vx *= damp;
          var still = Math.abs(v.vx) < 0.002 && Math.abs(v.vy) < 0.002;
          if (still) v.rx = ease(v.rx, v.bx, dt, 1.2);
          if (o.sway && still) {
            while (v.ry - v.by > Math.PI) v.by += Math.PI * 2;
            while (v.by - v.ry > Math.PI) v.by -= Math.PI * 2;
            v.ry = ease(v.ry, v.by + Math.sin(t * 0.45) * o.sway, dt, 0.9);
          }
          if (o.spin) v.ry += o.spin * dt;
        }
        v.rx = Math.max(-1.3, Math.min(1.3, v.rx));
        root.rotation.x = v.rx; root.rotation.y = v.ry;
      };
      v.dispose = function () { v.ro.disconnect(); v.io.disconnect(); renderer.dispose(); };
      return v;
    };
    var buildEye = function (root, cp) {
      var g = new T.Group(); root.add(g);
      var sMat = new T.MeshPhysicalMaterial({ map: scleraTex(), roughness: 0.32, clearcoat: 0.8, clearcoatRoughness: 0.15, clippingPlanes: cp, clipIntersection: true });
      var sg = new T.SphereGeometry(1, 96, 64, 0, Math.PI * 2, 0.45, Math.PI - 0.45); sg.rotateX(Math.PI / 2);
      g.add(new T.Mesh(sg, sMat));
      g.add(new T.Mesh(new T.SphereGeometry(0.965, 64, 48), new T.MeshStandardMaterial({ color: 0xb8402e, roughness: 0.55, emissive: 0x3a0a05, side: T.BackSide, clippingPlanes: cp, clipIntersection: true })));
      var iris = new T.Mesh(new T.CircleGeometry(0.43, 96), new T.MeshPhysicalMaterial({ map: irisTex(), roughness: 0.45, clearcoat: 0.3, clippingPlanes: cp, clipIntersection: true }));
      iris.position.z = 0.895; g.add(iris);
      var pupil = new T.Mesh(new T.CircleGeometry(0.12, 64), new T.MeshBasicMaterial({ color: 0x02050c, clippingPlanes: cp, clipIntersection: true }));
      pupil.position.z = 0.898; g.add(pupil);
      var cg = new T.SphereGeometry(0.56, 64, 32, 0, Math.PI * 2, 0, 0.88); cg.rotateX(Math.PI / 2);
      var cMat = new T.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0, clearcoat: 1, clearcoatRoughness: 0, transparent: true, opacity: 0.16, envMapIntensity: 2.5, emissive: 0x3fd0e8, emissiveIntensity: 0, depthWrite: false, clippingPlanes: cp, clipIntersection: true });
      var cornea = new T.Mesh(cg, cMat); cornea.position.z = 0.548; g.add(cornea);
      var lens = new T.Mesh(new T.SphereGeometry(0.34, 48, 32), new T.MeshPhysicalMaterial({ color: 0xf6d9a0, roughness: 0.15, clearcoat: 1, transparent: true, opacity: 0.85 }));
      lens.scale.set(1, 1, 0.42); lens.position.z = 0.74; g.add(lens);
      var nerve = new T.Mesh(new T.CylinderGeometry(0.15, 0.2, 0.8, 32), new T.MeshStandardMaterial({ color: 0xe6c49a, roughness: 0.7 }));
      nerve.rotation.x = Math.PI / 2; nerve.position.set(0.12, 0, -1.25); g.add(nerve);
      return { g: g, cMat: cMat, pupil: pupil, lens: lens };
    };
    var buildIOL = function () {
      var g = new T.Group();
      var gm = new T.MeshPhysicalMaterial({ color: 0xd8f6ff, roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0, transparent: true, opacity: 0.62, envMapIntensity: 2.8, emissive: 0x0b3a7a, emissiveIntensity: 0.25 });
      var optic = new T.Mesh(new T.SphereGeometry(0.6, 64, 40), gm); optic.scale.set(1, 1, 0.24); g.add(optic);
      var hm = new T.MeshPhysicalMaterial({ color: 0x7fe3f2, roughness: 0.2, clearcoat: 1, emissive: 0x1846c8, emissiveIntensity: 0.25 });
      for (var k = 0; k < 2; k++) {
        var h = new T.Group();
        h.add(new T.Mesh(new T.TorusGeometry(1.0, 0.034, 12, 90, 1.7), hm));
        var conn = new T.Mesh(new T.CylinderGeometry(0.034, 0.05, 0.42, 12), hm); conn.rotation.z = Math.PI / 2; conn.position.set(0.79, 0, 0); h.add(conn);
        h.rotation.z = k * Math.PI; g.add(h);
      }
      var mkRing = function (r) {
        var m = new T.Mesh(new T.TorusGeometry(r, 0.009, 8, 120), new T.MeshBasicMaterial({ color: 0x7fe3f2, transparent: true, opacity: 0.9, blending: T.AdditiveBlending, depthWrite: false }));
        m.position.z = 0.144 * Math.sqrt(1 - Math.pow(r / 0.6, 2)) + 0.004; return m;
      };
      var band = new T.Group(); band.add(mkRing(0.35)); band.add(mkRing(0.39)); band.add(mkRing(0.43)); g.add(band);
      var tri = new T.Group(); tri.add(mkRing(0.2)); tri.add(mkRing(0.33)); tri.add(mkRing(0.46)); g.add(tri);
      return { g: g, band: band, tri: tri };
    };

    // 1 · Scroll story — GSAP ScrollTrigger scrubs one timeline that takes the eye apart (córnea, iris, cristalino, retina),
    //     traces light rays (miopía, astigmatismo), fires a red laser on the cornea and swaps the lens for an intraocular lens.
    var retinaTex = function () {
      var c = document.createElement('canvas'); c.width = 1024; c.height = 512;
      var x = c.getContext('2d');
      var g = x.createLinearGradient(0, 0, 0, 512);
      g.addColorStop(0, '#7a2216'); g.addColorStop(0.5, '#cf5f37'); g.addColorStop(1, '#7a2216');
      x.fillStyle = g; x.fillRect(0, 0, 1024, 512);
      var dx = 800, dy = 256;
      var mac = x.createRadialGradient(700, 256, 0, 700, 256, 60); mac.addColorStop(0, 'rgba(70,14,8,.75)'); mac.addColorStop(1, 'rgba(70,14,8,0)');
      x.fillStyle = mac; x.fillRect(600, 160, 200, 200);
      var branch = function (px, py, ang, len, w, depth) {
        if (depth > 5 || w < 0.4) return;
        var nx = px + Math.cos(ang) * len, ny = py + Math.sin(ang) * len;
        x.strokeStyle = 'rgba(110,12,10,' + (0.55 + Math.random() * 0.3).toFixed(2) + ')'; x.lineWidth = w; x.lineCap = 'round';
        x.beginPath(); x.moveTo(px, py);
        x.quadraticCurveTo((px + nx) / 2 + (Math.random() - 0.5) * len * 0.5, (py + ny) / 2 + (Math.random() - 0.5) * len * 0.5, nx, ny); x.stroke();
        branch(nx, ny, ang + (Math.random() - 0.5) * 0.9, len * 0.78, w * 0.72, depth + 1);
        if (Math.random() < 0.7) branch(nx, ny, ang + (Math.random() < 0.5 ? -1 : 1) * (0.4 + Math.random() * 0.5), len * 0.6, w * 0.6, depth + 1);
      };
      [-2.4, -2.0, 2.0, 2.4, -0.6, 0.6, 3.14].forEach(function (a) { branch(dx, dy, a, 70 + Math.random() * 40, 5, 0); });
      var disc = x.createRadialGradient(dx, dy, 0, dx, dy, 34); disc.addColorStop(0, '#fff1c4'); disc.addColorStop(0.7, '#f3c07a'); disc.addColorStop(1, 'rgba(243,192,122,0)');
      x.fillStyle = disc; x.beginPath(); x.arc(dx, dy, 34, 0, 6.29); x.fill();
      var t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; return t;
    };
    var sv = null;
    if (self.s3Cv && self.s3El) {
      sv = makeView(self.s3Cv, { cam: [0, 0.2, 7.4], rx: 0, ry: 0, sway: 0.0001 });
      var eyeG = new T.Group(); sv.root.add(eyeG);
      var cutLocal = new T.Plane(new T.Vector3(-1, 0, 0), 1.6), cutWorld = new T.Plane(), cps = [cutWorld];
      var globe = new T.Group(); eyeG.add(globe);
      var sclGeo = new T.SphereGeometry(1, 96, 64, 0, Math.PI * 2, 0.45, Math.PI - 0.45); sclGeo.rotateX(Math.PI / 2);
      globe.add(new T.Mesh(sclGeo, new T.MeshPhysicalMaterial({ map: scleraTex(), roughness: 0.32, clearcoat: 0.8, clearcoatRoughness: 0.15, side: T.DoubleSide, clippingPlanes: cps })));
      globe.add(new T.Mesh(new T.SphereGeometry(0.965, 72, 48), new T.MeshStandardMaterial({ map: retinaTex(), roughness: 0.6, emissive: 0x2a0804, side: T.BackSide, clippingPlanes: cps })));
      var nerve3 = new T.Mesh(new T.CylinderGeometry(0.15, 0.2, 0.8, 32), new T.MeshStandardMaterial({ color: 0xe6c49a, roughness: 0.7 }));
      nerve3.rotation.x = Math.PI / 2; nerve3.position.set(0.12, 0, -1.3); globe.add(nerve3);
      var irisG = new T.Group(); eyeG.add(irisG);
      var irisM = new T.Mesh(new T.RingGeometry(0.12, 0.47, 96, 1), new T.MeshPhysicalMaterial({ map: irisTex(), roughness: 0.45, clearcoat: 0.3, side: T.DoubleSide, clippingPlanes: cps }));
      irisG.add(irisM);
      var lensMat = new T.MeshPhysicalMaterial({ color: 0xf3d79a, roughness: 0.12, clearcoat: 1, transparent: true, opacity: 0.82, emissive: 0x3a2a00, emissiveIntensity: 0.2 });
      var lens3 = new T.Mesh(new T.SphereGeometry(0.36, 48, 32), lensMat); lens3.scale.set(1, 1, 0.45); eyeG.add(lens3);
      var corGeo = new T.SphereGeometry(0.56, 64, 32, 0, Math.PI * 2, 0, 0.95); corGeo.rotateX(Math.PI / 2);
      var corMat = new T.MeshPhysicalMaterial({ color: 0xcff6ff, roughness: 0, clearcoat: 1, clearcoatRoughness: 0, transparent: true, opacity: 0.24, envMapIntensity: 2.6, emissive: 0xff2a2a, emissiveIntensity: 0, side: T.DoubleSide, depthWrite: false, clippingPlanes: cps });
      var cornea3 = new T.Mesh(corGeo, corMat); eyeG.add(cornea3);
      var iol3 = buildIOL(); iol3.band.scale.setScalar(0.001); iol3.g.scale.setScalar(0.5); eyeG.add(iol3.g);

      var add = function (c) { return new T.MeshBasicMaterial({ color: c, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false }); };
      var UP = new T.Vector3(0, 1, 0), vA = new T.Vector3(), vB = new T.Vector3(), vD = new T.Vector3(), vC = new T.Vector3();
      var cyl = new T.CylinderGeometry(1, 1, 1, 8, 1, true);
      var setSeg = function (m, a, b, r) {
        vD.subVectors(b, a); var len = Math.max(1e-4, vD.length());
        m.position.copy(a).addScaledVector(vD, 0.5); m.quaternion.setFromUnitVectors(UP, vD.multiplyScalar(1 / len)); m.scale.set(r, len, r);
      };
      var raysG = new T.Group(); eyeG.add(raysG);
      var HS = [-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3];
      var fans = [new T.Vector3(0, 1, 0), new T.Vector3(1, 0, 0)].map(function (u, fi) {
        var mat = add(fi ? 0x7fe3f2 : 0xffc85a);
        var rs = HS.map(function (h) { var a = new T.Mesh(cyl, mat), b = new T.Mesh(cyl, mat); raysG.add(a); raysG.add(b); return { h: h, a: a, b: b }; });
        return { u: u, mat: mat, rays: rs };
      });
      var focMat = add(0xfff1c2), spotMat = add(0xff5a4a);
      var focal = new T.Mesh(new T.SphereGeometry(0.05, 16, 12), focMat); raysG.add(focal);
      var spot = new T.Mesh(new T.CircleGeometry(1, 48), spotMat); spot.position.z = -0.95; raysG.add(spot);
      var beamM = add(0xff3030), glowM = add(0xff1a1a), lspotM = add(0xffb0b0);
      var beam = new T.Mesh(cyl, beamM), bglow = new T.Mesh(cyl, glowM), lspot = new T.Mesh(new T.SphereGeometry(0.035, 16, 12), lspotM);
      eyeG.add(beam); eyeG.add(bglow); eyeG.add(lspot);
      var ZR = -0.94;
      var S = { rot: 0, explode: 0, lblA: 0, cut: 0, rays: 0, astig: 0, laser: 0, correct: 0, near: 0, swap: 0, glass: 0, brk: 0, glow: 0, pair: 0 };
      var tl = null, T3 = 0;
      if (window.gsap) {
        tl = window.gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } });
        tl.to(S, { rot: 1, duration: 1.1 }, 0)
          .to(S, { explode: 1, duration: 0.8 }, 0.45)
          .to(S, { lblA: 1, duration: 0.3, ease: 'power2.out' }, 1.05)
          .to(S, { lblA: 0, duration: 0.2, ease: 'power2.in' }, 1.7)
          .to(S, { explode: 0, duration: 0.6 }, 1.8)
          .to(S, { cut: 1, duration: 0.6 }, 1.95)
          .to(S, { rays: 1, duration: 0.4, ease: 'power2.out' }, 2.3)
          .to(S, { astig: 1, duration: 0.6 }, 3.1)
          .to(S, { laser: 1, duration: 0.3, ease: 'power2.out' }, 4.0)
          .to(S, { correct: 1, astig: 0, duration: 0.55 }, 4.25)
          .to(S, { laser: 0, duration: 0.25, ease: 'power2.in' }, 4.75)
          .to(S, { near: 1, duration: 0.3 }, 5.0)
          .to(S, { swap: 1, duration: 0.6 }, 5.4)
          .to(S, { rays: 0, cut: 0, duration: 0.5 }, 6.1)
          .to(S, { rot: 2, duration: 0.75 }, 6.1)
          .to(S, { pair: 1, duration: 0.7 }, 6.15)
          .to(S, { glass: 1, duration: 0.55, ease: 'power3.out' }, 6.45)
          .to(S, { brk: 1, duration: 0.95, ease: 'power1.inOut' }, 7.1)
          .to(S, { glow: 1, duration: 0.5, ease: 'power2.out' }, 7.3)
          .set(S, {}, 8.2);
        var findScroller = function (el) {
          var p = el.parentElement;
          while (p && p !== document.body && p !== document.documentElement) {
            var cs = getComputedStyle(p);
            if (/(auto|scroll)/.test(cs.overflowY) && p.scrollHeight > p.clientHeight + 1) return p;
            p = p.parentElement;
          }
          return window;
        };
        if (window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger);
          self._st = window.ScrollTrigger.create({ trigger: self.s3El, scroller: findScroller(self.s3El), start: 'top top', end: 'bottom bottom', scrub: 1.1, animation: tl });
          // phase 7 ('Sin lentes'): annotation layer off on enter (both directions), back on only when leaving upward
          var scr = findScroller(self.s3El), FINAL_T = 6.05;
          var setFinal = function (on) {
            self._s3Final = on;
            if (self.s3LabelsEl) window.gsap.set(self.s3LabelsEl, { autoAlpha: on ? 0 : 1 });
            var hint = self.s3El.querySelector('.s3-hint');
            if (hint) window.gsap.to(hint, { autoAlpha: on ? 0 : 1, duration: 0.3, overwrite: true });
            if (on && self.state.s3g) self.setState({ s3g: '' });
          };
          self._stFinal = window.ScrollTrigger.create({
            trigger: self.s3El, scroller: scr, invalidateOnRefresh: true, end: 'bottom bottom',
            start: function () {
              var vh = scr === window ? window.innerHeight : scr.clientHeight;
              var dist = Math.max(1, self.s3El.offsetHeight - vh);
              return 'top+=' + Math.round(dist * FINAL_T / tl.duration()) + ' top';
            },
            onEnter: function () { setFinal(true); }, onEnterBack: function () { setFinal(true); },
            onLeave: function () { setFinal(true); }, onLeaveBack: function () { setFinal(false); }
          });
          self._stT = setTimeout(function () { try { window.ScrollTrigger.refresh(); } catch (er) {} }, 800);
        } else {
          self._manualStory = true;
        }
        self._tl = tl;
      }
      var cut = function (a, b, x) { return Math.max(0, Math.min(1, (x - a) / (b - a))); };
      // ---- Phase 7 · "Sin lentes": stylised glasses float in front of the eye, then break apart.
      //      Every piece is a pure function of S.brk, so scrolling back rebuilds them exactly.
      var glassG = new T.Group(); sv.root.add(glassG); glassG.visible = false;
      var frameMat = new T.MeshPhysicalMaterial({ color: 0xd9e6e0, metalness: 0.65, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08, transparent: true, opacity: 1 });
      var sqR = function (th, a, b) { var c = Math.abs(Math.cos(th)), s2 = Math.abs(Math.sin(th)); return Math.pow(Math.pow(c / a, 4) + Math.pow(s2 / b, 4), -0.25); };
      var LA = 0.52, LB = 0.4, LX = 0.66;
      var rimShape = function (a, b) {
        var sh = new T.Shape(), N = 72;
        for (var i = 0; i <= N; i++) { var th = i / N * Math.PI * 2, r = sqR(th, a, b), px = Math.cos(th) * r, py = Math.sin(th) * r; if (i) sh.lineTo(px, py); else sh.moveTo(px, py); }
        return sh;
      };
      var rimGeo = (function () {
        var outer = rimShape(LA + 0.07, LB + 0.07), hole = rimShape(LA, LB);
        outer.holes.push(new T.Path(hole.getPoints(72)));
        var g = new T.ExtrudeGeometry(outer, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.018, bevelSize: 0.014, bevelSegments: 3, curveSegments: 8 });
        g.translate(0, 0, -0.025); return g;
      })();
      var halves = [-1, 1].map(function (sgn) {
        var h = new T.Group(); glassG.add(h);
        var rim = new T.Mesh(rimGeo, frameMat); rim.position.x = sgn * LX; h.add(rim);
        var br = new T.Mesh(new T.TorusGeometry(0.13, 0.028, 10, 20, Math.PI / 2), frameMat);
        br.rotation.z = sgn > 0 ? 0 : Math.PI / 2; br.position.set(0, 0.12, 0); h.add(br);
        var temple = new T.Group(); temple.position.set(sgn * (LX + LA + 0.06), 0.12, 0); h.add(temple);
        var arm = new T.Mesh(new T.BoxGeometry(0.045, 0.05, 1.25), frameMat); arm.position.set(0, 0, -0.62); temple.add(arm);
        var tip = new T.Mesh(new T.BoxGeometry(0.045, 0.22, 0.05), frameMat); tip.position.set(0, -0.09, -1.24); tip.rotation.x = 0.5; temple.add(tip);
        return { g: h, sgn: sgn, temple: temple };
      });
      // lenses pre-cut into shards (spokes + inner ring), each centred on its own centroid
      var micaMat = new T.ShaderMaterial({
        uniforms: { tBlur: { value: null }, res: { value: new T.Vector2(1, 1) }, op: { value: 0.96 }, clear: { value: 0 }, bg: { value: new T.Vector3(0.004, 0.02, 0.016) } },
        vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalMatrix * normal; vV = -mv.xyz; gl_Position = projectionMatrix * mv; }',
        fragmentShader: 'uniform sampler2D tBlur; uniform vec2 res; uniform float op; uniform float clear; uniform vec3 bg; varying vec3 vN; varying vec3 vV;'
          + 'void main(){ vec2 uv = gl_FragCoord.xy / res; vec4 sm = texture2D(tBlur, uv); vec3 col = sm.rgb + bg * (1.0 - sm.a);'
          + ' col = pow(max(col, 0.0), vec3(1.0 / 2.2)); float fr = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 3.0);'
          + ' col = mix(col, vec3(0.86, 1.0, 0.94), 0.07 + fr * 0.35); col = mix(col, vec3(0.75, 1.0, 0.88), clear * 0.6);'
          + ' gl_FragColor = vec4(col, op); }',
        transparent: true, depthWrite: false, side: T.DoubleSide
      });
      var shards = [], crackMat = new T.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false });
      var srand = (function () { var z = 11; return function () { z = (z * 16807) % 2147483647; return (z - 1) / 2147483646; }; })();
      [-1, 1].forEach(function (sgn) {
        var cx0 = sgn * LX + (srand() - 0.5) * 0.12, cy0 = (srand() - 0.5) * 0.08, N = 12, angs = [], fr = [];
        for (var i = 0; i < N; i++) { angs.push((i + (srand() - 0.5) * 0.6) / N * Math.PI * 2); fr.push(0.35 + srand() * 0.25); }
        var edge = function (th) { var lx = Math.cos(th), ly = Math.sin(th); var r = sqR(th, LA, LB); return [sgn * LX + lx * r, ly * r]; };
        var toCenter = function (p) { return [p[0] - cx0, p[1] - cy0]; };
        for (var j = 0; j < N; j++) {
          var a0 = angs[j], a1 = j + 1 < N ? angs[j + 1] : angs[0] + Math.PI * 2;
          var e0 = edge(a0), e1 = edge(a1);
          var m0 = [cx0 + (e0[0] - cx0) * fr[j], cy0 + (e0[1] - cy0) * fr[j]], m1 = [cx0 + (e1[0] - cx0) * fr[(j + 1) % N], cy0 + (e1[1] - cy0) * fr[(j + 1) % N]];
          var polys = [[[cx0, cy0], m0, m1]];
          var outer = [m0, e0]; for (var k = 1; k < 4; k++) outer.push(edge(a0 + (a1 - a0) * k / 4)); outer.push(e1); outer.push(m1);
          polys.push(outer);
          polys.forEach(function (poly) {
            var gx = 0, gy = 0; poly.forEach(function (p) { gx += p[0]; gy += p[1]; }); gx /= poly.length; gy /= poly.length;
            var sh = new T.Shape(); poly.forEach(function (p, q) { if (q) sh.lineTo(p[0] - gx, p[1] - gy); else sh.moveTo(p[0] - gx, p[1] - gy); });
            var geo = new T.ShapeGeometry(sh);
            var mat = micaMat.clone();
            var m = new T.Mesh(geo, mat); m.position.set(gx, gy, 0); glassG.add(m);
            var crack = new T.LineSegments(new T.EdgesGeometry(geo), crackMat); m.add(crack);
            var d = toCenter([gx, gy]), dl = Math.max(0.05, Math.hypot(d[0], d[1]));
            shards.push({ m: m, mat: mat, base: new T.Vector3(gx, gy, 0),
              dir: new T.Vector3(d[0] / dl * 0.8 + sgn * 0.35, d[1] / dl * 0.8, 1.0 + srand() * 1.2).normalize(),
              spd: 0.9 + srand() * 1.1, axis: new T.Vector3(srand() - 0.5, srand() - 0.5, srand() - 0.5).normalize(), spin: 2 + srand() * 5, delay: srand() * 0.12 });
          });
        }
      });
      // particles the shards dissolve into
      var dotTex = (function () { var c = document.createElement('canvas'); c.width = c.height = 64; var x = c.getContext('2d'); var g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.4, 'rgba(255,255,255,.6)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new T.CanvasTexture(c); })();
      var mkCloud = function (n, color, size) {
        var pos = new Float32Array(n * 3), p0 = [], vel = [];
        for (var i = 0; i < n; i++) {
          var sgn = i % 2 ? 1 : -1, th = srand() * Math.PI * 2, rr = Math.sqrt(srand()) * sqR(th, LA, LB);
          p0.push(new T.Vector3(sgn * LX + Math.cos(th) * rr, Math.sin(th) * rr, (srand() - 0.5) * 0.04));
          vel.push(new T.Vector3(Math.cos(th) * (0.6 + srand()) + sgn * 0.3, Math.sin(th) * (0.6 + srand()) + 0.3, 0.9 + srand() * 1.8));
        }
        var geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3));
        var mat = new T.PointsMaterial({ color: color, size: size, map: dotTex, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false, sizeAttenuation: true });
        var pts = new T.Points(geo, mat); glassG.add(pts);
        return { pts: pts, geo: geo, mat: mat, p0: p0, vel: vel, n: n };
      };
      var clouds = [mkCloud(420, 0x00e676, 0.07), mkCloud(280, 0xeafff4, 0.05)];
      var snapM = add(0xeafff4), snap = new T.Mesh(new T.SphereGeometry(0.12, 16, 12), snapM); snap.position.set(0, 0.12, 0.05); glassG.add(snap);
      // neon halo behind the freed eye
      var haloTex = (function () { var c = document.createElement('canvas'); c.width = c.height = 256; var x = c.getContext('2d'); var g = x.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, 'rgba(0,230,118,.9)'); g.addColorStop(0.35, 'rgba(0,230,118,.35)'); g.addColorStop(1, 'rgba(0,230,118,0)'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); return new T.CanvasTexture(c); })();
      var haloMat = new T.SpriteMaterial({ map: haloTex, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false });
      var halo = new T.Sprite(haloMat); halo.scale.set(4.2, 4.2, 1); halo.position.set(0, 0, -1.3); sv.root.add(halo);
      var neonLight = new T.PointLight(0x00e676, 0, 9); neonLight.position.set(-1.5, 0.8, 3); sv.scene.add(neonLight);
      var GS = 1.5, GZ = 1.6, GY = 0.08;
      var mkFaceEye = function () {
        var g = new T.Group();
        var sg = new T.SphereGeometry(1, 72, 48, 0, Math.PI * 2, 0.45, Math.PI - 0.45); sg.rotateX(Math.PI / 2);
        g.add(new T.Mesh(sg, new T.MeshPhysicalMaterial({ map: scleraTex(), roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.15 })));
        g.add(new T.Mesh(new T.SphereGeometry(0.97, 48, 32), new T.MeshBasicMaterial({ color: 0x0c0302, side: T.BackSide })));
        var im = new T.MeshPhysicalMaterial({ map: irisTex(), roughness: 0.4, clearcoat: 0.4, side: T.DoubleSide, emissive: new T.Color(0x00e676), emissiveIntensity: 0 });
        var ir = new T.Mesh(new T.RingGeometry(0.12, 0.47, 96, 1), im); ir.position.z = 0.86; g.add(ir);
        var pu = new T.Mesh(new T.CircleGeometry(0.13, 48), new T.MeshBasicMaterial({ color: 0x010203 })); pu.position.z = 0.85; g.add(pu);
        var cg2 = new T.SphereGeometry(0.56, 64, 32, 0, Math.PI * 2, 0, 0.95); cg2.rotateX(Math.PI / 2);
        var cm = new T.MeshPhysicalMaterial({ color: 0xcff6ff, roughness: 0, clearcoat: 1, transparent: true, opacity: 0.2, envMapIntensity: 2.6, depthWrite: false, emissive: new T.Color(0x00e676), emissiveIntensity: 0 });
        var co = new T.Mesh(cg2, cm); co.position.z = 0.548; g.add(co);
        g.visible = false; sv.root.add(g);
        return { g: g, im: im, cm: cm, pu: pu };
      };
      var pairEyes = [];
      // finale typography: '100%' behind the left mica, 'LIBRE' behind the right one, then '100% LIBRE DE LENTES'
      var mkTextTex = function (lines, o) {
        var W = 2048, LH = o.lh || 300, H = LH * lines.length + 160, c = document.createElement('canvas'); c.width = W; c.height = H;
        var x = c.getContext('2d'), tex = new T.CanvasTexture(c); tex.encoding = T.sRGBEncoding;
        var draw = function () {
          if (!x || !x.clearRect) return;
          x.clearRect(0, 0, W, H); x.textAlign = 'center'; x.textBaseline = 'middle';
          x.font = '800 ' + (o.size || 240) + 'px Sora, Manrope, system-ui, sans-serif';
          x.filter = o.blur ? 'blur(' + o.blur + 'px)' : 'none';
          x.fillStyle = o.fill;
          for (var pass = 0; pass < (o.passes || 1); pass++) lines.forEach(function (l, i) { x.fillText(l, W / 2, 80 + LH * (i + 0.5)); });
          x.filter = 'none'; tex.needsUpdate = true;
        };
        draw();
        try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw); } catch (er) {}
        return { tex: tex, aspect: W / H };
      };
      var txtG = new T.Group(); txtG.visible = false; sv.root.add(txtG);
      var txtMesh = function (tt, h, additive) {
        var m = new T.Mesh(new T.PlaneGeometry(h * tt.aspect, h), new T.MeshBasicMaterial({ map: tt.tex, transparent: true, opacity: 0, depthWrite: false, toneMapped: false, blending: additive ? T.AdditiveBlending : T.NormalBlending }));
        txtG.add(m); return m;
      };
      var PHR = ['100% LIBRE', 'DE LENTES'];
      var w100 = txtMesh(mkTextTex(['100%'], { fill: '#EAFFF4' }), 0.62);
      var wLib = txtMesh(mkTextTex(['LIBRE'], { fill: '#EAFFF4' }), 0.62);
      var finB = txtMesh(mkTextTex(PHR, { fill: '#FFFFFF', lh: 280, blur: 28 }), 1.5);
      var fin = txtMesh(mkTextTex(PHR, { fill: '#FFFFFF', lh: 280 }), 1.5);
      var finG = txtMesh(mkTextTex(PHR, { fill: '#00E676', lh: 280, blur: 70, passes: 3 }), 1.5, true);
      var finG2 = txtMesh(mkTextTex(PHR, { fill: '#2BD18A', lh: 280, blur: 150, passes: 3 }), 1.5, true);
      fin.renderOrder = 13; finB.renderOrder = 12; finG.renderOrder = 11; finG2.renderOrder = 10;
      [fin, finB, finG, finG2].forEach(function (m) { m.material.depthTest = false; });
      var irisMat3 = irisM.material; irisMat3.emissive = new T.Color(0x00e676); irisMat3.emissiveIntensity = 0;
      var updateGlasses = function (t) {
        var gl = S.glass, bk = S.brk;
        glassG.visible = gl > 0.01;
        if (glassG.visible) {
          glassG.position.set(0, GY + (1 - gl) * 2.6 + Math.sin(t * 1.1) * 0.02 * (1 - bk), GZ);
          glassG.rotation.set((1 - gl) * 0.6 + Math.sin(t * 0.7) * 0.012, Math.sin(t * 0.5) * 0.015, 0);
          glassG.scale.setScalar(GS);
          var u2 = cut(0.06, 0.8, bk), ue = 1 - Math.pow(1 - u2, 3);
          halves.forEach(function (H) {
            H.g.position.set(H.sgn * ue * 1.2, -ue * 0.45 - u2 * u2 * 0.3, ue * 0.4);
            H.g.rotation.set(ue * 0.5, -H.sgn * ue * 0.9, H.sgn * ue * 0.55);
            H.temple.rotation.y = H.sgn * (0.12 + ue * 0.9);
          });
          frameMat.opacity = 1 - cut(0.55, 0.95, bk);
          crackMat.opacity = cut(0.0, 0.06, bk) * (1 - cut(0.12, 0.22, bk)) * 0.9;
          shards.forEach(function (sd) {
            var u = cut(0.1 + sd.delay, 0.72 + sd.delay, bk), eo = 1 - Math.pow(1 - u, 2.4);
            sd.m.position.copy(sd.base).addScaledVector(sd.dir, eo * sd.spd * 1.6); sd.m.position.y -= u * u * 0.35;
            sd.m.quaternion.setFromAxisAngle(sd.axis, eo * sd.spin);
            var sc = Math.max(0.001, 1 - cut(0.35, 1, u)); sd.m.scale.setScalar(sc);
            var clr = cut(0.1, 0.18, bk);
            sd.mat.uniforms.clear.value = clr; sd.mat.uniforms.op.value = 0.96 + (0.32 - 0.96) * clr;
            sd.m.visible = sc > 0.01;
          });
          clouds.forEach(function (C) {
            var u = cut(0.22, 1, bk), eo = 1 - Math.pow(1 - u, 2), arr = C.geo.attributes.position.array;
            for (var i = 0; i < C.n; i++) {
              var p = C.p0[i], v = C.vel[i];
              arr[i * 3] = p.x + v.x * eo * 1.1; arr[i * 3 + 1] = p.y + v.y * eo * 1.1 + u * 0.35; arr[i * 3 + 2] = p.z + v.z * eo * 1.1;
            }
            C.geo.attributes.position.needsUpdate = true;
            C.mat.opacity = cut(0.22, 0.32, bk) * (1 - cut(0.6, 1, bk)) * 0.95;
            C.pts.visible = C.mat.opacity > 0.01;
          });
          var fl = Math.exp(-Math.pow((bk - 0.08) / 0.05, 2));
          snapM.opacity = fl; snap.scale.setScalar(0.4 + fl * 1.6); snap.visible = fl > 0.02;
        }
        // place each eye on the camera ray through its mica centre, sized to sit inside the mica
        var pr = S.pair, kk2 = cut(0.25, 1, pr), ek = 1 - Math.pow(1 - kk2, 3);
        var cz = sv.cam.position.z, cyy = sv.cam.position.y, ratio = cz / Math.max(0.5, cz - GZ);
        var rEye = 0.4 * GS * 0.9 * ratio;
        pairEyes.forEach(function (P, idx) {
          var sgn = idx ? 1 : -1;
          P.g.visible = kk2 > 0.01;
          if (!P.g.visible) return;
          var tx = sgn * LX * GS * ratio, ty = cyy + (GY - cyy) * ratio;
          P.g.position.set(tx * ek, ty * ek, 0);
          P.g.scale.setScalar(Math.max(0.001, rEye * (0.35 + 0.65 * ek)));
          P.g.rotation.set(Math.sin(t * 0.6 + idx) * 0.03, -sgn * 0.04 + Math.sin(t * 0.45) * 0.05, 0);
          P.pu.scale.setScalar(1 + 0.06 * Math.sin(t * 0.9));
        });
        // words sit on the camera ray through each mica centre (blurred by the frosted micas), then merge into the phrase
        txtG.visible = S.glass > 0.01;
        if (txtG.visible) {
          var tyy = cyy + (GY - cyy) * ratio, xw = LX * GS * ratio;
          var mg = cut(0.14, 0.7, bk), me = 1 - Math.pow(1 - mg, 3);
          var wop = cut(0.2, 1, S.glass) * (1 - cut(0.25, 0.6, mg));
          w100.position.set(-xw * (1 - me * 0.55), tyy, 0); wLib.position.set(xw * (1 - me * 0.55), tyy, 0);
          w100.scale.setScalar(1 + me * 0.3); wLib.scale.setScalar(1 + me * 0.3);
          w100.material.opacity = wop; wLib.material.opacity = wop;
          var fo = cut(0.35, 0.9, mg), fsc = 0.78 + 0.42 * me, bl = 1 - cut(0.45, 1.0, bk);
          [fin, finB, finG, finG2].forEach(function (m) { m.position.set(0, tyy - 0.04, -0.02); m.scale.setScalar(fsc); });
          finG.scale.setScalar(fsc * 1.04); finG2.scale.setScalar(fsc * 1.1);
          finB.material.opacity = fo * bl; fin.material.opacity = fo * (1 - bl);
          var gpulse = S.glow * (0.8 + 0.2 * Math.sin(t * 1.8));
          finG.material.opacity = gpulse * 0.95; finG2.material.opacity = gpulse * 0.7;
        }
        var flash = Math.exp(-Math.pow((bk - 0.12) / 0.07, 2));
        var gw = S.glow * (0.85 + 0.15 * Math.sin(t * 1.6));
        haloMat.opacity = gw * 0.75 + flash * 0.45; halo.visible = haloMat.opacity > 0.01;
        neonLight.intensity = gw * 2.4 + flash * 3;
        irisMat3.emissiveIntensity = gw * 0.22 + flash * 0.3;
        pairEyes.forEach(function (P) { P.im.emissiveIntensity = gw * 0.25 + flash * 0.35; P.cm.emissiveIntensity = gw * 0.12 + flash * 0.5; });
        halo.scale.set(4.2 * (1 + S.pair * 0.75), 4.2 * (1 - S.pair * 0.2), 1);
        return flash;
      };
      var GROUPS = [
        { id: 'myo', a: 2.35, b: 3.05 }, { id: 'ast', a: 3.12, b: 3.95 }, { id: 'las', a: 4.02, b: 4.95 },
        { id: 'pre1', a: 5.0, b: 5.45 }, { id: 'pre2', a: 5.47, b: 6.05 }
      ];
      var zcF = function (h) { return 0.548 + Math.sqrt(Math.max(0, 0.3136 - h * h)) * cornea3.scale.z; };
      var curZ = { v: -0.55, h: -0.55 };
      var anchors = function (g, e) {
        var oc = 1.5 * e, oi = 0.95 * e, ol = 0.5 * e, og = -0.35 * e;
        if (g === 'anat') return [
          { p: [0, 0.3, 1.04 + oc], dx: -40, dy: -120 }, { p: [0, 0.4, 0.86 + oi], dx: 30, dy: -170 },
          { p: [0, -0.3, 0.72 + ol], dx: -30, dy: 130 }, { p: [0, -0.55, -0.78 + og], dx: 40, dy: 110 }];
        if (g === 'myo') return [{ p: [0, 0, curZ.v], dx: -30, dy: -140 }, { p: [0, 0, ZR], dx: 40, dy: 120 }];
        if (g === 'ast') return [{ p: [0, 0.32, 1.02], dx: -50, dy: -130 }, { p: [0, 0, (curZ.v + curZ.h) / 2], dx: 30, dy: 130 }];
        if (g === 'las') return [{ p: [0, 0.3, 1.02], dx: -50, dy: -130 }, { p: [0, 0, ZR], dx: 40, dy: 120 }];
        if (g === 'pre1') return [{ p: [0, 0.25, 0.72], dx: -40, dy: -140 }, { p: [0, 0, ZR], dx: 40, dy: 120 }];
        if (g === 'pre2') return [{ p: [0, 0.25, 0.72], dx: -40, dy: -140 }, { p: [0, 0, ZR], dx: 40, dy: 120 }];
        return [];
      };
      var vP = new T.Vector3(), lastG = '', lastPh = -1, cA = new T.Color(1, 0.78, 0.35), cG = new T.Color(0.55, 0.95, 0.75), cTmp = new T.Color();
      sv.tick = function (t, dt) {
        if (self._manualStory && tl) {
          var r0 = self.s3El.getBoundingClientRect(), span = Math.max(1, r0.height - window.innerHeight);
          tl.progress(Math.max(0, Math.min(1, -r0.top / span)));
        }
        T3 = tl ? tl.time() : 0;
        var e = S.explode, cw = sv.cam.aspect, mobile = cw < 0.85;
        // eye placement and turn — the canvas is only the right column, so the eye sits at its centre
        var side = -Math.PI / 2 + 0.42;
        var ry = S.rot <= 1 ? -0.5 + (side + 0.5) * S.rot : side + (-0.35 - side) * (S.rot - 1);
        eyeG.rotation.set(0.1 - 0.05 * e, ry, 0);
        // exploded parts drift toward the front (screen-left): shift right so the group stays centred
        eyeG.position.set(e * 0.55 * Math.min(1, S.rot), Math.sin(t * 0.8) * 0.03, 0);
        var shrink = 1 - cut(0, 0.45, S.pair); eyeG.scale.setScalar(Math.max(0.001, shrink)); eyeG.visible = shrink > 0.01;
        // auto-fit distance: the content's half-width/height must fit the column, clamped (zoom limit)
        var tanH = Math.tan(sv.cam.fov * Math.PI / 360);
        var halfW = 1.75 + 0.8 * e + 0.25 * S.rays, halfH = 1.45;
        halfW = halfW + (2.55 - halfW) * S.pair; halfH = halfH + (1.6 - halfH) * S.pair;
        var fitD = Math.max(halfW / (tanH * cw), halfH / tanH) * 1.12;
        fitD = Math.min(15, Math.max(6.2, fitD));
        self._camD = self._camD ? ease(self._camD, fitD, dt, 4) : fitD;
        sv.cam.position.set(0, 0.15, self._camD); sv.cam.lookAt(0, 0, 0);
        // explode along the optical axis
        cornea3.position.z = 0.548 + 1.5 * e;
        irisG.position.z = 0.86 + 0.95 * e;
        var sw = S.swap;
        lens3.position.set(0, sw * 1.25, 0.72 + 0.5 * e);
        lensMat.opacity = 0.82 * Math.max(0, 1 - sw * 1.4); lens3.visible = sw < 0.7;
        lensMat.color.setRGB(0.95, 0.84 - 0.12 * S.near, 0.6 - 0.25 * S.near);
        iol3.g.visible = sw > 0.01; iol3.g.position.set(0, -1.25 * (1 - sw), 0.72 + 0.5 * e); iol3.g.rotation.z = t * 0.3;
        globe.position.z = -0.35 * e;
        cornea3.scale.set(1, 1 - 0.14 * S.astig, 1 - 0.12 * S.correct);
        // cutaway
        cutLocal.constant = 1.6 - 1.6 * S.cut;
        sv.physics(dt, t);
        sv.scene.updateMatrixWorld(true);
        cutWorld.copy(cutLocal).applyMatrix4(eyeG.matrixWorld);
        // light rays
        var on = S.rays * (1 - cut(0, 0.05, e));
        raysG.visible = on > 0.01;
        if (raysG.visible) {
          var zf = -0.55 + (ZR + 0.55) * S.correct;
          zf = zf + (-1.38 - zf) * S.near; zf = zf + (ZR - zf) * S.swap;
          curZ.v = zf + 0.2 * S.astig; curZ.h = zf - 0.12 * S.astig;
          var blur = 0;
          fans.forEach(function (f, fi) {
            var z = fi ? curZ.h : curZ.v, op = fi ? on * S.astig : on;
            var foc = 1 - cut(0, 0.3, Math.abs(z - ZR));
            cTmp.copy(fi ? new T.Color(0.5, 0.89, 0.95) : cA).lerp(cG, foc * (1 - S.astig));
            f.mat.color.copy(cTmp); f.mat.opacity = op * 0.85;
            f.rays.forEach(function (r) {
              var vis = op > 0.01; r.a.visible = r.b.visible = vis; if (!vis) return;
              var h = r.h;
              vA.copy(f.u).multiplyScalar(h); vA.z = 2.6;
              vA.lerp(vC.set(0, 0, 2.4), S.near);
              vB.copy(f.u).multiplyScalar(h); vB.z = zcF(h);
              var tt = (ZR - vB.z) / (z - vB.z);
              vC.set(0, 0, z).sub(vB).multiplyScalar(tt).add(vB);
              if (fi === 0) blur = Math.max(blur, Math.abs(vC.dot(f.u)));
              setSeg(r.a, vA, vB, 0.011); setSeg(r.b, vB, vC, 0.011);
            });
          });
          focal.position.set(0, 0, Math.max(curZ.v, ZR)); focMat.opacity = on;
          var bl = Math.max(0.035, blur);
          spot.scale.set(bl, bl * (1 + S.astig * 0.8), 1);
          spotMat.color.setRGB(blur > 0.05 ? 1 : 0.4, blur > 0.05 ? 0.35 : 0.95, blur > 0.05 ? 0.3 : 0.7);
          spotMat.opacity = on * 0.85;
        }
        // red laser scanning the cornea
        var lz = S.laser;
        beam.visible = bglow.visible = lspot.visible = lz > 0.01;
        if (beam.visible) {
          var ph = (t * 0.6) % 1, rr = 0.04 + ph * 0.3, ang = t * 9;
          var sx = Math.cos(ang) * rr, sy = Math.sin(ang) * rr;
          vA.set(sx, sy, 2.7); vB.set(sx, sy, zcF(rr) + 0.004);
          setSeg(beam, vA, vB, 0.016); setSeg(bglow, vA, vB, 0.07); lspot.position.copy(vB);
          var pulse = 0.7 + 0.3 * Math.sin(t * 24);
          beamM.opacity = lz * pulse; glowM.opacity = lz * 0.3 * pulse; lspotM.opacity = lz;
        }
        var flash = updateGlasses(t);
        corMat.emissive.setHex(lz > 0.01 ? 0xff2a2a : 0x00e676);
        corMat.emissiveIntensity = Math.max(lz * (0.35 + 0.15 * Math.sin(t * 8)), flash * 0.6);
        // which labels
        var g = '', gop = 0;
        if (S.lblA > 0.02) { g = 'anat'; gop = S.lblA; }
        else GROUPS.forEach(function (G) { if (T3 >= G.a && T3 < G.b) { g = G.id; gop = cut(G.a, G.a + 0.12, T3) * (1 - cut(G.b - 0.12, G.b, T3)); } });
        if (g !== lastG) { lastG = g; self.setState({ s3g: g }); }
        var ph3 = Math.max(0, Math.min(7, Math.floor(T3 + 0.08)));
        if (ph3 !== lastPh) { lastPh = ph3; self.setState({ s3p: ph3 }); }
        var finalPh = self._s3Final || T3 >= 6.05 || S.glass > 0.01;
        var w = self.s3Cv.clientWidth, h2 = self.s3Cv.clientHeight, an = finalPh ? [] : anchors(g, e);
        var lblEls = self.s3LabelsEl ? self.s3LabelsEl.children : self.s3L;
        if (self.s3LabelsEl && !self._s3Final) { var lv = finalPh ? 'hidden' : 'visible'; if (self.s3LabelsEl.style.visibility !== lv) { self.s3LabelsEl.style.visibility = lv; self.s3LabelsEl.style.opacity = finalPh ? '0' : '1'; } }
        for (var i = 0; i < 4; i++) {
          var el = lblEls[i]; if (!el) continue;
          var c = an[i];
          if (!c) { el.style.opacity = '0'; el.style.visibility = 'hidden'; continue; }
          vP.fromArray(c.p).applyMatrix4(eyeG.matrixWorld).project(sv.cam);
          var px = (vP.x + 1) / 2 * w, py = (1 - vP.y) / 2 * h2;
          var M = 14, RAILW = mobile ? 34 : 64, HINTH = 56;
          if (px < M || px > w - RAILW || py < M || py > h2 - HINTH) { el.style.opacity = '0'; el.style.visibility = 'hidden'; continue; }
          var k = mobile ? 0.55 : 1, ddx = c.dx * k, ddy = c.dy * k;
          var line = el.children[0], txt = el.children[2];
          var tw = txt.offsetWidth || 170, th = txt.offsetHeight || 32;
          // keep the label inside the stage: a label that would run into the text column points right instead
          if (ddx < 0 && px + ddx - tw < M) ddx = Math.abs(ddx);
          if (ddx >= 0 && px + ddx + tw > w - RAILW) ddx = -Math.max(Math.abs(ddx), 24);
          if (ddx < 0 && px + ddx - tw < M) ddx = M + tw - px;
          var topY = py + ddy - th / 2, botY = py + ddy + th / 2;
          if (topY < M) ddy = M + th / 2 - py;
          if (botY > h2 - HINTH) ddy = h2 - HINTH - th / 2 - py;
          el.style.transform = 'translate(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px)';
          line.style.width = Math.sqrt(ddx * ddx + ddy * ddy) + 'px';
          line.style.transform = 'rotate(' + Math.atan2(ddy, ddx) + 'rad)';
          txt.style.left = ddx + 'px'; txt.style.top = ddy + 'px';
          txt.style.transform = 'translate(' + (ddx < 0 ? '-100%' : '0') + ',-50%)';
          var lo = Math.max(0, Math.min(1, gop * 1.5 - i * 0.2));
          el.style.opacity = String(lo); el.style.visibility = lo > 0.01 ? 'visible' : 'hidden';
        }
        // text panels follow the same timeline
        for (var pi = 0; pi < self.s3P.length; pi++) {
          var pe = self.s3P[pi]; if (!pe) continue;
          var kk = Number(pe.getAttribute('data-p')), d = T3 - (kk + 0.5);
          var op = 1 - Math.max(0, Math.abs(d) - 0.3) / 0.18;
          if (kk === 0 && d < 0) op = 1;
          if (kk === 7 && d > 0) op = 1;
          op = Math.max(0, Math.min(1, op));
          var yy = (kk === 0 && d < 0) || (kk === 7 && d > 0) ? 0 : -d * 90;
          pe.style.opacity = op.toFixed(3);
          pe.style.transform = 'translateY(calc(-50% + ' + (mobile ? yy * 0.5 : yy).toFixed(1) + 'px))';
          pe.style.pointerEvents = op > 0.6 ? 'auto' : 'none';
        }
        renderStory();
      };
      var rtA = null, rtB = null, rtW = 0, rtH = 0, v2 = new T.Vector2();
      var blurMat = new T.ShaderMaterial({
        uniforms: { tex: { value: null }, dir: { value: new T.Vector2() } },
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
        fragmentShader: 'uniform sampler2D tex; uniform vec2 dir; varying vec2 vUv; void main(){ vec4 c = texture2D(tex, vUv) * 0.227027;'
          + ' c += texture2D(tex, vUv + dir * 1.3846) * 0.316216; c += texture2D(tex, vUv - dir * 1.3846) * 0.316216;'
          + ' c += texture2D(tex, vUv + dir * 3.2308) * 0.07027; c += texture2D(tex, vUv - dir * 3.2308) * 0.07027; gl_FragColor = c; }',
        depthTest: false, depthWrite: false
      });
      var quadScene = new T.Scene(), quadCam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      quadScene.add(new T.Mesh(new T.PlaneGeometry(2, 2), blurMat));
      var pass = function (src, dst, dx, dy) { blurMat.uniforms.tex.value = src.texture; blurMat.uniforms.dir.value.set(dx, dy); sv.renderer.setRenderTarget(dst); sv.renderer.render(quadScene, quadCam); };
      var renderStory = function () {
        var R = sv.renderer, frosted = glassG.visible && S.brk < 0.2;
        if (frosted) {
          R.getDrawingBufferSize(v2);
          var w4 = Math.max(4, Math.round(v2.x / 6)), h4 = Math.max(4, Math.round(v2.y / 6));
          if (!rtA || w4 !== rtW || h4 !== rtH) {
            if (rtA) { rtA.dispose(); rtB.dispose(); }
            rtA = new T.WebGLRenderTarget(w4, h4); rtB = new T.WebGLRenderTarget(w4, h4); rtW = w4; rtH = h4;
            shards.forEach(function (sd) { sd.mat.uniforms.tBlur.value = rtA.texture; });
          }
          shards.forEach(function (sd) { sd.mat.uniforms.res.value.copy(v2); });
          glassG.visible = false;
          var cc = R.getClearAlpha(); R.setClearAlpha(0);
          R.setRenderTarget(rtA); R.clear(); R.render(sv.scene, sv.cam);
          pass(rtA, rtB, 1 / w4, 0); pass(rtB, rtA, 0, 1 / h4);
          pass(rtA, rtB, 2 / w4, 0); pass(rtB, rtA, 0, 2 / h4);
          pass(rtA, rtB, 3.5 / w4, 0); pass(rtB, rtA, 0, 3.5 / h4);
          R.setRenderTarget(null); R.setClearAlpha(cc);
          glassG.visible = true;
        }
        R.render(sv.scene, sv.cam);
      };
    }

    // 2 · Intraocular lens close-up
    var iv = makeView(this.iolCv, { cam: [0, 0.6, 5.2], rx: -0.55, ry: 0, spin: 0.35 });
    var iol2 = buildIOL(); iol2.g.scale.setScalar(1.15); iv.root.add(iol2.g); iol2.band.scale.setScalar(0.001);
    // tuned for the light card: deeper blue haptics, tinted optic, visible rings
    iol2.g.traverse(function (m) {
      if (!m.isMesh || !m.material) return;
      var mt = m.material;
      if (mt.blending === T.AdditiveBlending) { mt.blending = T.NormalBlending; mt.color.setHex(0x1846c8); }
      else if (mt.transparent) { mt.color.setHex(0x9fd4f2); mt.opacity = 0.78; mt.emissive.setHex(0x1846c8); mt.emissiveIntensity = 0.12; }
      else { mt.color.setHex(0x1846c8); mt.emissive.setHex(0x0b2347); mt.emissiveIntensity = 0.2; }
    });
    iv.tick = function (t, dt) {
      iol2.g.rotation.z = t * 0.15;
      iol2.tri.children.forEach(function (m, i) { m.material.opacity = 0.5 + 0.5 * Math.sin(t * 2 - i * 0.9); });
      iv.physics(dt, t); iv.renderer.render(iv.scene, iv.cam);
    };

    // 4 · FAQ: vertical reel of simple 3D topic icons that follows the question in view
    var fv = makeView(this.faqCv, { cam: [0, 0.15, 5.2], rx: 0, ry: 0, sway: 0.0001 });
    var texOf = function (w, h, draw) { var c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); var t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4; return t; };
    var rrect = function (x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); };
    var rshape = function (w, h, r) { var s = new T.Shape(); s.moveTo(-w + r, h); s.lineTo(w - r, h); s.quadraticCurveTo(w, h, w, h - r); s.lineTo(w, -h + r); s.quadraticCurveTo(w, -h, w - r, -h); s.lineTo(-w + r, -h); s.quadraticCurveTo(-w, -h, -w, -h + r); s.lineTo(-w, h - r); s.quadraticCurveTo(-w, h, -w + r, h); return s; };
    var ext = function (shape, d, b) { var g = new T.ExtrudeGeometry(shape, { depth: d, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 4, curveSegments: 20 }); g.center(); return g; };
    var gloss = function (c, extra) { var o = { color: c, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.1 }; for (var k in (extra || {})) o[k] = extra[k]; return new T.MeshPhysicalMaterial(o); };
    var mkEyeIcon = function () {
      var g = new T.Group();
      var alm = new T.Shape(); alm.moveTo(-0.62, 0); alm.quadraticCurveTo(0, 0.6, 0.62, 0); alm.quadraticCurveTo(0, -0.6, -0.62, 0);
      var lid = new T.Mesh(ext(alm, 0.1, 0.03), gloss(0x0b2347)); lid.scale.set(1.12, 1.18, 1); lid.position.z = -0.04; g.add(lid);
      g.add(new T.Mesh(ext(alm, 0.12, 0.03), gloss(0xffffff)));
      var irisM = new T.MeshPhysicalMaterial({ map: irisTex(), roughness: 0.3, clearcoat: 1 });
      var iris = new T.Mesh(new T.CylinderGeometry(0.25, 0.25, 0.05, 64), [gloss(0x1846c8), irisM, irisM]); iris.rotation.x = Math.PI / 2; iris.position.z = 0.1; g.add(iris);
      var pup = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.03, 48), new T.MeshBasicMaterial({ color: 0x02050c })); pup.rotation.x = Math.PI / 2; pup.position.z = 0.13; g.add(pup);
      var hi = new T.Mesh(new T.SphereGeometry(0.045, 16, 12), new T.MeshBasicMaterial({ color: 0xffffff })); hi.position.set(0.08, 0.08, 0.15); g.add(hi);
      return g;
    };
    var mkGlassesIcon = function () {
      var g = new T.Group(), fm = gloss(0x0b2347, { metalness: 0.3 });
      var lm = new T.MeshPhysicalMaterial({ color: 0xbff3fb, roughness: 0.05, clearcoat: 1, transparent: true, opacity: 0.45, envMapIntensity: 2.5, side: T.DoubleSide });
      [-0.36, 0.36].forEach(function (x) {
        var r = new T.Mesh(new T.TorusGeometry(0.27, 0.045, 16, 64), fm); r.position.x = x; g.add(r);
        var l = new T.Mesh(new T.CircleGeometry(0.27, 48), lm); l.position.x = x; g.add(l);
        var arm = new T.Mesh(new T.BoxGeometry(0.05, 0.05, 0.62), fm); arm.position.set(x > 0 ? 0.64 : -0.64, 0.04, -0.3); g.add(arm);
      });
      var br = new T.Mesh(new T.TorusGeometry(0.1, 0.035, 12, 32, Math.PI), fm); br.position.y = 0.04; g.add(br);
      return g;
    };
    var mkPhoneIcon = function () {
      var g = new T.Group();
      g.add(new T.Mesh(ext(rshape(0.27, 0.5, 0.09), 0.05, 0.025), gloss(0x0b1a33, { metalness: 0.4 })));
      var scr = texOf(256, 480, function (x, w, h) {
        var gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#1F5BE0'); gr.addColorStop(1, '#07152B'); x.fillStyle = gr; x.fillRect(0, 0, w, h);
        x.fillStyle = '#00E676'; x.beginPath(); x.arc(128, 170, 58, 0, Math.PI * 2); x.fill();
        x.beginPath(); x.ellipse(128, 330, 100, 70, 0, Math.PI, 0); x.fill();
        x.fillStyle = '#E8EEF7'; rrect(x, 160, 30, 70, 100, 12); x.fill();
        x.fillStyle = '#94A3B8'; x.beginPath(); x.arc(195, 70, 16, 0, Math.PI * 2); x.fill();
        x.fillStyle = '#E5322D'; x.beginPath(); x.arc(128, 420, 28, 0, Math.PI * 2); x.fill();
        x.fillStyle = 'rgba(255,255,255,.25)'; x.beginPath(); x.arc(56, 420, 22, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(200, 420, 22, 0, Math.PI * 2); x.fill();
        x.fillStyle = '#22C38E'; x.beginPath(); x.arc(34, 34, 10, 0, Math.PI * 2); x.fill();
      });
      var s = new T.Mesh(new T.PlaneGeometry(0.47, 0.88), new T.MeshStandardMaterial({ map: scr, emissive: 0xffffff, emissiveMap: scr, emissiveIntensity: 0.55, roughness: 0.2 })); s.position.z = 0.052; g.add(s);
      return g;
    };
    var mkCalendarIcon = function () {
      var g = new T.Group();
      g.add(new T.Mesh(ext(rshape(0.42, 0.42, 0.08), 0.1, 0.03), gloss(0xffffff)));
      var face = texOf(256, 256, function (x, w, h) {
        x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h);
        x.fillStyle = '#0A7A4B'; x.fillRect(0, 0, w, 64);
        for (var r = 0; r < 4; r++) for (var c = 0; c < 5; c++) {
          var hl = r === 2 && c === 3;
          x.fillStyle = hl ? '#22C38E' : '#DDF3E7'; rrect(x, 22 + c * 44, 82 + r * 42, 36, 34, 8); x.fill();
          if (hl) { x.strokeStyle = '#fff'; x.lineWidth = 5; x.lineCap = 'round'; x.beginPath(); x.moveTo(164, 184); x.lineTo(172, 192); x.lineTo(186, 176); x.stroke(); }
        }
      });
      var f = new T.Mesh(new T.PlaneGeometry(0.8, 0.8), new T.MeshStandardMaterial({ map: face, roughness: 0.35 })); f.position.z = 0.082; g.add(f);
      [-0.2, 0.2].forEach(function (x) { var ring = new T.Mesh(new T.TorusGeometry(0.07, 0.022, 10, 32), gloss(0x94a3b8, { metalness: 0.8 })); ring.position.set(x, 0.42, 0.02); g.add(ring); });
      return g;
    };
    var mkDocIcon = function () {
      var g = new T.Group();
      var s = new T.Shape(); s.moveTo(-0.32, 0.42); s.lineTo(0.18, 0.42); s.lineTo(0.32, 0.28); s.lineTo(0.32, -0.42); s.lineTo(-0.32, -0.42); s.lineTo(-0.32, 0.42);
      g.add(new T.Mesh(ext(s, 0.02, 0.01), gloss(0xffffff)));
      var face = texOf(256, 340, function (x, w, h) {
        x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h);
        x.fillStyle = '#0B2347'; rrect(x, 24, 26, 120, 14, 7); x.fill();
        x.fillStyle = '#C6D2E4'; [52, 68].forEach(function (y) { rrect(x, 24, y, 150, 9, 4); x.fill(); });
        x.strokeStyle = '#0B2347'; x.lineWidth = 4; x.beginPath(); x.ellipse(78, 130, 44, 26, 0, 0, Math.PI * 2); x.stroke();
        x.fillStyle = '#0A7A4B'; x.beginPath(); x.arc(78, 130, 15, 0, Math.PI * 2); x.fill();
        x.fillStyle = '#00E676'; [[150, 150, 54], [172, 128, 76], [194, 112, 92], [216, 136, 68]].forEach(function (b) { rrect(x, b[0], b[1], 14, b[2], 4); x.fill(); });
        x.fillStyle = '#C6D2E4'; [218, 234, 250].forEach(function (y) { rrect(x, 24, y, 200, 9, 4); x.fill(); });
        x.strokeStyle = '#0B2347'; x.lineWidth = 3; x.beginPath(); x.moveTo(26, 300); x.bezierCurveTo(50, 270, 60, 320, 84, 292); x.bezierCurveTo(100, 276, 108, 310, 130, 296); x.stroke();
        x.strokeStyle = '#22C38E'; x.lineWidth = 5; x.beginPath(); x.arc(200, 296, 24, 0, Math.PI * 2); x.stroke();
        x.beginPath(); x.moveTo(189, 296); x.lineTo(197, 304); x.lineTo(212, 288); x.stroke();
      });
      var f = new T.Mesh(new T.PlaneGeometry(0.64, 0.84), new T.MeshStandardMaterial({ map: face, roughness: 0.5 })); f.position.z = 0.022; g.add(f);
      var fold = new T.Mesh(new T.BufferGeometry().setFromPoints([new T.Vector3(0.18, 0.42, 0.03), new T.Vector3(0.18, 0.28, 0.03), new T.Vector3(0.32, 0.28, 0.03)]), new T.MeshStandardMaterial({ color: 0xdce6f3, side: T.DoubleSide })); g.add(fold);
      g.rotation.z = -0.08;
      return g;
    };
    var mkCoinIcon = function () {
      var c = document.createElement('canvas'); c.width = 256; c.height = 256;
      var x = c.getContext('2d'), gr = x.createRadialGradient(128, 128, 20, 128, 128, 128);
      gr.addColorStop(0, '#FFE39A'); gr.addColorStop(1, '#DDA22A'); x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
      x.strokeStyle = 'rgba(122,78,0,.45)'; x.lineWidth = 10; x.beginPath(); x.arc(128, 128, 108, 0, Math.PI * 2); x.stroke();
      x.fillStyle = '#7A4E00'; x.font = '800 150px Sora, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('$', 128, 138);
      var tx = new T.CanvasTexture(c); tx.encoding = T.sRGBEncoding;
      var face = new T.MeshPhysicalMaterial({ map: tx, metalness: 0.55, roughness: 0.3, clearcoat: 1 });
      var m = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 0.12, 64), [new T.MeshPhysicalMaterial({ color: 0xe9b640, metalness: 0.85, roughness: 0.28, clearcoat: 1 }), face, face]);
      m.rotation.x = Math.PI / 2; var g = new T.Group(); g.add(m); return g;
    };
    var mkShieldIcon = function () {
      var s = new T.Shape();
      s.moveTo(0, 0.55); s.quadraticCurveTo(0.25, 0.45, 0.45, 0.42); s.lineTo(0.45, 0.0); s.quadraticCurveTo(0.42, -0.38, 0, -0.6);
      s.quadraticCurveTo(-0.42, -0.38, -0.45, 0); s.lineTo(-0.45, 0.42); s.quadraticCurveTo(-0.25, 0.45, 0, 0.55);
      var geo = new T.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 4, curveSegments: 24 }); geo.center();
      var g = new T.Group();
      g.add(new T.Mesh(geo, new T.MeshPhysicalMaterial({ color: 0x1846c8, roughness: 0.22, clearcoat: 1, metalness: 0.1 })));
      var curve = new T.CatmullRomCurve3([new T.Vector3(-0.2, 0.02, 0.13), new T.Vector3(-0.06, -0.14, 0.13), new T.Vector3(0.22, 0.2, 0.13)], false, 'catmullrom', 0.1);
      g.add(new T.Mesh(new T.TubeGeometry(curve, 40, 0.045, 10, false), new T.MeshStandardMaterial({ color: 0xffffff, emissive: 0x7fe3f2, emissiveIntensity: 0.4 })));
      return g;
    };
    var mkBubbleIconUnused = function () {
      var w = 0.5, h = 0.34, r = 0.2, s = new T.Shape();
      s.moveTo(-w + r, h); s.lineTo(w - r, h); s.quadraticCurveTo(w, h, w, h - r); s.lineTo(w, -h + r); s.quadraticCurveTo(w, -h, w - r, -h);
      s.lineTo(-0.1, -h); s.lineTo(-0.4, -h - 0.22); s.lineTo(-0.3, -h); s.lineTo(-w + r, -h); s.quadraticCurveTo(-w, -h, -w, -h + r);
      s.lineTo(-w, h - r); s.quadraticCurveTo(-w, h, -w + r, h);
      var geo = new T.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 4, curveSegments: 16 }); geo.center();
      var g = new T.Group();
      g.add(new T.Mesh(geo, new T.MeshPhysicalMaterial({ color: 0x22c38e, roughness: 0.22, clearcoat: 1 })));
      var dm = new T.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.25 });
      [-0.2, 0, 0.2].forEach(function (dx) { var d = new T.Mesh(new T.SphereGeometry(0.065, 16, 12), dm); d.position.set(dx, 0.06, 0.13); g.add(d); });
      return g;
    };
    // order follows the questions: eye, glasses, price, video call, calendar, study sheet, safety
    var icons = [mkEyeIcon(), mkGlassesIcon(), mkCoinIcon(), mkPhoneIcon(), mkCalendarIcon(), mkDocIcon(), mkShieldIcon()];
    var GAP = 1.75, wraps = [], sc = [], xs = [];
    icons.forEach(function (ic, i) {
      var w = new T.Group(); w.add(ic); w.position.y = -i * GAP; fv.root.add(w); wraps.push(w); sc.push(0.55); xs.push(0);
    });
    var camY = 0;
    fv.tick = function (t, dt) {
      var cat = self.state.faqCat || 0, prog = self._faqProg || 0;
      camY = ease(camY, -cat * GAP, dt, 2.4);
      fv.cam.position.set(0, camY + 0.15, 5.2); fv.cam.lookAt(0, camY, 0);
      wraps.forEach(function (w, i) {
        var f = i === cat;
        sc[i] = ease(sc[i], f ? 1.15 : 0.5, dt, 3.5); w.scale.setScalar(sc[i]);
        xs[i] = ease(xs[i], f ? 0 : (i % 2 ? 0.45 : -0.45), dt, 3); w.position.x = xs[i];
        w.position.z = f ? 0 : -0.4;
        w.children[0].rotation.y = prog * Math.PI * 6 + i * 0.7 + (f ? Math.sin(t * 0.9) * 0.35 : 0);
        w.children[0].rotation.x = Math.sin(t * 0.7 + i) * 0.12;
        w.children[0].position.y = Math.sin(t * 1.3 + i) * 0.05;
      });
      fv.physics(dt, t); fv.renderer.render(fv.scene, fv.cam);
    };

    this.views = [sv, iv, fv].filter(Boolean);
    var last = performance.now();
    var loop = function (now) {
      if (!self._alive) return;
      var dt = Math.min(0.05, (now - last) / 1000); last = now; var t = now / 1000;
      for (var i = 0; i < self.views.length; i++) { var v = self.views[i]; if (v.visible) v.tick(t, dt); }
      self._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);
  }
  renderVals() {
    var self = this;
    var s = this.state;
    var fmt = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
    var P = {
      laser: { label: 'Láser', price: 30000, msi: '3 MSI de $10,000 · 6 MSI de $5,000' },
      esencial: { label: 'Esencial', price: 59800, msi: '3 MSI de $19,933 · 6 MSI de $9,967 · 12 MSI de $4,983' },
      avanzado: { label: 'Avanzado', price: 85800, msi: '3 MSI de $28,600 · 6 MSI de $14,300 · 12 MSI de $7,150' },
      premium: { label: 'Premium', price: 115800, msi: '3 MSI de $38,600 · 6 MSI de $19,300 · 12 MSI de $9,650' }
    };
    var spent = s.monthly * 12 * s.years;
    var proj = s.monthly * 12 * 20;
    var total = spent + proj;
    var cur = P[s.proc];
    var tabs = ['laser', 'esencial', 'avanzado', 'premium'].map(function (k) {
      return { label: P[k].label, cls: k === s.proc ? 'on' : '', pick: function () { self.setState({ proc: k }); } };
    });
    var faqRaw = [
      ['¿Cuál es la diferencia entre el láser y Presbilens?', 'El láser remodela la córnea y corrige miopía, hipermetropía y astigmatismo. Presbilens sustituye el cristalino por un lente intraocular y además atiende la vista cansada. El láser suele ser la ruta antes de los 40; Presbilens, después.'],
      ['Tengo 45 años, ¿me sirve el láser?', 'Depende de qué te esté limitando. Si sólo te cuesta ver de lejos, el láser puede seguir siendo la opción. Si ya necesitas alejar el celular para leer, el láser no corrige eso y la ruta suele ser Presbilens. El test lo separa en la primera pregunta.'],
      ['¿Qué diferencia hay entre Esencial, Avanzado y Premium?', 'El rango de distancias que cubre el lente. Esencial es monofocal y se calcula para una distancia principal. Avanzado es de rango extendido y cubre de lejos a intermedia de forma continua. Premium es trifocal y cubre lejos, intermedia y cerca. Es la barra que aparece en cada tarjeta de procedimiento.'],
      ['¿Qué pasa si tengo astigmatismo?', 'Existe una versión tórica del lente que lo corrige. Añade $6,000 por ojo sobre el precio del nivel elegido. Si aplica en tu caso se confirma con tus estudios preoperatorios y queda documentado en tu cotización antes de que decidas.'],
      ['¿Voy a ver halos de noche?', 'Algunos pacientes perciben halos alrededor de las luces durante el periodo de adaptación, con mayor frecuencia en los lentes trifocales que en los de rango extendido. Por eso, si nos dices que manejas mucho de noche, el test no te propone el nivel más alto. El especialista lo evalúa contigo al revisar tus estudios.'],
      ['¿Qué incluye exactamente el precio?', 'Estudios preoperatorios, procedimiento, medicamento posterior y seguimiento a doce meses. No hay cobros separados por consulta de control dentro de ese periodo.'],
      ['¿Qué es la videollamada y qué pasa en ella?', 'Son unos veinte minutos con un oftalmólogo del equipo, sin costo y sin tarjeta. Revisa el resultado de tu test, te pregunta por tus antecedentes y te dice si la ruta que salió tiene sentido en tu caso. No es una consulta de venta: si te conviene esperar o hacer otra cosa, te lo dice. Te enviamos el enlace por WhatsApp.'],
      ['¿La videollamada sustituye los estudios presenciales?', 'No. Ningún procedimiento se programa sin estudios presenciales: topografía corneal, biometría y revisión completa. La videollamada sirve para que resuelvas tus dudas con el especialista antes de invertir tiempo y dinero en trasladarte, sobre todo si vives fuera de nuestras cinco ciudades.'],
      ['¿Me operan los dos ojos el mismo día?', 'En Presbilens no. Se interviene un ojo y, al día siguiente, el oftalmólogo revisa su evolución antes de autorizar el segundo, que se programa con al menos 2 días de diferencia. Es un criterio de seguridad: permite verificar el resultado del primer ojo antes de intervenir el segundo. El precio publicado cubre ambos ojos y ambas fechas, no es un cobro por ojo.'],
      ['¿El quirófano se cobra aparte?', 'No. El uso de quirófano, la sala de recuperación de corta estancia, los honorarios del oftalmólogo, el medicamento posterior, una revisión postoperatoria y el seguimiento a doce meses ya están dentro del precio. En Presbilens también está incluido el lente intraocular de ambos ojos. Esta es la diferencia concreta con los operadores que anuncian solo el procedimiento.'],
      ['¿El test me va a recomendar siempre lo más caro?', 'No, y está diseñado para lo contrario. Si nos dices que no te molesta usar lentes para leer, te propone el nivel más económico. Si nos dices que manejas mucho de noche, el sistema descarta el nivel más alto por su cuenta, porque los lentes trifocales tienden a generar más halos nocturnos que los de rango extendido. Al ver tu resultado te explicamos punto por punto qué respuesta tuya llevó a esa recomendación.'],
      ['¿Cuánto cuestan los estudios preoperatorios?', '$3,000, y se descuentan íntegros del precio de tu procedimiento si decides proceder. Incluyen topografía corneal, biometría y las mediciones que requiera tu caso, más tu diagnóstico por escrito firmado por un oftalmólogo, que conservas pase lo que pase.'],
      ['¿Por qué se pagan los estudios preoperatorios?', 'Porque son un servicio médico real: topografía corneal, biometría y las mediciones que requiere tu caso, hechas con equipo especializado y revisadas por un oftalmólogo, que además te entrega tu diagnóstico por escrito. Ese estudio es tuyo y te lo llevas. Si decides proceder, el monto se descuenta íntegro del precio de tu procedimiento, así que no representa un costo adicional.'],
      ['¿Y si me hago los estudios y no soy candidato?', 'Se te reembolsa el monto completo y conservas tus estudios y tu diagnóstico firmado. Si cancelas antes de realizarte los estudios, también se te reembolsa todo. Si ya te los hiciste y simplemente decides no continuar, el monto cubre el servicio que recibiste y te quedas con tu diagnóstico.'],
      ['¿Qué gano con apartar además de los estudios?', 'Tu fecha queda apartada con prioridad en la sede que elijas, y el precio sobre el que se te cotiza no cambia durante 90 días aunque la lista se actualice. Y sales con un diagnóstico oftalmológico por escrito, que tiene valor por sí mismo: es tuyo, sin importar lo que decidas después.'],
      ['¿Es seguro pagar en línea?', 'El cobro lo procesa una pasarela de pago certificada. Sinlentesmexico no recibe ni almacena los datos de tu tarjeta en ningún momento. Recibes tu comprobante por correo.'],
      ['¿Duele el procedimiento?', 'Se aplican gotas anestésicas antes de empezar. Durante el procedimiento puede sentirse una ligera presión, no dolor. Después algunas personas reportan ardor o comezón leve durante unas horas.'],
      ['¿En cuánto tiempo me recupero?', 'Es ambulatorio: sales caminando el mismo día. La mayoría de los pacientes retoma su actividad habitual en pocos días, con indicaciones específicas de cuidado durante las primeras semanas. El oftalmólogo te entrega el plan junto con tu diagnóstico.'],
      ['¿Qué pasa si los estudios muestran que no soy candidato?', 'Se te reembolsa el monto completo de tus estudios y conservas tu diagnóstico por escrito. El oftalmólogo te explica qué encontró y te orienta sobre qué sí conviene hacer en tu caso.'],
      ['¿El IMSS o mi seguro cubre el procedimiento?', 'Los procedimientos refractivos suelen considerarse electivos y no están cubiertos por seguridad social. Algunas pólizas privadas los contemplan de forma parcial: conviene revisarlo directamente con tu aseguradora. Nosotros ofrecemos meses sin intereses: 3 y 6 en láser; 3, 6 y 12 en Presbilens.'],
      ['Vivo en otra ciudad o fuera de México, ¿cómo funciona?', 'Igual en los dos casos: tu ruta empieza obligatoriamente por la videollamada con el oftalmólogo, antes de que compres boletos o reserves nada. Si tienes topografía o estudios previos, los mandas por WhatsApp y el especialista los revisa para detectar cualquier señal que desaconseje el viaje. Con su visto bueno reservas tu procedimiento, y tus estudios completos vienen incluidos el día que llegas. Atendemos en las cinco sedes, y la logística de hospedaje y traslado la coordinamos con aliados locales una vez que tienes fecha confirmada.'],
      ['¿Puedo hacerme los estudios en mi país y mandarlos?', 'Nos sirven para anticipar tu caso y por eso te los pedimos, pero los estudios completos se hacen aquí y ya están incluidos en tu reserva. En Presbilens hay una razón adicional: la biometría que determina la potencia exacta de tu lente depende del instrumento y de la constante que el cirujano tiene calibrada con su propia técnica, así que ese cálculo no puede tomarse de un estudio externo.'],
      ['¿Cuántos días tengo que quedarme?', 'Con láser, entre 1 y 3 noches. Si tu vuelo aterriza con tiempo, los estudios y el procedimiento pueden hacerse el mismo día que llegas; si llegas tarde, se hacen al día siguiente. En la videollamada revisamos tu itinerario y lo definimos contigo. Con Presbilens, entre 6 y 8 noches, porque los ojos se intervienen en fechas distintas con al menos 2 días de diferencia y hay revisiones de por medio. Conviene saberlo antes de comprar vuelos.'],
      ['¿Y si viajo y al llegar los estudios muestran que no soy candidato?', 'Se te reembolsa el monto completo, sin descontar los estudios que ya te hicimos. Si un oftalmólogo nuestro te autorizó el viaje, asumimos ese riesgo contigo. Esa es justamente la razón por la que la videollamada previa es obligatoria y no opcional.'],
      ['¿Quién realiza el procedimiento?', 'Un oftalmólogo del equipo médico Sinlentesmexico, con cédula de especialidad validada. Los datos del responsable sanitario se incluyen en tu consentimiento informado y en tu expediente clínico, conforme a la NOM-004-SSA3-2012.']
    ];
    var faqs = faqRaw.map(function (f, i) {
      var open = s.open === i;
      return { q: f[0], a: f[1], open: open, pmCls: open ? 'pm on' : 'pm', toggle: function () { self.setState({ open: open ? -1 : i, faqCat: self.FAQCAT[i] }); } };
    });
    var LBL = {
      anat: ['Córnea · aquí actúa el láser', 'Iris · regula la luz', 'Cristalino · enfoca de cerca', 'Retina · aquí debe caer el foco'],
      myo: ['Foco antes de la retina', 'Imagen borrosa', '', ''],
      ast: ['Córnea irregular', 'Dos focos', '', ''],
      las: ['Láser remodela la córnea', 'Foco en la retina', '', ''],
      pre1: ['Cristalino rígido', 'Foco detrás de la retina', '', ''],
      pre2: ['Lente intraocular', 'Foco en la retina', '', '']
    };
    var lt = LBL[s.s3g] || ['', '', '', ''];
    var RAIL = ['Ojo', 'Capas', 'Miopía', 'Astigmatismo', 'Láser', 'Presbilens', 'Tu caso', 'Sin lentes'];
    var T = 'https://www.sinlentesmexico.mx/test-candidatura';
    var lensA = 'radial-gradient(circle at 35% 30%, #fff, #BFF3FB 35%, #00E676 70%)';
    return {
      ages: [
        { label: '18 a 39 años', hint: 'La etapa donde el láser suele ser la mejor opción', url: 'test.html' },
        { label: '40 a 49 años', hint: 'Aquí empieza la vista cansada', url: 'test.html' },
        { label: '50 a 59 años', hint: 'Etapa habitual del lente intraocular', url: 'test.html' },
        { label: '60 años o más', hint: 'Se evalúa también la salud del cristalino', url: 'test.html' }
      ],
      storyRef: this.storyRef, procRef: this.procRef, iolRef: this.iolRef, ctaRef: this.ctaRef, rootRef: this.rootRef, faqRef: this.faqRef, faqListRef: this.faqListRef,
      s3Ref: this.s3Ref, s3CvRef: this.s3CvRef, s3LabelsRef: this.s3LabelsRef, s3PanelRef: this.s3PanelRef, s3L0: this.s3L0, s3L1: this.s3L1, s3L2: this.s3L2, s3L3: this.s3L3,
      lt0: lt[0], lt1: lt[1], lt2: lt[2], lt3: lt[3],
      s3Cls: (this.props.showReview ?? true) ? 's3 dark review' : 's3 dark',
      rail3: RAIL.map(function (l, i) { return { label: l, cls: 's3r' + (i === s.s3p ? ' on' : i < s.s3p ? ' done' : '') }; }),
      heroRef: this.heroRef, heroCvRef: this.heroCvRef, heroInnerRef: this.heroInnerRef,
      topCls: s.navSolid ? 'topbar' : 'topbar over',
      rail: [0, 1, 2, 3, 4, 5, 6].map(function (k) { return { cls: k === s.faqCat ? 'rdot on' : 'rdot' }; }),
      menuOpen: !!s.menu, menuCls: s.menu ? 'menu-btn on' : 'menu-btn', toggleMenu: this.toggleMenu, closeMenu: this.closeMenu,
      lblRef0: this.lblRef0, lblRef1: this.lblRef1, lblRef2: this.lblRef2,
      lb0: [['Córnea', 'Láser', ''], ['Lente intraocular monofocal', 'Córnea', 'Retina'], ['Lente de rango extendido (EDOF)', 'Córnea', 'Franja continua de enfoque'], ['Lente trifocal', 'Córnea', 'Tres puntos de enfoque']][s.active][0],
      lb1: [['Córnea', 'Láser', ''], ['Lente intraocular monofocal', 'Córnea', 'Retina'], ['Lente de rango extendido (EDOF)', 'Córnea', 'Franja continua de enfoque'], ['Lente trifocal', 'Córnea', 'Tres puntos de enfoque']][s.active][1],
      lb2: [['Córnea', 'Láser', ' '], ['Lente intraocular monofocal', 'Córnea', 'Retina'], ['Lente de rango extendido (EDOF)', 'Córnea', 'Franja continua de enfoque'], ['Lente trifocal', 'Córnea', 'Tres puntos de enfoque']][s.active][2],
      activeName: ['Procedimiento Láser', 'Presbilens Esencial', 'Presbilens Avanzado', 'Presbilens Premium'][s.active],
      aC: [true, false, false, true][s.active] ? 'sf lit' : 'sf',
      aI: [true, false, true, true][s.active] ? 'sf lit' : 'sf',
      aL: 'sf lit',
      procs: [
        { cls: 'proc rv', age: '18 a 40 años', name: 'Procedimiento Láser', desc: 'Corrige miopía, hipermetropía y astigmatismo remodelando la córnea. Ambulatorio, alrededor de 20 minutos.', c: true, i: true, l: true, price: '$30,000', msi: 'ambos ojos · 3 × $10,000 · 6 × $5,000', lensBg: lensA },
        { cls: 'proc rv', age: '40 años o más', name: 'Presbilens Esencial', desc: 'Lente intraocular monofocal, calculado para darte la mejor visión posible en la distancia que más usas.', c: false, i: false, l: true, price: '$59,800', msi: 'ambos ojos · 3 × $19,933 · 6 × $9,967 · 12 × $4,983', lensBg: lensA },
        { cls: 'proc rv', age: '40 años o más', name: 'Presbilens Avanzado', desc: 'Lente de rango extendido (EDOF). Franja continua de enfoque de lejos a intermedia: pantallas y volante.', c: false, i: true, l: true, price: '$85,800', msi: 'ambos ojos · 3 × $28,600 · 6 × $14,300 · 12 × $7,150', lensBg: lensA },
        { cls: 'proc hl rv', age: '40 años o más', name: 'Presbilens Premium', desc: 'Lente trifocal. Tres puntos de enfoque para cubrir el rango completo con la mayor independencia de lentes.', c: true, i: true, l: true, price: '$115,800', msi: 'ambos ojos · 3 × $38,600 · 6 × $19,300 · 12 × $9,650', lensBg: lensA }
      ].map(function (p, i) { p.cls = 'proc rv' + (i === 2 ? ' feat' : ''); return p; }),
      incl: [
        { n: '01', t: 'Estudios preoperatorios completos', d: 'Topografía corneal, biometría y las mediciones que necesita tu caso. Es lo único que permite saber qué procedimiento te corresponde.' },
        { n: '02', t: 'Diagnóstico por escrito de un oftalmólogo', d: 'El especialista te explica qué encontró y te entrega tu dictamen firmado. Es tuyo: te lo llevas, valga lo que valga para donde quieras.' },
        { n: '03', t: 'Tu fecha apartada con prioridad', d: 'Quedas en agenda antes que quien todavía no ha apartado, en la sede que elijas.' },
        { n: '04', t: 'Tu precio sin cambios por 90 días', d: 'El precio de tu procedimiento queda fijo tres meses desde que apartas, aunque la lista se actualice.' },
        { n: '05', t: 'Se descuenta íntegro de tu procedimiento', d: 'Si decides proceder, el monto sale del total. No es un costo adicional.' },
        { n: '06', t: 'Si no eres candidato, se te reembolsa', d: 'Si el oftalmólogo determina que ningún procedimiento refractivo conviene en tu caso, te devolvemos el monto completo y te quedas con tus estudios.' }
      ].map(function (o, i) { o.cls = 'incl-item rv st' + (i % 3 + 1); return o; }),
      bad: ['Estudios preoperatorios: se cobran aparte', 'Medicamento posterior: se cobra aparte', 'Quirófano e insumos: se cobran aparte', 'Lente intraocular: fuera del precio anunciado', 'Consultas de seguimiento: se cobran por visita', 'El total real aparece hasta el día del procedimiento'],
      good: ['Estudios preoperatorios completos', 'Honorarios del oftalmólogo', 'Uso de quirófano', 'Sala de recuperación de corta estancia', 'Lente intraocular de ambos ojos, seleccionado según tu biometría (en Presbilens)', 'Medicamento postoperatorio', 'Una revisión postoperatoria', 'Seguimiento a doce meses'],
      table: [
        { name: 'Procedimiento Láser', price: '$30,000', eye: '—', msi: '3 MSI de $10,000 · 6 MSI de $5,000' },
        { name: 'Presbilens Esencial', price: '$59,800', eye: '$29,900', msi: '3 MSI de $19,933 · 6 MSI de $9,967 · 12 MSI de $4,983' },
        { name: 'Presbilens Avanzado', price: '$85,800', eye: '$42,900', msi: '3 MSI de $28,600 · 6 MSI de $14,300 · 12 MSI de $7,150' },
        { name: 'Presbilens Premium', price: '$115,800', eye: '$57,900', msi: '3 MSI de $38,600 · 6 MSI de $19,300 · 12 MSI de $9,650' },
        { name: 'Incremento por versión tórica (por ojo)', price: '$6,000', eye: '—', msi: '—' }
      ],
      sedes: [
        { city: 'Ciudad de México', zone: 'Colonia del Valle · Satélite', hours: 'Lun a Sáb · 9:00 – 18:00', map: '', noMap: true, url: T + '?sede=cdmx' },
        { city: 'Cancún', zone: 'Zona Hotelera · Centro', hours: 'Lun a Sáb · 9:00 – 17:00', map: 'https://share.google/ZUHl70rmPBjaI2riR', noMap: false, url: T + '?sede=cancun' },
        { city: 'Mérida', zone: 'Norte · Altabrisa', hours: 'Lun a Sáb · 9:00 – 17:00', map: 'https://share.google/g767yPB2xWFHa13J8', noMap: false, url: T + '?sede=merida' },
        { city: 'Villahermosa', zone: 'Centro · Tabasco 2000', hours: 'Lun a Vie · 9:00 – 17:00', map: 'https://share.google/EkiZhnLOn1Tdy9ziz', noMap: false, url: T + '?sede=villahermosa' },
        { city: 'Tuxtla Gutiérrez', zone: 'Chiapas', hours: 'Lun a Vie · 9:00 – 17:00', map: 'https://share.google/I1evmWwpSPLvmidZz', noMap: false, url: T + '?sede=chiapas' }
      ].map(function (o, i) { o.cls = 'sede rv st' + (i % 3 + 1); return o; }),
      tabs: tabs,
      monthly: s.monthly,
      years: s.years,
      monthlyF: fmt(s.monthly),
      yearsF: s.years + (s.years === 1 ? ' año' : ' años'),
      setMonthly: function (e) { self.setState({ monthly: Number(e.target.value) }); },
      setYears: function (e) { self.setState({ years: Number(e.target.value) }); },
      spent: fmt(spent),
      proj: fmt(proj),
      total: fmt(total),
      procPrice: fmt(cur.price),
      diff: fmt(Math.max(0, total - cur.price)),
      procMsi: cur.msi,
      faqs: faqs,

      /* Ventana del simulador */
      simError: s.simError,
      simErrorTxt: s.simError === 'autoplay'
        ? 'El navegador no deja arrancar el video solo. Toca aquí para reproducirlo.'
        : 'No se pudo cargar el video. Si abriste el archivo con doble clic, ábrelo con Live Server o súbelo a un servidor.',
      simTocar: function () { self.simTocar(); },
      ytAbierto: s.yt,
      ytVer: function (id) { self.setState({ yt: id }); },
      simOn: s.sim,
      simOvCls: s.sim ? 'sim-ov on' : 'sim-ov',
      simAbrir: function (e) { if (e) e.preventDefault(); document.body.classList.add('sim-abierto'); self.setState({ sim: true, simComp: true }); setTimeout(function () { self.simIniciar(); }, 60); },
      simCerrar: function () { document.body.classList.remove('sim-abierto'); self.simParar(); self.setState({ sim: false }); },
      simFondo: function (e) { if (e.target === e.currentTarget) { document.body.classList.remove('sim-abierto'); self.simParar(); self.setState({ sim: false }); } },
      simCvRef: function (n) { if (n) self._simCv = n; },
      simEscenas: SIM_ESCENAS, simCondiciones: SIM_CONDICIONES,
      simLentes: SIM_LENTES, simLentesB: SIM_LENTES.filter(function (l) { return l.k; }),
      simEsc: s.simEsc, simCond: s.simCond, simLente: s.simLente, simLenteB: s.simLenteB,
      simComp: s.simComp,
      simSwCls: s.simComp ? 'sim-sw on' : 'sim-sw',
      setSimEsc: function (e) { self.setState({ simEsc: e.target.value }, function () { self.simCargarEscena(); }); },
      setSimCond: function (e) { self.setState({ simCond: e.target.value }); },
      setSimLente: function (e) { self.setState({ simLente: e.target.value }); },
      setSimLenteB: function (e) { self.setState({ simLenteB: e.target.value }); },
      toggleSimComp: function () { self.setState({ simComp: !self.state.simComp }); },
      simEtqA: simBuscar(SIM_LENTES, s.simLente).label,
      simEtqB: simBuscar(SIM_LENTES, s.simLenteB).label,
      simNota: (function () {
        var base = simBuscar(SIM_CONDICIONES, s.simCond).label + ' · ' + simBuscar(SIM_ESCENAS, s.simEsc).label + '. ';
        var a = simBuscar(SIM_LENTES, s.simLente).label, b = simBuscar(SIM_LENTES, s.simLenteB).label;
        if (s.simComp && s.simLenteB !== s.simLente) return base + 'A la izquierda, ' + a.toLowerCase() + '; a la derecha, ' + b + '. Arrastra los selectores para cambiar cualquiera de los dos.';
        if (s.simLente) return base + 'Estás viendo cómo quedaría con ' + a + '.';
        return base + 'Así se ve hoy, sin corregir. Elige un procedimiento para comparar.';
      })()
    };
  }
  /* ---- Simulador: motor de pintado ---- */
  simIniciar() {
    var self = this;
    var cv = this._simCv; if (!cv) return;
    var ctx = cv.getContext('2d');
    var vid = this._simVid;
    if (!vid) {
      vid = document.createElement('video');
      vid.muted = true; vid.loop = true; vid.playsInline = true; vid.setAttribute('playsinline', '');
      vid.preload = 'auto';   // sin crossOrigin: con file:// la petición falla y el video no carga
      this._simVid = vid;
    }
    this.simCargarEscena();
    var pintar = function () {
      self._simRaf = requestAnimationFrame(pintar);
      if (!vid.videoWidth) return;
      var W = cv.clientWidth, H = cv.clientHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
      if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var s = self.state;
      var esc = simBuscar(SIM_ESCENAS, s.simEsc), cond = simBuscar(SIM_CONDICIONES, s.simCond);
      var comp = s.simComp && s.simLenteB !== s.simLente;
      var lados = comp
        ? [{ x: 0, w: W / 2, e: simEfecto(cond, simBuscar(SIM_LENTES, s.simLente), esc) },
           { x: W / 2, w: W / 2, e: simEfecto(cond, simBuscar(SIM_LENTES, s.simLenteB), esc) }]
        : [{ x: 0, w: W, e: simEfecto(cond, simBuscar(SIM_LENTES, s.simLente), esc) }];
      // el video se dibuja tapando todo el lienzo (como object-fit: cover)
      var k = Math.max(W / vid.videoWidth, H / vid.videoHeight);
      var dw = vid.videoWidth * k, dh = vid.videoHeight * k, dx = (W - dw) / 2, dy = (H - dh) / 2;
      lados.forEach(function (L) {
        var e = L.e;
        ctx.save();
        ctx.beginPath(); ctx.rect(L.x, 0, L.w, H); ctx.clip();
        // 1 · imagen base, con el desenfoque y el velo de la catarata
        ctx.filter = 'blur(' + e.desenfoque.toFixed(2) + 'px)'
          + ' sepia(' + (e.velo * 0.8).toFixed(2) + ')'
          + ' contrast(' + (1 - e.velo * 0.3).toFixed(2) + ')'
          + ' brightness(' + (1 + e.velo * 0.12).toFixed(2) + ')';
        ctx.drawImage(vid, dx, dy, dw, dh);
        // 2 · astigmatismo: una segunda imagen corrida, que duplica los bordes
        if (e.astig > 0.01) {
          ctx.globalAlpha = e.astig * 0.5;
          ctx.filter = 'blur(' + (e.desenfoque + 1.5).toFixed(2) + 'px)';
          ctx.drawImage(vid, dx + e.astig * 9, dy + e.astig * 3, dw, dh);
          ctx.globalAlpha = 1;
        }
        // 3 · halos: lo más brillante, desenfocado y sumado encima
        if (e.halo > 0.01) {
          ctx.globalCompositeOperation = 'screen';
          ctx.globalAlpha = Math.min(0.85, e.halo);
          ctx.filter = 'blur(' + (6 + e.halo * 16).toFixed(1) + 'px) brightness(1.9) contrast(2.2) saturate(1.1)';
          ctx.drawImage(vid, dx, dy, dw, dh);
          ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
        }
        ctx.restore();
      });
      ctx.filter = 'none';
    };
    cancelAnimationFrame(this._simRaf);
    this._simRaf = requestAnimationFrame(pintar);
  }
  simCargarEscena() {
    var vid = this._simVid; if (!vid) return;
    var esc = simBuscar(SIM_ESCENAS, this.state.simEsc);
    if (vid.dataset.k !== esc.k) { vid.dataset.k = esc.k; vid.src = esc.archivo; }
    var self = this;
    vid.onerror = function () { self.setState({ simError: 'nocarga' }); };
    vid.oncanplay = function () { if (self.state.simError) self.setState({ simError: '' }); };
    var p = vid.play();
    if (p && p.catch) p.catch(function () { self.setState({ simError: 'autoplay' }); });
  }
  simTocar() {
    var vid = this._simVid; if (!vid) return;
    var self = this;
    var p = vid.play();
    if (p && p.then) p.then(function () { self.setState({ simError: '' }); }).catch(function () {});
  }
  simParar() {
    cancelAnimationFrame(this._simRaf);
    if (this._simVid) { this._simVid.pause(); }
  }

  render() {
    const v = this.renderVals();
    return html`<div style="min-height: 100vh" ref=${v.rootRef}>


<header class=${v.topCls}>
<div class="wrap navbar">
<a class="logo" href="https://www.sinlentesmexico.mx/">
<span style="font-family: Sora, sans-serif; font-weight: 700; font-size: 19px; letter-spacing: -0.02em">Sinlentesmexico</span><span class="logo-dot" aria-hidden="true"></span>
</a>
<nav class="navlinks" aria-label="Principal">
<a href="#rutas">Procedimientos</a><a href="#compara">Compara</a><a href="#sedes">Sedes</a><a href="#proceso">Cómo funciona</a><a href="https://www.sinlentesmexico.mx/aliados">Únete al equipo</a><a href="#faq">Preguntas</a>
</nav>
<div class="nav-actions">
<button type="button" class=${v.menuCls} aria-expanded=${v.menuOpen} onClick=${v.toggleMenu}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"></path></svg>Menú</button>
<a class="btn btn-primary top-cta nav-cta shine" href="test.html">Hacer el test</a>
<a class="btn-login" href="https://www.sinlentesmexico.mx/portal" aria-label="Login"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"></path></svg><span>Login</span></a>
</div>
</div>
${v.menuOpen ? html`
<nav class="menu-panel" aria-label="Menú">
<a href="#rutas" onClick=${v.closeMenu}>Procedimientos <span aria-hidden="true">→</span></a>
<a href="#compara" onClick=${v.closeMenu}>Compara <span aria-hidden="true">→</span></a>
<a href="#sedes" onClick=${v.closeMenu}>Sedes <span aria-hidden="true">→</span></a>
<a href="#proceso" onClick=${v.closeMenu}>Cómo funciona <span aria-hidden="true">→</span></a>
<a href="https://www.sinlentesmexico.mx/aliados" onClick=${v.closeMenu}>Únete al equipo <span aria-hidden="true">→</span></a>
<a href="#faq" onClick=${v.closeMenu}>Preguntas <span aria-hidden="true">→</span></a>
</nav>
` : null}
</header>


<section class="ihero" ref=${v.heroRef}>
<canvas class="ihero-cv" ref=${v.heroCvRef} aria-hidden="true"></canvas>
<div class="ihero-shade" aria-hidden="true"></div>
<div class="wrap ihero-inner" ref=${v.heroInnerRef}>
<span class="ihero-eyebrow fade-up"><span class="pulse-dot"></span>Agenda disponible esta semana en 5 ciudades</span>
<h1 class="ihero-h1 fade-up d1">Deja de depender de tus lentes</h1>
<p class="ihero-p fade-up d2">Responde 4 preguntas y descubre qué procedimiento se acerca más a tu caso. Al terminar eliges cómo avanzar: una videollamada sin costo con un oftalmólogo, o agendar directo tus estudios preoperatorios.</p>
<div class="ihero-cta fade-up d3">
<a class="btn-white shine" href="test.html">Hacer el test · 4 preguntas <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
<button type="button" class="btn-white shine" onClick=${v.simAbrir}>Ver el simulador <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></button>
<a class="ihero-talk" href="https://wa.me/525591896084?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20procedimientos%20de%20Sinlentesmexico."><span class="ihero-talk-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.2-1.1z"></path><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-1.9-.9-.8.8a4 4 0 01-2.4-2.4l.8-.8-.9-1.9z"></path></svg></span><span><small>¿Prefieres hablar?</small><b>Escríbenos por WhatsApp</b></span></a>
</div>
<a class="ihero-play fade-up d4" href="https://www.youtube.com/watch?v=41sXpVChbng"><span class="pl"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg></span>Qué es Sinlentesmexico y cómo trabajamos</a>
</div>
<div class="ihero-strip">
<div class="wrap">
<div class="hs-item"><span class="hs-ck"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span><span><b>COFEPRIS</b><span class="s">Autorización sanitaria 2507015036X00028</span></span></div>
<div class="hs-item"><span class="hs-ck"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span><span><b>Cédula validada</b><span class="s">Oftalmólogos certificados ante la SEP</span></span></div>
<div class="hs-item"><span class="hs-ck"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span><span><b><span class="cnt c5"></span></b><span class="s">Ciudades con agenda activa</span></span></div>
<div class="hs-item"><span class="hs-ck"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span><span><b>+<span class="cnt c10"></span>,000</b><span class="s">Procedimientos realizados</span></span></div>
</div>
</div>
</section>


<section class=${v.s3Cls} ref=${v.s3Ref} aria-label="Cómo funciona la corrección visual">
<div class="s3-sticky">
<div class="s3-grid">
<div class="s3-text">
<span class="rev-chip">Textos por validar</span>
<div class="s3-panel" data-p="0" ref=${v.s3PanelRef}>
<span class="eyebrow">Cómo funciona tu ojo</span>
<h2>Así enfoca tu ojo</h2>
<p>Baja para ver qué corrige cada procedimiento.</p>
</div>
<div class="s3-panel" data-p="1" ref=${v.s3PanelRef}>
<span class="eyebrow">Anatomía</span>
<h2>Cuatro capas, un solo enfoque</h2>
<p>Córnea, iris, cristalino y retina trabajan juntos para que la imagen llegue nítida.</p>
</div>
<div class="s3-panel" data-p="2" ref=${v.s3PanelRef}>
<span class="eyebrow">Miopía</span>
<h2>La luz enfoca antes de la retina</h2>
<p>Por eso lo lejano se ve borroso: letreros, manejar, la calle.</p>
</div>
<div class="s3-panel" data-p="3" ref=${v.s3PanelRef}>
<span class="eyebrow">Astigmatismo</span>
<h2>La córnea no es pareja</h2>
<p>Su curvatura irregular reparte la luz en dos focos y la imagen se deforma.</p>
</div>
<div class="s3-panel" data-p="4" ref=${v.s3PanelRef}>
<span class="eyebrow">Procedimiento Láser · 18 a 40 años</span>
<h2>El láser remodela la córnea</h2>
<p>Corrige miopía, hipermetropía y astigmatismo remodelando la córnea. Ambulatorio, alrededor de 20 minutos.</p>
<div class="s3-price"><b>$30,000</b><span>ambos ojos · 3 × $10,000 · 6 × $5,000</span></div>
</div>
<div class="s3-panel" data-p="5" ref=${v.s3PanelRef}>
<span class="eyebrow">Presbilens · 40 años o más</span>
<h2>Vista cansada: se sustituye el cristalino</h2>
<p>El láser no corrige la vista cansada. Presbilens sustituye el cristalino por un lente intraocular y además atiende la vista cansada.</p>
<div class="s3-price"><b>$59,800</b><span>Presbilens Esencial · ambos ojos · hasta 12 MSI</span></div>
</div>
<div class="s3-panel" data-p="6" ref=${v.s3PanelRef}>
<span class="eyebrow">Tu caso</span>
<h2>¿Cuál es tu camino?</h2>
<p>Responde 4 preguntas y descubre qué procedimiento se acerca más a tu caso.</p>
</div>
<div class="s3-panel" data-p="7" ref=${v.s3PanelRef}>
<span class="eyebrow">Sin lentes</span>
<h2>Despídete de depender de tus lentes.</h2>
<p>Un procedimiento de minutos para recuperar tu libertad visual.</p>
<a class="btn-white" href="test.html">Hacer el test · 4 preguntas <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
</div>
</div>
<div class="s3-stage">
<canvas class="s3-cv" ref=${v.s3CvRef} role="img" aria-label="Ojo humano en 3D: córnea, iris, cristalino y retina"></canvas>
<div class="s3-labels" aria-hidden="true" ref=${v.s3LabelsRef}>
<div class="lbl" key=${v.lt0} ref=${v.s3L0}><span class="lline"></span><span class="ldot"></span><span class="ltxt">${v.lt0}</span></div>
<div class="lbl" key=${v.lt1} ref=${v.s3L1}><span class="lline"></span><span class="ldot"></span><span class="ltxt">${v.lt1}</span></div>
<div class="lbl" key=${v.lt2} ref=${v.s3L2}><span class="lline"></span><span class="ldot"></span><span class="ltxt">${v.lt2}</span></div>
<div class="lbl" key=${v.lt3} ref=${v.s3L3}><span class="lline"></span><span class="ldot"></span><span class="ltxt">${v.lt3}</span></div>
</div>
<div class="s3-rail" aria-hidden="true">
${v.rail3.map((r, $index) => html`<span class=${r.cls}><span class="s3r-t">${r.label}</span><i></i></span>`)}
</div>
<span class="hint s3-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 7l-4 5 4 5M16 7l4 5-4 5"></path></svg>Arrastra para girar · Baja para avanzar</span>
</div>
</div>
</div>
</section>


<section class="qsec t-light">
<div class="wrap qsec-grid">
<div class="rv-l">
<ul class="checks qchecks">
<li><span class="ck"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span>Precio todo incluido: estudios, procedimiento, medicamento y seguimiento a doce meses.</li>
<li><span class="ck"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span>Oftalmólogos con cédula profesional validada ante la SEP.</li>
<li><span class="ck"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span>Hablas con un oftalmólogo por videollamada antes de gastar un peso.</li>
</ul>
</div>


<div class="quiz rv-s">
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; align-items: flex-end; margin-bottom: 18px">
<div>
<div style="font-size: 13px; font-weight: 700; color: #0A7A4B; letter-spacing: .08em; text-transform: uppercase">Pregunta 1 de 4</div>
<h2 style="margin: 6px 0 0; font-size: 28px">¿Cuántos años tienes?</h2>
</div>
<div style="font-size: 13px; color: #4A5B76; font-weight: 600">Sin registro · Sin tarjeta · Resultado en un minuto</div>
</div>
<div class="prog" style="margin-bottom: 20px"><span></span></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px">
${v.ages.map((a, $index) => html`
<a class="opt" href=${a.url}>
<span><b style="display: block; font-family: Sora, sans-serif; font-size: 17px; margin-bottom: 4px">${a.label}</b><span style="font-size: 13px; color: #4A5B76; line-height: 1.4">${a.hint}</span></span>
<span class="arr"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span>
</a>
`)}
</div>
<p style="margin: 18px 0 0; font-size: 14px; color: #4A5B76">¿Prefieres hablar? <a href="https://wa.me/525591896084?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20procedimientos%20de%20Sinlentesmexico." style="font-weight: 700">Escríbenos por WhatsApp</a></p>
</div>
</div>
</section>


<section id="rutas" class="t-light">
<div class="wrap" style="padding-top: 110px; padding-bottom: 60px">
<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 44px">
<div style="max-width: 640px">
<span class="eyebrow">Los procedimientos</span>
<h2 style="font-size: clamp(36px, 4.6vw, 60px); line-height: 1.02; margin: 16px 0 16px">Cuatro caminos. <span style="color: #0A7A4B">Uno es el tuyo.</span></h2>
<p class="muted" style="font-size: 18px; line-height: 1.55; margin: 0">El procedimiento correcto depende de tu edad, de lo que te cuesta trabajo ver y de cómo vives tu día. La barra de cada tarjeta muestra qué distancias cubre.</p>
</div>
<a class="btn btn-ghost" href="test.html">Hacer el test · 4 preguntas</a>
</div>

<div class="proc-grid">
${v.procs.map((p, $index) => html`
<article class=${p.cls}>
<div style="display: flex; justify-content: space-between; align-items: center">
<span class="tag">${p.age}</span>
<div class="lens-ico" aria-hidden="true" style=${`width: 44px; height: 44px; background: ${p.lensBg}; border: 1.5px solid rgba(127,227,242,.6)`}></div>
</div>
<h3 style="margin: 0; font-size: 22px">${p.name}</h3>
<p style="margin: 0; font-size: 15px; line-height: 1.5; opacity: .85; flex: 1">${p.desc}</p>
<div>
<div class="dist" style="margin-bottom: 8px">
<div class="seg">${p.c ? html`<i class="fillbar"></i>` : null}</div>
<div class="seg">${p.i ? html`<i class="fillbar"></i>` : null}</div>
<div class="seg">${p.l ? html`<i class="fillbar"></i>` : null}</div>
</div>
<div class="dist">
<div class="dl"><b>Cerca</b>40 cm</div>
<div class="dl"><b>Intermedia</b>60 cm – 1 m</div>
<div class="dl"><b>Lejos</b>3 m o más</div>
</div>
</div>
<div style="border-top: 1px solid rgba(127,140,160,.25); padding-top: 16px">
<div class="price">${p.price}</div>
<div style="font-size: 13px; opacity: .75; margin-top: 4px; line-height: 1.45">${p.msi}</div>
</div>
</article>
`)}
</div>
<div class="rv" style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between; padding: 20px 24px; border-radius: 20px; background: #FFF6E6; border: 1px solid #F3DDB0">
<p style="margin: 0; font-weight: 600; color: #6B4300; line-height: 1.5">El láser no corrige la vista cansada. Si ya necesitas lentes para leer, la ruta es Presbilens. El test lo aterriza en un minuto.</p>
<a href="test.html" style="font-weight: 700; color: #6B4300">Hacer el test →</a>
</div>
</div>
</section>


<section class="t-light">
<div class="wrap" style="padding-top: 110px; padding-bottom: 110px">
<div class="ethic">
<div class="ethic-card rv-s">
<span class="ethic-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 11-3-6.7"></path><path d="M21 4v5h-5"></path></svg>Gira para visualizar tu solución</span>
<canvas ref=${v.iolRef} role="img" aria-label="Modelo 3D interactivo de un lente intraocular"></canvas>
</div>
<div class="ethic-text">
<h2 class="rv-h">Tu solución visual es nuestra prioridad, no solo venderte un procedimiento.</h2>
<p class="ethic-intro rv">Hoy en día, la mayoría de las personas que quieren dejar los lentes tienen alternativas de tratamiento efectivas. Nuestro compromiso es guiarte hacia la más adecuada para tu caso único.</p>
<ul class="ethic-list">
<li class="ethic-row rv"><span class="ethic-ico" data-pop=""><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path><path d="M9 12l2 2 4-4"></path></svg></span><p><b>Ética y Claridad:</b> Te diremos la verdad, incluso si la mejor respuesta es esperar.</p></li>
<li class="ethic-row rv st2"><span class="ethic-ico" data-pop=""><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 18a8 8 0 1116 0"></path><path d="M12 18l4-6"></path><path d="M7 14h.01M12 9.5h.01M17 14h.01"></path></svg></span><p><b>Niveles de tratamiento:</b> El test puede sugerir un nivel diferente al que tenías en mente.</p></li>
<li class="ethic-row rv st3"><span class="ethic-ico" data-pop=""><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 21h12"></path><path d="M9 21a5 5 0 006-8"></path><path d="M10 4l4 0"></path><path d="M11 4v7l-2 2 3 3 2-2-2-2V4"></path><path d="M8 17h3"></path></svg></span><p><b>Ciencia Primero:</b> Tus estudios médicos profundos siempre mandan sobre los resultados preliminares.</p></li>
</ul>
</div>
</div>
</div>
</section>


<section id="proceso" class="dark t-dark2">
<div class="wrap" style="padding-top: 110px; padding-bottom: 110px">
<div class="rv" style="text-align: center; max-width: 720px; margin: 0 auto 60px">
<span class="eyebrow">Cómo funciona</span>
<h2 style="font-size: clamp(36px, 4.6vw, 60px); line-height: 1.02; margin: 16px 0 0">De la duda al diagnóstico, sin vueltas</h2>
</div>
<div class="steps">
<div class="steps-line line-draw" aria-hidden="true"></div>
<div class="step rv"><div class="num">01</div><div style="font-size: 13px; font-weight: 700; color: #00E676; margin: 22px 0 6px">Paso 01</div><h3 style="margin: 0 0 10px; font-size: 24px">Haz el test</h3><p class="muted" style="margin: 0; line-height: 1.6">Cuatro preguntas, sin datos personales. En un minuto sabes qué procedimiento se acerca a tu perfil.</p></div>
<div class="step rv st2"><div class="num">02</div><div style="font-size: 13px; font-weight: 700; color: #00E676; margin: 22px 0 6px">Paso 02</div><h3 style="margin: 0 0 10px; font-size: 24px">Consulta y diagnóstico</h3><p class="muted" style="margin: 0; line-height: 1.6">Con el oftalmólogo, por videollamada o directo en sede. Estudios completos, tu diagnóstico por escrito y la cotización cerrada de tu caso.</p></div>
<div class="step rv st3"><div class="num">03</div><div style="font-size: 13px; font-weight: 700; color: #00E676; margin: 22px 0 6px">Paso 03</div><h3 style="margin: 0 0 10px; font-size: 24px">Procedimiento y seguimiento</h3><p class="muted" style="margin: 0; line-height: 1.6">Ambulatorio, sin hospitalización. Una revisión postoperatoria y seguimiento a doce meses, ya incluidos en el precio.</p></div>
</div>


<div class="vrow" style="margin-top: 100px">
<div class="rv-s">
<div class="ytcard" style="background-image: url(img/yt/41sXpVChbng.jpg)">
${v.ytAbierto === '41sXpVChbng'
  ? html`<iframe src="https://www.youtube-nocookie.com/embed/41sXpVChbng?autoplay=1&rel=0&modestbranding=1" title="Qué es Sinlentesmexico y cómo trabajamos" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  : html`<button type="button" class="ytcard__btn" onClick=${() => v.ytVer('41sXpVChbng')} aria-label="Reproducir: Qué es Sinlentesmexico y cómo trabajamos">
<span class="ytcard__play"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg></span>
<span class="ytcard__cap"><span class="pulse-dot"></span>Qué es Sinlentesmexico y cómo trabajamos</span>
</button>`}
</div>
</div>
<div class="rv">
<span class="eyebrow">Quiénes somos</span>
<h3 style="font-size: 32px; margin: 12px 0 10px">Míranos antes de decidir</h3>
<p class="muted" style="margin: 0 0 16px; line-height: 1.6">Tres minutos para entender quién te va a atender, cómo trabajamos y por qué el precio que ves aquí es el precio que pagas.</p>
<ul class="checks" style="margin-bottom: 22px">
<li><span class="ck"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span>Quién integra el equipo médico y con qué credenciales.</li>
<li><span class="ck"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span>Qué incluye exactamente el precio todo incluido.</li>
<li><span class="ck"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span>Cómo funciona la atención en las cinco ciudades.</li>
</ul>
<a class="btn btn-primary" href="test.html">Hacer el test · 4 preguntas</a>
</div>
</div>
<div class="vrow rev" style="margin-top: 88px">
<div class="rv-s">
<div class="ytcard" style="background-image: url(img/yt/2XO8_NGPsOw.jpg)">
${v.ytAbierto === '2XO8_NGPsOw'
  ? html`<iframe src="https://www.youtube-nocookie.com/embed/2XO8_NGPsOw?autoplay=1&rel=0&modestbranding=1" title="El proceso paso a paso, de los estudios al alta" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  : html`<button type="button" class="ytcard__btn" onClick=${() => v.ytVer('2XO8_NGPsOw')} aria-label="Reproducir: El proceso paso a paso, de los estudios al alta">
<span class="ytcard__play"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg></span>
<span class="ytcard__cap"><span class="pulse-dot"></span>El proceso paso a paso, de los estudios al alta</span>
</button>`}
</div>
</div>
<div class="rv">
<span class="eyebrow">El día del procedimiento</span>
<h3 style="font-size: 32px; margin: 12px 0 10px">Lo que nadie te cuenta antes</h3>
<p class="muted" style="margin: 0; line-height: 1.6">El video recorre el proceso completo: qué estudios te hacen, qué se siente, cuánto dura, con qué indicaciones sales y cómo es el seguimiento de los doce meses.</p>
</div>
</div>
</div>
</section>


<section class="dark t-dark2">
<div class="wrap" style="padding-top: 110px; padding-bottom: 110px">
<div class="rv" style="max-width: 720px; margin-bottom: 44px">
<span class="eyebrow">Al terminar el test</span>
<h2 style="font-size: clamp(36px, 4.6vw, 60px); line-height: 1.02; margin: 16px 0 14px">Tú decides qué tan rápido avanzas</h2>
<p class="muted" style="font-size: 18px; margin: 0">Nadie te va a perseguir por teléfono. Cuando veas tu resultado, eliges uno de dos caminos.</p>
</div>
<div class="split" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px">
<a class="path main rv-s" href="https://www.sinlentesmexico.mx/videoconsulta">
<span style="align-self: flex-start; font-size: 12px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; background: #00E676; color: #051512; padding: 6px 12px; border-radius: 999px">Lo más elegido</span>
<h3 style="margin: 0; font-size: 28px; color: #fff">Videollamada con un oftalmólogo</h3>
<p class="muted" style="margin: 0; line-height: 1.6">Veinte minutos, sin costo, desde donde estés. El especialista revisa tu caso, te dice si el resultado del test tiene sentido y responde lo que quieras preguntar. Si vives fuera de nuestras ciudades, este es el paso que te ahorra el viaje en balde.</p>
<span style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; gap: 12px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.2); font-size: 14px; font-weight: 700">Disponible en 24 a 48 horas · Sin tarjeta <span style="width: 44px; height: 44px; border-radius: 50%; background: #00E676; color: #051512; display: grid; place-items: center">→</span></span>
</a>
<a class="path rv-s st2" href="https://www.sinlentesmexico.mx/apartar">
<span style="align-self: flex-start; font-size: 12px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; background: rgba(0,230,118,.14); color: #00E676; padding: 6px 12px; border-radius: 999px">$3,000</span>
<h3 style="margin: 0; font-size: 28px">Agendar tus estudios preoperatorios</h3>
<p class="muted" style="margin: 0; line-height: 1.6">El primer paso real del proceso. El test orienta; los estudios determinan. Con $3,000 cubres seis cosas a la vez, y se descuentan íntegros de tu procedimiento si decides proceder.</p>
<span style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; gap: 12px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.12); font-size: 14px; font-weight: 700">Se acredita al total · Se reembolsa si no eres candidato <span style="width: 44px; height: 44px; border-radius: 50%; background: #00E676; color: #051512; display: grid; place-items: center">→</span></span>
</a>
</div>

<h3 class="rv" style="font-size: 22px; margin: 64px 0 20px">Qué incluye agendar tus estudios</h3>
<div class="incl">
${v.incl.map((it, $index) => html`
<div class=${it.cls}>
<span class="incl-n">${it.n}</span>
<b style="font-family: Sora, sans-serif; font-size: 17px">${it.t}</b>
<span class="muted" style="font-size: 15px; line-height: 1.55">${it.d}</span>
</div>
`)}
</div>
<p class="muted rv" style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; max-width: 820px">El procedimiento sólo se programa después de tus estudios preoperatorios y del diagnóstico del oftalmólogo. Ni el test ni la videollamada sustituyen ese diagnóstico.</p>
</div>
</section>


<section id="compara" class="dark t-dark2">
<div class="wrap" style="padding-top: 110px; padding-bottom: 110px">
<div class="rv" style="max-width: 760px; margin-bottom: 48px">
<span class="eyebrow">Precio</span>
<h2 style="font-size: clamp(36px, 4.6vw, 60px); line-height: 1.02; margin: 16px 0 14px">Un solo precio. <span style="color: #00E676">Sin sorpresas en caja.</span></h2>
<p class="muted" style="font-size: 18px; margin: 0">Los operadores de precio bajo anuncian el procedimiento solo y cobran los estudios aparte. Compara el total, no el anuncio.</p>
</div>
<div class="vs">
<div class="bad rv-l">
<div style="font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #FF9C9C; margin-bottom: 20px">Lo que suele anunciarse</div>
<ul>
${v.bad.map((b, $index) => html`<li><span class="x"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></span>${b}</li>`)}
</ul>
</div>
<div class="good rv-s">
<div style="font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #00E676; margin-bottom: 20px">Lo que incluye Sinlentesmexico</div>
<ul>
${v.good.map((g, $index) => html`<li style="color: #fff; font-weight: 600"><span class="ok"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span>${g}</li>`)}
</ul>
</div>
</div>

<div class="tbl rv" style="margin-top: 40px">
<div class="tr th"><span>Procedimiento</span><span>Precio público</span><span>Referencia por ojo</span><span>Meses sin intereses</span></div>
${v.table.map((r, $index) => html`
<div class="tr"><span style="font-weight: 700; color: #fff">${r.name}</span><span class="pp">${r.price}</span><span class="muted">${r.eye}</span><span class="muted" style="font-size: 14px">${r.msi}</span></div>
`)}
</div>
<p class="muted rv" style="margin: 20px 0 0; font-size: 13px; line-height: 1.7">Presbilens se cotiza en precio bilateral: el paciente siempre requiere ambos ojos, y los procedimientos se realizan en fechas distintas con al menos 2 días de diferencia. Ambas fechas están cubiertas por el precio publicado; la referencia por ojo es sólo informativa. La versión tórica aplica cuando hay astigmatismo y se confirma con tus estudios. Formas de pago: tarjeta de crédito o débito, meses sin intereses (láser a 3 y 6 meses, Presbilens a 12), o efectivo únicamente para el anticipo de apartado — el saldo del procedimiento siempre se paga por medio electrónico. Consulta disponibilidad en tu ciudad al agendar.</p>
</div>
</section>


<section class="dark t-dark2">
<div class="wrap" style="padding-top: 20px; padding-bottom: 110px">
<div class="calc">
<div class="rv-l" style="background: rgba(255,255,255,.03); border: 1px solid rgba(0,230,118,.3); color: #E8EEF7; border-radius: 32px; padding: 36px">
<span class="eyebrow">Comparativo de gasto</span>
<h2 style="font-size: clamp(32px, 3.6vw, 46px); line-height: 1.05; margin: 14px 0 12px; color: #fff">¿Cuánto llevas gastado en lentes?</h2>
<p style="margin: 0 0 26px; color: #A7BDB6">Mueve los controles con tu propio gasto. El cálculo es estimado y no constituye una oferta.</p>
<div class="seg-tabs" role="group" aria-label="Procedimiento" style="margin-bottom: 30px">
${v.tabs.map((t, $index) => html`<button type="button" class=${t.cls} onClick=${t.pick}>${t.label}</button>`)}
</div>
<label for="m" style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 6px">Gasto mensual en lentes, armazones y contactos<b style="font-family: Sora, sans-serif; color: #00E676">${v.monthlyF}</b></label>
<input id="m" type="range" min="300" max="3000" step="50" value=${v.monthly} onInput=${v.setMonthly} />
<div style="display: flex; justify-content: space-between; font-size: 13px; color: #A7BDB6; margin-bottom: 24px"><span>$300</span><span>$3,000</span></div>
<label for="y" style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 6px">Años que llevas usando lentes<b style="font-family: Sora, sans-serif; color: #00E676">${v.yearsF}</b></label>
<input id="y" type="range" min="1" max="40" step="1" value=${v.years} onInput=${v.setYears} />
<div style="display: flex; justify-content: space-between; font-size: 13px; color: #A7BDB6"><span>1 año</span><span>40 años</span></div>
</div>
<div class="rv-s" style="border-radius: 32px; padding: 36px; background: rgba(255,255,255,.03); border: 1px solid rgba(0,230,118,.3); display: flex; flex-direction: column">
<div class="res-row"><span class="muted">Ya gastaste</span><b>${v.spent}</b></div>
<div class="res-row"><span class="muted">Proyección a 20 años</span><b>${v.proj}</b></div>
<div class="res-row"><span class="muted">Gasto total en lentes</span><b>${v.total}</b></div>
<div class="res-row"><span class="muted">Procedimiento elegido</span><b>${v.procPrice}</b></div>
<div style="margin: 28px 0 8px; color: #A9B8CF">Diferencia estimada frente a seguir comprando lentes</div>
<div class="saving">${v.diff}</div>
<div class="muted" style="margin: 10px 0 28px; font-size: 14px">${v.procMsi}</div>
<a class="btn btn-primary shine" style="margin-top: auto; align-self: flex-start" href="test.html">Hacer el test · 4 preguntas</a>
</div>
</div>
</div>
</section>


<section class="dark t-dark2">
<div class="wrap" style="padding-top: 110px; padding-bottom: 110px">
<div class="split" style="display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 48px; align-items: center">
<div class="rv-l">
<span class="eyebrow">Resultados</span>
<h2 style="font-size: clamp(36px, 4.4vw, 56px); line-height: 1.02; margin: 16px 0 14px">Escúchalo de quien ya pasó por esto</h2>
<p class="muted" style="font-size: 18px; line-height: 1.55; margin: 0 0 26px">Pacientes de distintas edades y procedimientos contando qué cambió en su día a día: manejar de noche, leer un menú, entrar a nadar sin pensarlo.</p>
<a class="btn btn-primary" href="test.html">Empezar mi test</a>
</div>
<div class="rv-s">
<div class="ytcard" style="background-image: url(img/yt/uU7Zi72E7Iw.jpg)">
${v.ytAbierto === 'uU7Zi72E7Iw'
  ? html`<iframe src="https://www.youtube-nocookie.com/embed/uU7Zi72E7Iw?autoplay=1&rel=0&modestbranding=1" title="Testimonios reales: así cambió su vida" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  : html`<button type="button" class="ytcard__btn" onClick=${() => v.ytVer('uU7Zi72E7Iw')} aria-label="Reproducir: Testimonios reales: así cambió su vida">
<span class="ytcard__play"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg></span>
<span class="ytcard__cap"><span class="pulse-dot"></span>Testimonios reales: así cambió su vida</span>
</button>`}
</div>
</div>
</div>
</div>
</section>


<section id="sedes" class="dark t-dark2">
<div class="wrap" style="padding-top: 110px; padding-bottom: 110px">
<div class="rv" style="max-width: 720px; margin-bottom: 44px">
<span class="eyebrow">Cobertura</span>
<h2 style="font-size: clamp(36px, 4.6vw, 60px); line-height: 1.02; margin: 16px 0 14px">Cinco ciudades, un mismo protocolo</h2>
<p class="muted" style="font-size: 18px; margin: 0">El mismo procedimiento, los mismos estudios y el mismo seguimiento en la ciudad más cercana a ti.</p>
</div>
<div class="sedes">
${v.sedes.map((s, $index) => html`
<div class=${s.cls}>
<div style="display: flex; justify-content: space-between; align-items: center"><span class="open"><span class="pulse-dot"></span>Agenda abierta</span><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00E676" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"></path><circle cx="12" cy="9.5" r="2.5"></circle></svg></div>
<h3 style="margin: 4px 0 0; font-size: 22px">${s.city}</h3>
<div class="muted" style="font-weight: 600">${s.zone}</div>
<div class="muted" style="font-size: 14px">${s.hours}</div>
<div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 12px; border-top: 1px solid rgba(255,255,255,.12)">
${s.map ? html`<a href=${s.map} style="font-size: 14px; font-weight: 600; padding: 10px 0">Cómo llegar ↗</a>` : null}
${s.noMap ? html`<span></span>` : null}
<a class="btn-agendar" href=${s.url}>Agendar →</a>
</div>
</div>
`)}
<div class="sede travel rv">
<h3 style="margin: 0; font-size: 22px">¿Tienes que viajar?</h3>
<p style="margin: 0; color: #A9B8CF; line-height: 1.55; font-size: 15px">Atendemos en las cinco sedes a quien viene de otra ciudad de México y a quien viene del extranjero. Tu ruta empieza por una videollamada: nadie viaja sin que un oftalmólogo haya revisado su caso antes.</p>
<div style="font-weight: 700; color: #00E676; font-size: 14px">Láser: 1 a 3 noches · Presbilens: 6 a 8 noches</div>
<div style="display: flex; gap: 18px; margin-top: auto">
<a href="https://www.sinlentesmexico.mx/test-candidatura?viaje=nacional" style="color: #fff; font-weight: 700; padding: 10px 0">Otra ciudad →</a>
<a href="https://www.sinlentesmexico.mx/test-candidatura?viaje=internacional" style="color: #fff; font-weight: 700; padding: 10px 0">Del extranjero →</a>
</div>
</div>
</div>
</div>
</section>


<section class="t-light">
<div class="wrap" style="padding-top: 110px; padding-bottom: 110px">
<div class="rv" style="max-width: 720px; margin-bottom: 44px">
<span class="eyebrow">Quién te atiende</span>
<h2 style="font-size: clamp(36px, 4.6vw, 60px); line-height: 1.02; margin: 16px 0 0">El respaldo detrás del procedimiento</h2>
</div>
<div class="trust">
<div class="tcard rv"><span class="ticon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"></path></svg></span><h3 style="margin: 0; font-size: 19px">Oftalmólogos certificados</h3><p class="muted" style="margin: 0; font-size: 15px; line-height: 1.55">Especialistas con cédula profesional validada ante la SEP y formación en procedimientos refractivos. Integran el equipo médico Sinlentesmexico.</p></div>
<div class="tcard rv st2"><span class="ticon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path><path d="M9 12l2 2 4-4"></path></svg></span><h3 style="margin: 0; font-size: 19px">Autorización sanitaria</h3><p class="muted" style="margin: 0; font-size: 15px; line-height: 1.55">Operación autorizada por la Secretaría de Salud.</p><b style="font-family: Sora, sans-serif; font-size: 14px; color: #0A7A4B">COFEPRIS 2507015036X00028</b></div>
<div class="tcard rv st3"><span class="ticon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 8h8M8 12h8M8 16h5"></path></svg></span><h3 style="margin: 0; font-size: 19px">Responsable sanitario</h3><p class="muted" style="margin: 0; font-size: 15px; line-height: 1.55">Dr. Edgar Antonio Solano Tego.</p><b style="font-family: Sora, sans-serif; font-size: 13px; color: #0A7A4B">Cédula Prof. 2013102 · Esp. 4010390 (UNAM)</b></div>
<div class="tcard rv st4"><span class="ticon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><path d="M14 3v6h6M9 15l2 2 4-4"></path></svg></span><h3 style="margin: 0; font-size: 19px">Expediente y consentimiento</h3><p class="muted" style="margin: 0; font-size: 15px; line-height: 1.55">Conforme a la NOM-004-SSA3-2012, cada paciente firma consentimiento informado y cuenta con expediente clínico.</p></div>
</div>
</div>
</section>


<section id="faq" class="t-light" style="border-top: 1px solid #E1E8F2">
<div class="wrap" style="padding-top: 110px; padding-bottom: 110px">
<div class="split" style="display: grid; grid-template-columns: minmax(0, .7fr) minmax(0, 1.3fr); gap: 56px; align-items: start">
<div class="faq-side">
<div class="rv-l">
<span class="eyebrow">Preguntas frecuentes</span>
<h2 style="font-size: clamp(36px, 4.2vw, 52px); line-height: 1.04; margin: 16px 0 22px">Lo que todos preguntan por WhatsApp</h2>
<a class="btn btn-wa" href="https://wa.me/525591896084?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20el%20procedimiento.">Preguntar por WhatsApp</a>
</div>
<div class="faq-stage rv-s">
<canvas ref=${v.faqRef} role="img" aria-label="Íconos 3D de los temas de las preguntas: ojo, lentes, precio, videollamada, calendario, estudios y seguridad"></canvas>
<div class="rail" aria-hidden="true">${v.rail.map((d, $index) => html`<span class=${d.cls}></span>`)}</div>
</div>
</div>
<div ref=${v.faqListRef}>
${v.faqs.map((f, $index) => html`
<div class="faq-item">
<button type="button" class="faq-q" aria-expanded=${f.open} onClick=${f.toggle}><span>${f.q}</span><span class=${f.pmCls} aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"></path></svg></span></button>
${f.open ? html`<div class="faq-a">${f.a}</div>` : null}
</div>
`)}
</div>
</div>
</div>
</section>


<section class="dark t-dark1 expand" style="position: relative; overflow: hidden">
<div aria-hidden="true" style="position: absolute; width: 620px; height: 620px; left: -220px; bottom: -260px; border-radius: 50%; border: 1px dashed rgba(127,227,242,.3); animation: spin 60s linear infinite"></div>
<div class="wrap" style="position: relative; padding-top: 110px; padding-bottom: 110px; text-align: center">
<div>
<h2 class="rv-h" style="font-size: clamp(40px, 5.6vw, 76px); line-height: 1; margin: 0 auto 20px; max-width: 900px">Empieza por saber qué te toca</h2>
<p class="muted rv st2" style="font-size: 19px; line-height: 1.55; margin: 0 auto 34px; max-width: 620px">Cuatro preguntas, sin datos personales. Al final eliges si quieres hablar con un oftalmólogo por videollamada o agendar directo tus estudios.</p>
<div class="rv st3" style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: center">
<a class="btn btn-primary shine" href="test.html">Hacer el test · 4 preguntas</a>
<a class="btn btn-ghost" href="https://wa.me/525591896084?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20el%20procedimiento.">Preguntar por WhatsApp</a>
<a href="tel:+525512937671" style="color: #fff; font-weight: 700; padding: 14px 8px">55 1293 7671</a>
</div>
<p class="muted rv st4" style="margin: 26px 0 0; font-size: 14px">Sin costo · Sin compromiso · CDMX, Cancún, Mérida, Villahermosa y Tuxtla Gutiérrez</p>
</div>
</div>
</section>


<footer style="background: #051512; color: #A9B8CF; font-size: 14px">
<div class="wrap" style="padding-top: 64px; padding-bottom: 110px">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 36px">
<div>
<div style="font-family: Sora, sans-serif; font-weight: 800; font-size: 19px; color: #fff; margin-bottom: 12px">Sinlentesmexico</div>
<p style="margin: 0 0 12px; line-height: 1.6">Procedimientos refractivos láser e implante de lente intraocular en cinco ciudades de México.</p>
<div style="color: #00E676; font-weight: 700">COFEPRIS 2507015036X00028</div>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
<b style="color: #fff">Procedimientos</b>
<a href="#rutas" style="color: #A9B8CF">Procedimiento Láser</a><a href="#rutas" style="color: #A9B8CF">Presbilens Esencial</a><a href="#rutas" style="color: #A9B8CF">Presbilens Avanzado</a><a href="#rutas" style="color: #A9B8CF">Presbilens Premium</a><a href="test.html" style="color: #A9B8CF">Test de candidatura</a>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
<b style="color: #fff">Contacto</b>
<span>55 1293 7671</span><a href="https://wa.me/525591896084?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Sinlentesmexico." style="color: #A9B8CF">WhatsApp</a><span>sinlentesmexico@gmail.com</span><a href="#sedes" style="color: #A9B8CF">Sedes</a>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
<b style="color: #fff">Información</b>
<a href="https://www.sinlentesmexico.mx/privacidad" style="color: #A9B8CF">Aviso de privacidad</a><a href="https://www.sinlentesmexico.mx/terminos" style="color: #A9B8CF">Términos y condiciones</a><a href="https://www.sinlentesmexico.mx/aliados" style="color: #A9B8CF">Programa de aliados</a><a href="https://www.sinlentesmexico.mx/login" style="color: #A9B8CF">Iniciar sesión</a><a href="https://www.sinlentesmexico.mx/login?perfil=admin" style="color: #A9B8CF">Acceso interno</a>
</div>
</div>
<p style="margin: 44px 0 10px; font-size: 12px; line-height: 1.7; border-top: 1px solid rgba(255,255,255,.08); padding-top: 24px">Responsable Sanitario: Dr. Edgar Antonio Solano Tego — Cédula Prof. 2013102 · Esp. 4010390 (UNAM). Los procedimientos descritos requieren estudios y diagnóstico médico previos. Los resultados varían según cada paciente y ninguna información de este sitio constituye diagnóstico, indicación ni promesa de resultado.</p>
<p style="margin: 0; font-size: 12px">© 2026 SINLENTESMEXICO GRUPO EMPRESARIAL S DE R.L. DE C.V. Todos los derechos reservados.</p>
</div>
</footer>


<div class=${v.simOvCls} onClick=${v.simFondo} role="dialog" aria-modal="true" aria-label="Simulador de visión">
<div class="sim-box">
<div class="sim-bar">
<div><span class="eyebrow">Simulador</span><h3>Simulador de visión</h3></div>
<button type="button" class="sim-x" onClick=${v.simCerrar}>Salir</button>
</div>
<div class="sim-cuerpo">
${v.simOn ? html`<div class="sim-panel">
<div class="sim-ctrls">
<label class="sim-campo"><span>Escena</span>
<select value=${v.simEsc} onChange=${v.setSimEsc}>${v.simEscenas.map((o, $index) => html`<option value=${o.k}>${o.label}</option>`)}</select></label>
<label class="sim-campo"><span>Condición ocular</span>
<select value=${v.simCond} onChange=${v.setSimCond}>${v.simCondiciones.map((o, $index) => html`<option value=${o.k}>${o.label}</option>`)}</select></label>
<label class="sim-campo"><span>Procedimiento</span>
<select value=${v.simLente} onChange=${v.setSimLente}>${v.simLentes.map((o, $index) => html`<option value=${o.k}>${o.label}</option>`)}</select></label>
<div class="sim-campo"><span>Comparar</span>
<div class="sim-comp"><button type="button" class=${v.simSwCls} onClick=${v.toggleSimComp} aria-pressed=${v.simComp} aria-label="Comparar dos procedimientos"></button></div></div>
<label class="sim-campo"><span>Comparar con</span>
<select value=${v.simLenteB} onChange=${v.setSimLenteB} disabled=${!v.simComp}>${v.simLentesB.map((o, $index) => html`<option value=${o.k}>${o.label}</option>`)}</select></label>
</div>

<div class="sim-lienzo">
<canvas ref=${v.simCvRef} role="img" aria-label="Simulación de visión"></canvas>
${v.simError ? html`<button type="button" class="sim-aviso" onClick=${v.simTocar}>${v.simErrorTxt}</button>` : null}
<span class="sim-etq sim-etq--a">${v.simEtqA}</span>
${v.simComp ? html`<span class="sim-etq sim-etq--b">${v.simEtqB}</span><div class="sim-linea"></div>` : null}
</div>

<div class="sim-pie2">
<p class="sim-nota2">${v.simNota}<small>Demo sobre video de referencia (calles de CDMX, Pexels). Representación orientativa, no un resultado garantizado.</small></p>
</div>
</div>` : null}
</div>
</div>
</div>

<div class="mbar">
<a class="btn btn-primary" href="test.html">Hacer el test · 4 preguntas</a>
<a class="btn btn-wa" style="flex: 0 0 auto" href="https://wa.me/525591896084?text=Hola%2C%20quiero%20agendar%20una%20videollamada%20con%20un%20oftalm%C3%B3logo.">WhatsApp</a>
</div>

</div>`;
  }
}

render(html`<${App} />`, document.getElementById("app"));
