import React from 'react';
import { NavigationContainer, Stack } from '@react-navigation/native';
import LoginView from '../authentication/LoginView';
import DashboardView from './../dashboard/DashboardView';
import PreGameLoaderView from './../loader/pre-game/PreGameLoaderView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

const NavigationView = () => {
  const user = useSelector(state => state.user.data);
  const userId  = user && user.id ? user.id : undefined;
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, headerMode: 'screen'}} initialRouteName={!userId ? "LoginView" : "Dashboard"}>
        {
         !userId ? <>
            <Stack.Screen name="Login" component={LoginView} options={{ orientation: 'portrait' }} />

          </> :
            <>
              <Stack.Screen name="Dashboard" component={DashboardView} options={{ orientation: 'landscape', headerShown: false}}/>
              <Stack.Screen name="PreGameLoader" component={PreGameLoaderView} options={{ orientation: 'landscape' }}/>
            </>
        }

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavigationView;