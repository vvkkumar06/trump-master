import React, {useMemo} from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { transformTeamToPlayingCards } from '../../redux/reducers/utils';
import { useFetchStatsQuery } from '../../redux/features/api';
import styles from './gameViewStyles';
import PlayingCard from './PlayingCard';

const GameView = () => {

  const { data: stats } = useFetchStatsQuery();
  const collection = useSelector(state => state.cricketCards.data);


  const playingCards = useMemo(() => {
    return transformTeamToPlayingCards(collection && collection.playingCards, stats);
  }, [collection])

  const { card1, card2, card3, card4, card5 } = playingCards;


  return (
    <ImageBackground source={require('./../../../assets/background1.png')} resizeMode="cover" style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.selectedContainer}>
          <View style={styles.player1SelectedContainer}>
            <Text>
              You
            </Text>
          </View>
          <View style={styles.player2SelectedContainer}>
            <Text>
              Opponent
            </Text>
          </View>
        </View>
        <View style={styles.cardsContainer}>
          <PlayingCard  data={card1} cardName="card1"/>
          <PlayingCard  data={card2} cardName="card2"/>
          <PlayingCard  data={card3} cardName="card3"/>
          <PlayingCard  data={card4} cardName="card4"/>
          <PlayingCard  data={card5} cardName="card5"/>
        </View>

      </SafeAreaView>
    </ImageBackground>
  )
}


export default GameView;