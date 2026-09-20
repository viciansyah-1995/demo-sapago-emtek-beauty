import type { BrandId } from "./brands";

export type SapagoLiveChatConfig = {
  publicKey: string;
  scriptUrl: string;
  apiUrl: string;
  widgetUrl: string;
};

const liveChatDefaults = {
  scriptUrl: "https://sapago.id/livechat/widget.js",
  apiUrl: "https://api.talky.id/v1/public/livechat",
  widgetUrl: "https://sapago.id/livechat/widget",
};

// These lc_pk_ values are public widget identifiers supplied for browser embedding.
export const sapagoLiveChatConfig: Partial<Record<BrandId, SapagoLiveChatConfig>> = {
  ffar: {
    ...liveChatDefaults,
    publicKey: "lc_pk_0tnQmu7KN9RcL2eymk9R0-e_Sf9WOo92",
  },
  wondermist: {
    ...liveChatDefaults,
    publicKey: "lc_pk_5pp-nnpRO9EPinQ5yVMjoStAuYMHP83r",
  },
  majika: {
    ...liveChatDefaults,
    publicKey: "lc_pk_OKL1Fhcu8G36cCnz3zkb_CQxPijIS7N-",
  },
};

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
