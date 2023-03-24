import React, { useRef, useState } from 'react';
import { Animated, Easing, PanResponder, TouchableOpacity } from 'react-native';
import PlayerComponent from '../../components/PlayerComponent';
import { CricketPlayerDisplayProps } from '../../utils/display-properties';
import styles from './gameViewStyles';

const PlayingCard = ({ data, cardName, onCardDrop, isDragDisabled }) => {
    const [isOut, setIsOut] = useState(false);
    const pan = useRef(new Animated.ValueXY({ x: 0, y: -5 })).current;
    
    const panResponder = useRef(PanResponder.create({
        onPanResponderGrant: (evt, gestureState) => {
            setIsOut(false);
            pan.setOffset({ x: 0, y: pan.y._value })
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return !(gestureState.dx === 0 && gestureState.dy === 0);
        },
        onPanResponderMove: (e, gestureState) => {
            const newPos = { x: gestureState.dx, y: gestureState.dy };
            pan.setValue(newPos);
        },
        onPanResponderRelease: (e, gestureState) => {
            if (gestureState.moveX < 90 && gestureState.moveY < 130) {
                onCardDrop && onCardDrop(data, cardName);
            } else {
                pan.setOffset({ x: 0, y: 0 })
                Animated.spring(
                    pan,
                    {
                        toValue: { x: 0, y: -5 },
                        easing: Easing.bounce,
                        useNativeDriver: false
                    }).start();

            }

        }

    })).current;


    const moveCardUp = () => {
        Animated.timing(pan, {
            toValue: !isOut ? { x: 0, y: -80 } : { x: 0, y: -5 },
            useNativeDriver: false,
            easing: Easing.elastic(1.2),
            duration: 1000
        }).start();
        setIsOut(out => !out);
    }

    if (data) {
        return (
            <Animated.View key={cardName} style={[styles.cardContainer, pan.getLayout()]} {...(!isDragDisabled  && panResponder.panHandlers)} >
                <TouchableOpacity onPress={() => moveCardUp()} activeOpacity={1} >
                    <PlayerComponent
                        displayProps={CricketPlayerDisplayProps}
                        coverColor='#ccc'
                        playerData={data || {}}
                        useShortName={true}
                        height="160"
                    />
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

export default PlayingCard;