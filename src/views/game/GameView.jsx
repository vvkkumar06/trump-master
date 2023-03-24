import React, { useMemo, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { transformTeamToPlayingCards } from '../../redux/reducers/utils';
import { useFetchStatsQuery } from '../../redux/features/api';
import styles from './gameViewStyles';
import PlayingCard from './PlayingCard';
import PlayerComponent from '../../components/PlayerComponent';
import { CricketPlayerDisplayProps } from '../../utils/display-properties';

const GameView = () => {
  const [player1, setPlayer1] = useState(undefined);
  const [player2, setPlayer2] = useState(undefined);
  const { data: stats } = useFetchStatsQuery();
  const collection = useSelector(state => state.cricketCards.data);
  const [disableDrag, setDisableDrag] = useState(false);


  const playingCards = useMemo(() => {
    return transformTeamToPlayingCards(collection && collection.playingCards, stats);
  }, [collection])

  const { card1, card2, card3, card4, card5 } = playingCards;

  const handleCardDrop = (card, cardName) => {
    // Set selected player
    setPlayer1(card);

    //removed card from deck
    playingCards[cardName] = undefined;

    //disable drag
    setDisableDrag(true);
  }

  // console.log(disableDrag);
  return (
    <ImageBackground source={require('./../../../assets/background1.png')} resizeMode="cover" style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.selectedContainer}>
          <View style={styles.player1SelectedContainer}>
            {
              player1 ? (
                <View key={'player1'} style={[styles.cardContainer]} >
                  <PlayerComponent
                    displayProps={CricketPlayerDisplayProps}
                    coverColor='#ccc'
                    playerData={player1 || {}}
                    useShortName={true}
                    height="160"
                  />
                </View>
              ) : (
                <Text>
                  You
                </Text>
              )
            }

          </View>
          <View style={styles.player2SelectedContainer}>
            <Text>
              Opponent
            </Text>
          </View>
        </View>
        <View style={styles.cardsContainer}>
          <PlayingCard data={card1} cardName="card1" onCardDrop={handleCardDrop} isDragDisabled={disableDrag}/>
          <PlayingCard data={card2} cardName="card2" onCardDrop={handleCardDrop} isDragDisabled={disableDrag}/>
          <PlayingCard data={card3} cardName="card3" onCardDrop={handleCardDrop} isDragDisabled={disableDrag}/>
          <PlayingCard data={card4} cardName="card4" onCardDrop={handleCardDrop} isDragDisabled={disableDrag}/>
          <PlayingCard data={card5} cardName="card5" onCardDrop={handleCardDrop} isDragDisabled={disableDrag}/>
        </View>

      </SafeAreaView>
    </ImageBackground>
  )
}


export default GameView;