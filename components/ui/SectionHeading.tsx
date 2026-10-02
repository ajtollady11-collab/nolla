import { cn } from '@/lib/cn';

export function SectionHeading({
  children,
  as: Tag = 'h2',
  size = 'md',
  className,
}: {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizes = {
    sm: 'text-[2rem] leading-[1.05] sm:text-[2.5rem]',
    md: 'text-[2.4rem] leading-[1.02] sm:text-display-sm lg:text-display-md',
    lg: 'text-[2.9rem] leading-[0.98] sm:text-display-md lg:text-display-lg',
  };
  return <Tag className={cn('font-serif font-light tracking-[-0.03em] text-charcoal', sizes[size], className)}>{children}</Tag>;
}
