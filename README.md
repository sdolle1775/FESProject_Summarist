# Summarist

A complete React + TypeScript implementation of the Frontend Simplified Summarist virtual internship

## Included

- Responsive landing page and global authentication modal
- Email/password registration and login, validation, logout, and guest access
- API-powered selected, recommended, and suggested book collections
- Dynamic book detail and audiobook player pages
- Premium access gating, monthly/yearly plan selection, trial messaging, and FAQ accordion
- Settings with subscription and email state
- 300 ms debounced title/author search
- Desktop sidebar, mobile navigation, and loading skeletons

Authentication and subscription state are stored in the browser so the complete flow can be reviewed without private service credentials. Book content, covers, audio, and search results come from the Summarist APIs specified in the internship brief.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`.

## Validate

```bash
pnpm typecheck
pnpm build
```
