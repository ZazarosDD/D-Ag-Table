const topics = ['Alle Themen','Energie','Umwelt','Medizin','Materialien','Katalyse','Grundlagenforschung'];
let request;
let activeTopic = topics[0];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const formatDate = date => new Date(date + 'T12:00:00Z').toLocaleDateString('de-DE',{day:'2-digit',month:'long',year:'numeric',timeZone:'UTC'});
function readNews() {
  if (!request) request = fetch(new URL('./research-news.json',import.meta.url),{cache:'no-cache'})
    .then(r => { if (!r.ok) throw Error('news unavailable'); return r.json(); })
    .then(data => { if (!Array.isArray(data.items)) throw Error('invalid news'); return data; })
    .catch(error => { request = null; throw error; });
  return request;
}
function safeItems(data) {
  return data.items.filter(x => typeof x.title === 'string' && typeof x.source === 'string' && /^https:\/\/doi\.org\/10\./i.test(x.url || '') && /^\d{4}-\d{2}-\d{2}$/.test(x.date || ''));
}
function card(item) {
  return '<article class="research-card"><div class="research-meta"><span>'+esc(item.source)+'</span><time datetime="'+esc(item.date)+'">'+esc(formatDate(item.date))+'</time></div><h3><a href="'+esc(item.url)+'" target="_blank" rel="noopener noreferrer">'+esc(item.title)+'</a></h3><div class="research-tags">'+(item.topics || []).map(t=>'<span>'+esc(t)+'</span>').join('')+'</div><a class="research-original" href="'+esc(item.url)+'" target="_blank" rel="noopener noreferrer">Zur Originalpublikation ↗</a></article>';
}
export async function showResearch(root) {
  if (!root) return;
  root.innerHTML = '<div class="research-intro"><h2>Neues aus der chemischen Forschung</h2><p>Aktuelle Fachpublikationen aus internationalen Chemiezeitschriften. Originaltitel meist auf Englisch; die Themenzuordnung erfolgt automatisch anhand der Titel. Die Meldungen ersetzen keine fachliche Bewertung der Studien.</p><p class="research-status" role="status">Forschungsmeldungen werden geladen …</p><div class="research-filters" role="group" aria-label="Forschungsthema wählen"></div></div><div class="research-list"></div><p class="research-note">Datenquelle: <a href="https://www.crossref.org/" target="_blank" rel="noopener noreferrer">Crossref</a>. Verlinkt werden Originalpublikationen, die teilweise kostenpflichtig sein können. <a href="https://idw-online.de/de/" target="_blank" rel="noopener noreferrer">Deutschsprachige Wissenschaftsnachrichten beim idw ↗</a></p>';
  const status = root.querySelector('.research-status');
  const filters = root.querySelector('.research-filters');
  const list = root.querySelector('.research-list');
  try {
    const data = await readNews();
    if (!status.isConnected) return;
    const items = safeItems(data);
    status.textContent = data.updated ? 'Stand: '+formatDate(data.updated.slice(0,10))+' · '+data.sources_ok+' von '+data.sources_total+' Zeitschriften abgerufen' : 'Die erste automatische Aktualisierung steht noch aus.';
    function render() {
      filters.innerHTML = topics.map(t=>'<button type="button" aria-pressed="'+String(t===activeTopic)+'">'+esc(t)+'</button>').join('');
      const selected = items.filter(i=>activeTopic===topics[0] || (i.topics || []).includes(activeTopic));
      list.innerHTML = selected.length ? selected.slice(0,60).map(card).join('') : '<p class="research-note">Derzeit keine Meldungen in dieser Auswahl.</p>';
    }
    filters.addEventListener('click', e=>{const b=e.target.closest('button');if(b && topics.includes(b.textContent)){activeTopic=b.textContent;render();[...filters.querySelectorAll('button')].find(x=>x.textContent===activeTopic)?.focus();}});
    render();
  } catch {
    if(status.isConnected) status.textContent='Forschungsmeldungen sind derzeit nicht verfügbar. Bitte später erneut aufrufen.';
  }
}
export async function showElementResearch(root, symbol) {
  if (!root) return;
  try {
    const data = await readNews();
    if (!root.isConnected) return;
    const matches = safeItems(data).filter(x=>Array.isArray(x.elements)&&x.elements.includes(symbol)).slice(0,5);
    if (!matches.length) return;
    root.innerHTML = '<h3>Aktuelle Forschung</h3><p class="research-note">Automatische Zuordnung anhand des Publikationstitels.</p><div class="research-list research-compact">'+matches.map(card).join('')+'</div>';
    root.hidden = false;
  } catch { /* The element profile remains fully usable. */ }
}
