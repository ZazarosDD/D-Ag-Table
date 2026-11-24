import { elements } from './elements.js';

// Keep the range fixed across searches and family filters so colours always mean the same thing.
function measurementScale(field, title, unitLabel, light, dark, explanation) {
  const values = elements.map(element => element[field]).filter(Number.isFinite);
  return { field, title, unitLabel, light, dark, explanation, min: Math.min(...values), max: Math.max(...values), missing: elements.length - values.length };
}

export const measurements = {
  en: measurementScale('electronegativity', 'Elektronegativität', 'Pauling-Skala', [245, 239, 252], [81, 43, 135],
    'Je dunkler die Kachel, desto stärker zieht das Atom in einer Bindung Elektronen an.'),
  radius: measurementScale('covalentRadiusPm', 'Atomradius', 'Kovalenter Einfachbindungsradius', [228, 246, 241], [13, 97, 94],
    'Je dunkler die Kachel, desto größer ist der kovalente Radius. Alle Radien sind Modellwerte in Pikometern.'),
};

export const comparisonSources = [
  { label: 'University of California, Santa Barbara · Elektronegativität nach Pauling', url: 'https://seshadri-resources.materials.ucsb.edu/pauling-electronegativity-table.html' },
  { label: 'Pyykkö und Atsumi · Kovalente Einfachbindungsradien aller 118 Elemente (2009)', url: 'https://doi.org/10.1002/chem.200800987' },
  { label: 'Chemistry LibreTexts · Tabelle der kovalenten Radien, Spalte „Single Bonds [2]“', url: 'https://chem.libretexts.org/Ancillary_Materials/Reference/Reference_Tables/Atomic_and_Molecular_Properties/A3%3A_Covalent_Radii' },
];

const paulingFormat = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function formatMeasurement(value, mode) {
  if (value == null) return '—';
  return mode === 'radius' ? `${value} pm` : paulingFormat.format(value);
}

export function measurementLabel(element, mode) {
  const value = element[measurements[mode].field];
  return formatMeasurement(value, mode);
}

function relativeLuminance(rgb) {
  const linear = rgb.map(channel => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function measurementStyle(element, mode) {
  const scale = measurements[mode];
  if (!scale) return '';
  const value = element[scale.field];
  if (value == null) {
    return '--fill:repeating-linear-gradient(135deg,#f3f2f5 0 5px,#e9e7ee 5px 6px);--tone:#585160;--edge:#d5d1dc;';
  }
  const fraction = (value - scale.min) / (scale.max - scale.min);
  const rgb = scale.light.map((channel, index) => Math.round(channel + fraction * (scale.dark[index] - channel)));
  const background = `rgb(${rgb.join(',')})`;
  const foreground = relativeLuminance(rgb) > 0.179 ? '#09050e' : '#fff';
  return `--fill:${background};--tone:${foreground};--edge:color-mix(in srgb,${background},#211b30 16%);`;
}

export function scaleLegend(mode) {
  const scale = measurements[mode];
  if (!scale) return '';
  const colours = `linear-gradient(90deg,rgb(${scale.light.join(',')}),rgb(${scale.dark.join(',')}))`;
  return `<span class="scale-name">${mode === 'en' ? 'Pauling-Skala' : 'Kovalenter Radius'}</span>
    <span class="scale-range"><span>${formatMeasurement(scale.min, mode)}</span><i class="scale-ramp" style="background:${colours}" aria-hidden="true"></i><span>${formatMeasurement(scale.max, mode)}</span></span>
    ${scale.missing ? '<span class="scale-missing"><i aria-hidden="true"></i>— kein Tabellenwert</span>' : '<span class="scale-model">Modellwerte</span>'}`;
}
