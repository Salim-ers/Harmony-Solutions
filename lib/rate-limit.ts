/**
 * Limiteur de débit en mémoire (fenêtre glissante par clé).
 * Suffisant pour une instance unique. Sur une plateforme serverless multi-instances,
 * remplacez-le par un stockage partagé (ex. Upstash Redis) : voir README.
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    const retryAfter = Math.ceil((windowMs - (now - recent[0])) / 1000);
    return { ok: false as const, retryAfter };
  }

  recent.push(now);
  buckets.set(key, recent);

  // Nettoyage opportuniste pour éviter une croissance illimitée.
  if (buckets.size > 5000) {
    for (const [k, times] of buckets) if (times.every((t) => now - t >= windowMs)) buckets.delete(k);
  }
  return { ok: true as const, remaining: limit - recent.length };
}
