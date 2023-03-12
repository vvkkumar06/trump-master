import store from './src/redux/store';
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
import SocketContext from './src/utils/SocketContext';
import 'expo-dev-client';
import NavigationView from './src/views/navigation/NavigationView';
import { StatusBar } from 'react-native';
import { io } from "socket.io-client";
const socket = io("http://192.168.29.168:8080");
export default function App() {

  return (
    <PaperProvider>
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
         <StatusBar hidden />
          <NavigationView />
        </SocketContext.Provider>
      </Provider>
    </PaperProvider>
  );
}