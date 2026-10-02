/**
 * Remembers email-capture state in the browser.
 *  • Submitted (popup OR quiz) → localStorage: never show the popup again.
 *  • Popup closed → sessionStorage: don't show it again this visit.
 * All access is guarded: storage can be unavailable (private browsing).
 */

const SUBMITTED_KEY = 'nolla-email-submitted';
const DISMISSED_KEY = 'nolla-popup-dismissed';

function read(store: 'local' | 'session', key: string): string | null {
  try {
    return (store === 'local' ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function write(store: 'local' | 'session', key: string, value: string) {
  try {
    (store === 'local' ? window.localStorage : window.sessionStorage).setItem(key, value);
  } catch {
    /* ignore */
  }
}

export function hasSubmittedEmail(): boolean {
  return read('local', SUBMITTED_KEY) !== null;
}

export function markEmailSubmitted(source: 'popup' | 'quiz') {
  write('local', SUBMITTED_KEY, JSON.stringify({ source, at: new Date().toISOString() }));
}

export function wasPopupDismissed(): boolean {
  return read('session', DISMISSED_KEY) !== null;
}

/** Testing helper: forget sign-up + dismissal on this browser (used by ?popup=reset) */
export function resetEmailState() {
  try {
    window.localStorage.removeItem(SUBMITTED_KEY);
    window.sessionStorage.removeItem(DISMISSED_KEY);
  } catch {
    /* ignore */
  }
}

export function markPopupDismissed() {
  write('session', DISMISSED_KEY, '1');
}
