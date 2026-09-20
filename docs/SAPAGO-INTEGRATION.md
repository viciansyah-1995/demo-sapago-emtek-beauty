# SapaGo live chat integration

FFAR and Wondermist use the official SapaGo live-chat loader. The loader creates and controls its own fixed-position iframe bubble. Each brand has a separate `lc_pk_` public widget key, while both use the SapaGo widget host and Talky public live-chat API.

## Configuration

The public embed configuration lives in `data/sapago.ts` under `sapagoLiveChatConfig`. `lc_pk_` values are browser-visible identifiers intended for the widget script; private credentials must never be added there.

The app loads the official script with Next.js `Script` after the page becomes interactive. FFAR and Wondermist use distinct script instances so the loader reads the correct brand key. Created iframe elements are tagged per brand, and only the active brand's iframe is shown. This prevents duplicate visible bubbles when switching tabs.

The loader currently accepts bootstrap data from its own script and reports resize and position changes from the iframe. It does not expose a documented parent-page command for opening the chat or prefilling a message. Page-level Ask actions therefore focus and highlight the official bubble; the user opens the conversation from the bubble itself.

`wondermist` remains the internal key; visible branding is **Wondermist**.

## Majika fallback adapter

Majika has no supplied live-chat public key, so it continues to use the existing iframe adapter and branded preview. Copy `.env.example` to `.env.local` and set the Majika widget URL and agent ID to connect it. `NEXT_PUBLIC_*` values are browser-visible and embedded at build time.

Each brand receives its own configuration in `data/sapago.ts`: `widgetUrl`, `agentId`, `tenantId`, `workspaceId`. `buildWidgetUrl` permits HTTPS or HTTP loopback development only. It appends these query parameters plus `brand` and a fresh `sessionId`. Verify the actual provider parameter names and adjust the adapter before connecting production.

Switching brands unmounts the old iframe, removes its message listener, clears the draft, and creates a fresh brand-prefixed session. Closing and reopening a chat retains its current session ID; provider-side persistence is up to the real widget. No conversations are stored by this application.

## Proposed adapter bridge — not a verified SapaGo API

For product/mood prefill, the embedded widget or a SapaGo-approved adapter must implement this exact protocol, or the frontend must be updated to match the actual SDK. An iframe `load` event is not treated as proof of connection.

1. Parent sends `{ type: 'sapago:init', brand, agentId, sessionId }` to the configured exact origin after iframe load.
2. Widget replies `{ type: 'sapago:ready', brand, sessionId }` to the known parent origin.
3. Parent verifies `event.origin`, `event.source`, `brand`, and `sessionId`. Only then it sends `{ type: 'sapago:prefill', brand, sessionId, text }`.
4. Widget places `text` in its input. It must **not auto-send**. User reviews and sends within the official widget.

No wildcard postMessage target origins. The iframe sandbox allows scripts, same-origin behavior, forms, and popup links; it does not allow top-level navigation. The widget host must permit this application's origin in its frame-ancestors/CSP policy. Do not place private credentials in an iframe query string.

Without a ready handshake, users can copy the prepared question into the embedded widget. A 12-second connection notice and reload action handle unavailable or incompatible embeds. Without configuration, a branded preview displays greeting text and relevant prompts; send is disabled and no answers are manufactured.

## Required to connect Majika

- Embeddable HTTPS URL for each agent (or a shared URL with documented agent routing).
- Public agent/tenant/workspace IDs and authorized preview origin.
- Actual iframe query / message schema or official SDK lifecycle documentation.
- Verified brand catalogues and knowledge bases.

If a Majika `lc_pk_` key is supplied, add it to `sapagoLiveChatConfig` so the brand uses the official loader as well.
