import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginView from '../authentication/LoginView';
import DashboardView from './../dashboard/DashboardView';
import PreGameLoaderView from './../loader/pre-game/PreGameLoaderView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';
import SocketContext from '../../utils/SocketContext';
import GameView from '../game/GameView';
import { api } from '../../redux/features/api';

WebBrowser.maybeCompleteAuthSession();

const NavigationView = () => {
  const { data: user } = api.endpoints.fetchUser.useQueryState();
  const socket = useContext(SocketContext);

  socket.on("connect", () => {
    console.log(`Connected to server - Id: ${socket.id}`);
  });
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, headerShown: false}} initialRouteName={user && user.error  ? "Login" : "Dashboard"}>
        {
        user && user.error  ? <>
            <Stack.Screen name="Login" component={LoginView} />

          </> :
            <>
              <Stack.Screen name="Dashboard" component={DashboardView} options={{ orientation: 'landscape'}}/>
              <Stack.Screen name="PreGameLoader" component={PreGameLoaderView} options={{ orientation: 'landscape' }}/>
              <Stack.Screen name="GameView" component={GameView} options={{ orientation: 'landscape' }}/>
            </>
        }

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavigationView;