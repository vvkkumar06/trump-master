import React, { forwardRef, useImperativeHandle } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';

const CardFlipComponent = forwardRef(({ children, customStyle }, ref) => {
    const rotation = useSharedValue(0);
    const backRotation = useSharedValue(180);
    const frontStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateY: withTiming(`${rotation.value}deg`, { duration: 500 }) }]
        }
    })
    const backStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateY: withTiming(`${backRotation.value}deg`, { duration: 500 }) }]
        }
    })

    useImperativeHandle(ref, () => {
        return {
            flip
        }
    });

    const flip = () => {
        if (rotation.value === 180) {
            rotation.value = 0;
            backRotation.value = 180;
        } else {
            rotation.value = 180;
            backRotation.value = 0;
        }
    }
    return (
        <View style={[{ width: '100%', height: '100%', position: 'relative' }, customStyle]}>
            <Animated.View style={[styles.card, backStyle]}>
                {children[1]}
            </Animated.View>
            <Animated.View style={[styles.card, frontStyle]}>
                {children[0]}
            </Animated.View>
        </View >

    )
});

const styles = StyleSheet.create({
    card: {
        backfaceVisibility: 'hidden',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    }
});

export default CardFlipComponent;