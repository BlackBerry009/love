export const randomNFromArray = <T>(arr: T[], n: number) => {
  return arr.sort(() => Math.random() - 0.5).slice(0, n)
}
