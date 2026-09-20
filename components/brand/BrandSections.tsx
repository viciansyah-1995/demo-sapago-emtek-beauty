"use client";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Brand, Product } from "@/data/brands";
export type Ask = (prompt?: string) => void;

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <span className={`brand-logo-image logo-${brand.id}`}>
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        fill
        sizes="(max-width: 767px) 150px, 190px"
      />
    </span>
  );
}

export function BrandNavbar({ brand, ask }: { brand: Brand; ask: Ask }) {
  return (
    <nav className="brand-nav" aria-label={`Navigasi ${brand.name}`}>
      <a href="#top" className="brand-logo" aria-label={`${brand.name}, kembali ke atas`}>
        <BrandLogo brand={brand} />
      </a>
      <div>
        <a href="#collection">Collection</a>
        <a href="#story">Our world</a>
        <a href="#finder">
          {brand.id === "wondermist" ? "Find your match" : "Find your scent"}{" "}
          <ArrowUpRight size={15} />
        </a>
      </div>
      <button className="nav-assistant" onClick={() => ask()}>
        Ask us <ArrowUpRight size={16} />
      </button>
    </nav>
  );
}
export function Hero({ brand, ask }: { brand: Brand; ask: Ask }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{brand.eyebrow}</p>
        <h1 id="hero-title">
          {brand.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="hero-description">{brand.description}</p>
        <div className="hero-actions">
          <a className="button primary" href={brand.id === "majika" ? "#finder" : "#collection"}>
            {brand.cta}
            <ArrowRight size={18} />
          </a>
          <button className="text-button" onClick={() => ask()}>
            Ask {brand.name} <ArrowUpRight size={17} />
          </button>
        </div>
        <div className="hero-index">
          <span>{brand.id === "ffar" ? "01" : brand.id === "wondermist" ? "02" : "03"} / 03</span>
          <span>{brand.heroCaption}</span>
        </div>
      </div>
      <div className="hero-visual">
        <Image
          src={brand.heroImage}
          alt={`Kampanye ${brand.name} — ${brand.products[0].name}`}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 55vw"
        />
        <span className="photo-caption">{brand.heroCaption}</span>
        {brand.id === "majika" && (
          <span className="magic-seal" aria-hidden="true">
            a little
            <br />
            <i>magic</i>
            <Sparkles size={19} />
          </span>
        )}
      </div>
    </section>
  );
}
export function ProductFinder({ brand, ask }: { brand: Brand; ask: Ask }) {
  return (
    <section id="finder" className="finder section-wrap">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {brand.id === "wondermist" ? "YOUR ROUTINE, YOUR WAY" : "FIND YOUR MATCH"}
          </p>
          <h2>{brand.finderTitle}</h2>
        </div>
        <p>{brand.finderDescription}</p>
      </div>
      <div className="mood-grid">
        {brand.moods.map((m, i) => (
          <button
            className="mood-choice"
            style={{ "--mood": m.color } as React.CSSProperties}
            key={m.name}
            onClick={() => ask(m.prompt)}
          >
            <span className="mood-number">0{i + 1}</span>
            <span className="mood-copy">
              <strong>{m.name}</strong>
              <span>{m.note}</span>
            </span>
            <ArrowUpRight size={24} />
          </button>
        ))}
      </div>
      <p className="finder-note">Pilih satu untuk mulai bertanya ke {brand.name} Assistant.</p>
    </section>
  );
}
export function ProductGrid({
  brand,
  ask,
  onProduct,
}: {
  brand: Brand;
  ask: Ask;
  onProduct: (p: Product, el: HTMLButtonElement) => void;
}) {
  const featured = brand.products.length === 1;
  return (
    <section
      id="collection"
      className={`collection section-wrap ${featured ? "featured-collection" : ""}`}
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{featured ? "IN THE SPOTLIGHT" : "THE COLLECTION"}</p>
          <h2>{brand.collectionTitle}</h2>
        </div>
        <span className="collection-count">
          {String(brand.products.length).padStart(2, "0")} {featured ? "signature" : "essentials"} /{" "}
          {brand.name}
        </span>
      </div>
      <div className="product-grid">
        {brand.products.map((p, i) => (
          <article key={p.id} className="product-card">
            <button
              className="product-photo"
              style={{ background: p.color }}
              onClick={(e) => onProduct(p, e.currentTarget)}
              aria-label={`Lihat ${p.name}`}
            >
              <Image
                src={p.image}
                alt={`${p.name} — foto kampanye ${brand.name}`}
                fill
                sizes="(max-width:767px) 78vw, (max-width:1024px) 45vw, 33vw"
              />
              <span className="product-number">0{i + 1}</span>
              <span className="image-discover">
                <ArrowUpRight size={21} />
              </span>
            </button>
            <div className="product-content">
              <p className="eyebrow">{p.category}</p>
              <h3>{p.name}</h3>
              {featured && (
                <p className="feature-copy">
                  Kenali Sigma Spirit lebih dekat.
                  <br />
                  Tanyakan karakter aroma dan kesesuaiannya untuk aktivitasmu.
                </p>
              )}
              {p.placeholder && <span className="demo-data-label">Contoh katalog</span>}
              <div className="product-actions">
                <button className="text-button" onClick={(e) => onProduct(p, e.currentTarget)}>
                  Discover <ArrowUpRight size={16} />
                </button>
                <button
                  className="text-button"
                  onClick={() => ask(`Aku mau tahu lebih lanjut tentang ${p.name}.`)}
                >
                  Ask AI <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function LifestyleSection({ brand, ask }: { brand: Brand; ask: Ask }) {
  return (
    <section id="story" className="story-section">
      <div className="story-photo">
        <Image
          src={brand.products[brand.products.length - 1].image}
          alt={`Pilihan dari dunia ${brand.name}`}
          fill
          sizes="(max-width:767px) 100vw, 50vw"
        />
        <span className="photo-caption">INSIDE THE WORLD OF {brand.name.toUpperCase()}</span>
      </div>
      <div className="story-copy">
        <p className="eyebrow">
          {brand.id === "ffar"
            ? "A QUIET KIND OF CONFIDENCE"
            : brand.id === "majika"
              ? "MANY MOODS. ALL YOU."
              : "MAKE ROOM FOR YOURSELF"}
        </p>
        <h2>
          {brand.storyTitle.split("\n").map((l) => (
            <span key={l}>{l}</span>
          ))}
        </h2>
        <p>{brand.storyText}</p>
        <button className="text-button" onClick={() => ask(brand.prompts[0])}>
          {brand.id === "wondermist" ? "Explore your routine" : "Find your signature"}
          <ArrowUpRight size={18} />
        </button>
      </div>
    </section>
  );
}
export function CTASection({ brand, ask }: { brand: Brand; ask: Ask }) {
  return (
    <section className="cta-section">
      <div>
        <p className="eyebrow">A CONVERSATION AWAY</p>
        <h2>{brand.id === "majika" ? "Your mood. Let’s match it." : "Masih mencari yang pas?"}</h2>
        <p>Ceritakan yang kamu cari. Mulai dari satu pertanyaan.</p>
      </div>
      <button className="button primary" onClick={() => ask()}>
        Ask {brand.name}
        <ArrowUpRight size={19} />
      </button>
    </section>
  );
}
export function Footer({ brand }: { brand: Brand }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#top" className="brand-logo" aria-label={`${brand.name}, kembali ke atas`}>
          <BrandLogo brand={brand} />
        </a>
        <div>
          <a href="#collection">Collection</a>
          <a href="#story">Our world</a>
          <a href={brand.instagram} target="_blank" rel="noreferrer">
            Instagram <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <p>Prototype experience created for SapaGo AI demonstration purposes.</p>
          <p>Konsep kampanye demo · bukan situs resmi brand.</p>
        </div>
        <div>
          <p>Powered by SapaGo AI</p>
          <p>© {new Date().getFullYear()} SapaGo AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export function ProductDetail({
  product,
  brand,
  close,
  ask,
  restoreFocus,
}: {
  product: Product | null;
  brand: Brand;
  close: () => void;
  ask: Ask;
  restoreFocus: () => void;
}) {
  return (
    <Dialog
      open={!!product}
      onOpenChange={(v) => {
        if (!v) close();
      }}
    >
      <DialogContent
        className={`product-dialog theme-${brand.id}`}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          restoreFocus();
        }}
      >
        {product && (
          <>
            <div className="detail-photo">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width:767px) 90vw, 400px"
              />
            </div>
            <div className="detail-copy">
              <p className="eyebrow">
                {brand.name} / {product.category}
              </p>
              <DialogTitle>{product.name}</DialogTitle>
              <DialogDescription>Kenali produknya, temukan pilihanmu.</DialogDescription>
              <p>
                Ingin tahu detail produk atau membandingkan pilihan? Tanyakan langsung ke{" "}
                {brand.name} Assistant.
              </p>
              <p className="detail-notice">
                Informasi aroma, kandungan, harga, stok, dan promo menunggu katalog resmi melalui
                SapaGo.
              </p>
              <button
                className="button primary"
                onClick={() => {
                  close();
                  ask(`Aku mau tahu lebih lanjut tentang ${product.name}.`);
                }}
              >
                Ask about this product
                <ArrowUpRight size={18} />
              </button>
              <button
                className="text-button"
                onClick={() => {
                  close();
                  ask(`Bantu bandingkan ${product.name} dengan produk ${brand.name} lainnya.`);
                }}
              >
                Bantu bandingkan
                <ArrowRight size={17} />
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
