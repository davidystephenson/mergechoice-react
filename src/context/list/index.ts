import { createContext } from "react"
import { ListContextValue } from "../../types"

const listContext = createContext<ListContextValue | null>( null)
export default listContext