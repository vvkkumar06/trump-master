import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ImageBackground, Image, Text } from 'react-native'
import CardsShuffleComponent from '../../components/CardsShuffleComponent';
import { CricketPlayerDisplayProps } from '../../utils/display-properties';
import PlayerComponent from '../../components/PlayerComponent';
import { transformTeamToPlayingCards } from '../../redux/reducers/utils';
import CardFlipComponent from '../../components/CardFlipComponent';

const PostGame = ({ stats, lostPlayerCards, shuffleData, socket, winner }) => {
    const totalCards = Object.values(lostPlayerCards).length;
    const shuffleRef = useRef();
    const cardFlip = useRef({});
    const [flipDisabled, setFlipDisabled] = useState(true);
    const playingCards = transformTeamToPlayingCards(lostPlayerCards, stats)
    useEffect(() => {
        if (winner && winner.length === 1) {
            if(winner[0] === socket.id) {
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
    }, [])

    if (winner && winner.length === 1) {
        return (
            <View style={styles.container}>
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
                            <CardFlipComponent ref={(flipRef) => cardFlip.current[cardNo] = flipRef} key={cardNo}>
                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                    if (!flipDisabled) {
                                        cardFlip.current[cardNo].flip();
                                        setFlipDisabled(true);
                                    }
                                }}>
                                    <PlayerComponent
                                        displayProps={CricketPlayerDisplayProps}
                                        coverColor='#ccc'
                                        playerData={playingCards[cardNo] || {}}
                                        useShortName={false}
                                        height="210"
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

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    backContainer: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' },
    backBackground: { width: '100%', height: '100%' },
    backLogo: { width: 50, height: 50, position: 'absolute' }
});

export default React.memo(PostGame);