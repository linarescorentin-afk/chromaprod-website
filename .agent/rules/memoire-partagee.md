---
trigger: always_on
---

# Mémoire partagée avec Claude Code

- Au début de chaque tâche : lis `AGENTS.md` puis `MEMORY.md` à la racine du projet.
- À la fin de chaque travail effectué (dès qu'un fichier a été créé ou modifié) : mets à jour `MEMORY.md` selon `AGENTS.md`
  — entrée en haut du « Journal des sessions » signée « Gemini », décisions prises, points ouverts, ligne « Dernière mise à jour ».
- Ne réécris pas les entrées de Claude ; corrige seulement une info devenue fausse.

# Git — règle stricte
- Ne jamais faire de `git push`, de merge ni de PR sans demande explicite de Corentin. Jamais sur `main` (= site en ligne via Vercel).
- Travailler sur une branche ; pour vérifier, proposer `yarn dev` (http://localhost:3000). Détails dans `AGENTS.md`.
