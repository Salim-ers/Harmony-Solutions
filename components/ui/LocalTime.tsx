"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

/** Heure locale (Paris), rafraîchie régulièrement. Côté serveur : « --:-- », pour éviter un écart d’hydratation. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, () => format.format(new Date()), () => "--:--");
  return <time className="tabular-nums">{time}</time>;
}
