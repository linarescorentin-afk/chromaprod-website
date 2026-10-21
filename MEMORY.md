# MÉMOIRE PARTAGÉE — Site CLVM

> Fichier commun à **Claude Code** et **Gemini (Antigravity)**.
> Chaque agent le **lit au début** de chaque session et le **met à jour à la fin** de chaque travail.
> Règles d'écriture : voir `AGENTS.md`.

_Dernière mise à jour : 2026-10-21 — par Gemini_

---

## 1. Le projet

- Site vitrine de **Corentin Linares** — vidéaste / photographe / télépilote drone.
- Repris du site **Chroma Production** (Montréal) pour redevenir **CL Visual Maker (CLVM)** — www.clvm.productions.
- Positionnement : **artiste vidéaste & photographe**, haut de gamme, **international (« around the world »)**. Ne PAS cibler Bordeaux dans le SEO/les accroches (adresse légale Gradignan seulement dans le JSON-LD).
- Repo GitHub : `linarescorentin-afk/chromaprod-website` (branche `main`, travail par PR).
- Déploiement : Vercel (Analytics + Speed Insights branchés).

## 2. Stack technique

- **Next.js 15** (App Router, `src/app`) · **React 19** · **TypeScript** · `yarn` (yarn.lock)
- **Tailwind CSS 4** + styled-components
- **Three.js / React Three Fiber / drei** pour les scènes 3D photo & vidéo (`src/components/photo`, `src/components/video`)
- **Framer Motion**, **Lenis** (smooth scroll), **Zustand** (`src/store`)
- **Sanity v4** comme CMS, Studio monté sur `/studio` (`sanity.config.ts`, schémas dans `src/sanity/schemaTypes`)
- SEO : `src/app/seo/site.ts` (infos business, mots-clés), `JsonLd.tsx`, `sitemap.ts`, `robots.ts`
- Bilingue **FR / EN** via store Zustand `useSelectedLanguage` + champs Sanity `localeString` / `localeText`

## 3. Commandes

- `yarn dev` → serveur local (turbopack) sur http://localhost:3000
- `yarn build` · `yarn lint`
- Variables d'env requises (`.env*`, non commitées) : `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SITE_URL`

## 4. Décisions & conventions

<!-- Une ligne par décision : date — décision — pourquoi -->
- 2026-10-21 — Mémoire partagée Claude/Gemini dans `MEMORY.md` — continuité entre les deux agents.
- 2026-10-21 — Aucun push / merge / PR sans demande explicite de Corentin, jamais sur `main` ; travail sur branche + vérif en local (`yarn dev`) puis lien d'aperçu Vercel — `main` déclenche la mise en ligne.
- 2026-10-21 — Positionnement ajusté à « Artiste vidéaste & photographe » (au lieu de filmmaker) — demande de Corentin.
- 2026-10-21 — SEO orienté international « artiste vidéaste & photographe », pas de ciblage Bordeaux — demande de Corentin.
- 2026-10-21 — Mots-clés SEO centralisés dans `src/app/seo/site.ts` (layout les réutilise) ; image OG = `public/og-clvm.png`, logo JSON-LD = `public/logo-clvm.png` ; locale `fr_FR`.

## 5. Points d'attention / à faire

<!-- Ce qui reste ouvert. Retirer la ligne quand c'est réglé. -->
- PR #20 (`rebrand/clvm-bordeaux`) : poussée sur GitHub, aperçu Vercel en cours de génération pour validation par Corentin.
- Vidéo d'intro `public/nuitMontreal.mov` (nuit à Montréal) à remplacer par un plan plus international / haut de gamme.
- Sanity : vider le champ téléphone « second numéro » (ancien n° Canada) sinon il s'affiche sur /contact ; vérifier les textes Sanity (à propos, contact) qui peuvent encore citer Montréal.
- Image fallback `public/mtlcontact.webp` (section contact de /about) probablement montréalaise.
- Compte TikTok CLVM à ajouter dans `sameAs` s'il existe (l'ancien @chromaprodmtl a été retiré).
- Anciens assets Chroma dans `public/` (chromalogo*, coverChromProd, arrowChr…) à supprimer une fois vérifiés inutilisés.
- PR #17 (brouillon Vercel CVE) probablement obsolète depuis la #18 → à fermer. ~17 branches distantes fusionnées à nettoyer.
- `yarn` absent du PATH du terminal Claude : lint/build lancés via `npx --no-install next …`.
- README = template Next.js par défaut.

## 6. Journal des sessions

<!-- Le plus récent EN HAUT. Format : ### AAAA-MM-JJ — Agent — titre court, puis 2 à 5 puces (fait / fichiers / reste à faire). -->

### 2026-10-21 — Gemini — Push de la branche rebrand/clvm-bordeaux (PR #20)
- Ajout et commit des fichiers de règles et mémoire partagée (`MEMORY.md`, `AGENTS.md`, etc.).
- Push de `rebrand/clvm-bordeaux` sur GitHub suite à la demande explicite de Corentin.
- Déclenchement du build de prévisualisation Vercel sur la PR #20.

### 2026-10-21 — Gemini — Ajustement positionnement : Artiste vidéaste & photographe
- Mise à jour de `src/app/seo/site.ts` : `name`, `tagline` et `description` passent à « Artiste vidéaste & photographe », mots-clés enrichis en photographie haut de gamme.
- Compilation `yarn build` validée sans erreur.

### 2026-10-21 — Claude — Repositionnement international (artiste vidéaste & filmmaker)
- `src/app/seo/site.ts` : nom « CL Visual Maker — Artiste vidéaste & filmmaker », tagline, description et mots-clés internationaux (plus de Bordeaux), areaServed Worldwide/Europe/France.
- `IntroWebsite.tsx` : texte commenté « AROUND THE WORLD ».
- Commit local sur `rebrand/clvm-bordeaux`, non poussé (nouvelle règle AGENTS.md : push uniquement sur demande).

### 2026-10-21 — Claude — Rebrand Chroma/Montréal → CLVM/Bordeaux luxe (PR #20)
- Branche `rebrand/clvm-bordeaux`, PR #20 : `seo/site.ts` (nom, description luxe, mots-clés, legalName, tél +33, TikTok retiré, $$$), `layout.tsx` (mots-clés via site.ts, OG, fr_FR, lang fr).
- Nouveaux `public/og-clvm.png` et `public/logo-clvm.png` ; logo CLVM dans `MobileHeader.tsx` ; « Chroma » retiré des schémas Sanity ; champ tél Canada → second numéro optionnel ; `package.json` → `clvm-website`.
- Lint + build OK. Reste : vidéo d'intro Montréal, contenu Sanity, vieux assets (voir section 5).

### 2026-10-21 — Claude — Règle Git : pas de push sans accord
- Ajout de la section « Git & mise en ligne » dans `AGENTS.md` + rappel dans `.agent/rules/memoire-partagee.md`.
- `.claude/settings.json` : confirmation obligatoire avant `git push`, `git merge`, `gh pr create/merge`.
- Précision : le dossier local a été cloné par Gemini depuis GitHub (origin = repo d'origine, pas un fork).

### 2026-10-21 — Gemini — Initialisation du repo local & configuration Sanity
- Clonage du repo GitHub dans l'espace de travail local (`Site CLVM`).
- Configuration de `.env.local` avec les identifiants Sanity du projet (`zpajpvv0` / `production`).
- Installation complète des dépendances `yarn` et test de compilation `yarn build` réussi avec succès.
- Projet prêt pour les modifications.

### 2026-10-21 — Claude — Mise en place de la mémoire partagée
- Création de `MEMORY.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.agent/rules/memoire-partagee.md`.
- Hook Claude Code (`.claude/settings.json` + `.claude/hooks/check-memory.sh`) : bloque la fin d'une session si des fichiers ont changé sans mise à jour de `MEMORY.md`.
- Inventaire initial du projet (sections 1 à 5).
