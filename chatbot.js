/* Abdullah AI chatbot. Frontend only. Talks to an n8n Chat Trigger webhook. */
(() => {
// ====== EDIT HERE: the only place the webhook URL lives ======
const CONFIG = {
  webhookUrl: 'https://rdcg.app.n8n.cloud/webhook/3bc6e398-65d9-4a42-9185-fb5d612024cc/chat',
  title: 'Abdullah AI',
  subtitle: 'Your Intelligent Portfolio Assistant',
  welcome: "Hi! Welcome to my portfolio. I'm Abdullah AI. How can I help you today?",
  timeoutMs: 60000,
  quick: [
    ['Explore My Services', 'What services do you offer?'],
    ['Web Development', 'Tell me about your web development services.'],
    ['AI Automation', 'Tell me about your AI automation services.'],
    ['Meta Ads Services', 'Tell me about your Meta Ads services.'],
    ['View My Projects', 'Show me your projects.'],
    ['Contact Me', 'How can I contact you?']
  ]
};
// =============================================================
const icon = '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="7" width="16" height="12" rx="4"/><path d="M12 7V4M9.5 12.5h.01M14.5 12.5h.01M9.5 16c1.5 1 3.5 1 5 0"/></svg>';
let sid; try { sid = sessionStorage.getItem('ab-sid'); if (!sid) { sid = crypto.randomUUID(); sessionStorage.setItem('ab-sid', sid); } } catch { sid = 'ab-' + Math.random().toString(36).slice(2) + Date.now(); }

const root = document.createElement('div');
root.className = 'ab';
root.innerHTML = `
<section class="ab-panel" id="ab-panel" role="dialog" aria-label="${CONFIG.title} chat" aria-hidden="true">
  <header class="ab-head">
    <span class="ab-av">${icon}</span>
    <div class="ab-ttl"><b>${CONFIG.title}</b><small>${CONFIG.subtitle}</small><em><i></i>Online</em></div>
    <button class="ab-ib" data-act="min" aria-label="Minimize chat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg></button>
    <button class="ab-ib" data-act="close" aria-label="Close chat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  </header>
  <div class="ab-body">
    <div class="ab-log" role="log" aria-live="polite"></div>
    <div class="ab-quick" aria-label="Suggested questions"></div>
    <form class="ab-form" autocomplete="off">
      <input type="text" aria-label="Type your message" placeholder="Type your message..." maxlength="1000">
      <button type="submit" aria-label="Send message"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg></button>
    </form>
  </div>
</section>
<button class="ab-fab" aria-label="Open Abdullah AI chat" aria-expanded="false" aria-controls="ab-panel">${icon}<span class="ab-on"></span></button>`;
document.body.appendChild(root);

const $ = s => root.querySelector(s);
const panel = $('.ab-panel'), fab = $('.ab-fab'), log = $('.ab-log'), form = $('.ab-form'), input = form.querySelector('input'), quick = $('.ab-quick');
let busy = false;

const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>').replace(/\n/g, '<br>');
function add(who, text, err) {
  const m = document.createElement('div');
  m.className = 'ab-m ' + who + (err ? ' err' : '');
  m.innerHTML = fmt(text);
  log.appendChild(m); log.scrollTop = log.scrollHeight; return m;
}
function typing() {
  const m = document.createElement('div');
  m.className = 'ab-m bot ab-typing'; m.setAttribute('aria-label', 'Abdullah AI is typing');
  m.innerHTML = '<i></i><i></i><i></i>'; log.appendChild(m); log.scrollTop = log.scrollHeight; return m;
}
// n8n Chat Trigger: POST {action:'sendMessage', sessionId, chatInput}; reply JSON {output}.
// Also tolerates other common text fields and streamed newline-delimited JSON.
const pick = j => Array.isArray(j) ? pick(j[0] || {}) : (j && (j.output ?? j.text ?? j.message ?? j.response)) || '';
function parse(raw) {
  try { return String(pick(JSON.parse(raw))); } catch { }
  let out = '';
  for (const l of raw.split('\n')) { if (!l.trim()) continue; try { const j = JSON.parse(l); if (j.type === 'item' && typeof j.content === 'string') out += j.content; else if (!j.type) out += pick(j); } catch { } }
  return out || raw.trim();
}
async function send(text) {
  text = text.trim(); if (!text || busy) return;
  busy = true; form.classList.add('busy'); quick.hidden = true;
  add('user', text); const t = typing();
  const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), CONFIG.timeoutMs);
  try {
    const r = await fetch(CONFIG.webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'sendMessage', sessionId: sid, chatInput: text }), signal: ctl.signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const reply = parse(await r.text());
    t.remove();
    if (!reply) throw new Error('empty');
    add('bot', reply);
  } catch (e) {
    t.remove(); console.warn('Abdullah AI:', e);
    add('bot', "Sorry, I couldn't reach the assistant right now. Please try again in a moment, or contact Abdullah directly on WhatsApp (03390145069) or at rana5729585@gmail.com.", true);
  } finally { clearTimeout(to); busy = false; form.classList.remove('busy'); input.focus(); }
}
CONFIG.quick.forEach(([label, msg]) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.onclick = () => send(msg); quick.appendChild(b); });
form.addEventListener('submit', e => { e.preventDefault(); const v = input.value; input.value = ''; send(v); });

function setOpen(o) {
  panel.classList.toggle('open', o); panel.setAttribute('aria-hidden', !o); fab.setAttribute('aria-expanded', o); root.classList.toggle('is-open', o);
  if (o) { panel.classList.remove('min'); setTimeout(() => input.focus(), 250); } else fab.focus();
}
fab.onclick = () => setOpen(!panel.classList.contains('open'));
panel.addEventListener('click', e => { const a = e.target.closest('[data-act]'); if (!a) return; a.dataset.act === 'close' ? setOpen(false) : panel.classList.toggle('min'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && panel.classList.contains('open')) setOpen(false); });
add('bot', CONFIG.welcome);
})();
