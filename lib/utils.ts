export function formatPrice(price: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatKm(km: number): string {
  return formatNumber(km) + " km";
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function formatTime(timeString: string): string {
  return timeString.slice(0, 5);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getCarTitle(marca: string, modello: string): string {
  return `${marca} ${modello}`;
}

export function getCarImageUrl(foto: string[] | null): string {
  if (foto && foto.length > 0) return foto[0];
  return "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80";
}

export function calculateMonthlyPayment(
  prezzo: number,
  anticipoPercent: number,
  durataMonths: number,
  tassoAnnuo: number
): number {
  const principal = prezzo * (1 - anticipoPercent / 100);
  const monthlyRate = tassoAnnuo / 100 / 12;
  if (monthlyRate === 0) return principal / durataMonths;
  return (
    (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -durataMonths))
  );
}
