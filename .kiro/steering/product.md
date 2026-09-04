# Product Overview

## What FrameFrame Is

FrameFrame is a film criticism site focused on **old/classic films**, not new releases.
Instead of competing on review speed for new titles (a crowded, freshness-driven market),
it builds evergreen critical essays that argue, from multiple angles, why a given classic
film is excellent: the film's place in its director's filmography, performance analysis,
location/setting research, and historical context. The surrounding data (director, actor,
location) exists only to support the argument of a critique article — it is not modeled as
its own destination.

## Core Features (planned)

- **Long-form critique articles** as the primary unit of content. Each article can weave in
  director filmography context, performance analysis, location research, and era/background
  research as supporting material — not as separate reference pages.
- **Cross-cutting essays**: comparative pieces spanning a director's or actor's body of work,
  or themed feature series, interlinked with single-film critiques.
- **A two-layer read**: an entry point accessible to someone who hasn't seen the film, that
  still satisfies a cinephile reader who has seen it many times, within the same article.
- **Distinctive per-article visual presentation** (see `structure.md` / `tech.md`) rather than
  a single generic template — design is part of how the criticism argues its point.

## Explicitly Out of Scope (for now)

- No standalone director/actor/location pages (e.g. `/directors/xxx`) — this was deliberately
  rejected in favor of keeping that data as in-article supporting material. Revisit only if a
  concrete need for cross-article browsing/search by entity emerges.
- No headless CMS, no database-backed content model — content is authored as MDX files (see
  `tech.md`).

## Monetization

- **Launch state: 100% free content.** No paywall, no subscription tier live at launch.
  Rationale: with zero existing audience, gating content kills the share/SEO loop the launch
  strategy depends on, and there's no trust/authority yet to justify a paid ask.
- Every article's metadata reserves an `is_premium` flag (currently always `false`) so a
  freemium split (free basic critique vs. paid cross-comparative essays / feature series) can
  be turned on later without a content/data model rewrite.
- Long-term monetization axis: ads/affiliate (streaming/Blu-ray links) on free content, plus a
  paid subscription tier for deeper cross-comparative essays, once introduced.
- **Open item**: the concrete trigger for revisiting monetization (e.g. a monthly pageview or
  follower threshold) is not yet set — to be set from real usage data once the site is live.

## Differentiation / Value Proposition

- Balances **SEO-driven discovery** (structured, evergreen articles targeting long-tail search
  demand with little competition) with **critical authority** (analytical depth and voice that
  retains readers as fans) — deliberately not leaning fully into either.
- Old/classic film criticism is a lower-competition, non-perishable content niche compared to
  new-release reviews.

## Initial Growth Strategy

- **Thread-first distribution**: publish the sharpest finding/insight from an article as a
  3–6 tweet thread on X, readable as a standalone unit, driving to the full article.
- **Flagship series for launch month**: a signature project (e.g. scoring a director's entire
  filmography by editing technique, or "where are these filming locations now") designed to
  generate discovery/surprise-driven sharing, rather than relying on the accumulation of
  one-off articles alone.
- **Participation in existing film communities** on X (quote-tweets, replies) to build presence
  alongside original posting, since this starts from zero existing audience.
- SEO from structured articles is the long-term asset that compounds alongside the shorter-term
  social distribution loop.

## Production Cadence

- **Launch**: 10+ articles minimum before going live (not a soft/thin launch), including one
  flagship piece, to seed both engagement and initial SEO footprint.
- **Ongoing**: a few articles per week after launch.
