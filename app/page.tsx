"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { brands, brandIds, isBrandId, type BrandId, type Product } from "@/data/brands";
import { SapagoWidget, type ChatIntent } from "@/components/brand/SapagoWidget";
import {
  BrandNavbar,
  Hero,
  ProductGrid,
  ProductFinder,
  LifestyleSection,
  CTASection,
  Footer,
  ProductDetail,
} from "@/components/brand/BrandSections";
import { useDemoTools } from "@/components/brand/useDemoTools";
export default function Home() {
  const [active, setActive] = useState<BrandId>("ffar");
  const [chatOpen, setChatOpen] = useState(false);
  const [intent, setIntent] = useState<ChatIntent>({ text: "", revision: 0 });
  const [product, setProduct] = useState<Product | null>(null);
  const [scenarios, setScenarios] = useState(false);
  const lastProductTrigger = useRef<HTMLButtonElement | null>(null);
  const scenarioTrigger = useRef<HTMLButtonElement | null>(null);
  const brand = brands[active];
  const selectBrand = useCallback((id: BrandId, updateUrl = true) => {
    setActive(id);
    setProduct(null);
    setChatOpen(false);
    setIntent({ text: "", revision: Date.now() });
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("brand", id);
      url.hash = "";
      window.history.pushState({}, "", url);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);
  const ask = useCallback((text = "") => {
    setIntent({ text, revision: Date.now() });
    setChatOpen(true);
  }, []);
  useEffect(() => {
    const sync = () => {
      const value = new URL(window.location.href).searchParams.get("brand");
      selectBrand(isBrandId(value) ? value : value === "wondermis" ? "wondermist" : "ffar", false);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [selectBrand]);
  useDemoTools(active, selectBrand, ask);
  function runScenario(id: BrandId) {
    setScenarios(false);
    selectBrand(id);
    ask(brands[id].moods[0].prompt);
  }
  return (
    <Tabs
      value={active}
      onValueChange={(v) => {
        if (isBrandId(v)) selectBrand(v);
      }}
      className={`experience theme-${active}`}
      id="top"
    >
      <a className="skip-link" href="#main">
        Lewati ke konten
      </a>
      <div className="demo-bar">
        <a href="#top" className="sapago-wordmark" aria-label="SapaGo AI demo">
          <span className="sapago-logo">
            <Image src="/assets/sapago/sapago-logo.png" alt="SapaGo" fill priority sizes="48px" />
          </span>
          <small>AI DEMO</small>
        </a>
        <TabsList className="brand-tabs" aria-label="Pilih brand">
          {brandIds.map((id) => (
            <TabsTrigger value={id} key={id}>
              {brands[id].name}
            </TabsTrigger>
          ))}
        </TabsList>
        <button
          ref={scenarioTrigger}
          className="scenario-trigger"
          onClick={() => setScenarios(true)}
        >
          <Play size={12} /> <span>Demo scenarios</span>
        </button>
      </div>
      {brandIds.map((id) => (
        <TabsContent value={id} key={id} className="brand-panel">
          {active === id && (
            <>
              <BrandNavbar brand={brand} ask={ask} />
              <main id="main">
                <Hero brand={brand} ask={ask} />
                <div className="brand-ribbon">
                  <span>
                    {brand.id === "ffar"
                      ? "MAKE YOUR PRESENCE KNOWN"
                      : brand.id === "wondermist"
                        ? "A LITTLE TIME, JUST FOR YOU"
                        : "GOOD DAYS. GOOD MOODS. YOUR RULES."}
                  </span>
                  <span>{brand.name.toUpperCase()} / THE EVERYDAY EDIT</span>
                </div>
                {brand.sections.map((section) =>
                  section === "collection" ? (
                    <ProductGrid
                      key={section}
                      brand={brand}
                      ask={ask}
                      onProduct={(p, el) => {
                        lastProductTrigger.current = el;
                        setProduct(p);
                      }}
                    />
                  ) : section === "finder" ? (
                    <ProductFinder key={section} brand={brand} ask={ask} />
                  ) : (
                    <LifestyleSection key={section} brand={brand} ask={ask} />
                  ),
                )}
                <CTASection brand={brand} ask={ask} />
              </main>
              <Footer brand={brand} />
            </>
          )}
        </TabsContent>
      ))}
      <SapagoWidget
        key={active}
        brand={brand}
        open={chatOpen}
        onOpenChange={setChatOpen}
        intent={intent}
      />
      <ProductDetail
        product={product}
        brand={brand}
        close={() => setProduct(null)}
        ask={ask}
        restoreFocus={() => {
          if (!chatOpen) lastProductTrigger.current?.focus();
        }}
      />
      <Dialog open={scenarios} onOpenChange={setScenarios}>
        <DialogContent
          className="scenario-dialog"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            if (!chatOpen) scenarioTrigger.current?.focus();
          }}
        >
          <p className="eyebrow">SAPAGO AI / LIVE DEMO</p>
          <DialogTitle>Start with a conversation.</DialogTitle>
          <DialogDescription>
            Pilih skenario. Brand dan pertanyaan akan disiapkan otomatis.
          </DialogDescription>
          <div className="scenario-options">
            {brandIds.map((id, i) => (
              <button key={id} onClick={() => runScenario(id)}>
                <span>0{i + 1}</span>
                <div>
                  <strong>{brands[id].name}</strong>
                  <p>
                    {id === "ffar"
                      ? "Meeting to outdoors"
                      : id === "wondermist"
                        ? "Find my daily routine"
                        : "Find my scent"}
                  </p>
                </div>
                <ArrowUpRight size={21} />
              </button>
            ))}
          </div>
          <p className="scenario-footnote">Jawaban langsung memerlukan koneksi widget SapaGo.</p>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}
