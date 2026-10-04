/**
 * FAQ content. Answers marked PLACEHOLDER need confirming against
 * final supplier, delivery and returns information before launch.
 */

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
    id: 'nuv-sizes',
    question: 'What sizes does the Nuv™ come in?',
    answer:
      'Six sizes: 100 × 150, 130 × 160, 120 × 200, 150 × 200, 180 × 200 and 200 × 230 cm. The smallest is a sofa throw; 150 × 200 cm and up cover a double bed.',
  },
  {
    id: 'nook-size',
    // PLACEHOLDER: add a height guide once confirmed with the supplier
    question: 'What length Nook™ should I get?',
    answer: 'The Nook™ comes in 120, 150 and 180 cm lengths. A height guide will be added here before launch.',
  },
  {
    id: 'colours',
    question: 'What colours are available?',
    answer:
      'The Nuv™ comes in Tosca White, Grey, Charcoal, Coffee, Sage and Pink. The Nook™ comes in Light Grey, Navy and Pink.',
  },
  {
    id: 'nuv-care',
    // PLACEHOLDER
    question: 'How do I care for my Nuv™ and Nook™?',
    answer: 'Full care instructions will be added here once confirmed with our supplier.',
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
      'Not always. Each item, including your free gift, ships separately, so they may arrive on different days.',
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
