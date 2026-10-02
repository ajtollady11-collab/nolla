'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EmailForm } from './EmailForm';
import { DiscountCode } from './DiscountCode';
import { SmartImage } from '@/components/ui/SmartImage';
import { TM } from '@/components/ui/TM';
import { popupCopy, quizGate, quizQuestions, scoreQuiz, type Personality } from '@/data/marketing';
import { products, primaryImage } from '@/data/products';
import { cn } from '@/lib/cn';

type Step = { kind: 'intro' } | { kind: 'question'; index: number } | { kind: 'gate' } | { kind: 'result' };

const TOTAL = quizQuestions.length;
/** Every step's heading uses this id so the dialog is always labelled by what's on screen */
export const QUIZ_TITLE_ID = 'nolla-popup-title';

/**
 * The 10% popup's content: intro → 4 questions → email gate → result + code.
 * The email field only appears once the quiz is complete.
 */
export function CosyQuiz({
  scrollRef,
  onClose,
}: {
  /** The popup's scrolling element, reset to the top on each step */
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>({ kind: 'intro' });
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<Personality | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const advanceTimer = useRef<number | undefined>(undefined);
  const firstStep = useRef(true);

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  useEffect(() => {
    if (firstStep.current) {
      firstStep.current = false;
      return;
    }
    scrollRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, scrollRef]);

  function choose(index: number, optionIndex: number) {
    if (picked !== null) return;
    setPicked(optionIndex);
    const next = [...answers.slice(0, index), optionIndex];
    setAnswers(next);
    advanceTimer.current = window.setTimeout(() => {
      setPicked(null);
      if (index + 1 < TOTAL) {
        setStep({ kind: 'question', index: index + 1 });
      } else {
        setResult(scoreQuiz(next));
        setStep({ kind: 'gate' });
      }
    }, 380);
  }

  function back() {
    if (step.kind === 'question') setStep(step.index === 0 ? { kind: 'intro' } : { kind: 'question', index: step.index - 1 });
    else if (step.kind === 'gate') setStep({ kind: 'question', index: TOTAL - 1 });
  }

  const inQuiz = step.kind === 'question' || step.kind === 'gate';
  const progress = step.kind === 'question' ? (step.index + 1) / (TOTAL + 1) : 1;
  const stepKey = step.kind === 'question' ? `q${step.index}` : step.kind;

  return (
    <div>
      {/* Progress: back arrow, hairline, count. Only while answering */}
      {inQuiz && (
        <div className="mb-7 flex items-center gap-3 pr-8">
          <button
            type="button"
            onClick={back}
            aria-label="Previous question"
            className="-ml-2 grid h-8 w-8 shrink-0 place-items-center rounded-full text-charcoal/55 transition-colors hover:bg-white hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} aria-hidden />
          </button>
          <div
            className="h-px flex-1 overflow-hidden bg-charcoal/10"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={TOTAL}
            aria-valuenow={step.kind === 'question' ? step.index + 1 : TOTAL}
          >
            <div className="h-full bg-charcoal transition-[width] duration-700 ease-soft" style={{ width: `${progress * 100}%` }} />
          </div>
          <span className="w-8 shrink-0 text-right text-[0.7rem] tabular-nums text-charcoal/50">
            {step.kind === 'question' ? `${step.index + 1}/${TOTAL}` : `${TOTAL}/${TOTAL}`}
          </span>
        </div>
      )}

      <div key={stepKey} className="animate-rise" style={{ animationDuration: '0.6s' }}>
        {step.kind === 'intro' && (
          <div className="text-center">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-mocha">{popupCopy.eyebrow}</p>
            <h2
              id={QUIZ_TITLE_ID}
              ref={headingRef}
              tabIndex={-1}
              className="mx-auto mt-4 max-w-[13ch] font-serif text-[2.1rem] font-light leading-[1] tracking-[-0.035em] outline-none"
            >
              {popupCopy.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[32ch] text-[0.92rem] leading-relaxed text-charcoal/65">{popupCopy.body}</p>
            <button
              type="button"
              onClick={() => setStep({ kind: 'question', index: 0 })}
              className="group mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-charcoal px-8 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-cream shadow-pillow transition-[transform,box-shadow,background-color] duration-300 ease-soft hover:-translate-y-0.5 hover:bg-[#34302d] hover:shadow-lift active:scale-[0.98]"
            >
              {popupCopy.start}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5" aria-hidden />
            </button>
            <p className="mt-3 text-[0.7rem] text-charcoal/45">{popupCopy.note}</p>
          </div>
        )}

        {step.kind === 'question' && (
          <fieldset>
            <legend className="contents">
              <h2
                id={QUIZ_TITLE_ID}
                ref={headingRef}
                tabIndex={-1}
                className="font-serif text-[1.75rem] font-light leading-[1.05] tracking-[-0.03em] outline-none"
              >
                {quizQuestions[step.index].question}
              </h2>
            </legend>
            <div className="mt-6 border-t border-charcoal/10">
              {quizQuestions[step.index].options.map((opt, i) => {
                const isPicked = picked === i;
                const wasAnswer = picked === null && answers[step.index] === i;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => choose(step.index, i)}
                    aria-pressed={isPicked || wasAnswer}
                    className={cn(
                      'group flex w-full items-center justify-between gap-4 border-b border-charcoal/10 px-0.5 py-4 text-left text-[0.98rem] transition-[color,padding,opacity] duration-300 ease-soft',
                      isPicked ? 'pl-2.5 text-charcoal' : 'text-charcoal/80 hover:pl-2.5 hover:text-charcoal',
                      picked !== null && !isPicked && 'opacity-40',
                    )}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={cn(
                        'grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-[background-color,border-color] duration-300',
                        isPicked || wasAnswer ? 'border-charcoal bg-charcoal' : 'border-charcoal/20 group-hover:border-charcoal/50',
                      )}
                      aria-hidden
                    >
                      {(isPicked || wasAnswer) && <span className="h-1.5 w-1.5 rounded-full bg-cream" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step.kind === 'gate' && (
          <div className="text-center">
            <h2
              id={QUIZ_TITLE_ID}
              ref={headingRef}
              tabIndex={-1}
              className="mx-auto max-w-[12ch] font-serif text-[2.1rem] font-light leading-[1] tracking-[-0.035em] outline-none"
            >
              {quizGate.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[32ch] text-[0.92rem] leading-relaxed text-charcoal/65">{quizGate.body}</p>
            <EmailForm
              source="quiz"
              cta={quizGate.cta}
              properties={result ? { nolla_personality: result.name } : undefined}
              onSuccess={() => setStep({ kind: 'result' })}
              className="mt-7"
            />
          </div>
        )}

        {step.kind === 'result' && result && <QuizResult result={result} headingRef={headingRef} onClose={onClose} />}
      </div>
    </div>
  );
}

function QuizResult({
  result,
  headingRef,
  onClose,
}: {
  result: Personality;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onClose: () => void;
}) {
  const product = products[result.product];
  const img = primaryImage(product);
  return (
    <div className="text-center">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-mocha">Your cosy personality</p>
      <h2
        id={QUIZ_TITLE_ID}
        ref={headingRef}
        tabIndex={-1}
        className="mx-auto mt-4 max-w-[12ch] font-serif text-[2.3rem] font-light leading-[0.98] tracking-[-0.04em] outline-none"
      >
        You’re a {result.name}.
      </h2>
      <p className="mx-auto mt-4 max-w-[34ch] text-[0.94rem] leading-relaxed text-charcoal/70">{result.description}</p>

      <div className="mt-7 border-t border-charcoal/10 pt-6">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-charcoal/50">Your perfect Nolla</p>
        <div className="mt-4 flex items-center gap-4 text-left">
          <Link
            href={`/products/${product.slug}`}
            onClick={onClose}
            className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-2xl bg-oat-soft"
          >
            <SmartImage src={img.src} alt={img.alt} fill sizes="80px" className="object-cover" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-[1.6rem] font-light uppercase leading-none tracking-[-0.02em]">
              <TM>{product.shortName}</TM>
            </p>
            <p className="mt-1.5 text-[0.8rem] leading-snug text-charcoal/60">{product.positioning}</p>
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="mt-3 inline-flex h-10 items-center rounded-full bg-charcoal px-5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-cream shadow-pillow transition-[transform,box-shadow] duration-300 ease-soft hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.98]"
            >
              <span>
                Shop <TM>{product.shortName}</TM>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <DiscountCode className="mt-7" />

      <button
        type="button"
        onClick={onClose}
        className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-charcoal/60 underline decoration-charcoal/20 underline-offset-[6px] transition-colors hover:text-charcoal"
      >
        Continue shopping
      </button>
    </div>
  );
}
