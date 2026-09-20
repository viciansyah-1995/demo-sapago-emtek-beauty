"use client";
import { useEffect, useRef } from "react";
import { isBrandId, type BrandId } from "@/data/brands";
// Optional progressive enhancement for browsers supporting WebMCP.
type Registry = {
  registerTool: (
    tool: {
      name: string;
      description: string;
      inputSchema: object;
      annotations: object;
      execute: (input: unknown) => Promise<unknown>;
    },
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};
export function useDemoTools(
  active: BrandId,
  select: (id: BrandId) => void,
  ask: (text: string) => void,
) {
  const current = useRef(active);
  current.current = active;
  useEffect(() => {
    const registry = (document as Document & { modelContext?: Registry }).modelContext;
    if (!registry?.registerTool) return;
    const lifecycle = new AbortController();
    const rendered = () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
    const tools = [
      {
        name: "select_demo_brand",
        description: "Switch the visible brand demo; resets the current assistant context.",
        inputSchema: {
          type: "object",
          properties: { brand: { type: "string", enum: ["ffar", "wondermist", "majika"] } },
          required: ["brand"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute: async (input: unknown) => {
          const value = (input as { brand?: unknown } | null)?.brand;
          if (!isBrandId(value)) throw new Error("Invalid brand");
          select(value);
          await rendered();
          return { brand: current.current };
        },
      },
      {
        name: "prepare_assistant_question",
        description:
          "Open the active brand assistant and prefill a draft question. Does not send a message.",
        inputSchema: {
          type: "object",
          properties: { question: { type: "string", minLength: 1, maxLength: 2000 } },
          required: ["question"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute: async (input: unknown) => {
          const value = (input as { question?: unknown } | null)?.question;
          if (typeof value !== "string" || !value.trim() || value.length > 2000)
            throw new Error("Invalid question");
          ask(value.trim());
          await rendered();
          return { brand: current.current, status: "draft_prepared", sent: false };
        },
      },
    ];
    for (const tool of tools) {
      try {
        void Promise.resolve(registry.registerTool(tool, { signal: lifecycle.signal })).catch(
          () => {},
        );
      } catch {
        /* Unsupported experimental API: UI stays functional. */
      }
    }
    return () => lifecycle.abort();
  }, [select, ask]);
}
