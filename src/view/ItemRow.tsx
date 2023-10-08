import { Td, Tr } from "@chakra-ui/react";

export default function ItemRow({
  title,
  points,
  score
}: {
  title: string
  points: number
  score: number
}): JSX.Element {
  return (
    <Tr>
      <Td>{title}</Td>
      <Td>{points}</Td>
      <Td>{score}</Td>
    </Tr>
  )
}