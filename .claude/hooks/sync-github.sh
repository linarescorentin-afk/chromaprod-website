#!/bin/bash
# Hook de synchronisation Mac ↔ PC (GitHub) au début de chaque demande :
# - Claude Code : événement "UserPromptSubmit"
# - Gemini (Antigravity) : événement "PreInvocation" (uniquement à invocationNum = 1)
# Vérifie si GitHub a avancé depuis l'autre machine :
# - Si le dossier local est propre et en retard → git pull --ff-only automatique + alerte l'IA de relire la mémoire.
# - Si le dossier local a des modifs locales ET que GitHub a avancé → ne touche à rien et alerte l'IA.
input=$(cat)

is_agy=false
if echo "$input" | grep -q '"invocationNum"'; then
  is_agy=true
  # Sur Antigravity : ne s'exécuter qu'au tout premier appel du tour (quand Corentin envoie son message)
  if ! echo "$input" | grep -q '"invocationNum"[[:space:]]*:[[:space:]]*1[,}]'; then
    echo "{}"
    exit 0
  fi
fi

emit_msg() {
  local msg="$1"
  if [ "$is_agy" = true ]; then
    printf '{"injectSteps":[{"ephemeralMessage":"%s"}]}\n' "$msg"
  else
    printf '%s\n' "$msg"
  fi
}

repo_root=$(git rev-parse --show-toplevel 2>/dev/null)
cd "${CLAUDE_PROJECT_DIR:-${repo_root:-.}}" || { [ "$is_agy" = true ] && echo "{}"; exit 0; }
[ -d .git ] || { [ "$is_agy" = true ] && echo "{}"; exit 0; }

# Cache de 15 secondes pour éviter un double appel rapproché
now=$(date +%s 2>/dev/null || echo 0)
stamp_file=".git/last_github_sync_ts"
if [ -f "$stamp_file" ]; then
  last=$(cat "$stamp_file" 2>/dev/null || echo 0)
  if [ $((now - last)) -lt 15 ]; then
    [ "$is_agy" = true ] && echo "{}"
    exit 0
  fi
fi
echo "$now" > "$stamp_file" 2>/dev/null

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
if [ -z "$branch" ] || [ "$branch" = "HEAD" ]; then
  [ "$is_agy" = true ] && echo "{}"
  exit 0
fi

# Fetch rapide sans jamais bloquer si hors-ligne
GIT_TERMINAL_PROMPT=0 GIT_HTTP_LOW_SPEED_LIMIT=1000 GIT_HTTP_LOW_SPEED_TIME=5 git fetch origin --quiet 2>/dev/null || {
  [ "$is_agy" = true ] && echo "{}"
  exit 0
}

upstream="origin/$branch"
if ! git rev-parse --verify "$upstream" >/dev/null 2>&1; then
  [ "$is_agy" = true ] && echo "{}"
  exit 0
fi

behind=$(git rev-list --count "HEAD..$upstream" 2>/dev/null || echo 0)
ahead=$(git rev-list --count "$upstream..HEAD" 2>/dev/null || echo 0)
dirty=$(git status --porcelain -uno 2>/dev/null)

if [ "$behind" -gt 0 ]; then
  if [ "$ahead" -eq 0 ] && [ -z "$dirty" ]; then
    if git pull --ff-only origin "$branch" --quiet 2>/dev/null; then
      [ -f AGENTS.md ] && touch AGENTS.md
      [ -f android/ANDROID.md ] && touch android/ANDROID.md
      [ -f MEMORY.md ] && touch MEMORY.md
      emit_msg "🔄 SYNCHRO MAC/PC AUTOMATIQUE : $behind nouveau(x) commit(s) récupéré(s) depuis GitHub ($upstream). Ton contexte de conversation est peut-être obsolète : relis OBLIGATOIREMENT la mémoire partagée (AGENTS.md / android/ANDROID.md / MEMORY.md) avant de répondre ou de modifier un fichier."
      exit 0
    fi
  fi
  emit_msg "⚠️ ALERTE SYNCHRO MAC/PC : GitHub ($upstream) a $behind commit(s) d'avance (faits sur l'autre machine), mais ce dossier local contient aussi des modifications locales non poussées. N'écrase rien : préviens Corentin et synchronise proprement avec $upstream avant de modifier le projet, puis relis la mémoire partagée."
  exit 0
fi

[ "$is_agy" = true ] && echo "{}"
exit 0
