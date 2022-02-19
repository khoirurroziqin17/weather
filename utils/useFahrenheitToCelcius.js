export default function useFahrenheitToCelcius(value) {
  const temp = Math.round(((value - 32) * 5) / 9);

  return temp;
}
