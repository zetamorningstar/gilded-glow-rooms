import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

interface Review {
  name: string;
  city: string;
  text: string;
}

const reviews: Review[] = [
  {
    name: "Elif Arslan",
    city: "İstanbul",
    text: "Salonumuzun tamamını Nil Mobilya ile yeniledik. Oranlar ve kumaş dokusu beklediğimizin çok üzerinde çıktı.",
  },
  {
    name: "Mert Şahin",
    city: "Ankara",
    text: "Ceviz yemek masası tam ölçüsünde üretildi. İşçilik detayları gerçekten el yapımı hissi veriyor.",
  },
  {
    name: "Selin Yıldırım",
    city: "İzmir",
    text: "Okuma köşesi berjerimi iki yıldır kullanıyorum, formu ilk günkü gibi duruyor.",
  },
  {
    name: "Kaan Demir",
    city: "Bursa",
    text: "Ofisimiz için adetli üretim yaptılar. Teslim süresi ve renk tutarlılığı kusursuzdu.",
  },
  {
    name: "Duygu Çetin",
    city: "İstanbul",
    text: "Modüler köşe takımı dar bir alanı ferah gösterdi. Tasarım ekibinin yönlendirmesi çok değerliydi.",
  },
  {
    name: "Ahmet Korkmaz",
    city: "Antalya",
    text: "Kadife döşemenin tonu evdeki ışıkla birebir uyumlu geldi. Sessiz ama güçlü bir duruşu var.",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="w-[300px] shrink-0 border border-border bg-surface-raised/75 p-7 backdrop-blur-sm transition-colors hover:border-primary/50 md:w-[380px]">
      <span className="font-display text-4xl leading-none text-primary/50">“</span>
      <blockquote className="mt-3 select-none text-sm font-light leading-7 text-ink-soft">{review.text}</blockquote>
      <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-4 text-[10px] uppercase tracking-[0.18em]">
        <span className="text-foreground/85">{review.name}</span>
        <span className="text-muted-foreground">{review.city}</span>
      </figcaption>
    </figure>
  );
}

export function ReviewsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const loopWidth = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const measure = () => {
      loopWidth.current = track.scrollWidth / 2;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);

    const tick = () => {
      const width = loopWidth.current || 1;
      if (!dragging.current) {
        // Fare hızından gelen ivme sönümlenir, ardından yavaş akış devam eder
        offset.current -= velocity.current;
        velocity.current *= 0.94;
        if (Math.abs(velocity.current) < 0.05) {
          velocity.current = 0;
          if (!reduced) offset.current -= 0.35;
        }
      }
      if (offset.current <= -width) offset.current += width;
      if (offset.current > 0) offset.current -= width;
      track.style.transform = `translate3d(${offset.current}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const lastX = useRef(0);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    velocity.current = 0;
    lastX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const delta = event.clientX - lastX.current;
    lastX.current = event.clientX;
    if (dragging.current) {
      offset.current += delta;
      velocity.current = -delta;
    } else if (event.pointerType !== "touch") {
      // Sürüklemeden de fare hızına göre ileri/geri yönlenir
      velocity.current += -delta * 0.06;
      velocity.current = Math.max(-18, Math.min(18, velocity.current));
    }
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const loop = [...reviews, ...reviews];

  return (
    <section
      id="yorumlar"
      aria-label="Müşteri yorumları"
      className="border-y border-border bg-muted/30 py-16 md:py-24"
    >
      <div className="mb-10 flex items-end justify-between px-5 md:px-12 lg:px-20">
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Yaşayanlar anlatıyor</p>
          <h2 className="font-display text-4xl md:text-6xl">Müşteri Yorumları</h2>
        </div>
        <span className="hidden text-xs text-muted-foreground md:block">Sürükleyin · örnek yorumlar</span>
      </div>

      <div
        className="relative cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div ref={trackRef} className="flex w-max gap-6 px-6 will-change-transform">
          {loop.map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
