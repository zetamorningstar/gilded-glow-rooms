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
    <figure className="w-[300px] shrink-0 border border-border bg-surface-raised/80 p-7 backdrop-blur-sm transition-colors hover:border-primary/50 md:w-[380px]">
      <span className="font-display text-4xl leading-none text-primary/50">“</span>
      <blockquote className="mt-3 text-sm font-light leading-7 text-ink-soft">{review.text}</blockquote>
      <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-4 text-[10px] uppercase tracking-[0.18em]">
        <span className="text-foreground/85">{review.name}</span>
        <span className="text-muted-foreground">{review.city}</span>
      </figcaption>
    </figure>
  );
}

export function ReviewsMarquee() {
  const loop = [...reviews, ...reviews];

  return (
    <section
      id="yorumlar"
      aria-label="Müşteri yorumları"
      className="border-y border-border bg-muted/40 py-16 md:py-24"
    >
      <div className="mb-10 flex items-end justify-between px-5 md:px-12 lg:px-20">
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Yaşayanlar anlatıyor</p>
          <h2 className="font-display text-4xl md:text-6xl">Müşteri Yorumları</h2>
        </div>
        <span className="hidden text-xs text-muted-foreground md:block">Örnek yorumlar</span>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex w-max gap-6 px-6 group-hover:[animation-play-state:paused]">
          {loop.map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
