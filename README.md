# SapaGo AI — Multi Brand Interactive Demo

One responsive local app for FFAR, Wondermist, and Majika, built with React, TypeScript, Next.js App Router conventions, the portable Vinext runner, Tailwind CSS, Radix/Shadcn primitives, and Lucide icons.

## Run locally

```sh
npm install
npm run dev -- --port 3013
```

Open http://localhost:3013. The runner defaults to port 5173 without the override. Build: `npm run build`. Type check: `npx tsc --noEmit`. Build uses the starter's portable Vinext path. No deployment is required or created.

## Included

- Sticky keyboard-accessible brand tabs; distinct typography, palette, layout order, and photography.
- Product detail dialogs, product-to-chat questions, brand-specific mood/routine finder.
- Floating SapaGo assistant, full-screen mobile chat, six relevant suggested questions per brand.
- Honest disconnected state, editable question/copy action, prepared real iframe integration with strict message origin checks, timeout/reload, and fresh context on brand changes.
- Optional AE demo scenarios, shareable `?brand=ffar`, `?brand=wondermist` (alias `wondermis`), `?brand=majika`, browser back/forward support.
- Dynamic copyright year, local optimized assets, lazy-loaded below-fold imagery, reduced-motion support, focus management, optional progressive WebMCP tools.

## SapaGo connection

Fill `.env.local` using `.env.example`, restart the server, and verify the official widget integration contract. Live AI needs the actual URL, routing IDs, and knowledge base. No final AI responses are hardcoded. See [integration guide](docs/SAPAGO-INTEGRATION.md).

## Brand/content decisions

The Wondermist name and user-provided logo are used throughout the interface. The internal configuration key remains `wondermist`. FFAR has one verified product rather than invented additional SKUs. See [sources](docs/CONTENT-SOURCES.md).

## Architecture

- `data/brands.ts`: content, products, theme identifier, section ordering, prompts. Add a brand here and its theme/routing configuration to extend the demo.
- `data/sapago.ts`: public per-brand widget configuration and validated URL builder.
- `components/brand/BrandSections.tsx`: reusable navigation, hero, collection, finder, story, CTA, footer, detail modal.
- `components/brand/SapagoWidget.tsx`: isolated iframe/preview lifecycle.
- `components/brand/useDemoTools.ts`: optional WebMCP brand switching and question staging.
- `app/page.tsx`: active brand, URL, product/dialog/scenario state.
- `app/globals.css`: shared responsive layout and differentiated themes.
- `public/assets/`: locally served campaign photos.

No payments, checkout, fake reviews, stock claims, analytics, or backend are included.
