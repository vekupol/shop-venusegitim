export const fmtTRY = (krs: number) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(krs / 100);
