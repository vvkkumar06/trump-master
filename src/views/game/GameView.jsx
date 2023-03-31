import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Easing, ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { getCardDetailsFromTmId, transformTeamToPlayingCards } from '../../redux/reducers/utils';
import { useFetchStatsQuery } from '../../redux/features/api';
import styles from './gameViewStyles';
import PlayingCard from './PlayingCard';
import PlayerComponent from '../../components/PlayerComponent';
import { CricketPlayerDisplayProps } from '../../utils/display-properties';
import SocketContext from '../../utils/SocketContext';
import { Animated } from 'react-native';

const GameView = ({ navigation }) => {
  const socket = useContext(SocketContext);
  const { data: stats } = useFetchStatsQuery();
  const [nextRound, setNextRound] = useState(undefined);
  const [roundQuestion, setRoundQuestion] = useState('');
  const [recommendedMove, setRecommendedMove] = useState(undefined);

  // Reset below for every round
  const [player1, setPlayer1] = useState(undefined);
  const [player2Move, setPlayer2Move] = useState(undefined);
  const [removeCard, setRemoveCard] = useState(undefined);
  const [gameState, setGameState] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const [disableDrag, setDisableDrag] = useState(false);
  const [winner, setWinner] = useState(undefined);


  // animation
  const roundFontSize = useRef(new Animated.Value(0)).current;
  const questionOpacity = useRef(new Animated.Value(0)).current;
  const winnerFontSize = useRef(new Animated.Value(0)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;


  const preRoundAnimation = (cb) => {
    Animated.sequence([
      Animated.timing(roundFontSize, {
        useNativeDriver: false,
        toValue: 36,
        easing: Easing.exp,
        duration: 2000,
      }),
      Animated.timing(questionOpacity, {
        useNativeDriver: false,
        toValue: 1,
        easing: Easing.linear,
        duration: 1000,
      })
    ]).start(cb);
  }

  const postRoundAnimation = (cb) => {
    Animated.timing(winnerFontSize, {
      useNativeDriver: false,
      toValue: 36,
      easing: Easing.bounce,
      duration: 3000
    }).start(cb);
  }

  const resultAnimation = (cb) => {
    Animated.timing(resultOpacity, {
      useNativeDriver: false,
      toValue: 1,
      easing: Easing.ease,
      duration: 2000
    }).start(cb);
  }

  useEffect(() => {
    socket.emit('start-game');
    socket.on('game-status', (args) => {
      setGameState(args);
      args.winner && setWinner(args.winner);
    });
    socket.on('request-move', ({ nextRound, roundInfo }) => {
      roundFontSize.setValue(0);
      questionOpacity.setValue(0);
      setRoundQuestion(Object.values(roundInfo.question)[0]);
      setNextRound(nextRound);
      preRoundAnimation(() => {
        setRecommendedMove(roundInfo.recommendedMove);
      })
    });
    socket.on('game-over', ({ gameState, winner }) => {
      winnerFontSize.setValue(0);
      setGameState(gameState);
      setWinner(winner);
      postRoundAnimation();
    });

  }, [])

  useEffect(() => {
    if (winner && winner.length) {
      socket.emit('end-game');
      setTimeout(() => {
        navigation.navigate('Dashboard');
      }, 5000)
    }
  }, [winner]);

  useEffect(() => {
    if (nextRound) {
      setTimeout(() => {
        setPlayer1(undefined);
        setPlayer2Move(undefined);
        setDisableDrag(false);
        setRemoveCard(undefined);
        setResult(undefined);
      }, nextRound !== 1? 3000 : 1000);
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
        resultOpacity.setValue(0);
        if (gameState[socket.id].result[nextRound] === 'W') {
          setResult(`You Won Round ${nextRound}`);
        } else if (gameState[socket.id].result[nextRound] === 'T') {
          setResult(`Round ${nextRound} Tied!`);
        } else if (gameState[socket.id].result[nextRound] === 'L') {
          setResult(`You Lost Round ${nextRound}`);
        }
        resultAnimation();
      }
      return cards;
    } else {
      return {};
    }
  }, [gameState, nextRound, removeCard])

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
    <ImageBackground source={require('./../../../assets/background4.png')} resizeMode="cover" style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.selectedContainer}>
          <View style={[styles.player1SelectedContainer, , { width: 80, height: 120 }]}>
            {
              player1 ? (
                <View key={'player1'} style={[styles.cardContainer, { width: 70, height: 110 }]} >
                  <PlayerComponent
                    displayProps={CricketPlayerDisplayProps}
                    coverColor='#ccc'
                    playerData={player1 || {}}
                    useShortName={true}
                    height="110"
                  />
                </View>
              ) : (
                <Text style={{ color: '#bbb', fontWeight: 'bold' }}>
                  You
                </Text>
              )
            }

          </View>
          <View style={{ display: 'flex', alignItems: 'center', width: 400 }}>
            {
              winner ? (
                <Animated.Text style={[
                  styles.roundText,
                  { color: winner.length === 2 ? 'orange' : winner.includes(socket.id) ? 'green' : 'red', fontSize: winnerFontSize }]}>
                  {winner.length === 2 ? 'Tied' : winner.includes(socket.id) ? 'You Won' : 'You Lost'}
                </Animated.Text>
              ) : (
                <>
                  {!result && (<Animated.Text style={[styles.roundText, { color: 'yellow', fontSize: 36 }]}>
                    ROUND {nextRound}
                  </Animated.Text>)}
                  {
                    result ? (
                      <Animated.Text style={[styles.roundText, { fontSize: 24, color: result.includes('Won') ? 'green' : 'red', opacity: resultOpacity }]}>
                        {result}
                      </Animated.Text>
                    ) : (
                      <Animated.Text style={[styles.roundText, { fontSize: 18, color: 'orange' }, { opacity: questionOpacity }]}>
                        {roundQuestion}
                      </Animated.Text>
                    )
                  }

                </>
              )
            }

          </View>
          <View style={[styles.player2SelectedContainer, { width: 80, height: 120 }]}>
            {
              player2Move ? (
                <View key={'player2'} style={[styles.cardContainer, { width: 70, height: 110 }]} >
                  <PlayerComponent
                    displayProps={CricketPlayerDisplayProps}
                    coverColor='#ccc'
                    playerData={player2Move || {}}
                    useShortName={true}
                    height="110"
                  />
                </View>
              ) : (
                <Text style={{ color: '#bbb', fontWeight: 'bold', letterSpacing: 1, fontSize: 10 }}>
                  Opponent
                </Text>
              )
            }
          </View>
        </View>
        <View style={styles.cardsContainer}>
          {['card1', 'card2', 'card3', 'card4', 'card5'].map(card => (
            <PlayingCard
              key={card}
              data={playingCards[card]}
              cardName={card}
              recommendedCard={recommendedMove && recommendedMove[socket.id]}
              onCardDrop={handleCardDrop}
              isDragDisabled={disableDrag}
              gameState={gameState}
              playingCards={playingCards} />
          ))}
        </View>

      </SafeAreaView>
    </ImageBackground>
  )
}




export default GameView;