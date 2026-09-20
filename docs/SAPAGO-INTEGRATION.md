# SapaGo iframe integration

The prototype contains no fake AI, canned catalogue answers, API key, or outbound messaging API. No SapaGo endpoint, SDK specification, or credentials were supplied. Real responses are not enabled until these are provided.

## Configuration

Copy `.env.example` to `.env.local`, fill the public URL and per-brand agent IDs, then restart the dev server. `NEXT_PUBLIC_*` values are browser-visible and embedded at build time. Never use these for private keys.

The app uses Next.js-style public environment names (not VITE_*). `wondermist` remains the internal key and environment prefix; visible branding is **Wondermist**.

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

## Required from SapaGo to finish live connection

- Embeddable HTTPS URL for each agent (or a shared URL with documented agent routing).
- Public agent/tenant/workspace IDs and authorized preview origin.
- Actual iframe query / message schema or official SDK lifecycle documentation.
- Verified brand catalogues and knowledge bases.

If only a script SDK is supplied, implement its documented init/destroy methods in a dedicated adapter. Do not inject arbitrary scripts or invent undocumented SDK calls.
