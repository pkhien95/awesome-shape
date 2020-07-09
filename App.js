import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigators/MainNavigator'

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  )
}

export default App
