#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PORT="${1:-8081}"
URL="http://localhost:${PORT}"

if [ ! -d node_modules ]; then
  echo "[Chefly] Installing dependencies..."
  npm install
fi

echo "[Chefly] Starting Expo Web at ${URL}"
echo "[Chefly] Press Ctrl+C to stop."

# Open browser if possible (best-effort)
if command -v xdg-open >/dev/null 2>&1; then
  (sleep 2 && xdg-open "$URL" >/dev/null 2>&1 || true) &
elif command -v open >/dev/null 2>&1; then
  (sleep 2 && open "$URL" >/dev/null 2>&1 || true) &
elif command -v start >/dev/null 2>&1; then
  (sleep 2 && start "$URL" >/dev/null 2>&1 || true) &
fi

CI=1 EXPO_OFFLINE=1 npm run dev -- --web --port "$PORT"
