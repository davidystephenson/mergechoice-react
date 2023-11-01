import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/react'
import ChoiceCounterLabelView from './ChoiceCounterLabel'
import ChoiceCounterDetailsView from './ChoiceCounterDetails'

export default function ChoiceCounterView (): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant='solid' size='sm' w='max-content'>
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
