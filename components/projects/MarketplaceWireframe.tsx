/** Maquette filaire desktop + mobile (aucune fausse capture : structure schématique assumée). */
function Line({ w, className = "" }: { w: string; className?: string }) {
  return <span aria-hidden="true" className={`block h-1.5 bg-night/15 ${className}`} style={{ width: w }} />;
}

function ResultRow() {
  return (
    <div className="flex items-center gap-3 border-b border-night/10 py-3">
      <span aria-hidden="true" className="size-9 shrink-0 border border-night/20" />
      <div className="flex-1 space-y-1.5">
        <Line w="55%" className="!bg-night/30" />
        <Line w="80%" />
      </div>
      <span aria-hidden="true" className="h-6 w-14 border border-night/25" />
    </div>
  );
}

export function MarketplaceWireframe({ name }: { name: string }) {
  return (
    <figure>
      <div className="grid items-end gap-8 md:grid-cols-[1fr_11rem]">
        <div className="border border-night/25 bg-paper" aria-hidden="true">
          <div className="flex items-center gap-2 border-b border-night/15 px-3 py-2">
            <span className="size-2 border border-night/30" />
            <span className="h-4 flex-1 border border-night/15" />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg">{name}</span>
              <Line w="30%" />
            </div>
            <div className="mt-5 grid grid-cols-[1fr_1fr_auto] gap-2">
              <span className="t-small flex h-10 items-center border border-night/25 px-3 text-ink-soft">Métier</span>
              <span className="t-small flex h-10 items-center border border-night/25 px-3 text-ink-soft">Ville</span>
              <span className="h-10 w-20 bg-night" />
            </div>
            <div className="mt-5 grid gap-6 sm:grid-cols-[1.4fr_1fr]">
              <div>
                <ResultRow />
                <ResultRow />
                <ResultRow />
              </div>
              <div className="border border-night/15 p-3">
                <Line w="50%" className="!bg-night/30" />
                <div className="mt-3 grid grid-cols-4 gap-1.5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className={`h-6 border ${i === 5 ? "border-gold-deep bg-gold/30" : "border-night/15"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-44 border border-night/30 bg-paper p-2.5 md:mx-0" aria-hidden="true">
          <span className="mx-auto mb-2 block h-1 w-10 bg-night/20" />
          <div className="border border-night/10 p-2.5">
            <span className="font-serif text-sm">{name}</span>
            <span className="mt-2 block h-8 border border-night/25" />
            <ResultRow />
            <ResultRow />
            <span className="mt-3 block h-8 bg-night" />
          </div>
        </div>
      </div>
      <figcaption className="t-small mt-4 text-ink-soft">
        Maquette filaire, desktop et mobile : recherche d’un professionnel, résultats et choix d’un créneau.
      </figcaption>
    </figure>
  );
}
