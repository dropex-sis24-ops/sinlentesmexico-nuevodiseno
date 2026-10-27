/* Generated from the canvas artboard Test.dc.html — Preact + htm, no build step. */
const { html, render, Component } = window.htmPreact;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { screen: 'quiz', step: 0, ans: {}, sel: null, det: false, k: 0 };
  }
  componentWillUnmount() { clearTimeout(this._t); }
  compute(a) {
    var r, down = false;
    if (a.age === 'E1') r = 'laser';
    else if (a.age === 'E2' && a.need === 'lejos' && a.goal !== 'mayor') r = 'laser';
    else {
      r = a.goal === 'esencial' ? 'esencial' : a.goal === 'mayor' ? 'premium' : 'avanzado';
      if (r === 'premium' && (a.day === 'noche' || a.need === 'noche')) { r = 'avanzado'; down = true; }
    }
    var P = {
      laser: { name: 'Procedimiento Láser', sub: 'Remodelación corneal con láser', price: '$30,000', msi: 'o 3 MSI de $10,000 · 6 MSI de $5,000', c: true, i: true, l: true,
        desc: 'Corrige miopía, hipermetropía y astigmatismo remodelando la córnea. Ambulatorio, alrededor de 20 minutos.',
        close: 'Por eso el láser es la ruta que mejor embona contigo: resuelve lo que te limita hoy, sin sustituir un cristalino que todavía trabaja bien.' },
      esencial: { name: 'Presbilens Esencial', sub: 'Lente intraocular monofocal', price: '$59,800', msi: 'o 3 MSI de $19,933 · 6 MSI de $9,967 · 12 MSI de $4,983', c: false, i: false, l: true,
        desc: 'Lente intraocular monofocal, calculado para darte la mejor visión posible en la distancia que más usas.',
        close: '[TEXTO DE PRUEBA] Por eso Presbilens Esencial es la ruta que mejor embona contigo: un lente monofocal calculado para la distancia que más usas.' },
      avanzado: { name: 'Presbilens Avanzado', sub: 'Lente de rango extendido (EDOF)', price: '$85,800', msi: 'o 3 MSI de $28,600 · 6 MSI de $14,300 · 12 MSI de $7,150', c: false, i: true, l: true,
        desc: 'Lente de rango extendido (EDOF). Franja continua de enfoque de lejos a intermedia: pantallas y volante.',
        close: '[TEXTO DE PRUEBA] Por eso Presbilens Avanzado es la ruta que mejor embona contigo: una franja continua de enfoque de lejos a intermedia, para pantallas y volante.' },
      premium: { name: 'Presbilens Premium', sub: 'Lente trifocal', price: '$115,800', msi: 'o 3 MSI de $38,600 · 6 MSI de $19,300 · 12 MSI de $9,650', c: true, i: true, l: true,
        desc: 'Lente trifocal. Tres puntos de enfoque para cubrir el rango completo con la mayor independencia de lentes.',
        close: '[TEXTO DE PRUEBA] Por eso Presbilens Premium es la ruta que mejor embona contigo: tres puntos de enfoque para cubrir el rango completo con la mayor independencia de lentes.' }
    };
    var o = P[r], L = r === 'laser', R = [];
    R.push({
      E1: 'Antes de los 40 el cristalino todavía enfoca de cerca por sí solo, así que corregir la córnea con láser suele bastar.',
      E2: L ? 'Si sólo te cuesta ver de lejos, el láser puede seguir siendo la opción.' : '[TEXTO DE PRUEBA] Entre los 40 y 49 años empieza la vista cansada: el láser no la corrige, y la ruta es Presbilens.',
      E3: '[TEXTO DE PRUEBA] Entre los 50 y 59 años el lente intraocular es la etapa habitual: sustituye el cristalino y atiende la vista cansada.',
      E4: '[TEXTO DE PRUEBA] A partir de los 60 años se evalúa también la salud del cristalino, y el lente intraocular suele ser la ruta.'
    }[a.age]);
    R.push({
      lejos: L ? 'Nos dijiste que lo que más te cuesta es ver de lejos, que es exactamente lo que corrige la remodelación corneal.' : '[TEXTO DE PRUEBA] Nos dijiste que lo que más te cuesta es ver de lejos: es la distancia base de cualquier nivel de Presbilens.',
      cerca: L ? '[TEXTO DE PRUEBA] Nos dijiste que te cuesta ver de cerca: el especialista revisará la causa, porque antes de los 40 el cristalino todavía enfoca de cerca.' : 'Si ya necesitas alejar el celular para leer, el láser no corrige eso y la ruta suele ser Presbilens.',
      dos: '[TEXTO DE PRUEBA] Te cuesta ver de lejos y de cerca, así que conviene cubrir más de una distancia.',
      noche: '[TEXTO DE PRUEBA] Te cuesta ver de noche, con reflejos y halos: lo tomamos en cuenta para no proponerte el nivel con más halos nocturnos.'
    }[a.need]);
    R.push({
      pantallas: 'Pasas el día en pantallas, y esa es una distancia intermedia sostenida: es la franja que peor cubre un lente de una sola distancia.',
      noche: 'Si nos dices que manejas mucho de noche, el test no te propone el nivel más alto: los lentes trifocales tienden a generar más halos nocturnos que los de rango extendido.',
      deporte: '[TEXTO DE PRUEBA] Haces deporte y actividades al aire libre: la visión de lejos es la que más usas.',
      lectura: '[TEXTO DE PRUEBA] Lees y haces trabajo de detalle: la distancia cercana es clave en tu día.'
    }[a.day]);
    R.push({
      esencial: 'No te molesta usar lentes para leer, así que te proponemos el nivel más económico.',
      menos: '[TEXTO DE PRUEBA] Quieres depender lo menos posible de los lentes, cubriendo la mayoría de tus actividades.',
      mayor: 'Buscas la mayor independencia posible, cubriendo todas las distancias.',
      orienten: '[TEXTO DE PRUEBA] Prefieres que el especialista te oriente: te proponemos un punto medio para revisarlo juntos en la videollamada.'
    }[a.goal]);
    if (down) R.push('Por eso el sistema descarta el nivel más alto por su cuenta.');
    o.reasons = R;
    o.msiFull = o.msi.replace(/^o /, '');
    o.incl = ['Estudios preoperatorios completos', 'Honorarios del oftalmólogo', 'Uso de quirófano', 'Sala de recuperación de corta estancia', 'Lente intraocular de ambos ojos, seleccionado según tu biometría (en Presbilens)', 'Medicamento postoperatorio', 'Una revisión postoperatoria', 'Seguimiento a doce meses'];
    return o;
  }
  renderVals() {
    var self = this, s = this.state;
    var Q = [
      { key: 'age', short: 'Edad', title: '¿Cuántos años tienes?', sub: 'La edad define si la ruta es láser o lente intraocular.', opts: [
        { id: 'E1', tag: '18+', label: '18 a 39 años', hint: 'La etapa donde el láser suele ser la mejor opción' },
        { id: 'E2', tag: '40+', label: '40 a 49 años', hint: 'Aquí empieza la vista cansada' },
        { id: 'E3', tag: '50+', label: '50 a 59 años', hint: 'Etapa habitual del lente intraocular' },
        { id: 'E4', tag: '60+', label: '60 años o más', hint: 'Se evalúa también la salud del cristalino' }] },
      { key: 'need', short: 'Lo que más te cuesta', title: '¿Qué es lo que más trabajo te cuesta hoy?', sub: 'Elige lo que más te limita en tu día, no lo único.', opts: [
        { id: 'lejos', icon: 'M3 20l6-11 4 7 3-4 5 8z M17 6a2 2 0 100-4 2 2 0 000 4z', label: 'Ver de lejos', hint: 'Letreros, manejar, la calle' },
        { id: 'cerca', icon: 'M8 2h8a1.5 1.5 0 011.5 1.5v17A1.5 1.5 0 0116 22H8a1.5 1.5 0 01-1.5-1.5v-17A1.5 1.5 0 018 2z M11 18h2', label: 'Ver de cerca', hint: 'El celular, el menú, leer' },
        { id: 'dos', icon: 'M3 14a3.5 3.5 0 107 0 3.5 3.5 0 00-7 0z M14 14a3.5 3.5 0 107 0 3.5 3.5 0 00-7 0z M10 14h4 M3 13l2-6 M21 13l-2-6', label: 'Las dos cosas', hint: 'Cambio de lentes según la distancia' },
        { id: 'noche', icon: 'M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z', label: 'Ver de noche', hint: 'Reflejos, halos, deslumbramiento' }] },
      { key: 'day', short: 'Tu día a día', title: '¿Cómo es tu día a día?', sub: 'Determina qué distancias necesitas realmente cubrir.', opts: [
        { id: 'pantallas', icon: 'M3 4h18v12H3z M8 20h8 M12 16v4', label: 'Pantallas todo el día', hint: 'Computadora, celular, oficina' },
        { id: 'noche', icon: 'M5 16l1.6-5.2A2 2 0 018.5 9.5h7a2 2 0 011.9 1.3L19 16 M3 16h18v3H3z M7 19v2 M17 19v2', label: 'Manejo mucho de noche', hint: 'Carretera, turnos, traslados' },
        { id: 'deporte', icon: 'M12 8a4 4 0 100 8 4 4 0 000-8z M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4', label: 'Deporte y aire libre', hint: 'Actividad física, exteriores' },
        { id: 'lectura', icon: 'M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z M4 5v16 M8 7h7', label: 'Lectura y trabajo de detalle', hint: 'Documentos, manualidades, precisión' }] },
      { key: 'goal', short: 'Lo que esperas', title: '¿Qué esperas del resultado?', sub: 'No hay respuesta correcta. Sirve para no ofrecerte de más ni de menos.', opts: [
        { id: 'esencial', icon: 'M5 12l5 5 9-10', label: 'Resolver lo esencial', hint: 'No me molesta usar lentes para leer' },
        { id: 'menos', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18z M12 8a4 4 0 100 8 4 4 0 000-8z M12 11.5v1', label: 'Depender lo menos posible', hint: 'Quiero cubrir la mayoría de mis actividades' },
        { id: 'mayor', icon: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.5 2.9 1-6.1L3.1 9.5l6.1-.9z', label: 'La mayor independencia posible', hint: 'Quiero cubrir todas las distancias' },
        { id: 'orienten', icon: 'M4 5h16v11H9l-5 4z M8 10h8', label: 'Quiero que me orienten', hint: 'Prefiero que el especialista me diga' }] }
    ];
    var step = s.step, q = Q[step];
    var opts = q.opts.map(function (o) {
      var picked = s.sel === o.id || (s.sel === null && s.ans[q.key] === o.id);
      return { label: o.label, hint: o.hint, tag: o.tag || '', icon: o.icon || '', cls: picked ? 'opt sel' : 'opt', pick: function () {
        if (self.state.sel) return;
        var ans = Object.assign({}, self.state.ans); ans[q.key] = o.id;
        self.setState({ sel: o.id, ans: ans });
        self._t = setTimeout(function () {
          if (step < 3) self.setState({ step: step + 1, sel: null, k: self.state.k + 1 });
          else self.setState({ screen: 'result', sel: null, det: false });
          try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
        }, 420);
      } };
    });
    var findLabel = function (qq) { var id = s.ans[qq.key]; for (var i = 0; i < qq.opts.length; i++) if (qq.opts[i].id === id) return qq.opts[i].label; return ''; };
    var profile = Q.map(function (qq, i) {
      var v = findLabel(qq);
      return { n: String(i + 1), label: qq.short, val: v, empty: !v, cls: 'pitem' + (v ? ' done' : '') + (i === step && !v ? ' cur' : '') };
    });
    var answered = Object.keys(s.ans).length;
    var full = s.ans.age && s.ans.need && s.ans.day && s.ans.goal;
    var r = s.screen === 'result' && full ? this.compute(s.ans) : { name: '', sub: '', reasons: [], close: '', price: '', msi: '', msiFull: '', desc: '', incl: [], c: false, i: false, l: false };
    return {
      isQuiz: s.screen === 'quiz', isResult: s.screen === 'result', isMinor: s.screen === 'minor',
      stepN: String(step + 1), pct: ((step + 1) * 25) + '%', qkey: 'q' + s.k,
      hasBack: step > 0, isFirst: step === 0, q: q, opts: opts, profile: profile,
      dots: [0, 1, 2, 3].map(function (i) { return { cls: i < answered ? 'sdot on' : 'sdot' }; }),
      hue: String(answered * 28),
      goBack: function () { if (self.state.step > 0) self.setState({ step: self.state.step - 1, sel: null, k: self.state.k + 1 }); },
      goMinor: function () { self.setState({ screen: 'minor' }); },
      restart: function () { self.setState({ screen: 'quiz', step: 0, ans: {}, sel: null, k: self.state.k + 1, det: false }); },
      r: r, detOpen: !!s.det, pmCls: s.det ? 'pm on' : 'pm',
      toggleDet: function () { self.setState({ det: !self.state.det }); }
    };
  }
  render() {
    const v = this.renderVals();
    return html`<div style="min-height: 100vh; display: flex; flex-direction: column">

<header class="topbar">
<div class="wrap" style="display: flex; justify-content: space-between; align-items: center; min-height: 72px; gap: 16px">
<a class="logo" href="index.html"><span style="font-family: Sora, sans-serif; font-weight: 700; font-size: 19px; letter-spacing: -0.02em">Sinlentesmexico</span><span class="logo-dot" aria-hidden="true"></span></a>
<span style="display: inline-flex; align-items: center; gap: 14px; font-size: 14px; color: #33445F"><span style="display:inline-flex;align-items:center;gap:10px"><span class="pulse-dot"></span>Sin costo · Sin registro</span><span class="lang" role="group" aria-label="Idioma / Language"><button type="button" class="lang-b" data-lang="es" aria-pressed="true">ES</button><button type="button" class="lang-b" data-lang="en" aria-pressed="false">EN</button></span></span>
</div>
</header>

<main class="wrap" style="flex: 1; width: 100%; padding-top: 56px; padding-bottom: 40px">


${v.isQuiz ? html`
<div class="grid">
<div>
<div style="display: flex; justify-content: space-between; align-items: baseline">
<span class="mono" style="color: #33445F">Pregunta ${v.stepN} de 4</span>
<span class="mono" style="color: #0F7A4D; font-weight: 700">${v.pct}</span>
</div>
<div class="prog"><span style=${`width: ${v.pct}`}></span></div>

<div class="qwrap" key=${v.qkey}>
<div style="min-height: 52px; margin-top: 18px">
${v.hasBack ? html`<button type="button" class="back" onClick=${v.goBack}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"></path></svg>Anterior</button>` : null}
</div>
<h1 class="qtitle">${v.q.title}</h1>
<p class="muted" style="font-size: 19px; margin: 0">${v.q.sub}</p>
<div class="opts" role="group" aria-label=${v.q.title}>
${v.opts.map((o, $index) => html`
<button type="button" class=${o.cls} onClick=${o.pick}>
<span class="oico" aria-hidden="true">
${o.tag ? html`${o.tag}` : null}
${o.icon ? html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${o.icon}></path></svg>` : null}
</span>
<span class="otxt"><b>${o.label}</b><span>${o.hint}</span></span>
<span class="oarr" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span>
</button>
`)}
</div>
${v.isFirst ? html`
<button type="button" class="back" style="margin-top: 16px" onClick=${v.goMinor}>Soy menor de 18 años</button>
` : null}
</div>
</div>

<aside class="panel" aria-label="Tu perfil">
<div class="stage" aria-hidden="true">
<div class="eye3d">
<div class="ring r1"></div>
<div class="iris" style=${`filter: hue-rotate(${v.hue}deg)`}></div>
<div class="ring r3"></div>
<div class="lens"></div>
<div class="scan"></div>
</div>
</div>
<div class="prof">
${v.profile.map((p, $index) => html`
<div class=${p.cls}>
<span class="pnum">${p.n}</span>
<span style="min-width: 0"><span class="plab">${p.label}</span><br />
${p.val ? html`<span class="pval" key=${p.val}>${p.val}</span>` : null}
${p.empty ? html`<span style="font-size: 14px; color: #6E7F99">—</span>` : null}
</span>
</div>
`)}
</div>
<div class="steps">${v.dots.map((d, $index) => html`<span class=${d.cls}></span>`)}</div>
<p style="margin: 16px 0 0; font-size: 13px; color: #A9B8CF; text-align: center">Sin registro · Sin tarjeta · Resultado en un minuto</p>
</aside>
</div>
` : null}


${v.isMinor ? html`
<div class="card" style="max-width: 640px; margin: 40px auto; text-align: center">
<h1 style="font-size: 34px; margin: 0 0 12px">Soy menor de 18 años</h1>
<p class="muted" style="font-size: 17px; line-height: 1.6; margin: 0 0 24px">[TEXTO DE PRUEBA] Los procedimientos refractivos se realizan a partir de los 18 años. Si tienes dudas, escríbenos por WhatsApp.</p>
<div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center">
<a class="btn btn-wa" href="https://wa.me/525591896084?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20el%20procedimiento.">Preguntar por WhatsApp</a>
<button type="button" class="btn btn-ghost" onClick=${v.restart}>← Volver al test</button>
</div>
</div>
` : null}


${v.isResult ? html`
<div class="res-grid">
<div>
<span class="mono" style="color: #1846C8; font-weight: 700">Resultado orientativo</span>
<h1 class="rtitle">Tu perfil apunta a <em>${v.r.name}</em></h1>
<p class="muted" style="font-size: 19px; margin: 0 0 28px">${v.r.sub}</p>

<div class="card d1">
<span class="mono" style="color: #1846C8; font-weight: 700">Por qué te decimos esto</span>
<ul class="reasons">
${v.r.reasons.map((t, $index) => html`
<li><span class="ck"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span><span>${t}</span></li>
`)}
</ul>
<p style="margin: 0 0 14px; font-weight: 700; line-height: 1.55">${v.r.close}</p>
<p class="muted" style="margin: 0; font-size: 14px; line-height: 1.6; padding-top: 14px; border-top: 1px solid #E1E8F2">No vendemos un procedimiento. Determinamos cuál te corresponde. Este resultado es un punto de partida: los estudios preoperatorios son los que lo confirman o lo corrigen.</p>
</div>

<h2 class="d2" style="font-size: 28px; margin: 40px 0 18px; animation: slideUp .9s .3s cubic-bezier(.16,1,.3,1) both">Dos formas de avanzar. Elige la tuya.</h2>
<div class="two" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px">
<a class="path main" href="https://www.sinlentesmexico.mx/videoconsulta" style="animation: slideUp .9s .4s cubic-bezier(.16,1,.3,1) both">
<span class="badge">Lo más elegido</span>
<b style="font-family: Sora, sans-serif; font-size: 21px">Videollamada con un oftalmólogo</b>
<span style="color: #D3DEFA; line-height: 1.55; font-size: 15px">20 minutos, sin costo, desde donde estés. El especialista revisa tu caso, te dice si el resultado del test tiene sentido y resuelve tus dudas antes de que gastes un peso.</span>
<span style="font-size: 13px; color: #B9C8F0">Disponible en 24 a 48 horas · No necesitas ir a la sede</span>
<span class="go">Elegir videollamada <i>→</i></span>
</a>
<a class="path" href="https://www.sinlentesmexico.mx/apartar" style="animation: slideUp .9s .5s cubic-bezier(.16,1,.3,1) both">
<span class="badge" style="background: #EEF3FB; color: #1846C8">$3,000</span>
<b style="font-family: Sora, sans-serif; font-size: 21px">Agendar mis estudios preoperatorios</b>
<span class="muted" style="line-height: 1.55; font-size: 15px">El primer paso real. Con $3,000 agendas tus estudios completos, recibes tu diagnóstico por escrito de un oftalmólogo, apartas tu fecha y congelas tu precio. Se descuenta íntegro si procedes.</span>
<span style="font-size: 13px; color: #4A5B76">Se acredita al total · Se reembolsa si no eres candidato</span>
<span class="go" style="color: #1846C8">Ver qué incluye <i>→</i></span>
</a>
</div>

<div style="display: grid; gap: 10px; margin-top: 22px; font-size: 15px">
<p style="margin: 0" class="muted">¿Todavía no quieres decidir? <a class="lnk" href="https://wa.me/525591896084?text=Hola%2C%20quiero%20recibir%20mi%20resultado%20del%20test.">Recibe tu resultado por WhatsApp y lo piensas →</a></p>
<p style="margin: 0" class="muted">¿Tienes que viajar para atenderte? <a class="lnk" href="https://www.sinlentesmexico.mx/test-candidatura?viaje=nacional">Vivo en otra ciudad de México</a> · <a class="lnk" href="https://www.sinlentesmexico.mx/test-candidatura?viaje=internacional">Vivo fuera de México</a></p>
</div>

<div style="margin-top: 28px">
<button type="button" class="det-btn" aria-expanded=${v.detOpen} onClick=${v.toggleDet}><span>Ver el detalle de ${v.r.name} y su precio</span><span class=${v.pmCls} aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"></path></svg></span></button>
${v.detOpen ? html`
<div class="det">
<p style="margin: 0 0 6px; line-height: 1.6">${v.r.desc}</p>
<p class="muted" style="margin: 0 0 14px; font-size: 14px">${v.r.msiFull}</p>
<b style="font-family: Sora, sans-serif">Lo que incluye Sinlentesmexico</b>
<ul class="incl">
${v.r.incl.map((it, $index) => html`<li><span class="ck" style="flex: 0 0 20px; height: 20px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></span>${it}</li>`)}
</ul>
</div>
` : null}
</div>

<button type="button" class="back" style="margin-top: 20px" onClick=${v.restart}>← Volver al test</button>
</div>

<aside class="price-card" aria-label="Precio">
<div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 18px">
<span style="font-size: 12px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #7FE3F2">${v.r.name}</span>
<span class="pulse-dot"></span>
</div>
<div style="font-size: 14px; color: #A9B8CF; margin-bottom: 8px">ambos ojos · todo incluido</div>
<div class="price">${v.r.price}</div>
<div style="font-size: 14px; color: #A9B8CF; margin: 10px 0 24px; line-height: 1.5">${v.r.msi}</div>
<div class="dist" style="margin-bottom: 8px">
<div class="seg">${v.r.c ? html`<i class="sf"></i>` : null}</div>
<div class="seg">${v.r.i ? html`<i class="sf"></i>` : null}</div>
<div class="seg">${v.r.l ? html`<i class="sf"></i>` : null}</div>
</div>
<div class="dist">
<div class="dl"><b>Cerca</b>40 cm</div>
<div class="dl"><b>Intermedia</b>60 cm – 1 m</div>
<div class="dl"><b>Lejos</b>3 m o más</div>
</div>
<a class="btn" href="https://www.sinlentesmexico.mx/videoconsulta" style="width: 100%; margin-top: 26px; background: #22C38E; color: #07152B">Elegir videollamada →</a>
</aside>
</div>
` : null}

</main>

<footer>
<div class="wrap" style="padding-top: 24px; padding-bottom: 28px; font-size: 13px; line-height: 1.7; color: #4A5B76">
<p style="margin: 0 0 8px">Responsable Sanitario: Dr. Edgar Antonio Solano Tego — Cédula Prof. 2013102 · Esp. 4010390 (UNAM). COFEPRIS 2507015036X00028. Este test es orientativo y no sustituye los estudios ni el diagnóstico médico.</p>
<p style="margin: 0"><a href="https://www.sinlentesmexico.mx/privacidad" style="font-weight: 700; color: #33445F">Aviso de privacidad</a> · © 2026 Sinlentesmexico</p>
</div>
</footer>

</div>`;
  }
}

render(html`<${App} />`, document.getElementById("app"));
