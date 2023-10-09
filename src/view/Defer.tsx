import OptionView from './Option'
import useListContext from '../context/list/useListContext'
import OptionProvider from '../context/option/OptionProvider'

export default function DeferView (): JSX.Element {
  const listContextValue = useListContext()
  if (listContextValue.defaultOptionIndex == null) {
    return <></>
  }
  return (
    <OptionProvider
      chooseHotkey='d'
      optionIndex={listContextValue.defaultOptionIndex}
    >
      <OptionView>
        [d]efer
      </OptionView>
    </OptionProvider>
  )
}
