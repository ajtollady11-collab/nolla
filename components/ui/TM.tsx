import { Fragment } from 'react';

/**
 * Renders a product name with a refined, smaller ™ mark.
 * At display sizes the serif's default ™ is heavy and shouts.
 */
export function TM({ children }: { children: string }) {
  const parts = children.split('™');
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <span aria-hidden className="relative -top-[0.9em] ml-[0.04em] font-sans text-[0.28em] font-medium tracking-normal">
              TM
            </span>
          )}
        </Fragment>
      ))}
      {parts.length > 1 && <span className="sr-only">™</span>}
    </>
  );
}
