import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/react'
import ChoiceCounterLabelView from './ChoiceCounterLabel'
import ChoiceCounterDetailsView from './ChoicedCounterDetails'

export default function ChoiceCounterView (): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant='solid'>
          <ChoiceCounterLabelView />
        </Button>
      </PopoverTrigger>
      <PopoverContent w='fit-content'>
        <PopoverArrow />
        <PopoverBody>
          <ChoiceCounterDetailsView />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
