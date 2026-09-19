import { materials } from "@/lib/materials";

export function MaterialsSection() {
  return (
    <section
      id="malzeme"
      aria-label="Malzeme ve doku"
      className="border-t border-border px-5 pb-20 md:px-12 lg:px-20"
    >
      <div className="mb-10 flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Malzeme künyesi</p>
          <h2 className="font-display text-4xl md:text-6xl">Malzeme ve Doku</h2>
        </div>
        <span className="hidden max-w-xs text-xs leading-5 text-muted-foreground md:block">
          Her parçanın arkasındaki hammadde, neden seçildiği ve nereden geldiği.
        </span>
      </div>

      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {materials.map((material) => (
          <article key={material.name} className="group">
            <div className="overflow-hidden bg-surface-raised">
              <img
                src={material.image}
                alt={`${material.name} dokusu yakın çekim`}
                width={1280}
                height={960}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.75,.2,1)] group-hover:scale-[1.05]"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-border pb-4">
              <h3 className="font-display text-2xl md:text-3xl">{material.name}</h3>
              <span className="text-[10px] uppercase tracking-[0.18em] text-primary">{material.origin}</span>
            </div>
            <p className="mt-4 text-sm font-light leading-7 text-ink-soft">{material.why}</p>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              <span className="text-primary/80">Temin: </span>
              {material.source}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
