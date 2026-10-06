import Link from 'next/link';

/** Thin announcement bar above the header, on every page. */
export function PromoBar() {
  return (
    <div className="bg-charcoal text-cream">
      <Link
        href="/#gift"
        className="mx-auto flex min-h-9 max-w-[1320px] items-center justify-center gap-2 whitespace-nowrap px-3 py-2 text-center text-[0.6rem] font-medium uppercase tracking-[0.08em] min-[400px]:text-[0.64rem] min-[400px]:tracking-[0.12em] transition-opacity hover:opacity-80 sm:text-[0.7rem] sm:tracking-[0.14em]"
      >
        <span>Free Nimbus™ with every order</span>
        <span className="text-cream/40" aria-hidden>
          ·
        </span>
        <span>Free UK delivery</span>
      </Link>
    </div>
  );
}
