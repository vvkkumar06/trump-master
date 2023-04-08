import React, { useEffect, useState } from 'react';
import { SafeAreaView, ImageBackground, View, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper'
import { api, useLoginMutation } from '../../redux/features/api';
import { storeData } from '../../redux/reducers/utils';
import AnimatedLoader from "react-native-animated-loader";
import { useDispatch } from 'react-redux';
import { updateCricketCards } from '../../redux/features/cricket-slice';

const LoginView = () => {
  const  [fetchUser, userData] = api.endpoints.fetchUser.useLazyQuery();
  const userInfo =  userData.data;
  const dispatch = useDispatch();
  const [Login, result] = useLoginMutation();
  const [showLoader, setShowLoader] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "614960213278-9j7hiauqfg9gibauk358r9cc14avh3mb.apps.googleusercontent.com",
    expoClientId: '614960213278-9j7hiauqfg9gibauk358r9cc14avh3mb.apps.googleusercontent.com',
    webClientId: '614960213278-3f6metee1kgd1fv1a62n9q2l9so73kjm.apps.googleusercontent.com',
    iosClientId: "614960213278-v2rel582l0q8u6coi351cp8j7q6hdpn1.apps.googleusercontent.com",

  });

  useEffect(() => {
    if (response?.type === "success") {
      console.log('Signing In');
      Login({ token: response.authentication.idToken });
    }
  }, [response]);

  useEffect(() => {
    async function setUserData() {
      if (result.data) {
        const jwtToken = result.data.token;
        if (jwtToken) {
          console.log('Saving token');
          await storeData('token', jwtToken)
          const user = await fetchUser().unwrap();
          dispatch(updateCricketCards(user.games && user.games.cricket));
        }
      }
    }
    setUserData();
  }, [result.data]);

  return (
    <ImageBackground source={require('./../../../assets/background3.png')} resizeMode="cover" style={styles.background}>
      {
        (!userInfo || (userInfo.error))&& !showLoader ? <SafeAreaView style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('./../../../assets/images/app-icons/logo.png')}
            />
          </View>

          <Button
            mode="outlined"
            icon="google"
            contentStyle={{ width: 200, height: 60, backgroundColor: '#b71c1c', opacity: 0.8 }}
            labelStyle={{ paddingTop: 20, fontSize: 32, color: '#ddd' }}
            disabled={!request}
            onPress={() => {
              setShowLoader(true)
              promptAsync();
            }}
          > Login</Button>
        </SafeAreaView> :
          <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            <AnimatedLoader
              visible={true}
              overlayColor='transparent'
              source={require("./../../assets/loaders/app.json")}
              animationStyle={{ width: 250, height: 250 }}
              speed={1}
            >
              <Text variant="headlineSmall">Loading...</Text>
            </AnimatedLoader>
          </View>
      }
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  background: {
    width: '100%',
    height: '100%'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderRadius: 10
  }, logoContainer: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  }
});

export default LoginView;