import clone from "./clone"

export default function cloneLog<Serializable>(
  label: string, x: Serializable
): void {
  const cloned = clone(x)
  console.log(label, cloned)
}