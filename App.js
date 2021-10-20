import React, {useEffect} from 'react';
import Routes from './src/routes/routes';
import {Provider} from 'react-redux';
import {STORE, PERSISTOR} from './src/store/store.config';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={STORE}>
      <PersistGate persistor={PERSISTOR}>
        <Routes></Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;
