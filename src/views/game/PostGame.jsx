import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ImageBackground, Image, Text } from 'react-native'
import CardsShuffleComponent from '../../components/CardsShuffleComponent';
import { CricketPlayerDisplayProps } from '../../utils/display-properties';
import PlayerComponent from '../../components/PlayerComponent';
import { transformTeamToPlayingCards } from '../../redux/reducers/utils';
import CardFlipComponent from '../../components/CardFlipComponent';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useLazyFetchUserQuery } from '../../redux/features/api';

const PostGame = ({ stats, lostPlayerCards, shuffleData, socket, winner, opponentId, navigation }) => {
    const totalCards = Object.values(lostPlayerCards).length;
    const [refectchUser] = useLazyFetchUserQuery();
    const shuffleRef = useRef();
    const cardFlip = useRef({});
    const [flipDisabled, setFlipDisabled] = useState(true);
    const [pickedCard, setPickedCard] = useState(undefined);
    const [removedCard, setRemovedCard] = useState(undefined);
    const playingCards = transformTeamToPlayingCards(lostPlayerCards, stats)
    const pickedCardOpacity = useSharedValue(0);


    const pickedCardAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(pickedCardOpacity.value, { duration: 500 }),
        }
    });

    const isCurrentClientWon = () => winner && winner.length === 1 && winner[0] === socket.id;
    useEffect(() => {
        socket.on('card-removed', (args) => {
            setRemovedCard(args.removedCard);
        })
        socket.on('post-processing-done', async (args) => {
            await refectchUser();
            navigation.navigate('Dashboard');
        });
        if (winner && winner.length === 1) {
            if (isCurrentClientWon()) {
                Object.values(cardFlip.current).map(card => {
                    card.flip();
                })
            }
            setTimeout(() => {
                shuffleRef.current.shuffleCards();
                setTimeout(() => {
                    setFlipDisabled(winner[0] === socket.id ? false : true)
                }, 1000)
            }, 2000)
        }
    }, []);

    useEffect(() => {
        if (pickedCard || removedCard) {
            pickedCardOpacity.value = 1;
        }
    }, [pickedCard, removedCard])

    if (winner && winner.length === 1 && !pickedCard && !removedCard) {
        return (
            <View style={styles.container}>
                <Text style={styles.postGameLabel}> {
                    isCurrentClientWon() ? "Pick a card from opponent's desk" : "Opponent is picking a card"
                }</Text>
                <CardsShuffleComponent
                    shuffleData={shuffleData}
                    width={120}
                    height={180}
                    margin={4}
                    totalCards={totalCards}
                    ref={shuffleRef}
                >
                    {
                        Object.keys(playingCards).map(cardNo => (
                            <CardFlipComponent ref={(flipRef) => cardFlip.current[cardNo] = flipRef} key={cardNo} customStyle={(cardNo === pickedCard || cardNo === removedCard) ? (cardNo === pickedCard ? styles.borderGreen : styles.borderRed) : undefined}>
                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                    if (!flipDisabled) {
                                        cardFlip.current[cardNo].flip();
                                        setFlipDisabled(true);
                                        setPickedCard(cardNo);
                                        socket.emit('end-game', {
                                            pickedCardName: cardNo,
                                            pickedCardId: lostPlayerCards[cardNo],
                                            winner: socket.id,
                                            loser: opponentId
                                        });
                                    }
                                }}>
                                    <PlayerComponent
                                        displayProps={CricketPlayerDisplayProps}
                                        coverColor='#ccc'
                                        playerData={playingCards[cardNo] || {}}
                                        useShortName={false}
                                        height="180"
                                    />
                                </TouchableOpacity>
                                <View style={styles.backContainer}>
                                    <ImageBackground source={require('./../../../assets/card-backface.jpg')} resizeMode="cover" style={styles.backContainer} />
                                    <Image
                                        style={styles.backLogo}
                                        source={require('./../../../assets/images/app-icons/logo.png')}
                                    />
                                </View>
                            </CardFlipComponent>
                        ))
                    }
                </CardsShuffleComponent>
            </View>

        );
    }
    if (pickedCard || removedCard) {
        return (
            <View style={styles.pickedCardWrapper}>

                <Text style={[styles.postGameLabel, { fontSize: 18 }]}> {
                    pickedCard ? "Congratulations! You Received a new card" : "Ops! You lost a card"
                }</Text>
                <Animated.View style={[styles.pickedCardContianer, (pickedCard ? styles.borderGreen : styles.borderRed), pickedCardAnimatedStyle]}>
                    <PlayerComponent
                        displayProps={CricketPlayerDisplayProps}
                        coverColor='#ccc'
                        playerData={pickedCard ? playingCards[pickedCard] : playingCards[removedCard]}
                        useShortName={false}
                        height={210}
                    />
                </Animated.View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: { justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' },
    backContainer: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' },
    backBackground: { width: '100%', height: '100%' },
    backLogo: { width: 50, height: 50, position: 'absolute' },
    postGameLabel: { fontSize: 24, fontWeight: 900, color: 'orange', textTransform: 'uppercase' },
    pickedCardContianer: { justifyContent: 'center', alignItems: 'center', marginTop: 20, width: 140, height: 210, borderWidth: 5 },
    pickedCardWrapper: {display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'},
    borderGreen: { borderWidth: 2, borderColor: 'green' },
    borderRed: { borderWidth: 2, borderColor: 'red' }
});

export default React.memo(PostGame);