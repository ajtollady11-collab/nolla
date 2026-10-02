import { Button } from '@/components/ui/Button';

/** Simple placeholder layout for policy/contact pages until real copy is supplied. */
export function InfoPage({ title, intro, children }: { title: string; intro: string; children?: React.ReactNode }) {
  return (
    <section className="container-soft pb-24 pt-8 sm:pt-14">
      <div className="max-w-2xl">
        <h1 className="font-serif text-[3rem] font-light leading-[0.95] tracking-[-0.045em] sm:text-display-md">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-charcoal/70">{intro}</p>
        <div className="mt-10 rounded-5xl bg-white/70 p-7 text-[0.95rem] leading-relaxed text-charcoal/70 shadow-inner sm:p-9">
          {children ?? <p>Full content for this page will be added before launch.</p>}
        </div>
        <Button href="/" variant="ghost" className="mt-8">
          Back to home
        </Button>
      </div>
    </section>
  );
}
