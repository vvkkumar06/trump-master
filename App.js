import store from './src/redux/store';
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, Stack } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardView from './src/views/dashboard/DashboardView';
import PreGameLoaderView from './src/views/loader/pre-game/PreGameLoaderView';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import SocketContext from './src/utils/SocketContext';
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

  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider>
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerShown: false
            }} initialRouteName="Dashboard">
              <Stack.Screen name="Dashboard" component={DashboardView} />
              <Stack.Screen name="PreGameLoader" component={PreGameLoaderView} />
            </Stack.Navigator>
          </NavigationContainer>
        </SocketContext.Provider>
      </Provider>
    </PaperProvider>
  );
}