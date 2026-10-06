/** FAQ content. Keep answers consistent with data/legal.ts and data/site.ts. */

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    id: 'what-is-nest',
    question: 'What is the Nolla Nest™?',
    answer:
      'The Nolla Nest™ is our bundle: our largest Nuv™ faux-fur blanket (200 × 230 cm) and our largest Nook™ hooded blanket (180 cm) together for £109.99. Bought separately they’d cost £124.98, so you save £14.99.',
  },
  {
    id: 'whats-included',
    question: 'What’s included in the Nest™?',
    answer:
      'One Nuv™ blanket (200 × 230 cm) and one Nook™ hooded blanket (180 cm), each in the colour you choose. Plus your free Nimbus™ cloud pillow.',
  },
  {
    id: 'free-gift',
    question: 'How does the free gift work?',
    answer:
      'Every order comes with a free Nimbus™ cloud pillow. You don’t need a code: it’s added to your order automatically, whatever you buy.',
  },
  {
    id: 'nuv-material',
    question: 'What is the Nuv™ made from?',
    answer:
      'The Nuv™ is a dense faux rabbit-fur velvet (no real fur) with a soft, rippled surface. It’s thick and weighty: our largest size is about 2.8 kg.',
  },
  {
    id: 'nuv-sizes',
    question: 'What sizes does the Nuv™ come in?',
    answer:
      'Six sizes: 100 × 150, 130 × 160, 120 × 200, 150 × 200, 180 × 200 and 200 × 230 cm. The smallest is a sofa throw; 150 × 200 cm and up cover a double bed.',
  },
  {
    id: 'nook-size',
    question: 'What length Nook™ should I get?',
    answer:
      'As a rough guide: 120 cm for kids, 150 cm for teens and petite adults, and 180 cm for most adults. Sizes are approximate, so if you’re unsure, email us and we’ll help you choose.',
  },
  {
    id: 'colours',
    question: 'What colours are available?',
    answer:
      'The Nuv™ comes in Tosca White, Grey, Charcoal, Coffee, Sage and Pink. The Nook™ comes in Light Grey, Navy and Pink.',
  },
  {
    id: 'delivery',
    question: 'How much is delivery, and how long does it take?',
    answer:
      'UK delivery is free and usually takes 5–11 working days. Outside the UK, standard delivery is £6.71 and express insured shipping is £11.13.',
  },
  {
    id: 'separate',
    question: 'Will everything arrive together?',
    answer:
      'Usually, but not always. Your order may arrive in more than one package, and you may get separate tracking for each. Your free gift may also arrive on its own.',
  },
  {
    id: 'returns',
    question: 'Do you offer returns?',
    answer:
      'Yes. You can cancel your order for any reason within 14 days of receiving it, and you can keep your free Nimbus™ pillow. Faulty or wrong items are on us. Full details are on our Shipping & Returns page.',
  },
];

/** Pick a subset of FAQs by id (used on product pages). */
export function faqsById(ids: string[]): FAQItem[] {
  return ids.map((id) => faqs.find((f) => f.id === id)).filter((f): f is FAQItem => Boolean(f));
}
