import { Button } from '@chakra-ui/react'

export default function ResetView (): JSX.Element {
  function reset (): void {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <Button
      onClick={reset}
      colorScheme='red'
      variant='solid'
      size='xs'
    >
      Reset
    </Button>
  )
}
