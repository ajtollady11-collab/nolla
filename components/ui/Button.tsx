import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'soft' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-semibold uppercase tracking-[0.08em] ' +
  'transition-[transform,box-shadow,background-color,color,text-decoration-color] duration-300 ease-soft ' +
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-charcoal text-cream shadow-pillow hover:shadow-lift hover:bg-[#34302d]',
  secondary: 'bg-white text-charcoal shadow-pillow hover:shadow-lift',
  soft: 'bg-oat text-charcoal hover:bg-[#dfd0bd] hover:shadow-pillow',
  ghost:
    'bg-transparent px-1 py-2 text-[0.72rem] text-charcoal/80 underline decoration-charcoal/25 underline-offset-[6px] hover:text-charcoal hover:decoration-charcoal',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-[0.7rem]',
  md: 'h-12 px-7 text-[0.74rem]',
  lg: 'h-[3.75rem] px-9 text-[0.8rem]',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * Pill button used for every CTA. Renders a Next <Link> when `href` is given.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(props, ref) {
  const { variant = 'primary', size = 'md', fullWidth, className, children, ...rest } = props;
  const classes = cn(base, variants[variant], variant !== 'ghost' && sizes[size], fullWidth && 'w-full', className);

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<ButtonAsLink, keyof CommonProps> & { href: string };
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { type = 'button', ...buttonRest } = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
});
