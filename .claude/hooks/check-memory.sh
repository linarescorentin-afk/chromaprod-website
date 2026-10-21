#!/bin/bash
# Hook "Stop" partagé entre Claude Code et Gemini (Antigravity) :
# Avant de rendre la main, vérifie que MEMORY.md a été mis à jour
# si des fichiers du projet ont été modifiés depuis.
input=$(cat)

is_agy=false
if echo "$input" | grep -q '"terminationReason"'; then
  is_agy=true
  if ! echo "$input" | grep -q '"terminationReason"[[:space:]]*:[[:space:]]*"NO_TOOL_CALL"'; then
    echo "{}"
    exit 0
  fi
  if ! echo "$input" | grep -q '"executionNum"[[:space:]]*:[[:space:]]*1[,}]'; then
    echo "{}"
    exit 0
  fi
else
  # Évite la boucle : si Claude a déjà été relancé par ce hook, on laisse passer.
  if echo "$input" | grep -q '"stop_hook_active"[[:space:]]*:[[:space:]]*true'; then
    exit 0
  fi
fi

repo_root=$(git rev-parse --show-toplevel 2>/dev/null)
cd "${CLAUDE_PROJECT_DIR:-${repo_root:-.}}" || exit 0
if [ ! -f MEMORY.md ]; then
  [ "$is_agy" = true ] && echo "{}"
  exit 0
fi

agent_name="Claude"
[ "$is_agy" = true ] && agent_name="Gemini"

changed=$(find . -type f -newer MEMORY.md \
  -not -path './.git/*' -not -path './node_modules/*' -not -path './.next/*' \
  -not -path './.vercel/*' -not -path './.claude/*' -not -path './.agent/*' \
  -not -name 'MEMORY.md' -not -name '.DS_Store' -not -name '*.tsbuildinfo' \
  -not -name 'next-env.d.ts' 2>/dev/null | head -10 | tr '\n' ' ')

if [ -n "$changed" ]; then
  reason="Des fichiers ont été modifiés depuis la dernière mise à jour de MEMORY.md ($changed). Avant de terminer, mets à jour MEMORY.md selon AGENTS.md : entrée en haut du Journal des sessions signée $agent_name, décisions, points ouverts, date de mise à jour."
  if [ "$is_agy" = true ]; then
    printf '{"decision":"continue","reason":"%s"}\n' "$reason"
  else
    printf '{"decision":"block","reason":"%s"}\n' "$reason"
  fi
  exit 0
fi

[ "$is_agy" = true ] && echo "{}"
exit 0
