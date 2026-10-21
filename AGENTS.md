# Règles communes aux agents (Claude Code & Gemini / Antigravity)

Deux agents IA travaillent sur ce projet, parfois à tour de rôle : **Claude Code** (terminal) et **Gemini** (Antigravity).
Leur mémoire commune est le fichier **`MEMORY.md`** à la racine. C'est la source de vérité du projet.

## Au début de chaque session / tâche
1. Lire `MEMORY.md` en entier avant de toucher au code.
2. Regarder les dernières entrées du **Journal des sessions** : l'autre agent a peut-être travaillé depuis.
3. En cas de doute entre la mémoire et le code, le **code fait foi** — corriger la mémoire.

## À la fin de CHAQUE travail effectué (obligatoire, sans attendre qu'on le demande)
Mettre à jour `MEMORY.md` avant de rendre la main :
1. Ajouter une entrée **en haut** du « Journal des sessions » :
   `### AAAA-MM-JJ — Claude|Gemini — titre court` puis 2 à 5 puces : ce qui a été fait, fichiers touchés, ce qui reste.
2. Si une décision technique / de design a été prise → une ligne dans « Décisions & conventions ».
3. Mettre à jour « Points d'attention / à faire » : ajouter ce qui reste ouvert, **supprimer** ce qui est réglé.
4. Si la stack, les commandes ou la structure ont changé → corriger les sections 2 et 3.
5. Mettre à jour la ligne `_Dernière mise à jour : … — par …_`.

## Git & mise en ligne — RÈGLE STRICTE
- **Ne jamais faire de `git push`, de merge, ni ouvrir/fusionner une PR sans que Corentin l'ait explicitement demandé** dans la conversation en cours.
- Ne jamais pousser ni fusionner sur `main` : `main` = site en ligne (déploiement Vercel automatique).
- Travailler sur une branche dédiée (`git checkout -b nom-de-la-modif`) ; les commits locaux sont autorisés.
- Pour faire vérifier un travail : proposer de lancer `yarn dev` (http://localhost:3000). Quand Corentin demande un push, pousser **la branche** (jamais `main`) pour obtenir le lien d'aperçu Vercel.
- La fusion dans `main` est faite par Corentin lui-même.

## Règles d'écriture
- Français, concis, factuel. Pas de copier-coller de code (pointer vers le fichier).
- Ne jamais effacer ce qu'a écrit l'autre agent, sauf pour corriger une info devenue fausse.
- Garder le journal lisible : au-delà d'environ 30 entrées, résumer les plus anciennes en quelques lignes dans une section « Historique condensé ».
- Jamais de secrets (clés API, tokens, mots de passe, contenu des `.env`) dans `MEMORY.md`.
- Une question simple sans modification de fichier ne nécessite pas d'entrée au journal.

## Conventions du projet
- Gestionnaire de paquets : `yarn`.
- Travail en branches + PR vers `main` (voir « Git & mise en ligne »).
- Le site est bilingue FR/EN : tout texte ajouté doit exister dans les deux langues.
