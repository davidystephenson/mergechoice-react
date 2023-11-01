import { ThemeConfig, extendTheme } from '@chakra-ui/react'
import Button from './Button'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  components: {
    Button
  }
})
export default theme
