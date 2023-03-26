import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import { ImageBackground, SafeAreaView, StatusBar,Image, StyleSheet, View, Animated, Easing } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import SocketContext from '../../../utils/SocketContext';

const PreGameLoaderView = ({ type, navigation }) => {
  const socket = useContext(SocketContext);
  const [timer, setTimer] = useState(30);
  const [userDetails, setUserDetails] = useState([])
  const fontSize = useRef(new Animated.Value(15)).current;
  const colorOpacity = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    socket.on("load-game", (args, cb) => {
      setUserDetails(args.players)
    });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => {
      backHandler.remove();
    }
  }, []);

  useEffect(() => {
    if (userDetails[1] && userDetails[2]) {
      animateUserText();
    }
  }, [userDetails])


  const createTimer = useCallback(() => {
    return setInterval(() => {
      setTimer(t => t - 1);
    }, 1000)
  }, [])
  let interval = undefined;

  useEffect(() => {
    if (!interval) {
      interval = createTimer();
    }
    return () => {
      clearInterval(interval);
    }
  }, []);

  const animateUserText = () => {
    Animated.sequence([
      Animated.timing(fontSize, {
        toValue: 35,
        duration: 1000,
        easing: Easing.exp,
        useNativeDriver: false
      }),
      Animated.timing(colorOpacity, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false
      }),
      Animated.timing(colorOpacity, {
        toValue: 0.6,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false
      })
    ]).start(() => {
      navigation.navigate('GameView')
    })
  }

  const getRippleAnimation = () => {
    return <View style={styles.randomUserContainer}>
      <View style={styles.randomUser}>
        <Image
          style={styles.randomImage}
          source={require('../../../../assets/ripple.gif')}
        />
      </View>
    </View>
  }
  return (
    <ImageBackground source={require('./../../../../assets/background2.png')} resizeMode="cover" style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          {
            !(userDetails && userDetails[1] && userDetails[2]) ? (
              <View>
                {getRippleAnimation()}
                <View style={styles.loader}>
                  <Text variant="displayLarge" style={{ color: 'white', marginRight: 20 }}>{timer > 0 ? timer : 0}</Text>
                  <Text variant="titleLarge" style={{ color: 'white' }}>Seaching for Opponent ...</Text>
                </View>
              </View>
            ) :
              (
                <View style={{ flexDirection: 'row', width: 800 }}>
                  <View style={{ width: 350, alignItems: 'center'}}>
                    <Avatar.Image size={100} style={{ alignSelf: 'center'}} source={{uri: userDetails[1]['clientInfo'].picture}} />
                    <Animated.Text variant='headlineSmall' style={[styles.user, {  fontSize, color: '#a2cf6e', opacity: colorOpacity }]}>{userDetails[1].clientInfo.name}</Animated.Text>
                  </View>
                  <View style={{ width: 100 }}>
                    <Text variant='displayLarge' style={styles.vs}>Vs</Text>
                  </View>
                  <View style={{ width: 350, alignItems: 'center' }}>
                    <Avatar.Image size={100} style={{ alignSelf: 'center'}} source={{uri: userDetails[2]['clientInfo'].picture}} />
                    <Animated.Text variant='headlineSmall' style={[styles.user, { fontSize, color: '#ff9800', opacity: colorOpacity }]}>{userDetails[2].clientInfo.name}</Animated.Text>
                  </View>
                </View>
              )
          }
        </View>
      </SafeAreaView>
    </ImageBackground >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 50
  },
  randomUser: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    borderWidth: 6,
    borderColor: '#a71',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginBottom: 50
  },
  randomUserContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  randomImage: {
    width: 108,
    height: 108,
    borderRadius: 108 / 2,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  user: {
    marginBottom: 50,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 10,
    letterSpacing: 3,
    fontSize: 20,
    fontWeight: 'bold'
  },
  vs: {
    marginBottom: 50,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#2196f3',
    fontSize: 60,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10
  }, playerImg: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2
  }
})

export default PreGameLoaderView;