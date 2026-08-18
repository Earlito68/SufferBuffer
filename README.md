SufferBuffer© — what it is, in short

Personal pacing dashboard for a 1000km ultra-distance bike race (BRM 1000 "Déesse", Lugano→Cassis, ~75h ACP time limit). Built to answer one question at a glance, at every one of 9 checkpoints: am I still on schedule, and am I still within the hard cutoff?

Enter your actual arrival time once at any checkpoint → it projects your current pace deviation forward across all remaining checkpoints, showing delta-vs-plan and delta-vs-cutoff for each. Elevation profile with live progress fill, three collapsible sleep-stop checklists (with a live decision helper for a flexible-duration stop — recommends short vs. long nap based on current buffer), buffer status bars, one-tap "now" timestamp entry, text export to clipboard, hard reset.

Technical side, for the coder-brain:

Single self-contained HTML file. Vanilla JS, no framework, no build step, no bundler.
Zero external dependencies — even dropped Google Fonts in favor of pure system fonts (-apple-system, ui-monospace), since it has to run with zero network access for 3 days through the Alps.
localStorage for state, wrapped defensively in try/catch — degrades to in-memory-only rather than crashing if storage is unavailable.
All schedule data is precomputed from a real pacing spreadsheet (Excel) and a 127-point elevation trace, baked in as static JS arrays.
Fun iOS rabbit hole: iOS 18.5 blocks opening local HTML files directly in Safari from the Files app now (security tightening), so the practical delivery path ended up being either a Shortcuts "Show Web View" action or a dedicated local-file-viewer app — not Safari at all.
Built and regression-tested iteratively via headless Chromium (Playwright) before every handoff — dozens of revisions, each one screenshotted and functionally tested, not just eyeballed.
