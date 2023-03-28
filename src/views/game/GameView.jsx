import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { getCardDetailsFromTmId, transformTeamToPlayingCards } from '../../redux/reducers/utils';
import { useFetchStatsQuery } from '../../redux/features/api';
import styles from './gameViewStyles';
import PlayingCard from './PlayingCard';
import PlayerComponent from '../../components/PlayerComponent';
import { CricketPlayerDisplayProps } from '../../utils/display-properties';
import SocketContext from '../../utils/SocketContext';

const GameView = () => {
  const socket = useContext(SocketContext);
  const { data: stats } = useFetchStatsQuery();
  const [nextRound, setNextRound] = useState(undefined);
  const [roundQuestion, setRoundQuestion] = useState('');

  // Reset below for every round
  const [player1, setPlayer1] = useState(undefined);
  const [player2Move, setPlayer2Move] = useState(undefined);
  const [removeCard, setRemoveCard] = useState(undefined);
  const [gameState, setGameState] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const [disableDrag, setDisableDrag] = useState(false);
  const [winner, setWinner] = useState(undefined);


  // animation

  useEffect(() => {
    socket.emit('start-game');
    socket.on('game-status', (args) => {
      setGameState(args);
      args.winner && setWinner(args.winner);
    });
    socket.on('request-move', ({ nextRound, roundInfo }) => {
      setRoundQuestion(Object.values(roundInfo.question)[0]);
      setNextRound(nextRound);
    });
    socket.on('game-over', ({ gameState, winner }) => {
      console.log(winner);
      setGameState(gameState);
      setWinner(winner);
    });

  }, [])

  useEffect(() => {
    winner && winner.length && socket.emit('end-game');
  }, [winner]);

  useEffect(() => {
    if (nextRound) {
      setTimeout(() => {
        setPlayer1(undefined);
        setPlayer2Move(undefined);
        setDisableDrag(false);
        setRemoveCard(undefined);
        setResult(undefined);
      }, 2000);
    }
  }, [nextRound])

  const playingCards = useMemo(() => {
    if (gameState && nextRound) {
      const player2Id = Object.keys(gameState).find(client => client !== socket.id);
      if (gameState[player2Id].move && gameState[player2Id].move[nextRound]) {
        const player2Card = getCardDetailsFromTmId(gameState[player2Id].move[nextRound], stats);
        setPlayer2Move(player2Card);
      }
      const cards = transformTeamToPlayingCards(gameState && gameState[socket.id] && gameState[socket.id].availableCards, stats);
      if (removeCard) {
        cards[removeCard] = undefined;
      }
      if (gameState[socket.id] && gameState[socket.id].result) {
        console.log(socket.id, " : ", gameState[socket.id].result, nextRound)
        if (gameState[socket.id].result[nextRound] === 'W') {
          setResult(`You Won Round ${nextRound}`);
        } else if (gameState[socket.id].result[nextRound] === 'T') {
          setResult(`Round ${nextRound} Tied!`);
        } else if (gameState[socket.id].result[nextRound] === 'L') {
          setResult(`You Lost Round ${nextRound}`);
        }
      }
      return cards;
    } else {
      return {};
    }
  }, [gameState, nextRound, removeCard])

  const { card1, card2, card3, card4, card5 } = playingCards;

  const handleCardDrop = (card, cardName, gameState, playingCards) => {
    // Set selected player
    setPlayer1(card);

    //removed card from deck
    setRemoveCard(cardName);
    let availableCards = {};
    Object.keys(playingCards).forEach(name => {
      if (name !== cardName) {
        availableCards[name] = playingCards[name].TMID;
      }
    })
    const state = gameState[socket.id];
    state.availableCards = availableCards;
    if (!state.move) {
      state.move = {};
    }
    state.move[nextRound] = card.TMID;
    socket.emit('move', state);

    //disable drag
    setDisableDrag(true);
  }

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
          <View>
            {
              winner ? (
                <Text> {winner.length === 2 ? 'Game Tied' : winner.includes(socket.id) ? 'Game Over - You Won' : 'Game Over - You Lost'}</Text>
              ) : (
                <>
                  <Text>
                    Round - {nextRound}
                  </Text>
                  <Text>
                    {result ? result : roundQuestion}
                  </Text>
                </>
              )
            }

          </View>
          <View style={styles.player2SelectedContainer}>
            {
              player2Move ? (
                <View key={'player2'} style={[styles.cardContainer]} >
                  <PlayerComponent
                    displayProps={CricketPlayerDisplayProps}
                    coverColor='#ccc'
                    playerData={player2Move || {}}
                    useShortName={true}
                    height="160"
                  />
                </View>
              ) : (
                <Text>
                  Opponent
                </Text>
              )
            }
          </View>
        </View>
        <View style={styles.cardsContainer}>
          <PlayingCard data={card1} cardName="card1" onCardDrop={handleCardDrop} isDragDisabled={disableDrag} gameState={gameState} playingCards={playingCards} />
          <PlayingCard data={card2} cardName="card2" onCardDrop={handleCardDrop} isDragDisabled={disableDrag} gameState={gameState} playingCards={playingCards} />
          <PlayingCard data={card3} cardName="card3" onCardDrop={handleCardDrop} isDragDisabled={disableDrag} gameState={gameState} playingCards={playingCards} />
          <PlayingCard data={card4} cardName="card4" onCardDrop={handleCardDrop} isDragDisabled={disableDrag} gameState={gameState} playingCards={playingCards} />
          <PlayingCard data={card5} cardName="card5" onCardDrop={handleCardDrop} isDragDisabled={disableDrag} gameState={gameState} playingCards={playingCards} />
        </View>

      </SafeAreaView>
    </ImageBackground>
  )
}


export default GameView;