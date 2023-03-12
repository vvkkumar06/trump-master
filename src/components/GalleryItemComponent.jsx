import React, { useEffect, useRef, useState } from 'react';
import { Image, Animated, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

const GalleryItemComponent = ({
  playerData,
  coverColor,
  pressHandler,
  pressOutHandler,
  canSelect = true,
  animationStop,
  longPressHandler,
  toLeftAnim }) => {
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [animInProgress, setAnimInProgress] = useState(false);

  let name = playerData.PlayerName.split(' ');
  let fName = name[0].substr(0, 1);
  let lName = name[1];
  name = `${fName} ${lName}`;

  const position = useRef(new Animated.ValueXY(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const zIndex = useRef(new Animated.Value(0)).current;

  const animate = (id) => {
    setAnimInProgress(true);
    Animated.parallel([
      Animated.timing(zIndex, {
        toValue: 999,
        duration: 0,
        useNativeDriver: false
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(position, {
        toValue: { x: toLeftAnim ? -400 : 400, y: 0 },
        duration: 300,
        useNativeDriver: false
      }
      )
    ]).start(() => {
      resetAnimation(() => {
        setAnimInProgress(false);
        animationStop(id);
      })
    });
  };

  const resetAnimation = (cb) => {
    Animated.parallel([
      Animated.timing(zIndex, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false
      }),
      Animated.timing(position, {
        toValue: { x: 0, y: 0 },
        duration: 0,
        useNativeDriver: false
      }
      )
    ]).start(() => {
      cb()
    });
  }

  const renderItem = () => {

    return (
      <Animated.View {...((isLongPressed || animInProgress) && {
        style: [
          { transform: position.getTranslateTransform() },
          {
            zIndex: zIndex,
            opacity: opacity,
          }
        ]
      })}>
        <TouchableOpacity
          onPress={() => {
            pressHandler && pressHandler(playerData.TMID)
          }}
          onLongPress={() => {
            longPressHandler && longPressHandler(playerData.TMID);
            setIsLongPressed(true);
            if (canSelect) {
              animate(playerData.TMID);
            }
          }}
          onPressOut={() => {
            setIsLongPressed(false);
          }}
        >
          <Card key={playerData.TMID} style={{ ...styles.container, ...(isLongPressed && styles.longPress), ...(!canSelect && isLongPressed && styles.canSelect) }} >
            <Card.Cover source={{ uri: playerData.Image }} style={{ ...styles.image, backgroundColor: coverColor }} resizeMode='contain' />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.id}>C#{playerData.TMID}</Text>
            <View style={styles.topLeftBox} />
            <Image
              style={styles.logo}
              source={require('./../../assets/images/app-icons/logo.png')}
            />
          </Card>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return renderItem();
}

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 75,
    position: 'relative',
    borderRadius: 0,
    backgroundColor: '#999',
    borderWidth: 0
  },
  image: {
    height: '90%',
    width: '100%',
    marginTop: '10%',
    borderTopLeftRadius: 35,
    borderRadius: 0
  },
  name: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    backgroundColor: '#333',
    color: '#eee',
    fontStyle: 'italic',
    fontSize: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  id: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    backgroundColor: '#aaa',
    color: '#111',
    width: 40,
    height: 20,
    fontWeight: 'bold',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  topLeftBox: {
    width: 55,
    height: 10,
    position: 'absolute',
    top: 0,
    backgroundColor: '#ccc',
    borderTopRightRadius: 15
  },
  logo: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 5,
    right: -3
  }, longPress: {
    backgroundColor: 'rgba(0,255,0, 0.2)',
    borderWidth: 3,
    borderColor: 'rgba(0,255,0, 0.8)'
  }, canSelect: {
    backgroundColor: 'rgba(255,0,0, 0.2)',
    borderWidth: 3,
    borderColor: 'rgba(255,0,0, 0.8)'
  }

})


export default React.memo(GalleryItemComponent);

