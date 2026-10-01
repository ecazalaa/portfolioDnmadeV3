import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Un projet = un dossier dans src/content/projects/, contenant :
//   - index.md   (le texte et les métadonnées)
//   - ses images, au même niveau (cover.jpg, etude-01.jpg, ...)
// Exemple : src/content/projects/berges-aveyron/index.md + cover.jpg
// C'est cette structure (dossier + index.md) que Sveltia CMS attend aussi
// (voir public/admin/config.yml) : le nom du dossier = l'identifiant du projet.
const projects = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/projects',
    // id = nom du dossier ("berges-aveyron"), pas "berges-aveyron/index"
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(), // doit correspondre à l'id d'un fichier dans src/content/categories/
      year: z.string(),
      place: z.string().optional(),
      tools: z.string().optional(),
      order: z.number().default(0), // plus petit = plus haut dans la liste
      cover: image(),
      coverAlt: z.string().default(''),
      // Images supplémentaires du bandeau principal (après `cover`). Une seule
      // image = pas de défilement. Plusieurs = carrousel.
      covers: z
        .array(
          z.object({
            src: image(),
            alt: z.string().default(''),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().default(''),
            caption: z.string().optional(),
            // largeur max sur le mur de croquis ; le format de l'image est respecté
            size: z.enum(['s', 'm', 'l']).default('m'),
          }),
        )
        .default([]),
    }),
});

// Une rubrique du portfolio = un fichier .md dans src/content/categories/
const categories = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/categories' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { projects, categories };
