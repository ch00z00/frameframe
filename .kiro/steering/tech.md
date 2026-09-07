# Technology Stack

## Current State

No application code exists yet. This document records the stack decisions made for the
FrameFrame site so implementation follows them consistently; nothing below is scaffolded
in the repo yet except the dev-log tooling described at the end of this file.

## Architecture (planned)

- **Framework: Astro.** Chosen for a content-first, MDX-first site: it ships close to zero
  JS by default (matters for the SEO/performance side of the differentiation strategy), and
  Astro Content Collections give schema-validated frontmatter (`title`, `tags`, `is_premium`,
  etc.) without a database or headless CMS.
  - Rejected: Next.js — stronger fit for an app-shaped product with early auth/payments, but
    monetization is explicitly deferred (see `product.md`), so that strength isn't needed now.
    Ships more JS by default than Astro; MDX support is plugin-based rather than native.
  - If/when auth or payment (e.g. Stripe) is needed for the deferred paywall, Astro can add
    server logic via Server Islands / API routes rather than requiring a framework migration.
- **Content authoring: MDX**, one file per article, with frontmatter as the structured
  metadata layer (tags, `is_premium`, related-entity references) and the MDX body free to
  embed custom components (pull-quotes, comparison tables, image essays, timelines, etc.).
  - Rejected: plain Markdown / generic CMS templates — insufficient for the product
    requirement that each article can have a distinctive visual presentation; a standard
    template/layout system was explicitly ruled out for this reason.
  - No headless CMS (e.g. microCMS) — content stays authored and versioned in this repo.
- **Styling: plain CSS with a design-token system** (CSS custom properties), not a utility
  framework like Tailwind. Utility-class systems pull toward generic, uniform layouts, which
  conflicts with wanting each article's presentation to be able to differ. Astro components
  (`.astro` files) have built-in style scoping per component (similar to Vue SFCs), which
  covers the modularity Sass partials/mixins would otherwise be reached for.
  - Rejected: SCSS — its main advantages (variables, modularity via partials/mixins) are
    already covered: design tokens must be **runtime** CSS custom properties anyway (to
    support the light/dark theme switching already used in the dev-log Artifacts), which
    SCSS's compile-time `$variables` can't do, and Astro's component style scoping replaces
    the modularity role of Sass partials. Native CSS nesting also covers most of what SCSS
    nesting offered. Not worth the added build tooling for the remaining marginal benefit
    (mixins/loops).
- **Search and tag filtering: no backend needed.** Both are handled at the static-site layer:
  - Tag filtering: static pages generated at build time per tag (e.g. `/tags/[tag]/`) from
    Content Collections queries — also functions as an SEO entry point, consistent with the
    growth strategy in `product.md`.
  - Full-text search: a static search index generated at build time (e.g. via Pagefind),
    queried entirely client-side in the browser. No server-side search API/database.
  - Both fit inside Astro's islands model (see `structure.md`): the page is static HTML by
    default, and only a search widget opts into client-side JS hydration.
- **Hosting (product site): Vercel.** Deploys on `git push`; free tier is sufficient at this
  stage; serverless functions are available later if a deferred paywall needs
  auth/Stripe-webhook handling, without changing hosting provider.
  - This is a **separate deployment from the dev-log GitHub Pages site below** — the product
    site and the dev log will live at different URLs.

## Development Environment

Not yet established (no `package.json` in the repo). To be filled in once the Astro project
is scaffolded: Node version, package manager, and local dev commands.

## Dev Log / Artifact Tooling (implemented, distinct from the product site)

This is meta-tooling for this repository's own working process, not part of the FrameFrame
product:

- Claude Code Artifacts documenting project decisions/strategy are written directly to
  `docs/artifacts/*.html` (see `structure.md`) and published from that path.
- A `PreToolUse` hook (`.claude/hooks/artifact-to-docs.sh`, wired in `.claude/settings.json`)
  blocks any Artifact publish whose `file_path` is outside `docs/artifacts/`, with a message
  telling the caller to write there and republish. This exists because an earlier attempt to
  silently copy-and-redirect the publish call from elsewhere (e.g. the scratchpad) proved
  unreliable — the tool's input couldn't be redirected mid-call.
- GitHub Pages is configured (Settings → Pages) to serve the `/docs` folder from `main`, so
  anything in `docs/artifacts/` is live at
  `https://ch00z00.github.io/frameframe/artifacts/<filename>` shortly after a push. No build
  step — these are static HTML files.

## Repository

- Remote: `git@github.com:ch00z00/frameframe.git`, default branch `main`.
