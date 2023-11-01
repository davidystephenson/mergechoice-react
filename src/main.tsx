import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'

const root = document.getElementById('root')
if (root == null) {
  throw new Error('There is no root.')
}
ReactDOM.createRoot(root).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
