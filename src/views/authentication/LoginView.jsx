import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ImageBackground, View, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../redux/features/user-slice';

//614960213278-9j7hiauqfg9gibauk358r9cc14avh3mb.apps.googleusercontent.com
const LoginView = () => {
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch()

  const [request, response, promptAsync] =  Google.useAuthRequest({
    androidClientId: "614960213278-9j7hiauqfg9gibauk358r9cc14avh3mb.apps.googleusercontent.com",
    expoClientId: '614960213278-9j7hiauqfg9gibauk358r9cc14avh3mb.apps.googleusercontent.com',
    webClientId: '614960213278-3f6metee1kgd1fv1a62n9q2l9so73kjm.apps.googleusercontent.com'
    // iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",

  });

  useEffect(() => {
    if (response?.type === "success") {
      getUserInfo(response.authentication.accessToken);
    }
  }, [response]);
  
  const getUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        
        const user = await response.json();

      setUserInfo(user);
      dispatch(setUserDetails(user))
    } catch (error) {
      // Add your own error handler here
    }
  };
  return (
    <ImageBackground source={require('./../../../assets/background3.png')} resizeMode="cover" style={styles.background}>
      <SafeAreaView style={styles.container}>
        {userInfo === null ? (
          <>
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
                promptAsync();
              }}
            > Login</Button>
          </>
        ) : undefined}
      </SafeAreaView>
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