const carriers = {
  e: {
    symbol: 'e⁻', name: 'Elektron', color: '#573287',
    model: { way: 'wire', start: 'zinc', end: 'copper' },
    why: 'Zinkatome geben Elektronen an die Zinkelektrode ab. Über den äußeren Leiter gelangen die Elektronen zur Kupferelektrode. Dort nehmen Cu²⁺-Ionen sie auf.',
  },
  k: {
    symbol: 'K⁺', name: 'Kalium-Ion', color: '#11675d',
    model: { way: 'bridge', start: 'middle', end: 'copper' },
    why: 'In der Kupferlösung werden Cu²⁺-Ionen zu Kupfer reduziert. Positive Kalium-Ionen aus der Salzbrücke wandern in diese Lösung und gleichen den Verlust positiver Ladung aus.',
  },
  n: {
    symbol: 'NO₃⁻', name: 'Nitrat-Ion', color: '#94401c',
    model: { way: 'bridge', start: 'middle', end: 'zinc' },
    why: 'Zinkatome gehen als Zn²⁺ in die Zinklösung über. Negative Nitrat-Ionen aus der Salzbrücke wandern in diese Lösung und gleichen die zusätzliche positive Ladung aus.',
  },
};

const tracks = {
  wire: {
    label: 'Äußerer Leiter', nodes: { zinc: 'Zinkelektrode', copper: 'Kupferelektrode' },
    indices: { zinc: 0, copper: 3 }, line: [[66, 86], [66, 40], [354, 40], [354, 86]],
  },
  bridge: {
    label: 'Salzbrücke', nodes: { zinc: 'Zinklösung', middle: 'Brückenmitte', copper: 'Kupferlösung' },
    indices: { zinc: 0, middle: 3, copper: 6 }, line: [[134, 133], [134, 91], [145, 80], [210, 80], [275, 80], [286, 91], [286, 133]],
  },
};

function blankRoute(way = '') {
  return { way, start: '', end: '' };
}

export function createPathDraft() {
  return { selected: 'e', routes: { e: blankRoute(), k: blankRoute(), n: blankRoute() }, checked: false, showModel: false };
}

function complete(route) {
  return Boolean(route.way && route.start && route.end);
}

function completedCount(draft) {
  return Object.values(draft.routes).filter(complete).length;
}

function matches(route, model) {
  return route.way === model.way && route.start === model.start && route.end === model.end;
}

export function editPathDraft(draft, action) {
  if (action === 'path-reset') {
    Object.assign(draft, createPathDraft());
    return;
  }
  if (action === 'path-check') {
    draft.checked = completedCount(draft) === 3;
    draft.showModel = draft.checked;
    return;
  }
  if (action === 'path-model' || action === 'path-own') {
    draft.showModel = draft.checked && action === 'path-model';
    return;
  }
  const [prefix, change, value] = action.split('-');
  if (prefix !== 'path') return;
  if (change === 'carrier' && Object.hasOwn(carriers, value)) {
    draft.selected = value;
    return;
  }
  const route = draft.routes[draft.selected];
  if (change === 'way' && Object.hasOwn(tracks, value)) {
    if (route.way === value) return;
    draft.routes[draft.selected] = blankRoute(value);
  } else if (change === 'node' && route.way && Object.hasOwn(tracks[route.way].nodes, value)) {
    if (!route.start || route.end) {
      route.start = value;
      route.end = '';
    } else if (value !== route.start) {
      route.end = value;
    } else return;
  } else if (change === 'again') {
    draft.routes[draft.selected] = blankRoute(route.way);
  } else return;
  draft.checked = false;
  draft.showModel = false;
}

function describe(route) {
  if (!route.way) return 'Weg noch offen';
  const track = tracks[route.way];
  if (!route.start) return track.label + ' · Start noch offen';
  if (!route.end) return track.label + ' · ab ' + track.nodes[route.start];
  return track.label + ' · ' + track.nodes[route.start] + ' → ' + track.nodes[route.end];
}

function directionMark(route, color) {
  if (!route.start) return '';
  const track = tracks[route.way];
  const start = track.indices[route.start];
  const [startX, startY] = track.line[start];
  const dot = `<circle cx="${startX}" cy="${startY}" r="4.3" fill="${color}" stroke="white" stroke-width="1.4"/>`;
  if (!route.end) return dot;
  const end = track.indices[route.end];
  const points = track.line.slice(Math.min(start, end), Math.max(start, end) + 1);
  if (start > end) points.reverse();
  const [x, y] = points.at(-1);
  const [previousX, previousY] = points.at(-2);
  const angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;
  return `<polyline points="${points.map(point => point.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="3.7" stroke-linejoin="round"/>
    <path d="M0 0 -12 -6 -10 0 -12 6Z" fill="${color}" transform="translate(${x} ${y}) rotate(${angle})"/>${dot}`;
}

function drawing(draft) {
  const carrier = carriers[draft.selected];
  const route = draft.showModel ? carrier.model : draft.routes[draft.selected];
  const title = (draft.showModel ? 'Modell' : 'Deine Skizze') + ' · ' + carrier.name;
  const summary = title + '. Zink links, Kupfer rechts. ' + describe(route) + '.';
  return `<figure style="margin:8px 0 13px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 178" role="img" aria-label="${summary}" style="display:block;width:100%;max-width:540px;height:auto;background:#faf9fc;border-radius:8px" font-family="Roboto,Arial,sans-serif">
    <title>${summary}</title>
    <g fill="none" stroke-width="2" stroke="#778393" stroke-linecap="round">
      <path d="M18 94v52q0 8 8 8h132q8 0 8-8V94M254 94v52q0 8 8 8h132q8 0 8-8V94"/>
      <path d="M21 112H163v34q0 5-5 5H26q-5 0-5-5z" fill="#e8eff4" stroke="none"/>
      <path d="M257 112H399v34q0 5-5 5H262q-5 0-5-5z" fill="#c9e5f0" stroke="none"/>
      <path d="M66 90V40H354V90" stroke="#747783" stroke-width="3"/>
      <rect x="187" y="33" width="46" height="14" rx="2" fill="#fff5d8" stroke="#8c7b58"/>
      <rect x="60" y="82" width="12" height="51" rx="2" fill="#8093a0" stroke="#526576"/>
      <rect x="348" y="82" width="12" height="51" rx="2" fill="#c08966" stroke="#865b46"/>
      <path d="M134 133V91l11-11h130l11 11v42" stroke="#a6aab2" stroke-width="12" stroke-linejoin="round"/>
      <path d="M134 133V91l11-11h130l11 11v42" stroke="#eceaf1" stroke-width="8" stroke-linejoin="round"/>
    </g>
    ${directionMark(route, carrier.color)}
    <g text-anchor="middle" fill="#41394b" font-size="13.5" font-weight="550">
      <text x="210" y="20">Äußerer Leiter mit Verbraucher</text>
      <text x="210" y="66">KNO₃-Salzbrücke</text>
      <text x="89" y="172">Zink · Zn²⁺-Lösung</text>
      <text x="334" y="172">Kupfer · Cu²⁺-Lösung</text>
    </g>
    </svg><figcaption style="font-size:.9rem;margin-top:4px"><strong>${title}</strong> · ${describe(route)}</figcaption></figure>`;
}

function button(action, text, selected, disabled = false) {
  const pressed = selected === undefined ? '' : ` aria-pressed="${selected}"`;
  return `<button type="button" data-redox-action="path-${action}"${pressed}${disabled ? ' disabled' : ''}${selected === true ? ' class="rx-play"' : ''}>${text}</button>`;
}

function controls(name, buttons) {
  return `<div class="rx-controls" role="group" aria-label="${name}" style="margin-block:5px 9px">${buttons}</div>`;
}

export function pathSketch(draft) {
  const route = draft.routes[draft.selected];
  const count = completedCount(draft);
  const carrier = carriers[draft.selected];
  const tabs = Object.entries(carriers).map(([key, item]) => button('carrier-' + key,
    item.symbol + ' ' + item.name + (complete(draft.routes[key]) ? ' ✓' : ''), key === draft.selected)).join('');
  const header = '<h3>Welche Wege nehmen die Teilchen?</h3><p>Wähle ein Teilchen, seinen Weg und dann zwei Punkte für deinen Pfeil. Für die Brückenionen betrachtest du jeweils ein Ion aus der Mitte der Salzbrücke.</p>';
  let body;
  if (draft.checked) {
    const correct = Object.entries(carriers).filter(([key, item]) => matches(draft.routes[key], item.model)).length;
    const mark = matches(route, carrier.model) ? 'Dein Pfeil stimmt mit dem Modell überein.' : 'Vergleiche den Weg und die Pfeilrichtung.';
    body = `<p role="status"><strong>${correct} von 3 Wegen stimmen.</strong> ${mark}</p>
      ${controls('Skizzen vergleichen', button('own', 'Mein Pfeil', !draft.showModel) + button('model', 'Modellpfeil', draft.showModel))}
      ${drawing(draft)}<p><strong>${carrier.name}</strong> · ${carrier.why}</p>
      ${controls('Vorhersage überarbeiten', button('again', 'Diesen Pfeil ändern') + button('reset', 'Alle Pfeile leeren'))}`;
  } else {
    const ways = Object.entries(tracks).map(([key, track]) => button('way-' + key, track.label, key === route.way)).join('');
    const endpoints = route.way ? Object.entries(tracks[route.way].nodes).map(([key, name]) =>
      button('node-' + key, name, key === route.start || key === route.end, Boolean(route.start && !route.end && key === route.start))).join('') : '';
    const instruction = !route.way ? 'Wo bewegt sich das Teilchen?' : !route.start ? 'Wo startet dein Pfeil?' : !route.end ? 'Wo endet dein Pfeil?' : 'Pfeil gesetzt. Wähle ein weiteres Teilchen oder setze einen neuen Startpunkt.';
    body = `${controls('Weg wählen', ways)}<p role="status" style="margin-block:8px">${instruction}</p>
      ${endpoints ? controls('Pfeilpunkte wählen', endpoints) : ''}${drawing(draft)}
      ${controls('Auswertung', button('check', '3 Pfeile vergleichen (' + count + '/3)', undefined, count < 3) + (route.start ? button('again', 'Diesen Pfeil leeren') : ''))}`;
  }
  return header + controls('Teilchen auswählen', tabs) + body;
}
