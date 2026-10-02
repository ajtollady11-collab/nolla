import { Accordion } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import type { FAQItem } from '@/data/faqs';
import { cn } from '@/lib/cn';

/** Reusable FAQ block: used on /faq and (with a subset) on product pages. */
export function FAQ({
  items,
  heading = 'Questions, answered.',
  showAllLink = false,
  className,
}: {
  items: FAQItem[];
  heading?: string;
  showAllLink?: boolean;
  className?: string;
}) {
  return (
    <section className={cn('container-soft py-16 sm:py-24', className)}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <SectionHeading className="max-w-[10ch]">{heading}</SectionHeading>
          {showAllLink && (
            <Button href="/faq" variant="ghost" className="mt-6">
              See all questions
            </Button>
          )}
        </div>
        <Accordion items={items.map((f) => ({ id: f.id, title: f.question, body: f.answer }))} />
      </div>
    </section>
  );
}
