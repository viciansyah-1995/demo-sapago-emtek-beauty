import test from "node:test";
import assert from "node:assert/strict";
import { buildWidgetUrl, sapagoLiveChatConfig } from "../data/sapago.ts";
const config = {
  widgetUrl: "https://widget.example.test/embed?theme=clean",
  agentId: "ffar-demo",
  tenantId: "tenant-ffar",
  workspaceId: "workspace-ffar",
};
test("routing is scoped to the selected brand and session without losing provider settings", () => {
  const url = buildWidgetUrl(config, "ffar", "ffar-session-a");
  assert.equal(url.searchParams.get("brand"), "ffar");
  assert.equal(url.searchParams.get("sessionId"), "ffar-session-a");
  assert.equal(url.searchParams.get("agentId"), "ffar-demo");
  assert.equal(url.searchParams.get("tenantId"), "tenant-ffar");
  assert.equal(url.searchParams.get("workspaceId"), "workspace-ffar");
  assert.equal(url.searchParams.get("theme"), "clean");
});
test("missing URL or agent never loads an unscoped widget", () => {
  assert.equal(buildWidgetUrl({ ...config, widgetUrl: "" }, "ffar", "s"), null);
  assert.equal(buildWidgetUrl({ ...config, agentId: "" }, "ffar", "s"), null);
});
test("rejects executable schemes, plain external HTTP and embedded credentials", () => {
  for (const widgetUrl of [
    "javascript:alert(1)",
    "data:text/html,hello",
    "http://widget.example.test",
    "https://name:secret@widget.example.test",
    "invalid",
  ]) {
    assert.equal(buildWidgetUrl({ ...config, widgetUrl }, "ffar", "s"), null, widgetUrl);
  }
});
test("HTTP loopback is available for local adapter testing", () => {
  assert.ok(buildWidgetUrl({ ...config, widgetUrl: "http://localhost:4010/embed" }, "ffar", "s"));
  assert.ok(buildWidgetUrl({ ...config, widgetUrl: "http://127.0.0.1:4010/embed" }, "ffar", "s"));
});
test("switching brand produces independent routing", () => {
  const first = buildWidgetUrl(config, "ffar", "ffar-session");
  const second = buildWidgetUrl(
    { ...config, agentId: "majika-demo", tenantId: "majika", workspaceId: "majika" },
    "majika",
    "majika-session",
  );
  assert.notEqual(first.searchParams.get("sessionId"), second.searchParams.get("sessionId"));
  assert.notEqual(first.searchParams.get("agentId"), second.searchParams.get("agentId"));
  assert.equal(second.searchParams.get("brand"), "majika");
});

test("each brand uses a separate live-chat public key", () => {
  assert.match(sapagoLiveChatConfig.ffar.publicKey, /^lc_pk_/);
  assert.match(sapagoLiveChatConfig.wondermist.publicKey, /^lc_pk_/);
  assert.match(sapagoLiveChatConfig.majika.publicKey, /^lc_pk_/);
  assert.equal(
    new Set(Object.values(sapagoLiveChatConfig).map(({ publicKey }) => publicKey)).size,
    3,
  );
});
