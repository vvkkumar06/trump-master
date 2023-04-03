import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Easing, Image, ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { getCardDetailsFromTmId, transformTeamToPlayingCards } from '../../redux/reducers/utils';
import { useFetchStatsQuery } from '../../redux/features/api';
import styles from './gameViewStyles';
import PlayingCard from './PlayingCard';
import PlayerComponent from '../../components/PlayerComponent';
import { CricketPlayerDisplayProps } from '../../utils/display-properties';
import SocketContext from '../../utils/SocketContext';
import { Animated } from 'react-native';
import { Avatar, Badge } from 'react-native-paper';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


const GameView = ({ route, navigation }) => {
  const socket = useContext(SocketContext);
  const { data: stats } = useFetchStatsQuery();
  const [nextRound, setNextRound] = useState(undefined);
  const [roundQuestion, setRoundQuestion] = useState('');
  const [recommendedMove, setRecommendedMove] = useState(undefined);
  const [opponentId, setOpponentId] = useState(undefined);
  const [p1Time, setP1Time] = useState(0);
  const [p2Time, setP2Time] = useState(0);
  const { userDetails } = route.params || {};

  const players = useMemo(() => {
    const players = {};
    if (userDetails && userDetails[1] && userDetails[2]) {
      if (userDetails[1].clientId === socket.id) {
        players['p1'] = userDetails[1].clientInfo;
        players['p2'] = userDetails[2].clientInfo;
        setOpponentId(userDetails[2].clientId);
      } else {
        players['p1'] = userDetails[2].clientInfo;
        players['p2'] = userDetails[1].clientInfo;
        setOpponentId(userDetails[1].clientId)
      }
    }
    return players;
  }, [userDetails]);

  // Reset below for every round
  const [player1, setPlayer1] = useState(undefined);
  const [player2Move, setPlayer2Move] = useState(undefined);
  const [removeCard, setRemoveCard] = useState(undefined);
  const [gameState, setGameState] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const [disableDrag, setDisableDrag] = useState(true);
  const [winner, setWinner] = useState(undefined);


  // animation
  const roundFontSize = useRef(new Animated.Value(0)).current;
  const questionOpacity = useRef(new Animated.Value(0)).current;
  const winnerFontSize = useRef(new Animated.Value(0)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;


  const getTimer = (time) => (
    <CountdownCircleTimer
      isPlaying
      strokeWidth={6}
      size={50}
      duration={time}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[time - time / 4, time - time / 2, time - time * 3 / 4, 0]}
    />
  )


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
      duration: 1000
    }).start(cb);
  }

  useEffect(() => {
    socket.emit('start-game');
    socket.on('game-status', (args) => {
      setGameState(args);
      args.winner && setWinner(args.winner);
    });
    socket.on('request-move', ({ nextRound, roundInfo }) => {
      setP1Time(0);
      setP2Time(0);
      roundFontSize.setValue(0);
      questionOpacity.setValue(0);
      setRoundQuestion(Object.values(roundInfo.question)[0]);
      setRecommendedMove(roundInfo.recommendedMove);
      setNextRound(nextRound);
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
      setPlayer1(undefined);
      setPlayer2Move(undefined);
      setRemoveCard(undefined);
      setResult(undefined);
      setDisableDrag(false);
      preRoundAnimation(() => {
        setP1Time(30);
        setP2Time(30);
      })
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

  const getRoundColor = (round, isOpponent) => {
    const id = isOpponent ? opponentId : socket.id;
    if (id && gameState) {
      const status = gameState[id].result[round];
      if (status && (status === 'W')) {
        return 'green';
      } else if (status && (status === 'L')) {
        return 'red';
      } else if(status && (status === 'T')){
        return 'orange';
      } else {
        return 'transparent';
      }
    }
    return 'transparent';
  }

  return (
    <ImageBackground source={require('./../../../assets/background4.png')} resizeMode="cover" style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topDesign}>
          <View style={styles.topLeftLine} >
            <View style={{ width: 20, height: 20, marginRight: 20, marginLeft: 20, marginBottom: 35, alignItems: 'center' }}>
              {p1Time && !player1 ? getTimer(p1Time) : <></>}
              {players['p1'] && <Avatar.Image size={40} source={{ uri: players['p1'].picture }} style={{ position: 'absolute', marginTop: 5 }} />}
            </View>
            {players['p1'] && <Text style={{ color: 'white', position: 'absolute', left: 80, bottom: 0 }}>{players['p1'].name}</Text>}

            <View style={styles.roundInfo1}>
              <Badge key="p1-r1" style={[styles.roundBadge, { backgroundColor: getRoundColor(1) }]} size={15} />
              <Badge key="p1-r2" style={[styles.roundBadge, { backgroundColor: getRoundColor(2) }]} size={15} />
              <Badge key="p1-r3" style={[styles.roundBadge, { backgroundColor: getRoundColor(3) }]} size={15} />
            </View>
          </View>
          <View style={styles.centerLine}>
            {!result && (
              <Animated.Text style={[styles.roundText, { color: 'yellow', fontSize: 36 }]}>
                ROUND {nextRound}
              </Animated.Text>
            )}
          </View>
          <View style={styles.topRightLine} >
            <View style={{ width: 20, height: 20, marginRight: 20, marginLeft: 20, marginBottom: 35, alignItems: 'center' }}>
              {p2Time && !player2Move ? getTimer(p2Time) : <></>}
              {players['p2'] && <Avatar.Image size={40} source={{ uri: players['p2'].picture }} style={{ position: 'absolute', marginTop: 5 }} />}
            </View>
            {players['p2'] && <Text style={{ color: 'white', position: 'absolute', left: 65, bottom: 0 }}>{players['p2'].name}</Text>}

            <View style={styles.roundInfo2}>
              <Badge key="p2-r1" style={[styles.roundBadge, { backgroundColor: getRoundColor(1, true) }]} size={15} />
              <Badge key="p2-r2" style={[styles.roundBadge, { backgroundColor: getRoundColor(2, true) }]} size={15} />
              <Badge key="p2-r3" style={[styles.roundBadge, { backgroundColor: getRoundColor(3, true) }]} size={15} />
            </View>
          </View>
        </View>
        <View style={styles.selectedContainer}>
          <View style={[styles.player1SelectedContainer,
          { width: 80, height: 120 }]}>
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
                <View style={[
                { width: '100%', height: '100%', backgroundColor: 'darkgreen', justifyContent: 'center', alignItems: 'center' }]}>
                  <Text style={{ color: '#bbb', fontWeight: 'bold' }}>
                    You
                  </Text>
                </View>
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
              player2Move ? (player1 ? (
                <View key={'player2'} style={[styles.cardContainer, { width: 70, height: 110 }]} >
                  <PlayerComponent
                    displayProps={CricketPlayerDisplayProps}
                    coverColor='#ccc'
                    playerData={player2Move || {}}
                    useShortName={true}
                    height="110"
                  />
                </View>) : (
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                  <ImageBackground source={require('./../../../assets/card-backface.jpg')} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
                  <Image
                    style={{ width: 50, height: 50, position: 'absolute' }}
                    source={require('./../../../assets/images/app-icons/logo.png')}
                  />
                </View>

              )) : (
                <View style={[
                  { width: '100%', height: '100%', backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ color: '#bbb', fontWeight: 'bold' }}>
                      Opponent
                    </Text>
                  </View>
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