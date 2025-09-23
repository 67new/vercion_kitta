# versioncontrol

[![Deploy](https://github.com/RattyC/versioncontrol/actions/workflows/deploy.yml/badge.svg)](https://github.com/RattyC/versioncontrol/actions/workflows/deploy.yml)

Deploy (Quasar SPA) with GitHub Actions
- Workflow: `.github/workflows/deploy.yml`
- Triggers: push to `main` or manual run (workflow_dispatch)
- Build path: `VersionControl1/`
- Output: `VersionControl1/dist/spa`

Setup steps
- Enable GitHub Pages on the target repo `somnuk2/VersionControl1` (branch `gh-pages`, root).
- External URL: https://somnuk2.github.io/VersionControl1/#/

Local commands (inside `VersionControl1`)
- `npm ci`
- `npx quasar build`

Local preview
- `cd VersionControl1 && npm ci && npx quasar dev`

Public path
- `VersionControl1/quasar.config.js` reads `process.env.PUBLIC_PATH` with fallback `/VersionControl1/`.
- CI builds with `PUBLIC_PATH=/VersionControl1/` for the external Pages.

Deploying (external repository)
- The workflow deploys to `somnuk2/VersionControl1` using `peaceiris/actions-gh-pages`.
- Add a repository secret in this repo named `GH_PAT` with a Personal Access Token that has `repo` scope and write access to `somnuk2/VersionControl1`.
