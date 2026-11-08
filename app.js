/* Feel Foods · tienda */
(() => {
  'use strict';
  const CFG = window.FF_CONFIG;
  const PRODUCTS = window.FF_PRODUCTOS;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const byId = id => PRODUCTS.find(p => p.id === id);
  const money = n => '$' + Math.round(n).toLocaleString('es-AR');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Almacenamiento seguro ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin storage */ } },
  };
  const CART_KEY = 'ff-carrito-v1';
  const CUST_KEY = 'ff-cliente-v1';

  /* ---------- Ilustraciones de frutos secos (viewBox 40×40) ---------- */
  const NUTS = {
    almendra: `<path d="M20 3.5c8 6 11.5 17.5 7.8 27-2.6 6.6-13 6.6-15.6 0C8.5 21 12 9.5 20 3.5Z" fill="#c68b58"/><path d="M20 3.5c8 6 11.5 17.5 7.8 27-1.2 3.1-4.4 4.7-7.8 4.7 4-6 5-20 0-31.7Z" fill="#a8703f"/><path d="M16 12c-.8 4-1 9 .3 14M21.5 10c1 5 1.2 10 0 16M18.5 18v6" stroke="#8d5a2e" stroke-width="1" stroke-linecap="round" fill="none" opacity=".55"/>`,
    nuez: `<path d="M20 5c7.5 0 14 5 14 13.5 0 9-6 16.5-14 16.5S6 27.5 6 18.5C6 10 12.5 5 20 5Z" fill="#c69a63"/><path d="M20 6v28" stroke="#8a5d2f" stroke-width="1.6"/><path d="M11 13c3 1 5 3 5 6s-3 4-3 7 3 4 4 5M29 13c-3 1-5 3-5 6s3 4 3 7-3 4-4 5M9 20c2 0 3 1 4 2M31 20c-2 0-3 1-4 2" stroke="#8a5d2f" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M20 5c7.5 0 14 5 14 13.5 0 9-6 16.5-14 16.5" fill="#000" opacity=".08"/>`,
    caju: `<path d="M31 7.5C20 4.5 7.5 11 7.5 23.5c0 7.5 6 12 13 10 4-1.2 3.6-6-.3-6.6-4.4-.7-5.4-5-3.4-9 2.4-4.8 8-6.5 13-5.6 4.8.9 5.5-3.6 1.2-4.8Z" fill="#f0d9a8"/><path d="M31 7.5C20 4.5 7.5 11 7.5 23.5c0 3 1 5.5 2.7 7.4C8 20 18 9 33 11.5c.6-1.6 0-3.3-2-4Z" fill="#fff" opacity=".35"/><path d="M20.2 33.5c4-1.2 3.6-6-.3-6.6-4.4-.7-5.4-5-3.4-9" stroke="#cfa96b" stroke-width="1.2" fill="none"/>`,
    mani: `<path d="M14 5c5 0 8 3.5 8 7.5 0 2.5-1 3.5-1 5s2 2.5 4 3.5c4 2 6 5 6 8.5C31 34 27 37 22 36c-4-.8-5.5-3.5-7-6.5-1-2-3-2.5-5-4.5C7 22 6 18.5 6 15c0-6 3.5-10 8-10Z" fill="#dca86e"/><g fill="#b8814a" opacity=".7"><circle cx="12" cy="11" r=".9"/><circle cx="16" cy="14" r=".9"/><circle cx="11" cy="17" r=".9"/><circle cx="15" cy="20" r=".9"/><circle cx="22" cy="26" r=".9"/><circle cx="26" cy="29" r=".9"/><circle cx="21" cy="31" r=".9"/><circle cx="25" cy="33" r=".9"/></g>`,
    pasa: `<path d="M12 8c5-4 13-3 17 2 4 4 4 11 1 16-3 6-9 9-15 8-5-1-8-5-8-11 0-6 1-11 5-15Z" fill="#5b2c3c"/><path d="M14 13c3 2 5 6 4 10M22 10c2 3 2 7 0 11M25 22c-3 1-6 4-6 7" stroke="#3b1826" stroke-width="1.6" fill="none" stroke-linecap="round"/><ellipse cx="13" cy="12" rx="2.5" ry="1.5" fill="#fff" opacity=".25" transform="rotate(-35 13 12)"/>`,
    banana: `<circle cx="20" cy="20" r="14" fill="#f0c24f"/><circle cx="20" cy="20" r="14" fill="none" stroke="#d99d27" stroke-width="2"/><circle cx="20" cy="20" r="8" fill="#f7d77e"/><g fill="#a8741f"><circle cx="20" cy="16.5" r="1"/><circle cx="23" cy="21" r="1"/><circle cx="17" cy="21" r="1"/></g>`,
    avellana: `<path d="M20 9c8 0 13 6 13 13.5S27 35 20 35 7 30 7 22.5 12 9 20 9Z" fill="#a4643a"/><path d="M8 18c2-6 7-9 12-9s10 3 12 9c-4-2-8-3-12-3s-8 1-12 3Z" fill="#d2a074"/><path d="M20 9V4.5" stroke="#7a4524" stroke-width="2" stroke-linecap="round"/><ellipse cx="14" cy="25" rx="2.5" ry="4" fill="#fff" opacity=".18"/>`,
    pistacho: `<path d="M20 5c7 0 12 6.5 12 15.5S27 35 20 35 8 29.5 8 20.5 13 5 20 5Z" fill="#d8c4a0"/><path d="M20 5c7 0 12 6.5 12 15.5S27 35 20 35c3-4 4.5-9.5 4.5-15S23 9 20 5Z" fill="#c2a97e"/><path d="M14.5 14c2-4 4-6 5.5-6.5 1.5.5 3.5 2.5 5.5 6.5-1.5 3-3.5 4.5-5.5 4.5s-4-1.5-5.5-4.5Z" fill="#8fae4a"/><path d="M16.5 13.5c1.2-2.3 2.4-3.5 3.5-4 1.1.5 2.3 1.7 3.5 4" stroke="#6d8f2f" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M20 19v15" stroke="#a88c5e" stroke-width="1" opacity=".6"/>`,
  };
  const nutSVG = k => `<svg viewBox="0 0 40 40" aria-hidden="true">${NUTS[k] || NUTS.almendra}</svg>`;

  /* ---------- Paquete doypack (kraft con la etiqueta de la marca) ---------- */
  let gid = 0;
  function pouchSVG(p, peso = (p.presentaciones[0] || {}).peso || '') {
    const i = ++gid;
    const label = p.corto || p.nombre.replace(/^Mix\s+/i, '');
    const sub = p.categoria === 'suelto' ? 'FRUTOS SECOS' : 'MIX DE FRUTOS SECOS';
    const fs = label.length > 12 ? 9.5 : 12;
    const pillW = Math.min(100, label.length * fs * 0.62 + 22);
    return `<svg class="pouch" viewBox="0 0 200 262" role="img" aria-label="${esc(p.nombre)}">
      <defs>
        <linearGradient id="k${i}" x1="0" x2="1"><stop offset="0" stop-color="#c79e69"/><stop offset=".35" stop-color="#ddc093"/><stop offset=".7" stop-color="#d2b07e"/><stop offset="1" stop-color="#b98d58"/></linearGradient>
        <linearGradient id="s${i}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <pattern id="r${i}" width="4" height="20" patternUnits="userSpaceOnUse"><rect width="2" height="20" fill="#000" opacity=".08"/></pattern>
      </defs>
      <path d="M28 14h144l5 214c.3 14-6 22-20 22H43c-14 0-20.3-8-20-22Z" fill="url(#k${i})"/>
      <path d="M28 14h144l.4 18H27.6Z" fill="url(#r${i})"/>
      <path d="M27.8 33h144.4" stroke="#000" stroke-opacity=".12"/>
      <path d="M26.6 44h146.8" stroke="#000" stroke-opacity=".1" stroke-dasharray="2 2"/>
      <circle cx="36" cy="22" r="3" fill="#000" opacity=".12"/>
      <path d="M24 232c30 10 122 10 152 0" stroke="#000" stroke-opacity=".12" stroke-width="2" fill="none"/>
      <rect x="44" y="20" width="22" height="230" fill="url(#s${i})" opacity=".8"/>
      <g transform="translate(46 66)">
        <rect width="108" height="148" rx="12" fill="#054523"/>
        <rect width="108" height="148" rx="12" fill="none" stroke="#fff" stroke-opacity=".08"/>
        <image href="img/logo.svg" x="29" y="14" width="50" height="47"/>
        <rect x="${54 - pillW / 2}" y="76" width="${pillW}" height="20" rx="10" fill="${p.color}"/>
        <text x="54" y="${86 + fs * 0.36}" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="600" font-size="${fs}" fill="#fff">${esc(label)}</text>
        <text x="54" y="112" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="300" font-size="6.4" fill="#fff" fill-opacity=".75" letter-spacing=".8">${sub}</text>
        <text x="54" y="132" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="600" font-size="11" fill="#54BB70">${esc(peso)}</text>
      </g>
      <path d="M28 14h144l5 214c.3 14-6 22-20 22H43c-14 0-20.3-8-20-22Z" fill="none" stroke="#000" stroke-opacity=".1"/>
    </svg>`;
  }

  /* Foto si hay; si no, el dibujo del paquete */
  const thumbHTML = (p, peso) => p.foto
    ? `<div class="pouch pouch--photo"><img src="${esc(p.foto)}" alt="${esc(p.nombre)}" loading="lazy"></div>`
    : pouchSVG(p, peso);

  function mediaHTML(p, peso) {
    if (p.foto) return `<img class="photo" src="${esc(p.foto)}" alt="${esc(p.nombre)}" loading="lazy">`;
    const kinds = [...new Set(p.ingredientes.map(x => x[1]))];
    const spots = [[9, 14, -20], [79, 10, 25], [12, 70, 15], [80, 66, -30], [44, 82, 40], [20, 42, 60]];
    const nuts = spots.slice(0, Math.max(4, kinds.length)).map((s, n) =>
      `<span style="left:${s[0]}%;top:${s[1]}%;rotate:${s[2]}deg">${nutSVG(kinds[n % kinds.length])}</span>`).join('');
    return `<div class="card__nuts">${nuts}</div>${pouchSVG(p, peso)}`;
  }

  /* ---------- Render de productos ---------- */
  const sel = {}; // id -> {size, qty}

  const consultar = p => !p.presentaciones.some(v => v.precio > 0);
  const waConsulta = p => `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(`¡Hola Feel Foods! Quiero consultar el precio de: ${p.nombre}`)}`;

  function buyHTML(p) {
    if (consultar(p)) return `<div class="card__buy">
          <div class="consult"><span>Precio</span><b>Consultar</b></div>
          <a class="btn btn--wa consult__btn" href="${waConsulta(p)}" target="_blank" rel="noopener"><span class="ico ico--wa"></span> Consultar por WhatsApp</a>
        </div>`;
    return `<div class="card__buy">
          <div class="sizes" role="radiogroup" aria-label="Tamaño" style="--n:${p.presentaciones.length}">
            ${p.presentaciones.map((v, n) => `<button type="button" class="size${n === 0 ? ' is-on' : ''}" role="radio" aria-checked="${n === 0}" data-size="${n}"><b>${esc(v.peso)}</b><span>${money(v.precio)}</span></button>`).join('')}
          </div>
          <div class="buyrow">
            <div class="stepper"><button type="button" data-step="-1" aria-label="Menos">−</button><output>1</output><button type="button" data-step="1" aria-label="Más">+</button></div>
            <button type="button" class="btn btn--dark add">Agregar · <span class="add__price">${money(p.presentaciones[0].precio)}</span></button>
          </div>
        </div>`;
  }

  function cardHTML(p) {
    const s = sel[p.id] = { size: 0, qty: 1 };
    const chips = p.categoria === 'suelto'
      ? (p.etiquetas || []).map(t => `<li class="ings__tag">${esc(t)}</li>`).join('')
      : p.ingredientes.map(([n, k]) => `<li>${nutSVG(k)}${esc(n)}</li>`).join('');
    return `<article class="card reveal" data-id="${p.id}" data-cat="${p.categoria || 'mix'}" data-mani="${p.conMani ? 'con' : 'sin'}" style="--c:${p.color}">
      ${p.destacado ? `<span class="card__badge">${esc(p.destacado)}</span>` : ''}
      <div class="card__media">${mediaHTML(p, (p.presentaciones[s.size] || {}).peso)}</div>
      <div class="card__body">
        <h3 class="card__title"><span class="card__dot"></span>${esc(p.nombre)}</h3>
        <p class="card__desc">${esc(p.bajada || '')}</p>
        ${chips ? `<ul class="ings" aria-label="${p.categoria === 'suelto' ? 'Características' : 'Ingredientes'}">${chips}</ul>` : ''}
        ${buyHTML(p)}
      </div>
    </article>`;
  }

  $('#gridMix').innerHTML = PRODUCTS.filter(p => p.categoria !== 'suelto').map(cardHTML).join('');
  $('#gridSuelto').innerHTML = PRODUCTS.filter(p => p.categoria === 'suelto').map(cardHTML).join('');

  function refreshCard(card) {
    const p = byId(card.dataset.id), s = sel[p.id];
    $$('.size', card).forEach((b, n) => { b.classList.toggle('is-on', n === s.size); b.setAttribute('aria-checked', n === s.size); });
    $('output', card).textContent = s.qty;
    $('.add__price', card).textContent = money(p.presentaciones[s.size].precio * s.qty);
    const pw = $('.pouch text:last-of-type', card);
    if (pw) pw.textContent = p.presentaciones[s.size].peso;
  }

  $('#productos').addEventListener('click', e => {
    const card = e.target.closest('.card'); if (!card) return;
    const p = byId(card.dataset.id), s = sel[p.id];
    const size = e.target.closest('.size');
    const step = e.target.closest('[data-step]');
    const add = e.target.closest('.add');
    if (size) { s.size = +size.dataset.size; refreshCard(card); }
    else if (step) { s.qty = Math.min(99, Math.max(1, s.qty + +step.dataset.step)); refreshCard(card); }
    else if (add) {
      addToCart(p.id, p.presentaciones[s.size].peso, s.qty);
      add.classList.add('is-done');
      const old = add.innerHTML; add.innerHTML = '✓ Agregado';
      setTimeout(() => { add.classList.remove('is-done'); add.innerHTML = old; s.qty = 1; refreshCard(card); }, 1300);
    }
  });

  /* Filtros */
  $$('.chip').forEach(ch => ch.addEventListener('click', () => {
    $$('.chip').forEach(c => c.classList.toggle('is-on', c === ch));
    const f = ch.dataset.filter;
    $$('.card').forEach(c => c.classList.toggle('is-hidden',
      f === 'sin' ? c.dataset.mani !== 'sin' : f !== 'todos' && c.dataset.cat !== f));
    $$('.group').forEach(g => { g.hidden = !$('.card:not(.is-hidden)', g); });
  }));

  /* ---------- Hero ---------- */
  const heroPicks = ['deporte', 'premium', 'europeo'].map(byId).filter(Boolean);
  $('#heroArt').innerHTML = heroPicks.map(p => thumbHTML(p, '500 g')).join('');
  const scatter = [
    ['almendra', 6, 18, 46, 0, -20], ['nuez', 44, 84, 58, 1.5, 10], ['caju', 92, 10, 50, 3, 30],
    ['avellana', 86, 80, 40, 2, 0], ['pasa', 52, 12, 30, 4, 20], ['mani', 2, 78, 44, 1, 50], ['banana', 66, 90, 36, 2.5, 0], ['pistacho', 30, 6, 34, 3.5, -15],
  ];
  $('#heroScatter').innerHTML = scatter.map(([k, x, y, s, d, r]) =>
    `<span style="left:${x}%;top:${y}%;--s:${s}px;--d:-${d}s;--r:${r}deg">${nutSVG(k)}</span>`).join('');

  /* Íconos decorativos */
  $$('[data-nut]').forEach(el => { el.innerHTML = nutSVG(el.dataset.nut); });

  /* ---------- Carrito ---------- */
  let cart = store.get(CART_KEY, []).filter(l => byId(l.id) && byId(l.id).presentaciones.some(v => v.peso === l.peso));
  const priceOf = l => byId(l.id).presentaciones.find(v => v.peso === l.peso).precio;
  const total = () => cart.reduce((t, l) => t + priceOf(l) * l.qty, 0);
  const count = () => cart.reduce((t, l) => t + l.qty, 0);
  const MIN = +CFG.pedidoMinimo || 0;
  const missing = () => Math.max(0, MIN - total());

  function addToCart(id, peso, qty) {
    const l = cart.find(x => x.id === id && x.peso === peso);
    if (l) l.qty = Math.min(99, l.qty + qty); else cart.push({ id, peso, qty });
    saveCart();
    const btn = $('#cartOpen'); btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
    toast(`${byId(id).nombre} · ${peso} agregado`, 'Ver carrito', openCart);
  }
  function saveCart() { store.set(CART_KEY, cart); renderCart(); }

  function renderCart() {
    $('#cartCount').textContent = count();
    const empty = cart.length === 0;
    $('#cartEmpty').hidden = !empty;
    $('#checkout').hidden = empty;
    $('#drawerFoot').hidden = empty;
    $('#cartLines').innerHTML = cart.map((l, n) => {
      const p = byId(l.id);
      return `<li class="line" style="--c:${p.color}" data-n="${n}">
        <div class="line__thumb">${thumbHTML(p, l.peso)}</div>
        <div>
          <div class="line__name">${esc(p.nombre)}</div>
          <div class="line__meta">${esc(l.peso)} · ${money(priceOf(l))} c/u</div>
          <div class="line__ctrl">
            <div class="stepper"><button type="button" data-q="-1" aria-label="Menos">−</button><output>${l.qty}</output><button type="button" data-q="1" aria-label="Más">+</button></div>
            <button type="button" class="line__rm">Quitar</button>
          </div>
        </div>
        <div class="line__price">${money(priceOf(l) * l.qty)}</div>
      </li>`;
    }).join('');
    $('#cartTotal').textContent = money(total());
    const falta = missing();
    $('#minBox').hidden = !MIN;
    $('#minBox').classList.toggle('is-ok', falta === 0);
    $('#minFill').style.width = (MIN ? Math.min(100, total() / MIN * 100) : 100) + '%';
    $('#minTxt').innerHTML = falta
      ? `Te faltan <b>${money(falta)}</b> para el pedido mínimo de ${money(MIN)}.`
      : `✓ Llegaste al pedido mínimo. ${esc(CFG.envio || '')}`;
    $('#sendWa').disabled = falta > 0;
    const mbar = $('#mbar');
    $('#mbarCount').textContent = count();
    $('#mbarTotal').textContent = money(total());
    document.body.classList.toggle('has-cart', !empty);
    if (!empty) { mbar.hidden = false; requestAnimationFrame(() => mbar.classList.add('is-on')); }
    else mbar.classList.remove('is-on');
  }

  $('#cartLines').addEventListener('click', e => {
    const li = e.target.closest('.line'); if (!li) return;
    const l = cart[+li.dataset.n];
    const q = e.target.closest('[data-q]');
    if (q) { l.qty += +q.dataset.q; if (l.qty < 1) cart.splice(+li.dataset.n, 1); saveCart(); }
    else if (e.target.closest('.line__rm')) { cart.splice(+li.dataset.n, 1); saveCart(); }
  });

  /* Drawer */
  const drawer = $('#drawer'), scrim = $('#scrim');
  let lastFocus = null;
  function openCart() {
    lastFocus = document.activeElement;
    scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('is-on'));
    drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; document.body.classList.add('drawer-open');
    setTimeout(() => $('#cartClose').focus(), 50);
  }
  function closeCart() {
    scrim.classList.remove('is-on'); setTimeout(() => { scrim.hidden = true; }, 350);
    drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; document.body.classList.remove('drawer-open');
    if (lastFocus) lastFocus.focus();
  }
  $('#cartOpen').addEventListener('click', openCart);
  $('#mbar').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  scrim.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeCart(); });
  $('#emptyGo').addEventListener('click', () => { closeCart(); location.hash = 'productos'; });

  /* Datos del cliente */
  const cust = store.get(CUST_KEY, {});
  const form = $('#checkout');
  if (cust.nombre) $('#cName').value = cust.nombre;
  if (cust.direccion) $('#cAddr').value = cust.direccion;
  $('#shipNote').textContent = [(CFG.envio || 'Envío a domicilio') + '. No tenemos retiro en local.', CFG.envioOtras ? CFG.envioOtras + '.' : ''].join(' ').trim();
  const PAGOS = CFG.pagos || [];
  $('#paySeg').innerHTML = PAGOS.map((t, n) =>
    `<label><input type="radio" name="pago" value="${esc(t)}"${(cust.pago ? cust.pago === t : n === 0) ? ' checked' : ''}><span>${esc(t)}</span></label>`).join('');
  $('#paySeg').closest('.field').hidden = !PAGOS.length;
  if (CFG.pagoNota) $('#paySeg').insertAdjacentHTML('afterend', `<small class="pay-note">${esc(CFG.pagoNota)}.</small>`);
  if (PAGOS.length && !form.querySelector('input[name="pago"]:checked')) form.querySelector('input[name="pago"]').checked = true;
  const pago = () => (form.querySelector('input[name="pago"]:checked') || {}).value || '';
  const saveCust = () => store.set(CUST_KEY, { nombre: $('#cName').value, direccion: $('#cAddr').value, pago: pago() });
  form.addEventListener('change', saveCust);
  form.addEventListener('input', e => {
    e.target.closest('.field')?.classList.remove('is-bad');
    saveCust();
  });
  form.addEventListener('submit', e => e.preventDefault());

  /* Enviar por WhatsApp */
  $('#sendWa').addEventListener('click', () => {
    const nombre = $('#cName').value.trim();
    const dir = $('#cAddr').value.trim();
    const notas = $('#cNotes').value.trim();
    if (missing() > 0) { toast(`Te faltan ${money(missing())} para el pedido mínimo`); return; }
    let bad = null;
    if (!nombre) bad = $('#cName');
    else if (!dir) bad = $('#cAddr');
    if (bad) {
      bad.closest('.field').classList.add('is-bad');
      bad.scrollIntoView({ behavior: 'smooth', block: 'center' });
      bad.focus({ preventScroll: true });
      toast(bad.id === 'cName' ? 'Completá tu nombre para enviar el pedido' : 'Completá la dirección de envío');
      return;
    }
    saveCust();

    const lines = cart.map(l => `• ${l.qty} × ${byId(l.id).nombre} (${l.peso}) — ${money(priceOf(l) * l.qty)}`);
    const msg = [
      '¡Hola Feel Foods! Quiero hacer este pedido:',
      '',
      ...lines,
      '',
      `*Total estimado: ${money(total())}*`,
      '',
      `Nombre: ${nombre}`,
      `Dirección de entrega: ${dir}`,
      CFG.envio ? `Envío: ${CFG.envio.replace(/^Envío\s+/i, '')}` : null,
      pago() ? `Pago: ${pago()}` : null,
      notas ? `Comentarios: ${notas}` : null,
    ].filter(x => x !== null).join('\n');

    const url = `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg)}`;
    const w = window.open(url, '_blank');
    if (w) w.opener = null;
    if (!w) location.href = url;
    toast('¡Listo! Terminá de enviar el mensaje en WhatsApp', 'Vaciar carrito', () => { cart = []; saveCart(); closeCart(); });
  });

  /* ---------- Toast ---------- */
  let tt;
  function toast(text, action, fn) {
    const t = $('#toast');
    t.innerHTML = `<span>${esc(text)}</span>` + (action ? `<button type="button">${esc(action)}</button>` : '');
    if (action) $('button', t).onclick = () => { t.classList.remove('is-on'); fn(); };
    t.classList.add('is-on');
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove('is-on'), action ? 4200 : 2600);
  }

  /* ---------- Varios ---------- */
  if (CFG.aviso) { const tb = $('#topbar'); tb.textContent = CFG.aviso; tb.hidden = false; }
  $('#footWa').href = `https://wa.me/${CFG.whatsapp}`;
  $('#footWaTxt').textContent = CFG.whatsappVisible;
  $('#footIg').href = `https://instagram.com/${CFG.instagram}`;
  $('#footIgTxt').textContent = '@' + CFG.instagram;
  $('#year').textContent = new Date().getFullYear();

  $('#terms').innerHTML = [
    CFG.envio,
    MIN ? `Pedido mínimo ${money(MIN)}` : null,
    (CFG.pagos || []).length ? 'Pago: ' + CFG.pagos.join(' o ').toLowerCase() : null,
    'Solo envíos a domicilio, sin retiro',
    CFG.envioOtras,
    CFG.pagoNota,
    'Días y horarios de entrega: los coordinamos por WhatsApp',
  ].filter(Boolean).map(t => `<li>${esc(t)}</li>`).join('');

  const about = (CFG.nosotros || []).filter(t => t && t.trim());
  if (about.length) {
    $('#aboutText').innerHTML = about.map(t => `<p>${esc(t)}</p>`).join('');
    $('#nosotros').hidden = false;
  }

  const zonas = CFG.comercios || [];
  if (zonas.length) {
    const lista = zonas.length > 1 ? zonas.slice(0, -1).join(', ') + ' y ' + zonas[zonas.length - 1] : zonas[0];
    $('#bizWhere').textContent = `Ya estamos en comercios de ${lista}.`;
  }
  $('#bizWa').href = `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent('¡Hola Feel Foods! Tengo un comercio y quiero recibir la lista de precios mayorista.')}`;

  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-solid', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { threshold: .12 });
    $$('.reveal').forEach((el, n) => { el.style.transitionDelay = (n % 3) * 80 + 'ms'; io.observe(el); });
  } else $$('.reveal').forEach(el => el.classList.add('is-in'));

  renderCart();
})();
