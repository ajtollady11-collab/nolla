'use client';

import { useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { consentText } from '@/data/marketing';
import { subscribe, type SubscribeSource } from '@/lib/subscribe';
import { markEmailSubmitted } from '@/lib/emailState';
import { cn } from '@/lib/cn';

/** Email field + pill submit, shared by the popup and the quiz. */
export function EmailForm({
  source,
  cta,
  properties,
  onSuccess,
  autoFocus,
  className,
}: {
  source: SubscribeSource;
  cta: string;
  properties?: Record<string, string>;
  onSuccess: (email: string, delivered: boolean) => void;
  autoFocus?: boolean;
  className?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);
    const result = await subscribe(email, source, properties);
    setPending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    markEmailSubmitted(source);
    onSuccess(email.trim(), result.delivered);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('w-full', className)}>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <input
        id={`${id}-email`}
        type="email"
        inputMode="email"
        autoComplete="email"
        autoFocus={autoFocus}
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError(null);
        }}
        placeholder="Email address"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : `${id}-consent`}
        className={cn(
          'h-14 w-full rounded-full border bg-white px-6 text-[1rem] text-charcoal outline-none transition-[border-color,box-shadow] duration-300 ease-soft placeholder:text-charcoal/40',
          'focus:border-charcoal/40 focus:shadow-[0_0_0_4px_rgba(118,95,80,0.12)]',
          error ? 'border-mocha' : 'border-charcoal/[0.12]',
        )}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 px-2 text-xs text-mocha">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="group mt-3 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-charcoal px-8 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-cream shadow-pillow transition-[transform,box-shadow,background-color] duration-300 ease-soft hover:-translate-y-0.5 hover:bg-[#34302d] hover:shadow-lift active:translate-y-0 active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? 'One moment…' : cta}
        {!pending && <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5" aria-hidden />}
      </button>
      <p id={`${id}-consent`} className="mt-3 px-2 text-center text-[0.68rem] leading-relaxed text-charcoal/45">
        {consentText}{' '}
        <a href="/privacy" className="underline decoration-charcoal/20 underline-offset-2 hover:text-charcoal">
          Privacy
        </a>
      </p>
    </form>
  );
}
