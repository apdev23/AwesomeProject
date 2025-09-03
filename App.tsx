import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Toast from 'react-native-toast-message';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigation />
        <Toast />
      </NavigationContainer>
    </Provider>
  )
}

export default App