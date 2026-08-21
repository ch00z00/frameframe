#!/bin/bash
# PreToolUse hook for the Artifact tool.
# Publish source files must live under docs/artifacts/ so every published
# artifact's source is part of this repo's git-tracked history (see CLAUDE.md).
# This blocks any publish targeting a file outside that directory, rather than
# silently relocating it, since redirecting the tool's input mid-call is unreliable.
set -euo pipefail

input=$(cat)
action=$(echo "$input" | jq -r '.tool_input.action // "publish"')
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

DOCS_DIR="/Users/Yusuke1/choozoo/frameframe/docs/artifacts"

# Only publish actions with a file_path are checked; other actions (list, comments,
# reply, resolve, list_assets, read_asset, delete_asset) pass through untouched.
if [ "$action" != "publish" ] || [ -z "$file_path" ]; then
  exit 0
fi

case "$file_path" in
  "$DOCS_DIR"/*)
    exit 0
    ;;
esac

jq -n --arg path "$file_path" --arg docs "$DOCS_DIR" '{
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "deny",
    permissionDecisionReason: ("Artifact source must live under \($docs)/. Write the file there (not scratchpad) and republish with that path. Got: \($path)")
  }
}'
