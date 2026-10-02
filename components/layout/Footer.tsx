import Link from 'next/link';
import { Logo } from './Logo';
import { SocialIcon } from '@/components/ui/SocialIcons';
import { footerLinks, site, socials } from '@/data/site';

export function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-[1320px] rounded-5xl bg-white/60 px-6 pb-8 pt-14 sm:px-10 lg:px-14 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo size="lg" />
            <p className="mt-3 font-serif text-xl font-light text-charcoal/70">{site.tagline}</p>
            <ul className="mt-8 flex gap-2">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`nolla on ${s.name}`}
                    className="grid h-11 w-11 place-items-center rounded-full bg-cream text-charcoal/80 transition-[transform,color,background-color] duration-300 ease-soft hover:-translate-y-0.5 hover:bg-oat hover:text-charcoal"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <p className="text-sm text-charcoal/45">{group.title}</p>
                <ul className="mt-4 space-y-3">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.95rem] text-charcoal/80 transition-colors hover:text-charcoal">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-charcoal/10 pt-6 text-xs text-charcoal/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} nolla. All rights reserved.</p>
          <p>Nuv™, Nook™ and Nest™ are trademarks of nolla.</p>
        </div>
      </div>
    </footer>
  );
}
