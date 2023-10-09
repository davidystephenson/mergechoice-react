import OptionView from './Option'
import useMoviesContext from '../context/movies/useMoviesContext'
import OptionProvider from '../context/option/OptionProvider'

export default function DeferView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (moviesContextValue.defaultOptionIndex == null) {
    return <></>
  }
  return (
    <OptionProvider
      chooseHotkey='d'
      optionIndex={moviesContextValue.defaultOptionIndex}
    >
      <OptionView>
        [d]efer
      </OptionView>
    </OptionProvider>
  )
}
