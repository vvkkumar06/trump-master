import React, { useEffect,forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});


const getCardStyles = (totalCards, cardsX, width, margin) => {
  const animationStyles = {};
  for (let i = 0; i < totalCards; i++) {
    animationStyles[`x${i + 1}s`] = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: (width + margin * 2) * (cardsX[`x${i + 1}`].value - i),
          },
        ],
      };
    }, []);
  }
  return animationStyles;
};

const getCardsPos = (totalCards) => {
  const cards = {};
  for (let i = 0; i < totalCards; i++) {
    cards[`x${i + 1}`] = useSharedValue(i);
  }
  return cards;
}

export default CardsShuffleComponent = forwardRef(({ width, height, margin, totalCards, shuffleData, startShuffle, customStyle, children }, ref) => {
  useEffect(() => {
    if (startShuffle !== undefined) {
      shuffleCards();
    }
  }, [startShuffle])


  const shuffleCards = () => {
    const timingData = [];
    for (let i = 0; i < totalCards; i++) {
      for (let j = 0; j < totalCards; j++) {
        if (!timingData[j]) {
          timingData[j] = [];
        }
        timingData[j].push(withTiming(shuffleData[i][j], { duration: Math.floor(Math.random() * 100) + 300 }));
      }
    }
    for (let i = 0; i < totalCards; i++) {
      cardsX[`x${i + 1}`].value = withSequence(...timingData[i]);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      shuffleCards
    }
  });



  const cardsX = getCardsPos(totalCards);
  const cardStyles = getCardStyles(totalCards, cardsX, width, margin);

  return (
    <View style={styles.container}>
      {
        children && children.map((_, i) => {
          return (
              <Animated.View
                key={i}
                style={[
                  { width, margin, height},
                  (customStyle ? customStyle : {}),
                  cardStyles[`x${i + 1}s`]
                ]}>
                {children[i]}
              </Animated.View>
          )
        })
      }
    </View>
  );
});
