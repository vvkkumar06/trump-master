import React, { useRef, useState } from 'react';
import { Image, Animated, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

const GalleryItemComponent = ({ playerData, coverColor, pressHandler, pressOutHandler, addAnimationEnd, longPressHandler, toLeftAnim }) => {
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [cardSelectAnimEnd, setCardSelectAnimEnd] = useState(false);

  let name = playerData.PlayerName.split(' ');
  let fName = name[0].substr(0, 1);
  let lName = name[1];
  name = `${fName} ${lName}`;

  const position = useRef(new Animated.ValueXY(0)).current;

  const moveToRight = (id) => {
    Animated.timing(position, {
      toValue: {x: toLeftAnim ? -400 : 400, y:0},
      duration: 500,
      useNativeDriver: false,
    }).start(() =>{
      position.setValue({x:0,y:0});
      setCardSelectAnimEnd(true);
      addAnimationEnd(id);
    });
  };

  const renderItem = () => {

    return (
      <Animated.View {...((isLongPressed || cardSelectAnimEnd)  && {style: [
          position.getLayout(),
          {
            zIndex: '999'
          }
        ]})}>
        <TouchableOpacity
          onPress={() => {
            pressHandler(playerData.TMID)
          
          }}
          onLongPress={() => {
            longPressHandler(playerData.TMID);
            setIsLongPressed(true);
            setCardSelectAnimEnd(true);
            moveToRight(playerData.TMID);
          }}
          onPressOut={() => {
            setIsLongPressed(false);
          }}
        >
          <Card key={playerData.TMID} style={{ ...styles.container, ...(isLongPressed && styles.longPress) }} >
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
  }, longPress: {
    backgroundColor: 'rgba(0,255,0, 0.2)',
    borderWidth: 3,
    borderColor: 'rgba(0,255,0, 0.8)'
  }

})


export default GalleryItemComponent;

