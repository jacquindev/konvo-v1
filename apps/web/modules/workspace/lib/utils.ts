// auto-format: "stripe-connect" -> "Stripe Connect"
export function formatSegment(segment: string) {
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
