"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, MessageCircle, Send, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { buildWidgetUrl, sapagoConfig } from "@/data/sapago";
import type { Brand } from "@/data/brands";

export type ChatIntent = { text: string; revision: number };
/**
 * Iframe adapter. The bridge protocol in docs/SAPAGO-INTEGRATION.md is a
 * proposed adapter contract, NOT an assumed public SapaGo SDK.
 * No catalogue responses are generated in this frontend.
 */
export function SapagoWidget({
  brand,
  open,
  onOpenChange,
  intent,
}: {
  brand: Brand;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intent: ChatIntent;
}) {
  const [draft, setDraft] = useState(intent.text);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [sessionId] = useState(() => `${brand.id}-${crypto.randomUUID()}`);
  const iframe = useRef<HTMLIFrameElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const config = sapagoConfig[brand.id];
  const url = buildWidgetUrl(config, brand.id, sessionId);
  const href = url?.href;
  const origin = url?.origin;

  useEffect(() => {
    setDraft(intent.text);
    setCopied(false);
  }, [intent]);
  useEffect(() => {
    if (!open || !origin) return;
    setReady(false);
    setLoaded(false);
    setTimedOut(false);
    const timer = window.setTimeout(() => setTimedOut(true), 12000);
    const receive = (event: MessageEvent) => {
      if (event.origin !== origin || event.source !== iframe.current?.contentWindow) return;
      if (
        event.data?.type !== "sapago:ready" ||
        event.data?.brand !== brand.id ||
        event.data?.sessionId !== sessionId
      )
        return;
      setReady(true);
      setTimedOut(false);
      window.clearTimeout(timer);
    };
    window.addEventListener("message", receive);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("message", receive);
    };
  }, [open, origin, brand.id, sessionId, attempt]);
  useEffect(() => {
    if (open && ready && origin && draft.trim()) {
      iframe.current?.contentWindow?.postMessage(
        { type: "sapago:prefill", brand: brand.id, sessionId, text: draft },
        origin,
      );
    }
  }, [open, ready, origin, brand.id, sessionId, draft]);
  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      input.current?.focus();
      input.current?.select();
      setCopyFailed(true);
    }
  }
  return (
    <>
      <button
        ref={launcher}
        className="chat-launcher"
        onClick={() => onOpenChange(true)}
        aria-label={`Buka ${brand.name} Assistant`}
        aria-haspopup="dialog"
      >
        <span className="sapago-mark">s</span>
        <span>
          Ask {brand.name}
          <small>Powered by SapaGo AI</small>
        </span>
        <MessageCircle size={19} />
      </button>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={`chat-window theme-${brand.id}`}
          showCloseButton={false}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            launcher.current?.focus();
          }}
          onOpenAutoFocus={(e) => {
            if (!href) {
              e.preventDefault();
              input.current?.focus();
            }
          }}
        >
          <div className="chat-header">
            <span className="sapago-mark">s</span>
            <div>
              <DialogTitle>{brand.name} Assistant</DialogTitle>
              <DialogDescription>Powered by SapaGo AI</DialogDescription>
            </div>
            <button
              aria-label="Tutup assistant"
              className="icon-button"
              onClick={() => onOpenChange(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="chat-status" aria-live="polite">
            {href
              ? ready
                ? "Terhubung ke SapaGo"
                : loaded
                  ? "Widget dimuat · menunggu koneksi"
                  : "Memuat widget…"
              : "Preview demo · belum terhubung"}
          </div>
          {href ? (
            <div className="widget-frame-wrap">
              <iframe
                key={attempt}
                ref={iframe}
                src={href}
                title={`Percakapan ${brand.name}`}
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onLoad={() => {
                  setLoaded(true);
                  iframe.current?.contentWindow?.postMessage(
                    { type: "sapago:init", brand: brand.id, agentId: config.agentId, sessionId },
                    origin!,
                  );
                }}
              />
              {timedOut && !ready ? (
                <div className="connection-note" role="status">
                  Koneksi belum terkonfirmasi. Jika chat tidak tampil, coba muat ulang. Pertanyaan
                  bisa disalin ke widget.
                  <button onClick={() => setAttempt((n) => n + 1)}>
                    Muat ulang <ArrowUpRight size={14} />
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="chat-welcome">
              <p className="eyebrow">LET’S FIND YOUR MATCH</p>
              <h2>
                A little help,
                <br />
                just for you.
              </h2>
              <p>{brand.greeting}</p>
              <div className="prompt-list">
                {brand.prompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setDraft(prompt);
                      setCopied(false);
                      input.current?.focus();
                    }}
                  >
                    {prompt}
                    <ArrowUpRight size={15} />
                  </button>
                ))}
              </div>
              <p className="demo-chat-note">
                Jawaban akan muncul setelah assistant SapaGo terhubung. Tidak ada jawaban AI
                simulasi.
              </p>
            </div>
          )}
          {(!ready || !href) && (
            <div className="chat-composer">
              <label htmlFor={`question-${brand.id}`}>Pertanyaan untuk {brand.name}</label>
              <div className="composer-field">
                <textarea
                  id={`question-${brand.id}`}
                  ref={input}
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    setCopied(false);
                  }}
                  placeholder="Tulis pertanyaanmu…"
                  maxLength={2000}
                  rows={2}
                />
                <button
                  disabled
                  aria-label="Kirim pesan — menunggu koneksi SapaGo"
                  title="Hubungkan SapaGo untuk mengirim pesan"
                >
                  <Send size={18} />
                </button>
              </div>
              {draft.trim() ? (
                <button className="copy-question" onClick={copyDraft}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
                  {copied ? "Pertanyaan disalin" : "Salin pertanyaan"}
                </button>
              ) : (
                <p>Pilih pertanyaan di atas untuk mulai.</p>
              )}
              {copyFailed ? (
                <p role="status">Teks dipilih. Gunakan salin pada perangkatmu.</p>
              ) : null}
            </div>
          )}
          {ready && draft && (
            <div className="prefill-note">
              Pertanyaan disiapkan di widget. Tinjau, lalu kirim dari chat SapaGo.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
