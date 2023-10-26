import useHistoryContext from '../context/history/useHistoryContext'
import ExpandButtonView from './ExpandButtonView'

export default function HistoryButtonView (): JSX.Element {
  const historyContextValue = useHistoryContext()
  if (historyContextValue.isSingle) {
    return <></>
  }
  return <ExpandButtonView open={historyContextValue.expanded} />
}
