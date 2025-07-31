export function formatKrw(num: number) {
  return new Intl.NumberFormat("ko", {
    style: "currency",
    currency: "KRW",
  }).format(num);
}
