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
- 2026-10-21 — Catégories du menu récupérées dynamiquement depuis Sanity (`src/sanity/lib/getCategories.ts`) avec support FR/EN (`titleFr`) et ordre (`orderPlace`) + filtrage insensible à la casse — pour afficher « Resort » et toute future catégorie automatiquement.

- 2026-10-21 — Requêtes Sanity (`src/sanity/lib/get*.ts`) passées en Server Actions (`"use server"`) — évite les blocages CORS Sanity sur mobile/IP locale et domaines d'aperçu.
- 2026-10-21 — Seul numéro de téléphone actif conservé : `+1 438 439 1921` (cliquable `tel:` sur `/contact` et dans `src/app/seo/site.ts`), email business aligné sur `contact@clvm.productions`.
- 2026-10-21 — Optimisation automatique des miniatures vidéo à la récupération Sanity (`getVideo.ts` via `urlForTex(..., { w: 1200, q: 75 })`) et désactivation du `<Canvas>` 3D WebGL sur mobile (`windowWidth < 1024`) pour éviter la surchauffe batterie/GPU.

## 5. Points d'attention / à faire

<!-- Ce qui reste ouvert. Retirer la ligne quand c'est réglé. -->
- PR #20 (`rebrand/clvm-bordeaux`) : rebrand CLVM + catégories dynamiques (`Resort`) + correctifs mobile + les 13 optimisations de l'audit appliquées en local (en attente de vérification par Corentin avant push).
- Compte TikTok CLVM à ajouter dans `sameAs` s'il existe (l'ancien @chromaprodmtl a été retiré).
- PR #17 (brouillon Vercel CVE) probablement obsolète depuis la #18 → à fermer. ~17 branches distantes fusionnées à nettoyer.
- `yarn` absent du PATH du terminal Claude : lint/build lancés via `npx --no-install next …`.
- README = template Next.js par défaut.

## 6. Journal des sessions

<!-- Le plus récent EN HAUT. Format : ### AAAA-MM-JJ — Agent — titre court, puis 2 à 5 puces (fait / fichiers / reste à faire). -->

### 2026-10-21 — Gemini — Synchronisation automatique Mac ↔ PC (GitHub) & hooks Gemini/Claude
- Ajout de `.gitattributes` (`eol=lf`) pour éviter les conflits de fins de ligne entre macOS et Windows (PC).
- Création de `.claude/hooks/sync-github.sh` branché sur `UserPromptSubmit` (`.claude/settings.json`) et `PreInvocation` (`.agent/hooks.json`) : vérifie `origin` à chaque nouvelle demande, fait un `git pull --ff-only` si le dossier local est propre et en retard, et force l'agent à relire `MEMORY.md`.
- Extension de `.claude/hooks/check-memory.sh` et `.agent/hooks.json` pour que le blocage `Stop` s'applique aussi à Gemini (Antigravity).

### 2026-10-21 — Gemini — Application des 13 améliorations & optimisations de l'audit global
- **Contenu & Services (1.1, 1.2, 3.3)** : Correction dans `getAboutSettings.ts` de l'inversion des textes entre `ÉVÉNEMENTIEL` et `RÉSEAUX SOCIAUX` + ajout automatique du bloc service `RESORT` (FR/EN) illustré par la photo classée `Resort` dans Sanity. Sur `/contact` (`ContactPage.tsx`, `getContactSettings.ts`, `seo/site.ts`), affichage uniquement du numéro `+1 438 439 1921` en lien `tel:` cliquable, correction de `"9 allée des salamandres"` et des textes/fautes dans `Section5.tsx`.
- **Performances & Médias (2.1, 2.2, 2.3, 2.4)** : Compression de `public/nuitMontreal.mov` (78 Mo) en `public/nuitMontreal.mp4` (**5,8 Mo**, H.264 `+faststart`) dans `IntroWebsite.tsx`. Compression WebP/AVIF automatique à la volée des miniatures vidéo dans `getVideo.ts` (`urlForTex(..., { w: 1200, q: 75 })`). Désactivation du montage du `<Canvas>` WebGL 3D sur mobile (`windowWidth < 1024`) dans `VideoComponent.tsx` et `PhotoComponent.tsx`. Suppression de ~165 Mo de fichiers obsolètes dans `public/`.
- **UI & Traductions FR (3.1, 3.2)** : Suppression des fonds debug `bg-red-600` (`PhotoComponent.tsx`, `Section5.tsx`). Traduction en français de tous les textes restés en anglais (`IntroWebsite.tsx`, `HomeComponent.tsx`, `ActiveVideo.tsx`, `AboutPage.tsx`, `Section5.tsx`).
- **SEO & Métadonnées (4.1, 4.2, 4.3)** : Pré-rendu serveur (SSR) + `export const metadata` sur `src/app/about/page.tsx` et `src/app/contact/page.tsx`. Génération de `public/apple-touch-icon.png` (180×180) et `public/favicon-32x32.png` (32×32). Suppression de la `SearchAction` JSON-LD cassée dans `src/app/layout.tsx` et alignement de `contact@clvm.productions` / `+1 438 439 1921` dans `src/app/seo/site.ts`.

### 2026-10-21 — Gemini — Catégories dynamiques depuis Sanity & correctif loading mobile (poussé sur PR #20)
- Création de `src/sanity/lib/getCategories.ts` et enrichissement de `src/sanity/schemaTypes/categoryType.ts` (`titleFr` et `orderPlace` optionnels, avec fallback automatique FR/EN pour les catégories existantes).
- Connexion de `NavBar.tsx`, `NavBarDesktop.tsx`, `MobileNavbar.tsx`, `MobileNavItems.tsx`, `NavItem.tsx` et `useFilterStore.ts` aux catégories Sanity + maintien de l'état actif au changement de langue FR/EN.
- Filtrage insensible à la casse (`toLowerCase()`) dans `VideoComponent.tsx` et `PhotoComponent.tsx` (corrige `"Resort"` vs `"resort"`) + correction du filtrage vidéo sur mobile et de l'overlay photo filtré.
- Correctif du blocage `LOADING...` sur mobile : passage des requêtes Sanity (`getVideo.ts`, `getPhotos.ts`, `getCategories.ts`, `getAboutSettings.ts`, `getContactSettings.ts`, `getSocialMedia.ts`) en Server Actions (`"use server"`), sécurisation `try/finally` du loader mobile et optimisation des miniatures `MobileVideoComponent.tsx` (`urlForTex`).
- Validation locale par Corentin (desktop + mobile) et push sur `rebrand/clvm-bordeaux` (PR #20).

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
