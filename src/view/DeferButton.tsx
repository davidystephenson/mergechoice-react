import MovieProvider from '../context/movie/MovieProvider'
import useOptionContext from '../context/option/useOptionContext'
import OptionButtonView from './OptionButton'

export default function DeferButtonView (): JSX.Element {
  const optionContextValue = useOptionContext()
  return (
    <MovieProvider movie={optionContextValue.movie}>
      <OptionButtonView>
        [d]efer
      </OptionButtonView>
    </MovieProvider>
  )
}
