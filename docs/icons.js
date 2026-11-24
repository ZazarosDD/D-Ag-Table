// Small, consistent line icons for controls and field labels.
const drawings = {
  battery: '<rect x="2.5" y="6" width="17" height="12" rx="2"/><path d="M21.5 10v4M6 12h3m3.5 0h4m-2-2v4"/>',
  shield: '<path d="M12 3 4.5 6v5c0 4.5 3.1 7.6 7.5 10 4.4-2.4 7.5-5.5 7.5-10V6L12 3Z"/><path d="M12 8v4.8m0 3v.2"/>',
  radius: '<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><path d="m12 12 6-6"/>',
  atom: '<ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(-38 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(38 12 12)"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  table: '<rect x="3" y="3.5" width="4.5" height="4.5" rx=".7"/><rect x="16.5" y="3.5" width="4.5" height="4.5" rx=".7"/><rect x="3" y="10" width="4.5" height="4.5" rx=".7"/><rect x="9.75" y="10" width="4.5" height="4.5" rx=".7"/><rect x="16.5" y="10" width="4.5" height="4.5" rx=".7"/><path d="M3.5 18h17M3.5 21h17"/>',
  molecule: '<path d="m6.2 15.5 4.5-8.1m2.5.1 4.7 7.8M8.1 17.6l7.9-.2"/><circle cx="5.6" cy="18.1" r="3"/><circle cx="12" cy="5.1" r="3.3"/><circle cx="19" cy="17.3" r="2.9"/>',
  book: '<path d="M12 6.4C9.7 4.3 6.4 3.8 2.8 4.7v14.1c3.7-.9 6.9-.5 9.2 1.6 2.5-2.1 5.5-2.5 9.2-1.6V4.7c-3.7-.9-6.8-.4-9.2 1.7Zm0 0v14"/>',
  'book-open': '<path d="M4.5 4.5h12.8a1.5 1.5 0 0 1 1.5 1.5v14.3H6.5a2.1 2.1 0 0 1-2-2.2V5.5Zm0 13.9c0-1.3.9-2.2 2.2-2.2h12.1M8 8.2h7M8 11.3h5"/>',
  grid: '<rect x="3.7" y="3.7" width="6.6" height="6.6" rx="1.3"/><rect x="13.7" y="3.7" width="6.6" height="6.6" rx="1.3"/><rect x="3.7" y="13.7" width="6.6" height="6.6" rx="1.3"/><rect x="13.7" y="13.7" width="6.6" height="6.6" rx="1.3"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r=".9"/><circle cx="4.5" cy="12" r=".9"/><circle cx="4.5" cy="18" r=".9"/>',
  columns: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16m6-16v16"/>',
  rows: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9.3h18M3 14.7h18"/>',
  search: '<circle cx="10.3" cy="10.3" r="6.7"/><path d="m15.5 15.6 4.9 4.8"/>',
  sliders: '<path d="M4 7h6m4 0h6M4 17h10m4 0h2"/><circle cx="12" cy="7" r="2"/><circle cx="16" cy="17" r="2"/>',
  'chevron-down': '<path d="m6.5 9 5.5 5.5L17.5 9"/>',
  gem: '<path d="m3 9 4-5h10l4 5-9 11L3 9Zm0 0h18M7 4l5 16 5-16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  focus: '<path d="M4 8V5a1 1 0 0 1 1-1h3m8 0h3a1 1 0 0 1 1 1v3m0 8v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3"/>',
  file: '<path d="M7 3h7.5L19 7.5V21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm7 0v5h5M8.5 12h7M8.5 15.5h5"/>',
  pan: '<path d="M3 7h18M3 7l3-3m-3 3 3 3m15-3-3-3m3 3-3 3M6.5 15l2 2.4v-5.7a1.3 1.3 0 0 1 2.6 0v3.2l1-.7c.6-.3 1.3-.2 1.8.3l.4.4.5-.2c.8-.2 1.6.1 2.1.7l.7 1-.7 4.5h-6.4l-4.1-4.4a1 1 0 0 1 .1-1.5Z"/>',
  link: '<path d="m10 14 4-4m-6 2-2.1 2.1a3.5 3.5 0 1 0 5 5L13 17m-2-10 2.1-2.1a3.5 3.5 0 1 1 5 5L16 12"/>',
  cup: '<path d="M4 8h12v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm12 1h2.5a2.7 2.7 0 1 1 0 5H16M7 3.5v1m4-1v1M3 21h15"/>',
  gear: '<path d="m10 3-.7 2.5-2 .9L5 5.8 3 9l1.8 1.8v2.5L3 15l2 3.2 2.3-.5 2 .9.7 2.4h4l.7-2.4 2-.9 2.3.5 2-3.2-1.8-1.7v-2.5L21 9l-2-3.2-2.3.6-2-.9L14 3h-4Z"/><circle cx="12" cy="12" r="3.1"/>',
  leaf: '<path d="M20.5 3.5C13 5 5 4 4 12c-.7 5 3.7 8.5 8.5 6.5 5.4-2.2 6.8-8.8 8-15ZM3 21c2.6-4.6 6.4-8.6 12-12"/>',
  flask: '<path d="M9 3h6m-5 0v6L4 18.5A1.7 1.7 0 0 0 5.5 21h13a1.7 1.7 0 0 0 1.5-2.5L14 9V3M7.7 14h8.6"/>',
  pin: '<path d="M19 9.5C19 15 12 21 12 21S5 15 5 9.5a7 7 0 1 1 14 0Z"/><circle cx="12" cy="9.5" r="2.3"/>',
  bulb: '<path d="M9 17c0-2.8-3.5-3.9-3.5-8a6.5 6.5 0 0 1 13 0c0 4.1-3.5 5.2-3.5 8H9Zm.6 3h4.8M11 22h2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5"/>',
};

export function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${drawings[name] ?? ''}</svg>`;
}

export function fillIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(slot => {
    slot.innerHTML = icon(slot.dataset.icon);
  });
}
