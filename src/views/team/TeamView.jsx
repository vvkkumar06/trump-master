import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import GalleryItemComponent from '../../components/GalleryItemComponent';
import { removeFromTeam } from '../../redux/features/cricket-slice';
import { transformTeamToPlayingCards } from '../../redux/reducers/utils';
const coverColor = '#ccc';

const TeamView = ({stats}) => {
  const collection  = useSelector(state => state.cricketCards.data);
  const dispatch = useDispatch();

  const containerRefs = useRef([]);

  const playingCards = useMemo(() => {
    return transformTeamToPlayingCards(collection && collection.playingCards, stats);
  }, [collection])
  
  const getGalleryItem = (item, key) => {
    return <GalleryItemComponent
      playerData={item}
      coverColor={coverColor}
      toLeftAnim = {true}
      longPressHandler={() => {
        containerRefs.current[`card${key}`].setNativeProps({
          style: {
            zIndex: 999
          }
        })
      }}
      animationStop={ async () => {
        dispatch(removeFromTeam({tmId: item.TMID, slotId: `card${key}`}));
        containerRefs.current[key] = undefined;
      }}
    />
  }
  const { card1, card2, card3, card4, card5 } = playingCards;
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.teamLabel}>Edit Team</Text>
      <View style={styles.teamContainer}>
        <View id="card-1" style={{ ...styles.cardContainer, ...styles.card1, ...(card1 && card1.TMID && styles.borderStyleBold) }}
          key='card-1'
          ref={(ref) => containerRefs.current['card1'] = ref}>
          {card1 && card1.TMID && getGalleryItem(card1, 1)}
        </View>
        <View id="card-2" style={{ ...styles.cardContainer, ...styles.card2, ...(card2 && card2.TMID && styles.borderStyleBold) }}
          key='card-2'
          ref={(ref) => containerRefs.current['card2'] = ref}>
          {card2 && card2.TMID && getGalleryItem(card2, 2)}
        </View>
        <View id="card-3" style={{ ...styles.cardContainer, ...styles.card3, ...(card3 && card3.TMID && styles.borderStyleBold) }}
          key='card-3'
          ref={(ref) => containerRefs.current['card3'] = ref}>
          {card3 && card3.TMID && getGalleryItem(card3, 3)}
        </View>
        <View id="card-4" style={{ ...styles.cardContainer, ...styles.card4, ...(card4 && card4.TMID && styles.borderStyleBold) }}
          key='card-4'
          ref={(ref) => containerRefs.current['card4'] = ref}>
          {card4 && card4.TMID && getGalleryItem(card4, 4)}
        </View>
        <View id="card-5" style={{ ...styles.cardContainer, ...styles.card5, ...(card5 && card5.TMID && styles.borderStyleBold) }}
          key='card-5'
          ref={(ref) => containerRefs.current['card5'] = ref}>
          {card5 && card5.TMID && getGalleryItem(card5, 5)}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 220,
    backgroundColor: 'transparent'
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    width: 80,
    height: 80,
    borderRadius: 0,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  teamLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: '#eee',
    height: 30,
    fontStyle: 'italic',
    borderBottomColor: 'red'
  },
  card1: {
    borderWidth: 1,
    borderColor: '#3f51b5',
    borderStyle: 'dashed'
  },
  card2: {
    borderWidth: 1,
    borderColor: '#e91e63',
    borderStyle: 'dashed'
  },
  card3: {
    borderWidth: 1,
    borderColor: '#673ab7',
    borderStyle: 'dashed'
  },
  card4: {
    borderWidth: 1,
    borderColor: '#9c27b0',
    borderStyle: 'dashed'
  },
  card5: {
    borderWidth: 1,
    borderColor: '#f44336',
    borderStyle: 'dashed'
  },
  borderStyleBold: {
    borderWidth: 2,
    borderStyle: 'solid'
  }
})

export default TeamView;