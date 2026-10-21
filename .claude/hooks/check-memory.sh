#!/bin/bash
# Hook "Stop" de Claude Code : avant de rendre la main, vérifie que MEMORY.md
# a été mis à jour si des fichiers du projet ont été modifiés depuis.
input=$(cat)

# Évite la boucle : si Claude a déjà été relancé par ce hook, on laisse passer.
if echo "$input" | grep -q '"stop_hook_active"[[:space:]]*:[[:space:]]*true'; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
[ -f MEMORY.md ] || exit 0

changed=$(find . -type f -newer MEMORY.md \
  -not -path './.git/*' -not -path './node_modules/*' -not -path './.next/*' \
  -not -path './.vercel/*' -not -path './.claude/*' \
  -not -name 'MEMORY.md' -not -name '.DS_Store' -not -name '*.tsbuildinfo' \
  -not -name 'next-env.d.ts' 2>/dev/null | head -10 | tr '\n' ' ')

if [ -n "$changed" ]; then
  cat <<JSON
{"decision":"block","reason":"Des fichiers ont été modifiés depuis la dernière mise à jour de MEMORY.md ($changed). Avant de terminer, mets à jour MEMORY.md selon AGENTS.md : entrée en haut du Journal des sessions signée Claude (et note aussi les changements faits par Gemini s'ils ne sont pas journalisés), décisions, points ouverts, date de mise à jour."}
JSON
fi
exit 0
