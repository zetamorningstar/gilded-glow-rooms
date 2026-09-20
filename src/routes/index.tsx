import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { useState, type PointerEvent } from "react";

import heroImage from "@/assets/nil-hero.jpg";
import { collections } from "@/lib/collections";
import { Button } from "@/components/ui/button";
import { useHoverPreview } from "@/components/hover-preview";
import { ReviewsMarquee } from "@/components/reviews-marquee";
import { MaterialsSection } from "@/components/materials-section";
import { IntroSequence } from "@/components/intro-sequence";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nil Mobilya | Modern ve Yüksek Kaliteli Mobilya" },
      { name: "description", content: "Nil Mobilya ile modern çizgiler, seçkin malzemeler ve yüksek kaliteli işçilik yaşam alanlarınıza değer katsın." },
      { property: "og:title", content: "Nil Mobilya | Zamansız Yaşam Alanları" },
      { property: "og:description", content: "Modern çizgileri yüksek kaliteli işçilikle buluşturan seçkin mobilya koleksiyonu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const preview = useHoverPreview();

  const handleDepth = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * -14;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -10;
    const image = event.currentTarget.querySelector<HTMLElement>("[data-depth]");
    image?.style.setProperty("--shift-x", `${x}px`);
    image?.style.setProperty("--shift-y", `${y}px`);
  };

  const resetDepth = (event: PointerEvent<HTMLElement>) => {
    const image = event.currentTarget.querySelector<HTMLElement>("[data-depth]");
    image?.style.setProperty("--shift-x", "0px");
    image?.style.setProperty("--shift-y", "0px");
  };

  return (
    <main className="marble-water page-cinematic-reveal min-h-screen bg-background text-foreground">
      <IntroSequence />
      {preview.overlay}
      <section
        className="relative flex min-h-[92svh] flex-col overflow-hidden border-b border-border"
        onPointerMove={handleDepth}
        onPointerLeave={resetDepth}
      >
        <img
          data-depth
          src={heroImage}
          alt="Nil Mobilya modern oturma odası koleksiyonu"
          width={1920}
          height={1280}
          className="image-depth absolute inset-0 h-full w-full object-contain object-center [--depth-scale:1]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_82%,transparent)_34%,color-mix(in_oklab,var(--background)_20%,transparent)_72%,color-mix(in_oklab,var(--background)_48%,transparent)_100%)]" />
        <header className="relative z-20 flex h-20 items-center justify-between border-b border-foreground/15 px-5 md:h-24 md:px-12 lg:px-20">
          <a href="#top" aria-label="Nil Mobilya ana sayfa" className="font-display text-2xl font-medium uppercase text-foreground md:text-3xl">
            Nil <span className="text-primary">Mobilya</span>
          </a>
          <nav className="hidden items-center gap-10 text-xs font-medium uppercase text-foreground/80 md:flex" aria-label="Ana menü">
            <a href="#koleksiyon" className="transition-colors hover:text-primary">Koleksiyon</a>
            <a href="#hikaye" className="transition-colors hover:text-primary">Hikâyemiz</a>
            <a href="#iletisim" className="transition-colors hover:text-primary">İletişim</a>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </header>

        {menuOpen && (
          <nav className="absolute inset-x-0 top-20 z-30 flex flex-col border-b border-border bg-background p-6 text-sm uppercase md:hidden" aria-label="Mobil menü">
            {[["Koleksiyon", "#koleksiyon"], ["Hikâyemiz", "#hikaye"], ["İletişim", "#iletisim"]].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-border py-5 last:border-0">{label}</a>
            ))}
          </nav>
        )}

        <div id="top" className="relative z-10 flex flex-1 items-end px-5 pb-12 pt-24 md:px-12 md:pb-16 lg:px-20">
          <div className="reveal-up max-w-xl">
            <p className="mb-5 text-[10px] font-semibold uppercase text-primary md:text-xs">Est. 2008 · İstanbul</p>
            <h1 className="font-display text-6xl font-medium leading-[0.86] text-foreground sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              Nil<br />Mobilya
            </h1>
            <p className="mt-7 max-w-md text-sm font-light leading-7 text-foreground/75 md:text-base">
              Modern çizgileri yüksek kaliteli malzemeler ve ustalıkla buluşturarak, zamana değer katan yaşam alanları tasarlıyoruz.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button asChild variant="gold" size="lg" className="h-12 px-6 text-xs uppercase">
                <a href="#koleksiyon">Koleksiyonu keşfet <ArrowUpRight /></a>
              </Button>
              <a href="#hikaye" className="flex items-center gap-2 text-xs uppercase text-foreground/80 transition-colors hover:text-primary">
                Tasarım yaklaşımımız <ArrowDown className="size-3" />
              </a>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-between border-t border-foreground/15 px-5 py-4 text-[9px] uppercase text-foreground/60 md:px-12 lg:px-20">
          <span>Form · Doku · Denge</span><span>Özgün yaşam alanları</span>
        </div>
      </section>

      <section id="koleksiyon" className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
          <div><p className="mb-3 text-[10px] font-semibold uppercase text-primary">Seçkimiz</p><h2 className="font-display text-4xl md:text-6xl">Yeni Koleksiyon</h2></div>
          <span className="hidden text-xs text-muted-foreground md:block">2026 / 01—03</span>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {collections.map((item, index) => (
            <article key={item.slug} className={item.number === "01" ? "group md:col-span-2 lg:col-span-6" : "group lg:col-span-3"}>
              <Link
                to="/koleksiyon/$slug"
                params={{ slug: item.slug }}
                className="block cursor-pointer"
                aria-label={`${item.title} koleksiyonunu görüntüle`}
              >
                <div
                  className={`overflow-hidden bg-surface-raised ${index === 0 ? "aspect-[5/4] lg:aspect-[4/5]" : "aspect-[4/5]"}`}
                  onPointerMove={handleDepth}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "touch") return;
                    preview.open(
                      {
                        src: item.hero,
                        alt: `Nil Mobilya ${item.title.toLocaleLowerCase("tr-TR")} koleksiyonu`,
                        title: `${item.number} · ${item.title}`,
                        lines: [item.note, item.description],
                      },
                      event.currentTarget,
                    );
                  }}
                  onPointerLeave={(event) => {
                    resetDepth(event);
                    preview.close();
                  }}
                >
                  <img data-depth src={item.hero} alt={`Nil Mobilya ${item.title.toLocaleLowerCase("tr-TR")} koleksiyonu`} width={1024} height={1280} loading="lazy" className="image-depth h-full w-full object-contain [--depth-scale:1] saturate-[.8] group-hover:saturate-100" />
                </div>
                <div className="flex items-start justify-between border-b border-border py-5 transition-colors group-hover:border-primary/60">
                  <div><span className="text-[10px] text-primary">{item.number}</span><h3 className="mt-1 font-display text-3xl transition-colors group-hover:text-primary">{item.title}</h3><p className="mt-1 text-xs text-muted-foreground">{item.note}</p></div>
                  <ArrowUpRight className="mt-2 size-5 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <MaterialsSection />

      <ReviewsMarquee />

      <section id="hikaye" className="grid border-y border-border md:grid-cols-2">
        <div className="flex min-h-[420px] items-center px-5 py-20 md:px-12 lg:px-20">
          <div className="max-w-xl">
            <p className="mb-5 text-[10px] font-semibold uppercase text-primary">Nil yaklaşımı</p>
            <h2 className="font-display text-4xl leading-tight md:text-6xl">Güzellik, iyi yaşamın sessiz bir parçasıdır.</h2>
          </div>
        </div>
        <div className="flex min-h-[360px] items-end bg-surface-raised px-5 py-16 md:px-12 lg:px-16">
          <div className="max-w-lg">
            <span className="font-display text-7xl text-primary/45">N</span>
            <p className="mt-8 text-sm font-light leading-7 text-ink-soft md:text-base">Her parçayı geçici eğilimlerden uzak, günlük hayatla birlikte güzelleşecek bir obje olarak ele alıyoruz. Malzemeye saygı, dengeli oranlar ve incelikli işçilik tasarımlarımızın temelini oluşturuyor.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="grid border border-primary/30 bg-surface-raised md:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
          <div className="border-b border-border p-7 md:border-b-0 md:border-r md:p-12 lg:p-16">
            <p className="mb-4 text-[10px] font-semibold uppercase text-primary">Özel üretim</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight md:text-6xl">
              Size özel, seçkin ölçekte üretim.
            </h2>
            <p className="mt-6 max-w-xl text-sm font-light leading-7 text-ink-soft md:text-base">
              Bireysel müşteriler için yalnızca yüksek segment özel tasarımlar veya adetli üretim projeleri kabul ediyoruz. Aradığınız çalışma bu kapsama uyuyorsa bizimle iletişime geçin.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-4 p-7 md:p-10 lg:p-12">
            <p className="text-xs uppercase text-muted-foreground">Özel proje hattı</p>
            <Button asChild variant="gold" size="lg" className="h-12 w-full justify-start px-5 text-xs uppercase">
              <a href="tel:+902120000000"><Phone className="size-4" /> 0 (212) 000 00 00</a>
            </Button>
            <Button asChild variant="goldOutline" size="lg" className="h-12 w-full justify-start px-5 text-xs lowercase">
              <a href="mailto:ozel@nilmobilya.com"><Mail className="size-4" /> ozel@nilmobilya.com</a>
            </Button>
            <p className="text-[10px] leading-5 text-muted-foreground">Prototip iletişim bilgileri</p>
          </div>
        </div>
      </section>

      <footer id="iletisim" className="px-5 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div><p className="mb-4 text-xs uppercase text-primary">Yaşam alanınızı birlikte kuralım</p><h2 className="font-display text-5xl md:text-7xl">Bizimle tanışın.</h2></div>
          <Button asChild variant="goldOutline" size="lg" className="h-12 self-start px-6 text-xs uppercase md:self-auto"><a href="#koleksiyon">Koleksiyonu incele <ArrowUpRight /></a></Button>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 text-[10px] uppercase text-muted-foreground md:flex-row md:justify-between"><span>© 2026 Nil Mobilya</span><span>Modern · Nitelikli · Zamansız</span></div>
      </footer>
    </main>
  );
}
