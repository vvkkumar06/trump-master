import React, { useRef, useState } from 'react';
import { Image, Animated, PanResponder } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';

const GalleryItemComponent = ({ playerData, coverColor, onPressHandler, zIndexHandler }) => {
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [panResponder, setPanResponder] = useState(undefined);
  const pan = useRef(new Animated.ValueXY()).current;
  let longPressTimer = null;


  const onLongPressPanResponder = useRef(
    PanResponder.create({
      onPanResponderTerminationRequest: () => false,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null, { dx: pan.x, dy: pan.y } 
      ], {
        useNativeDriver: false
      }),
      onPanResponderRelease: (e, { vx, vy }) => {
        pan.flattenOffset()
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
        setPanResponder(undefined);
        setIsBeingDragged(false);
        zIndexHandler(0, playerData.TMID);
      }
    })
  ).current;

  const normalPanResponder = useRef(
    PanResponder.create({
      onPanResponderTerminationRequest: () => false,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        pan.setValue({ x: 0, y: 0 })
        console.log(gestureState)
        longPressTimer = setTimeout(onLongPress, 400)
      },
      onPanResponderRelease: (e, { vx, vy }) => {
        if (!panResponder) {
          clearTimeout(longPressTimer);   // clean the timeout handler
        }
      }
    })).current;

  const onLongPress = () => {
    setIsBeingDragged(true);
    zIndexHandler(999, playerData.TMID);
    setPanResponder(onLongPressPanResponder);
  }

  let panHandlers = {};
  if (panResponder) {
    panHandlers = panResponder.panHandlers
  } else {
    panHandlers = normalPanResponder.panHandlers
  }

  //@TODO for future reference
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onPanResponderGrant: (evt, gestureState) => {
  //       setIsBeingDragged(true);
  //       zIndexHandler(999, playerData.TMID);
  //     },
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderMove: (e, gestureState) => {
  //       const newPos = { x: gestureState.dx, y: gestureState.dy };
  //       pan.setValue(newPos);
  //     },
  //     onPanResponderRelease: (e, gesture) => {
  //       Animated.spring(
  //         pan,
  //         { toValue: { x: 0, y: 0 }, useNativeDriver: false }
  //       ).start();
  //       setIsBeingDragged(false);
  //       zIndexHandler(0, playerData.TMID);
  //     }
  //   }),
  // ).current;

  let name = playerData.PlayerName.split(' ');
  let fName = name[0].substr(0, 1);
  let lName = name[1];
  name = `${fName} ${lName}`;

  const renderItem = () => {
    return (
      <TouchableRipple onPress={onPressHandler}>
        <Card key={playerData.TMID} style={styles.container} >
          <Card.Cover source={{ uri: playerData.Image }} style={{ ...styles.image, backgroundColor: coverColor }} resizeMode='contain' />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.id}>C#{playerData.TMID}</Text>
          <View style={styles.topLeftBox} />
          <Image
            style={styles.logo}
            source={require('./../../assets/images/app-icons/logo.png')}
          />
        </Card>
      </TouchableRipple>
    )
  }

  return (
    <React.Fragment>
      <Animated.View
        key={playerData.TMID}
        style={[pan.getLayout(), isBeingDragged ? styles.cardDrag : { zIndex: 0 }] }
        {...panHandlers}
      >
        {renderItem()}
      </Animated.View>
    </React.Fragment>
  );
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
    fontWeight: 900,
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
    fontWeight: 900,
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
  }, cardDrag: {
    zIndex: 999,
    borderWidth: 2,
    borderColor: '#FFA726',
    elevation:999
  }
})


export default GalleryItemComponent;

