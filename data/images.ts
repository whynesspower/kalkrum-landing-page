export interface ScienceImage {
  src: string
  width: number
  height: number
  alt: string
  title: string
  credit: string
}

export type ScienceImageKey =
  | 'cosmicCliffs'
  | 'pillars'
  | 'deepField'
  | 'stephansQuintet'
  | 'southernRing'
  | 'hubbleDeepField'

/**
 * Public-domain NASA imagery, downloaded from the NASA Image and Video
 * Library. See public/static/science/CREDITS.md for IDs and source URLs.
 * Note: the library has no Webb versions of the Pillars of Creation or
 * Stephan's Quintet, so those two entries use Hubble images.
 */
export const SCIENCE_IMAGES: Record<ScienceImageKey, ScienceImage> = {
  cosmicCliffs: {
    src: '/static/science/webb-cosmic-cliffs.jpg',
    width: 2000,
    height: 1158,
    alt: 'The Cosmic Cliffs, the edge of the star-forming region NGC 3324 in the Carina Nebula. Rust-coloured ridges of gas and dust rise like a mountain range under a blue sky of glowing gas and thousands of stars.',
    title: 'The Cosmic Cliffs',
    credit: 'NASA, ESA, CSA, STScI',
  },
  pillars: {
    src: '/static/science/hubble-pillars-of-creation.jpg',
    width: 1600,
    height: 1499,
    alt: 'The Pillars of Creation in the Eagle Nebula, seen in near-infrared light. Dark columns of gas and dust rise through a blue haze, set against a dense field of orange and white stars.',
    title: 'Pillars of Creation',
    credit: 'NASA, ESA, and the Hubble Heritage Team (STScI/AURA)',
  },
  deepField: {
    src: '/static/science/webb-deep-field.jpg',
    width: 1960,
    height: 2000,
    alt: 'Webb’s First Deep Field, galaxy cluster SMACS 0723. Thousands of galaxies in white, orange and red, with long arcs where the cluster bends the light of more distant galaxies, and bright stars with diffraction spikes.',
    title: 'Webb’s First Deep Field',
    credit: 'NASA, ESA, CSA, STScI',
  },
  stephansQuintet: {
    src: '/static/science/hubble-stephans-quintet.jpg',
    width: 1265,
    height: 2000,
    alt: 'Part of the galaxy group Stephan’s Quintet. Interacting galaxies with glowing cores, blue tidal arms and a long curved tail of stars, against a dark field of background stars.',
    title: 'Stephan’s Quintet',
    credit: 'NASA, Jayanne English (University of Manitoba), Sally Hunsberger (Penn State), Zolt Levay (STScI), Sarah Gallagher (Penn State), and Jane Charlton',
  },
  southernRing: {
    src: '/static/science/webb-southern-ring.jpg',
    width: 990,
    height: 926,
    alt: 'The Southern Ring Nebula in near-infrared light. Shells of orange gas and dust surround a pale blue bubble with a bright star at its centre, cast off by a dying star.',
    title: 'The Southern Ring Nebula',
    credit: 'NASA, ESA, CSA, STScI',
  },
  hubbleDeepField: {
    src: '/static/science/hubble-ultra-deep-field.jpg',
    width: 1800,
    height: 1570,
    alt: 'The Hubble eXtreme Deep Field, a view of the center of the Hubble Ultra Deep Field. Thousands of galaxies of many shapes and colours scattered across black space.',
    title: 'Hubble Ultra Deep Field',
    credit: 'NASA, ESA, G. Illingworth, D. Magee, P. Oesch (UC Santa Cruz), R. Bouwens (Leiden University), and the HUDF09 Team',
  },
}

export const IMAGE_CREDIT_LINE =
  'Imagery from the James Webb and Hubble space telescopes, courtesy of NASA, ESA, CSA and STScI.'
