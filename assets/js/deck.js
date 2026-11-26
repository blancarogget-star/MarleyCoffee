/* Marley Unity Hub · motor de presentación (sin dependencias) */
(function () {
  const stage = document.getElementById('stage');
  const slides = [...document.querySelectorAll('.slide')];
  const bar = document.querySelector('#progress i');
  const notesBox = document.getElementById('notesbox');
  const help = document.getElementById('help');
  let cur = -1;

  /* ---------- escala 1920×1080 a la ventana ---------- */
  function fit() {
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = `translate(-50%,-50%) scale(${s})`;
  }
  addEventListener('resize', fit); fit();

  /* ---------- URL del MVP para el QR ---------- */
  const params = new URLSearchParams(location.search);
  const base = location.href.split('#')[0].split('?')[0].replace(/index\.html$/, '');
  const mvpUrl = params.get('mvp') || new URL('mvp/', base).href;
  document.querySelectorAll('[data-qr]').forEach(el => {
    try {
      const qr = qrcode(0, 'M'); qr.addData(mvpUrl); qr.make();
      const size = +el.dataset.size || 200, n = qr.getModuleCount(), c = size / n;
      let d = '';
      for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) if (qr.isDark(r, k)) d += `M${k * c} ${r * c}h${c}v${c}h-${c}z`;
      el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Código QR al MVP"><path d="${d}" fill="#0E0D0B" shape-rendering="crispEdges"/></svg>`;
    } catch (e) { el.textContent = mvpUrl; }
  });
  document.querySelectorAll('[data-url-text]').forEach(el => el.textContent = mvpUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''));

  /* ---------- contadores ---------- */
  const fmt = (v, dec) => v.toLocaleString('es-CL', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  function runCounters(slide) {
    slide.querySelectorAll('.count').forEach(el => {
      const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0);
      const delay = parseInt(getComputedStyle(el.closest('.rv') || el).getPropertyValue('--d')) || 0;
      el.textContent = fmt(0, dec);
      clearTimeout(el._t); cancelAnimationFrame(el._r);
      el._t = setTimeout(() => {
        const t0 = performance.now(), dur = 1500;
        const step = now => {
          const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(to * e, dec);
          if (p < 1) el._r = requestAnimationFrame(step);
        };
        el._r = requestAnimationFrame(step);
      }, delay + 250);
    });
  }

  /* ---------- videos ---------- */
  function videos(slide, on) {
    slide.querySelectorAll('video').forEach(v => {
      clearTimeout(v._t);
      if (on) {
        v.currentTime = 0;
        v._t = setTimeout(() => { const p = v.play(); if (p) p.catch(() => {}); }, +(v.dataset.delay || 0));
      } else { v.pause(); }
    });
  }

  /* ---------- navegación ---------- */
  function go(n, fromHash) {
    n = Math.max(0, Math.min(slides.length - 1, n));
    if (n === cur) return;
    const old = slides[cur];
    if (old) {
      old.classList.remove('active'); old.classList.add('prev'); videos(old, false);
      setTimeout(() => old.classList.remove('prev'), 900);
    }
    const s = slides[n];
    // reinicia animaciones CSS
    s.classList.remove('active'); void s.offsetWidth; s.classList.add('active');
    runCounters(s); videos(s, true);
    cur = n;
    bar.style.width = ((n + 1) / slides.length * 100) + '%';
    const note = s.querySelector('.notes');
    notesBox.innerHTML = `<b>${n + 1}/${slides.length} · ${s.dataset.title || ''}</b>\n` + (note ? note.textContent.trim() : '');
    if (!fromHash) history.replaceState(null, '', '#' + (n + 1));
    // precarga los videos de la siguiente lámina
    const nx = slides[n + 1]; if (nx) nx.querySelectorAll('video').forEach(v => { if (v.preload !== 'auto') v.preload = 'auto'; });
  }
  const next = () => go(cur + 1), prev = () => go(cur - 1);

  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(slides.length - 1);
    else if (k === 'n' || k === 'N') notesBox.classList.toggle('on');
    else if (k === 'f' || k === 'F') { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); }
    else if (/^[1-9]$/.test(k)) go(+k - 1);
  });
  document.getElementById('viewport').addEventListener('click', e => {
    if (e.target.closest('a,button,video,.qr')) return;
    (e.clientX < innerWidth * 0.25) ? prev() : next();
  });
  let tx = null;
  addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', e => {
    if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  });
  addEventListener('hashchange', () => { const h = parseInt(location.hash.slice(1)); if (h) go(h - 1, true); });

  const start = parseInt(location.hash.slice(1)) || 1;
  go(start - 1, true);
  help.classList.add('on'); setTimeout(() => help.classList.remove('on'), 4000);
})();
