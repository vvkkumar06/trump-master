import React, { useEffect, useReducer, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import GalleryItemComponent from '../../components/GalleryItemComponent';
import { removeFromTeam } from '../../redux/features/team-slice';
import { addToGallery } from '../../redux/features/gallery-slice';
import { transformTeamCardsStateToList } from '../../redux/reducers/utils';
import { useGetAllPlayersQuery } from '../../redux/features/cricket-slice';
const coverColor = '#ccc';

const TeamView = () => {
  const { data: playersApiData, error, isLoading } = useGetAllPlayersQuery();
  const teamCards = useSelector((state) => state.teamCards)
  const dispatch = useDispatch();
  const [players, setPlayers] = useState({});

  const containerRefs = useRef([]);

  useEffect(() => {
    playersApiData && setPlayers(transformTeamCardsStateToList(teamCards, playersApiData));
  }, [teamCards, playersApiData]);

  const getGalleryItem = (item, key) => {
    return <GalleryItemComponent
      playerData={item}
      coverColor={coverColor}
      toLeftAnim = {true}
      longPressHandler={() => {
        containerRefs.current[`player${key}`].setNativeProps({
          style: {
            zIndex: 999
          }
        })

      }}
      animationStop={() => {
        dispatch(removeFromTeam({ playerId: key }));
        dispatch(addToGallery({id: item.TMID}))
        containerRefs.current[key] = undefined;
      }}
    />
  }
  const { player1, player2, player3, player4, player5 } = players;
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.teamLabel}>Edit Team</Text>
      <View style={styles.teamContainer}>
        <View id="player-1" style={{ ...styles.cardContainer, ...styles.player1, ...(player1 && styles.borderStyleBold) }}
          key='player-1'
          ref={(ref) => containerRefs.current['player1'] = ref}>
          {player1 && getGalleryItem(player1, 1)}
        </View>
        <View id="player-2" style={{ ...styles.cardContainer, ...styles.player2, ...(player2 && styles.borderStyleBold) }}
          key='player-2'
          ref={(ref) => containerRefs.current['player2'] = ref}>
          {player2 && getGalleryItem(player2, 2)}
        </View>
        <View id="player-3" style={{ ...styles.cardContainer, ...styles.player3, ...(player3 && styles.borderStyleBold) }}
          key='player-3'
          ref={(ref) => containerRefs.current['player3'] = ref}>
          {player3 && getGalleryItem(player3, 3)}
        </View>
        <View id="player-4" style={{ ...styles.cardContainer, ...styles.player4, ...(player4 && styles.borderStyleBold) }}
          key='player-4'
          ref={(ref) => containerRefs.current['player4'] = ref}>
          {player4 && getGalleryItem(player4, 4)}
        </View>
        <View id="player-5" style={{ ...styles.cardContainer, ...styles.player5, ...(player5 && styles.borderStyleBold) }}
          key='player-5'
          ref={(ref) => containerRefs.current['player5'] = ref}>
          {player5 && getGalleryItem(player5, 5)}
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
  player1: {
    borderWidth: 1,
    borderColor: '#3f51b5',
    borderStyle: 'dashed'
  },
  player2: {
    borderWidth: 1,
    borderColor: '#e91e63',
    borderStyle: 'dashed'
  },
  player3: {
    borderWidth: 1,
    borderColor: '#673ab7',
    borderStyle: 'dashed'
  },
  player4: {
    borderWidth: 1,
    borderColor: '#9c27b0',
    borderStyle: 'dashed'
  },
  player5: {
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