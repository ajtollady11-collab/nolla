import type { Metadata } from 'next';
import Link from 'next/link';
import { Accordion } from '@/components/ui/Accordion';
import { FinalCTA } from '@/components/home/FinalCTA';
import { faqs } from '@/data/faqs';

export const metadata: Metadata = { title: 'FAQ' };

export default function FAQPage() {
  return (
    <>
      <section className="container-soft pb-20 pt-8 sm:pb-28 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h1 className="max-w-[12ch] font-serif text-[3.2rem] font-light leading-[0.95] tracking-[-0.045em] sm:text-display-lg">
              Good questions.
            </h1>
            <p className="mt-5 max-w-[40ch] text-lg text-charcoal/70">
              Everything about the Nest™, Nuv™ and Nook™. Can’t find what you need?{' '}
              <Link href="/contact" className="underline decoration-charcoal/25 underline-offset-4 hover:decoration-charcoal">
                Get in touch
              </Link>
              .
            </p>
          </div>
          <Accordion items={faqs.map((f) => ({ id: f.id, title: f.question, body: f.answer }))} defaultOpen={faqs[0].id} />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
