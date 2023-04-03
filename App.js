import store from './src/redux/store';
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import SocketContext from './src/utils/SocketContext';
import 'expo-dev-client';
import { useFonts } from 'expo-font';

import { io } from "socket.io-client";
import TMMain from './src/views/TMMain';
const socket = io("http://192.168.29.168:8080");
export default function App() {

  const [fontsLoaded] = useFonts({
    'ChangaOne-Italic': require('./assets/fonts/ChangaOne-Italic.ttf'),
    'ChangaOne-Regular': require('./assets/fonts/ChangaOne-Regular.ttf'),
  });

  if(!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
            <TMMain />
        </SocketContext.Provider>
      </Provider>
    </PaperProvider>
  );
}