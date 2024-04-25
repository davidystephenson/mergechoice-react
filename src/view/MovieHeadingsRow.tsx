import { Text, HStack, Th } from '@chakra-ui/react'

export default function MovieHeadingsRowView (): JSX.Element {
  return (
    <>
      <Th>
        <HStack>
          <Text w='max-content'>Movie</Text>
        </HStack>
      </Th>
      <Th>Seed</Th>
      <Th>Points</Th>
    </>
  )
}
