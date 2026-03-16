# AGENTS.md

Reference for AI agents and contributors working in this repository.

## Project Overview

**my-new-tab** is a Chrome browser extension that replaces the default new tab page with a customizable React dashboard.

- Chrome Web Store: https://chrome.google.com/webstore/detail/my-new-tab/hohkgabiclgfkjkpnonoaahfkbgpfmod
- React + Redux SPA that overrides the browser new tab via Chrome extension APIs
- State is persisted to `chrome.storage.sync`

## Tech Stack

| Layer      | Library/Tool                                   |
| ---------- | ---------------------------------------------- |
| UI         | React 16, react-bootstrap                      |
| State      | Redux, redux-actions, redux-thunk, ImmutableJS |
| Templating | LiquidJS                                       |
| Build      | Vite 6                                         |
| Path alias | `@/` → `src/`                                  |

## Local Development

**Node version:** 20.12.2 (see `.nvmrc` — use nvm or mise)

```sh
npm install          # install dependencies
npm start            # Vite dev server → http://localhost:3000
npm run build        # production build → dist/
npm run build:chrome # build + copy manifest + icon → loadable unpacked extension in dist/
npm run preview      # preview the production build locally
```

The dev server (`npm start`) runs the app as a regular web page. Chrome extension APIs (`chrome.storage`, etc.) are not available in this mode — use `npm run build:chrome` and load as an unpacked extension for full functionality.

Certain production-facing files are restricted from being committed to GitHub.

## Code Style

- **Prettier** (no ESLint): trailing commas, 2-space indentation, no semicolons, double quotes
- VSCode formats on save via `.vscode/settings.json`
- Run manually: `npx prettier --write .`

## Testing

- React Testing Library + jest-dom
- Test files live in `src/__tests__/`
- No `npm test` script is wired up — tests exist but a runner is not configured

## Project Structure

```
src/
  actions/       # Redux action creators
  reducers/      # Redux reducers
  components/    # Shared UI components
  Views/         # Top-level view components
  lib/           # Utility modules
assets/          # Static assets (icons, etc.)
manifest.chrome.json  # Chrome extension manifest (copied to dist/ on build)
```

## Security

- No user data shall ever be shipped to an external service. This is a local-only Chrome Extension.

## Google Chrome Extension Compliance

## GitHub Workflow

- **Main branch:** `main`
- **No CI/CD** — there are no `.github/` workflow files
- Feature branches → PR to `main`
- No automated checks run on PRs; verify manually before merging:

```sh
npm run build:chrome   # must succeed with no errors
```

Load `dist/` as an unpacked extension in Chrome (`chrome://extensions` → Load unpacked) to do a final smoke test.

**To package for the Chrome Web Store:**

```sh
npm run build:chrome
cd dist && zip -r my-new-tab.zip . -x "*.DS_Store"
```
