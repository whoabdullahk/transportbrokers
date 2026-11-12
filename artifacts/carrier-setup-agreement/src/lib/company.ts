// Broker details shown on the Carrier Setup & Freight Brokering Agreement.
export const COMPANY = {
  initials: "GS",
  name: "GOLD STAR TRANSPORTATION, INC.",
  tagline: "Premier Logistics & Carrier Network",
  mcNumber: "MC179608",
  mcDisplay: "MC-179608",
  dotNumber: "253494",
  serviceDate: "May 21, 2022",
  address: "9424 REEDS ROAD, OVERLAND PARK, KS 66207",
  phone: "+1 (917) 672-3364",
  onboardingEmail: "brandontaylor@goldstartranposrtationinc.com",
  billingEmail: "brandontaylor@goldstartranposrtationinc.com",
  siteUrl: "https://goldstartranposrtationinc.com",
} as const;

export const ADD_ONS = [
  { id: "twic", title: "TWIC Card Application", note: "Same-day processing", price: 360 },
  { id: "trailer", title: "Trailer Rental (3 Mo.)", note: "Subject to availability", price: 500 },
  { id: "factoring", title: "Factoring Setup", note: "Same-day registration", price: 250 },
  { id: "insurance", title: "Insurance Assistance", note: "Fast-track quotation", price: 399 },
] as const;

export const PAYMENT_METHODS = ["Factoring", "ACH Direct Deposit", "Check Deposit"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export function addOnsTotal(selected: readonly string[]): number {
  return ADD_ONS.filter((a) => selected.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
}
