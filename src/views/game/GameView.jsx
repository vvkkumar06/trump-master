import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PlayerComponent from '../../components/PlayerComponent';
import { transformTeamToPlayingCards } from '../../redux/reducers/utils';
import { CricketPlayerDisplayProps } from '../../utils/display-properties';
import { useFetchStatsQuery } from '../../redux/features/api';
const cardCommonProps = {
  textStyle: { fontSize: 6, margin: 0, fontWeight: 'bold' },
  textVariant: false,
  textWrapperStyle: { height: 12, marginBottom: 0 },
  cardCoverStyle: { height: 50, width: 100 },
  idStyle: { fontSize: 15, height: 20, width: 50, top: 35 },
  topStyle: { width: 80, height: 10 }
}
const GameView = () => {
  const [isOut, setIsOut] = useState(false);
  const { data: stats } = useFetchStatsQuery();
  const collection = useSelector(state => state.cricketCards.data);
  const card1Pos = useRef(new Animated.Value(5)).current;
  const card2Pos = useRef(new Animated.Value(5)).current;
  const card3Pos = useRef(new Animated.Value(5)).current;
  const card4Pos = useRef(new Animated.Value(5)).current;
  const card5Pos = useRef(new Animated.Value(5)).current;

  const moveCardUp = (pos, isOut) => {
    Animated.timing(pos, {
      toValue: !isOut ? 80 : 5,
      useNativeDriver: false,
      easing: Easing.elastic(1.2),
      duration: 1000
    }).start();
    setIsOut(out => !out);
  }


  const playingCards = useMemo(() => {
    return transformTeamToPlayingCards(collection && collection.playingCards, stats);
  }, [collection])

  const { card1, card2, card3, card4, card5 } = playingCards;


  const getPlayerCards = (data, pos, cardName) => {
    if (data) {
      return <Animated.View key={cardName} style={[styles.cardContainer, { bottom: pos }]} >
        <TouchableOpacity onPress={() => moveCardUp(pos, isOut)} activeOpacity={1} >
          <PlayerComponent
            displayProps={CricketPlayerDisplayProps}
            coverColor='#ccc'
            playerData={data || {}}
            {...cardCommonProps}
            useShortName={true}
          />
        </TouchableOpacity>
      </Animated.View>
    }
  }


  return (
    <ImageBackground source={require('./../../../assets/background1.png')} resizeMode="cover" style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.selectedContainer}>
          <View style={styles.player1SelectedContainer}>
          </View>
          <View style={styles.player2SelectedContainer}>
          </View>
        </View>
        <View style={styles.cardsContainer}>
          {getPlayerCards(card1, card1Pos)}
          {getPlayerCards(card2, card2Pos)}
          {getPlayerCards(card3, card3Pos)}
          {getPlayerCards(card4, card4Pos)}
          {getPlayerCards(card5, card5Pos)}
        </View>

      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  selectedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, player1SelectedContainer: {
    width: 150,
    height: 250
  },
  player2SelectedContainer: {
    width: 150,
    height: 250
  },
  cardContainer: {
    width: 100,
    height: 150,
    margin: 2
  },
  cardsContainer: {
    position: 'absolute',
    bottom: -80,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginLeft: 20
  }
})

export default GameView;