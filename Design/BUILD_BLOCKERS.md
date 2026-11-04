# Build blockers and immediate fixes

## Confirmed by source-tree inspection

The GitHub `master` tree did not contain `src/assets/`, but source files import assets from it. This is the first blocker to resolve.

Search/replace checklist:

```bash
# Run at repository root
rg "assets/" src
```

Find every import to the missing folders and then choose one:

1. Recover the original asset from the repository owner's local working tree and add it with rights confirmed; or
2. Replace it with an approved placeholder/real asset stored in `public/assets`; or
3. Remove the import and the associated rendering until a permitted asset is ready.

Do not add an empty folder and assume Vite can resolve a missing file. Do not replace genuine portraits with geometric SVGs.

## Node version

The README's current Node 18+ prerequisite is inconsistent with Vite 8. Use Node 20.19+ or 22.12+ and update the README.

## First validation

```bash
node --version
npm ci
npm run lint
npm run build
```

Record all warnings and errors. Only after this baseline passes should the visual refactor begin.
