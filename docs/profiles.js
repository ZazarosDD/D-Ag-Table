import { lightProfiles } from './profile-light.js';
import { middleProfiles } from './profile-middle.js';
import { heavyProfiles } from './profile-heavy.js';
import { gallery } from './gallery.js';
import { researchGallery } from './research-gallery.js';
import { portraitGallery } from './portrait-gallery.js';
import { highlightGallery } from './highlight-gallery.js';
import { specimens } from './specimens.js';

export const profiles = { ...lightProfiles, ...middleProfiles, ...heavyProfiles };

const illustratedSpecimens = Object.fromEntries(Object.entries(specimens).map(([symbol, picture]) => [
  symbol, { ...picture, kind: 'Stoffprobe', credit: 'Digitale Illustration · D[Ag] Table' },
]));

export const elementPictures = {
  ...gallery, ...researchGallery, ...portraitGallery, ...highlightGallery, ...illustratedSpecimens,
};
