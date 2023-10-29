import { Text, Th, HStack } from '@chakra-ui/react'

export default function MovieHeadingsRowView (): JSX.Element {
  return (
    <>
      <Th>
        <HStack>
          <Text w='max-content'>Movie</Text>
        </HStack>
      </Th>
      <Th>Points</Th>
      <Th colSpan={2}>Score</Th>
    </>
  )
}
