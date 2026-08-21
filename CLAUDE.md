# frameframe

## Artifacts

Published Artifact source files must live under `docs/artifacts/` in this repo,
not the scratchpad directory. Write the `.html`/`.md` file directly to
`docs/artifacts/<name>` before calling the Artifact tool, so every published
artifact's source is git-tracked from the start. A PreToolUse hook
(`.claude/hooks/artifact-to-docs.sh`) blocks any publish whose `file_path` is
outside `docs/artifacts/` as a safety net.
