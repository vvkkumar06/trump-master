import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { StyleSheet } from 'react-native';
import PlayerComponent from '../../components/PlayerComponent';
import { CricketPlayerDisplayProps } from '../../utils/display-properties';

const CardDetailsView = ({playerData}) => {

  const opacity = useRef(new Animated.Value(0)).current;
  const borderColor = useRef(new Animated.Value(0)).current;
  const borderWidth = useRef(new Animated.Value(0)).current;

  const animateCard = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: false,
        easing: Easing.in,
        duration: 500
      }),
      Animated.timing(borderColor, {
        toValue: 100,
        useNativeDriver: false,
        easing: Easing.linear,
        duration: 500
      }),
      Animated.timing(borderWidth, {
        toValue: 5,
        useNativeDriver: false,
        easing: Easing.linear,
        duration: 500
      }),
    ]).start();
  }

  const resetAnimation = (cb) => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0.5,
        useNativeDriver: false,
        easing: Easing.linear,
        duration: 500
      }),
      Animated.timing(borderColor, {
        toValue: 0,
        useNativeDriver: false,
        easing: Easing.linear,
        duration: 500
      }),
      Animated.timing(borderWidth, {
        toValue: 0,
        useNativeDriver: false,
        easing: Easing.linear,
        duration: 500
      }),
    ]).start(cb);
  }
  useEffect(() => {
    resetAnimation(() => {
      animateCard();
    })
  }, [playerData]);

  return (
    <Animated.View style={[styles.container, {opacity: opacity, 
      borderWidth: borderWidth,
      borderColor: borderColor.interpolate({
      inputRange: [0, 100],
      outputRange: ['#8BC34A', '#8BC34A']
    })}]}>
      <PlayerComponent 
      displayProps={CricketPlayerDisplayProps}
      coverColor = '#ccc'
      playerData ={playerData}
      height="280"
      />
    </Animated.View >
   
  )
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 280
  }
});

export default CardDetailsView;