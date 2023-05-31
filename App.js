import React from 'react'
import { Provider } from 'react-redux'
import Index from './src/Screens/Index'
import STORE from './src/Store/store'

export default function App() {
  return (
    <Provider store={STORE}>
      <Index />
    </Provider>
  )
}
