import type { BrandId } from "./brands";
export type SapagoConfig = {
  widgetUrl: string;
  agentId: string;
  tenantId: string;
  workspaceId: string;
};
// Public routing identifiers only. Never place API keys in NEXT_PUBLIC_* variables.
const base = process.env.NEXT_PUBLIC_SAPAGO_WIDGET_URL || "";
export const sapagoConfig: Record<BrandId, SapagoConfig> = {
  ffar: {
    widgetUrl: process.env.NEXT_PUBLIC_FFAR_WIDGET_URL || base,
    agentId: process.env.NEXT_PUBLIC_FFAR_AGENT_ID || "",
    tenantId: process.env.NEXT_PUBLIC_FFAR_TENANT_ID || "",
    workspaceId: process.env.NEXT_PUBLIC_FFAR_WORKSPACE_ID || "",
  },
  wondermist: {
    widgetUrl: process.env.NEXT_PUBLIC_WONDERMIST_WIDGET_URL || base,
    agentId: process.env.NEXT_PUBLIC_WONDERMIST_AGENT_ID || "",
    tenantId: process.env.NEXT_PUBLIC_WONDERMIST_TENANT_ID || "",
    workspaceId: process.env.NEXT_PUBLIC_WONDERMIST_WORKSPACE_ID || "",
  },
  majika: {
    widgetUrl: process.env.NEXT_PUBLIC_MAJIKA_WIDGET_URL || base,
    agentId: process.env.NEXT_PUBLIC_MAJIKA_AGENT_ID || "",
    tenantId: process.env.NEXT_PUBLIC_MAJIKA_TENANT_ID || "",
    workspaceId: process.env.NEXT_PUBLIC_MAJIKA_WORKSPACE_ID || "",
  },
};
export function buildWidgetUrl(
  config: SapagoConfig,
  brand: BrandId,
  sessionId: string,
): URL | null {
  if (!config.widgetUrl || !config.agentId) return null;
  try {
    const url = new URL(config.widgetUrl);
    if (url.username || url.password) return null;
    if (
      url.protocol !== "https:" &&
      !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))
    )
      return null;
    url.searchParams.set("brand", brand);
    url.searchParams.set("agentId", config.agentId);
    url.searchParams.set("sessionId", sessionId);
    if (config.tenantId) url.searchParams.set("tenantId", config.tenantId);
    if (config.workspaceId) url.searchParams.set("workspaceId", config.workspaceId);
    return url;
  } catch {
    return null;
  }
}
