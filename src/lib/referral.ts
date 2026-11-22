// Referral links: gtstv.live/signup?plan=trial-free&ref=<their TV username>
// The ref is remembered in this browser so it's still there when the friend starts the trial.
const KEY = 'gts_ref'

export function referralLink(tvUsername: string): string {
  return `https://gtstv.live/signup?plan=trial-free&ref=${encodeURIComponent(tvUsername)}`
}

export function saveRefFromUrl(): void {
  try {
    const ref = new URLSearchParams(window.location.search).get('ref')
    if (ref && ref.trim().length > 0 && ref.length <= 64) window.localStorage.setItem(KEY, ref.trim())
  } catch {}
}

export function getSavedRef(): string {
  try {
    return window.localStorage.getItem(KEY) || ''
  } catch {
    return ''
  }
}

export function clearSavedRef(): void {
  try {
    window.localStorage.removeItem(KEY)
  } catch {}
}
