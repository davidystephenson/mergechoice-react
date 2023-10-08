import { Item } from "../types"

export default function compareItems(a: Item, b: Item): number {
  if (b.points === a.points) {
    if (b.score === a.score) {
      return b.title.localeCompare(a.title) * -1
    }
    return b.score - a.score
  }
  return b.points - a.points
}