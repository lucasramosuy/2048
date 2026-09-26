(() => {
  'use strict';
  const STORE = 'lucas-2048-v1';
  const BEST = 'lucas-2048-best-v1';
  const empty = () => Array.from({length: 4}, () => [0, 0, 0, 0]);
  const valid = b => Array.isArray(b) && b.length === 4 && b.every(row => Array.isArray(row) && row.length === 4 && row.every(n => Number.isInteger(n) && n >= 0 && (n === 0 || (n & (n - 1)) === 0)));
  let board, score, won, over;
  const $ = id => document.getElementById(id);
  function addTile() {
    const free = [];
    board.forEach((row, r) => row.forEach((v, c) => { if (!v) free.push([r, c]); }));
    if (!free.length) return;
    const [r, c] = free[Math.floor(Math.random() * free.length)];
    board[r][c] = Math.random() < .9 ? 2 : 4;
  }
  function merge(line) {
    const items = line.filter(Boolean), out = []; let gain = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i] === items[i + 1]) { const n = items[i] * 2; out.push(n); gain += n; i++; }
      else out.push(items[i]);
    }
    while (out.length < 4) out.push(0);
    return {out, gain};
  }
  function canMove() {
    return board.some((row, r) => row.some((v, c) => !v || (c < 3 && v === row[c + 1]) || (r < 3 && v === board[r + 1][c])));
  }
  function save() { try { localStorage.setItem(STORE, JSON.stringify({board, score, won, over})); } catch {} }
  function best() { try { return Number(localStorage.getItem(BEST)) || 0; } catch { return 0; } }
  function render() {
    $('board').replaceChildren(...board.flatMap((row, r) => row.map((v, c) => {
      const el = document.createElement('div'); el.className = 'tile'; el.setAttribute('role', 'gridcell');
      el.setAttribute('aria-label', `Fila ${r + 1}, columna ${c + 1}: ${v || 'vacía'}`);
      if (v) { el.textContent = v; el.dataset.value = String(Math.min(v, 8192)); }
      return el;
    })));
    $('score').textContent = score;
    if (score > best()) { try { localStorage.setItem(BEST, String(score)); } catch {} }
    $('best').textContent = best();
    $('status').textContent = over ? 'Sin movimientos. ¿Otra partida?' : won ? '¡Llegaste a 2048! Podés seguir jugando.' : 'Usá las flechas o deslizá el tablero.';
  }
  function newGame() { board = empty(); score = 0; won = false; over = false; addTile(); addTile(); save(); render(); $('board').focus({preventScroll:true}); }
  function move(dir) {
    if (over || !['up','down','left','right'].includes(dir)) return;
    const next = empty(); let gain = 0;
    for (let i = 0; i < 4; i++) {
      const line = (dir === 'left' || dir === 'right') ? board[i].slice() : board.map(row => row[i]);
      if (dir === 'right' || dir === 'down') line.reverse();
      const merged = merge(line); gain += merged.gain;
      if (dir === 'right' || dir === 'down') merged.out.reverse();
      for (let j = 0; j < 4; j++) { if (dir === 'left' || dir === 'right') next[i][j] = merged.out[j]; else next[j][i] = merged.out[j]; }
    }
    if (JSON.stringify(next) === JSON.stringify(board)) return;
    board = next; score += gain;
    if (!won && board.some(row => row.some(n => n >= 2048))) won = true;
    addTile(); over = !canMove(); save(); render();
  }
  try {
    const saved = JSON.parse(localStorage.getItem(STORE));
    if (saved && valid(saved.board) && Number.isSafeInteger(saved.score) && saved.score >= 0 && typeof saved.won === 'boolean' && typeof saved.over === 'boolean') {
      ({board, score, won, over} = saved);
    }
  } catch {}
  if (!board) { board = empty(); score = 0; won = false; over = false; addTile(); addTile(); save(); }
  render();
  $('restart').addEventListener('click', newGame);
  document.querySelectorAll('[data-dir]').forEach(btn => btn.addEventListener('click', () => move(btn.dataset.dir)));
  document.addEventListener('keydown', event => {
    const keys = {ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};
    if (keys[event.key] && !event.altKey && !event.ctrlKey && !event.metaKey) { event.preventDefault(); move(keys[event.key]); }
  });
  let start;
  $('board').addEventListener('touchstart', e => { const t=e.changedTouches[0]; start=[t.clientX,t.clientY]; }, {passive:true});
  $('board').addEventListener('touchend', e => { if (!start) return; const t=e.changedTouches[0], dx=t.clientX-start[0], dy=t.clientY-start[1]; start=null; if(Math.max(Math.abs(dx),Math.abs(dy))<25) return; move(Math.abs(dx)>Math.abs(dy) ? (dx>0?'right':'left') : (dy>0?'down':'up')); }, {passive:true});
})();
