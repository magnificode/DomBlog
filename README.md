# DomBlog (Next.js)

A rebuilt version of dommagnifi.co using Next.js + Bun + shadcn + oxlint/oxfmt, deployed on Vercel.

## Stack

- Next.js App Router
- TypeScript (strict)
- Bun
- Tailwind CSS v4
- Velite content pipeline
- shadcn/ui baseline
- oxlint + oxfmt

## Development

```bash
bun install
bun dev
```

## Checks

```bash
bun run lint
bun run format:check
bun run build
```

## Content

Blog content lives in `content/posts/` and is sourced from legacy markdown in `origin/source`.

## Deployment

Deploy on Vercel with:
- Build command: `bun run build`
- Install command: `bun install`

Set custom domain in Vercel to `dommagnifi.co`.
