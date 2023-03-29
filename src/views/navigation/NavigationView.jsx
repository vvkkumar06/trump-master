import React, { useContext, useEffect } from 'react';
import { NavigationContainer, Stack } from '@react-navigation/native';
import LoginView from '../authentication/LoginView';
import DashboardView from './../dashboard/DashboardView';
import PreGameLoaderView from './../loader/pre-game/PreGameLoaderView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';

import { useSelector } from 'react-redux';
import SocketContext from '../../utils/SocketContext';
import GameView from '../game/GameView';

WebBrowser.maybeCompleteAuthSession();

const NavigationView = () => {
  const user = useSelector(state => state.user.data);
  const socket = useContext(SocketContext);

  socket.on("connect", () => {
    console.log(`Connected to server - Id: ${socket.id}`);
  });

  useEffect(() => {
    if(user) {
      socket.on("start", (args, cb) => {
        console.log("Starting Game");
        console.log("Loading complete");
        cb(user);
  
        socket.on('question1', (args, cb) => {
          console.log(args)
        })
      });
    }
  }, [user]);
  
  const userId  = user && user.id ? user.id : undefined;
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, headerShown: false}} initialRouteName={!userId ? "LoginView" : "Dashboard"}>
        {
         !userId ? <>
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