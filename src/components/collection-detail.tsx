import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { PointerEvent } from "react";

import type { Collection } from "@/lib/collections";
import { Button } from "@/components/ui/button";
import { useHoverPreview } from "@/components/hover-preview";

function handleDepth(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * -14;
  const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -10;
  const image = event.currentTarget.querySelector<HTMLElement>("[data-depth]");
  image?.style.setProperty("--shift-x", `${x}px`);
  image?.style.setProperty("--shift-y", `${y}px`);
}

function resetDepth(event: PointerEvent<HTMLElement>) {
  const image = event.currentTarget.querySelector<HTMLElement>("[data-depth]");
  image?.style.setProperty("--shift-x", "0px");
  image?.style.setProperty("--shift-y", "0px");
}

export function CollectionDetail({ collection }: { collection: Collection }) {
  const preview = useHoverPreview(2500);
  return (
    <main className="min-h-screen bg-background text-foreground">
      {preview.overlay}
      <header className="flex h-20 items-center justify-between border-b border-foreground/15 px-5 md:h-24 md:px-12 lg:px-20">
        <Link to="/" aria-label="Nil Mobilya ana sayfa" className="font-display text-2xl font-medium uppercase text-foreground md:text-3xl">
          Nil <span className="text-primary">Mobilya</span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-medium uppercase text-foreground/80 transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-3" /> Ana sayfa
        </Link>
      </header>

      <section
        className="relative flex min-h-[68svh] flex-col justify-end overflow-hidden border-b border-border"
        onPointerMove={handleDepth}
        onPointerLeave={resetDepth}
      >
        <img
          data-depth
          src={collection.hero}
          alt={collection.heroAlt}
          width={1024}
          height={1280}
          className="image-depth absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: collection.heroFocus }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--background)_4%,color-mix(in_oklab,var(--background)_55%,transparent)_45%,color-mix(in_oklab,var(--background)_18%,transparent)_100%)]" />
        <div className="relative z-10 px-5 pb-12 md:px-12 md:pb-16 lg:px-20">
          <p className="reveal-up mb-4 text-[10px] font-semibold uppercase text-primary md:text-xs">
            Koleksiyon {collection.number}
          </p>
          <h1 className="reveal-up font-display text-6xl font-medium leading-[0.9] text-foreground md:text-8xl">
            {collection.title}
          </h1>
          <p className="reveal-up mt-4 text-sm font-light text-foreground/75 md:text-base">{collection.note}</p>
        </div>
      </section>

      <section className="border-b border-border px-5 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid gap-10 md:grid-cols-2">
          <p className="max-w-lg font-display text-3xl leading-snug text-foreground md:text-4xl">
            {collection.description}
          </p>
          <div className="flex items-end justify-start md:justify-end">
            <Button asChild variant="goldOutline" size="lg" className="h-12 px-6 text-xs uppercase">
            <Button asChild variant="goldOutline" size="lg" className="h-12 px-6 text-xs uppercase">
              <Link to="/" hash="iletisim">Bu koleksiyonu yerinizde görün <ArrowUpRight /></Link>
            </Button>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-12 md:py-24 lg:px-20">
        <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
          <h2 className="font-display text-3xl md:text-5xl">Parçalar</h2>
          <span className="text-xs text-muted-foreground">{collection.title} · 2026</span>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {collection.products.map((product, index) => (
            <article key={product.name} className="group">
              <div
                className="overflow-hidden bg-surface-raised aspect-[4/5]"
                onPointerMove={handleDepth}
                onPointerEnter={(event) => {
                  if (event.pointerType === "touch") return;
                  preview.open({
                    src: product.image,
                    alt: `Nil Mobilya ${collection.title.toLocaleLowerCase("tr-TR")} koleksiyonu — ${product.name}`,
                  });
                }}
                onPointerLeave={(event) => {
                  resetDepth(event);
                  preview.close();
                }}
              >
                <img
                  data-depth
                  src={product.image}
                  alt={`Nil Mobilya ${collection.title.toLocaleLowerCase("tr-TR")} koleksiyonu — ${product.name}`}
                  width={1024}
                  height={1280}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="image-depth h-full w-full object-cover saturate-[.8] group-hover:saturate-100"
                />
              </div>
              <div className="flex items-start justify-between border-b border-border py-5">
                <div>
                  <span className="text-[10px] text-primary">0{index + 1}</span>
                  <h3 className="mt-1 font-display text-2xl">{product.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{product.material}</p>
                </div>
                <ArrowUpRight className="mt-2 size-5 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border px-5 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase text-primary">Diğer koleksiyonlar</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {["oturma", "berjer", "yemek"]
                .filter((slug) => slug !== collection.slug)
                .map((slug) => (
                  <Link
                    key={slug}
                    to="/koleksiyon/$slug"
                    params={{ slug }}
                    className="font-display text-3xl text-foreground/70 transition-colors hover:text-primary md:text-5xl"
                  >
                    {slug === "oturma" ? "Oturma" : slug === "berjer" ? "Berjer" : "Yemek"}
                  </Link>
                ))}
            </div>
          </div>
          <Button asChild variant="gold" size="lg" className="h-12 self-start px-6 text-xs uppercase md:self-auto">
          <Button asChild variant="gold" size="lg" className="h-12 self-start px-6 text-xs uppercase md:self-auto">
            <Link to="/" hash="koleksiyon">Tüm koleksiyon <ArrowUpRight /></Link>
          </Button>
          </Button>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 text-[10px] uppercase text-muted-foreground md:flex-row md:justify-between">
          <span>© 2026 Nil Mobilya</span>
          <span>Form · Doku · Denge</span>
        </div>
      </section>
    </main>
  );
}
