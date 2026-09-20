# SapaGo live chat integration

FFAR, Wondermist, and Majika use the official SapaGo live-chat loader. The loader creates and controls its own fixed-position iframe bubble. Each brand has a separate `lc_pk_` public widget key, while all three use the SapaGo widget host and Talky public live-chat API.

## Configuration

The public embed configuration lives in `data/sapago.ts` under `sapagoLiveChatConfig`. `lc_pk_` values are browser-visible identifiers intended for the widget script; private credentials must never be added there.

The app loads the official script with Next.js `Script` after the page becomes interactive. Each brand uses a distinct script instance so the loader reads the correct brand key. Created iframe elements are tagged per brand, and only the active brand's iframe is shown. This prevents duplicate visible bubbles when switching tabs.

The loader currently accepts bootstrap data from its own script and reports resize and position changes from the iframe. It does not expose a documented parent-page command for opening the chat or prefilling a message. Page-level Ask actions therefore focus and highlight the official bubble; the user opens the conversation from the bubble itself.

`wondermist` remains the internal key; visible branding is **Wondermist**.
