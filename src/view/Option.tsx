import { Button, ButtonProps, HStack, Text, VStack } from "@chakra-ui/react"
import { MouseEvent, ReactNode } from "react"
import Clink from 'clink-react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import useListContext from "../context/list/use"
import useFindByOption from "../use/findByOption"


export default function OptionView ({
  children,
  optionIndex,
  ...restProps
}: {
  children?: ReactNode
  optionIndex: number
} & ButtonProps): JSX.Element {
  const listContextValue = useListContext()
  if (listContextValue == null) {
    throw new Error('listContextValue is null')
  }
  const item = useFindByOption({ optionIndex })
  if (item == null) {
    return <></>
  }
  function handleClick(): void {
    if (listContextValue == null) {
      throw new Error('listContextValue is null')
    }
    listContextValue.applyChoice({
      optionIndex
    })
  }
  const url = `https://www.imdb.com/title/${item.imdbId}`
  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault()
    window.open(url,'_blank')
  }
  return (
    <VStack>
      <Button isLoading={listContextValue.choosing} onClick={handleClick} {...restProps}>
        {children} {item.title}
      </Button>
      <Clink to={url} target='_blank' onClick={handleLinkClick}>
        <HStack alignItems='baseline'>
          <Text>{item.imdbId}</Text>
          <ExternalLinkIcon />
        </HStack>
      </Clink>
    </VStack>
  )
}