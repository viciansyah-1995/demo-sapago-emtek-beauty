# Local verification — 20 September 2026

Passed:
- Portable production build (`node …/sites/scripts/build-site.mjs`).
- TypeScript (`npx tsc --noEmit`).
- Five URL-routing tests (`node --experimental-strip-types --test tests/sapago-config.test.mjs`): routing/session isolation, missing configuration, forbidden schemes/credentials, local HTTP, different agent contexts.
- Desktop browser: all three brands render with loaded local imagery, correct navigation and unique theme/content.
- Product card → product dialog → assistant: correct product question, disabled send while disconnected.
- Majika floral mood → correct prefilled prompt.
- 390 × 844 mobile layout: no document overflow or broken images; chat measures exactly 390 × 844.
- AE scenario switches brand and stages correct question; subsequent brand change clears the old draft.
- Browser back updates the active brand.
- WebMCP real browser registry: both tools registered with expected schemas; valid brand and draft operations update the visible UI; unknown brand and blank question reject intentionally.

Limitations:
- No SapaGo endpoint or routing IDs supplied. Live responses and real provider handshake cannot be tested. The bridge is an explicitly documented adapter contract, not a claim about an existing official SDK.
- Campaign images are publicly sourced, not client-supplied originals; provenance recorded separately.
