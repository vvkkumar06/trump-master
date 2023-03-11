import store from './src/redux/store';
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import SocketContext from './src/utils/SocketContext';

import 'expo-dev-client';
import NavigationView from './src/views/navigation/NavigationView';
import { StatusBar } from 'react-native';
const socket = io("http://192.168.29.168:8080");

export default function App() {

  socket.on("connect", () => {
    console.log(socket.id);
  });

  useEffect(() => {
    socket.on("start", (args, cb) => {
      console.log("Starting Game");
      console.log("Loading complete");
      let user = {
        socketId: socket.id,
        name: 'Vivek Kumar'
      }
      cb(user);

      socket.on('question1', (args, cb) => {
        console.log(args)
      })
    });
  }, []);

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