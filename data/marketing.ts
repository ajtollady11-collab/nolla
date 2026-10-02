import type { ProductSlug } from './products';

/**
 * ─────────────────────────────────────────────────────────────
 *  EMAIL CAPTURE + QUIZ CONTENT
 *  All wording for the cosy quiz, the 10% popup and the discount
 *  reveal lives here. Edit freely; components read from this file.
 * ─────────────────────────────────────────────────────────────
 */

/** The code shown after the quiz */
export const discount = {
  code: 'NOLLA10',
  label: '10% off',
  howToUse: 'Enter it in your cart before checkout.',
};

/**
 * Valid discount codes, applied to the Square order by the server.
 * Percentages apply to products only (not delivery).
 * NOTE: codes aren't limited to one use per customer yet; anyone with the code can use it.
 */
export const discountCodes: Record<string, { percent: number; label: string }> = {
  NOLLA10: { percent: 10, label: '10% off' },
};

/**
 * Email platform. Leave `klaviyoPublicKey` null and emails are NOT sent
 * anywhere (the site still shows the code). To collect emails for real:
 *   Klaviyo → Settings → API keys → copy the *Public* API key (Site ID),
 *   and the ID of the list to add people to (Lists → your list → Settings).
 * The public key is designed to sit in website code; never paste a private key here.
 */
export const emailPlatform = {
  klaviyoPublicKey: 'YgSsS7' as string | null,
  klaviyoListId: 'VuEfbt' as string | null,
};

/** Consent line shown under every email field (UK PECR/GDPR: be clear what they're signing up for). */
export const consentText = 'By signing up you agree to receive emails from nolla. Unsubscribe any time.';

/** First screen of the popup, before the quiz starts */
export const popupCopy = {
  eyebrow: 'Before you get cosy…',
  title: 'Take 10% off your first Nolla.',
  body: 'Find out what kind of cosy you are. Four quick questions, then we’ll reveal your Nolla personality and unlock 10% off your first order.',
  start: 'Find my cosy',
  note: 'Takes under a minute',
};

/**
 * When the popup may appear (whichever comes first):
 *  • `delayMs` after landing on the site (no scrolling needed)
 *  • after scrolling `scrollDepth` of a page
 *  • desktop exit intent (cursor leaves through the top of the window)
 * If the cart or menu is open at that moment, it waits until they're closed.
 */
export const popupTriggers = {
  delayMs: 3_000,
  scrollDepth: 0.55,
  exitIntentMinMs: 3_000,
  /** Never shown on these paths */
  excludePaths: [] as string[],
};

/* ───────────────────────────── QUIZ ───────────────────────────── */

export type PersonalityId = 'nestler' | 'hibernator' | 'snuggler' | 'dreamer';

export type QuizOption = { label: string; scores: Partial<Record<PersonalityId, number>> };
export type QuizQuestion = { id: string; question: string; options: QuizOption[] };

export const quizGate = {
  title: 'Want to see your result?',
  body: 'Enter your email and we’ll reveal your cosy personality + give you 10% off your first Nolla.',
  cta: 'Reveal my result',
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'friday',
    question: 'What’s your ideal Friday night?',
    options: [
      { label: 'Movie marathon', scores: { snuggler: 2 } },
      { label: 'Gaming until 2am', scores: { hibernator: 2 } },
      { label: 'Reading with a hot drink', scores: { dreamer: 2 } },
      { label: 'Everyone round mine', scores: { nestler: 2 } },
    ],
  },
  {
    id: 'company',
    question: 'Who are you usually getting cosy with?',
    options: [
      { label: 'Just me', scores: { hibernator: 1, dreamer: 1 } },
      { label: 'My partner', scores: { snuggler: 2 } },
      { label: 'Family', scores: { nestler: 2 } },
      { label: 'Friends', scores: { nestler: 1, snuggler: 1 } },
    ],
  },
  {
    id: 'setting',
    question: 'Pick your perfect winter setting:',
    options: [
      { label: 'Sofa + movie', scores: { snuggler: 2 } },
      { label: 'Bed + book', scores: { dreamer: 2 } },
      { label: 'Fireplace + hot chocolate', scores: { hibernator: 1, dreamer: 1 } },
      { label: 'Friends + snacks', scores: { nestler: 2 } },
    ],
  },
  {
    id: 'moment',
    question: 'Your perfect Nolla moment?',
    options: [
      { label: 'A quiet night alone', scores: { hibernator: 2 } },
      { label: 'A movie with someone I love', scores: { snuggler: 2 } },
      { label: 'Family time', scores: { nestler: 2 } },
      { label: 'A house full of friends', scores: { nestler: 2 } },
    ],
  },
];

export type Personality = {
  id: PersonalityId;
  name: string;
  description: string;
  /** "Your perfect Nolla". Currently the Nuv™ for everyone; change per result if you like. */
  product: ProductSlug;
};

export const personalities: Record<PersonalityId, Personality> = {
  nestler: {
    id: 'nestler',
    name: 'Nolla Nestler',
    description:
      'You don’t need plans. You need a sofa, your favourite people and approximately 14 hours of uninterrupted comfort.',
    product: 'nolla-nuv',
  },
  hibernator: {
    id: 'hibernator',
    name: 'Nolla Hibernator',
    description:
      'Plans cancelled, phone on silent, snacks within reach. You’ve turned disappearing under a blanket until roughly March into an art form.',
    product: 'nolla-nuv',
  },
  snuggler: {
    id: 'snuggler',
    name: 'Nolla Snuggler',
    description:
      'Cosy is better shared. One blanket, two people, a film you’ve both seen four times and a strict “one more episode” policy.',
    product: 'nolla-nuv',
  },
  dreamer: {
    id: 'dreamer',
    name: 'Nolla Dreamer',
    description:
      'A good book, a hot drink going cold beside you and absolutely nowhere to be. You were made for slow evenings.',
    product: 'nolla-nuv',
  },
};

/**
 * Highest total score wins. Ties go to whichever tied personality the
 * final answer pointed at, so the result always feels like *their* answer.
 */
export function scoreQuiz(answers: number[]): Personality {
  const totals: Record<PersonalityId, number> = { nestler: 0, hibernator: 0, snuggler: 0, dreamer: 0 };
  answers.forEach((optionIndex, q) => {
    const scores = quizQuestions[q]?.options[optionIndex]?.scores ?? {};
    for (const [id, n] of Object.entries(scores)) totals[id as PersonalityId] += n ?? 0;
  });
  const best = Math.max(...Object.values(totals));
  const tied = (Object.keys(totals) as PersonalityId[]).filter((id) => totals[id] === best);
  if (tied.length === 1) return personalities[tied[0]];
  for (let q = answers.length - 1; q >= 0; q--) {
    const scores = quizQuestions[q].options[answers[q]].scores;
    const pick = tied.find((id) => (scores[id] ?? 0) > 0);
    if (pick) return personalities[pick];
  }
  return personalities[tied[0]];
}
