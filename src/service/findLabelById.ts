import { Item } from "../types"
import findById from "./findById"

export default function findLabelById({ id, items }: {
  id: string
  items: Item[]
}): string {
  return findById({ items, id }).label
}