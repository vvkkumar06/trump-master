import React, { useContext, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, ToastAndroid, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import TMButton from '../../components/buttons/ButtonComponent';
import GalleryItemComponent from '../../components/GalleryItemComponent';
import { addToTeam } from '../../redux/features/cricket-slice';
import { findVacantPlayer, transformCollectionToList } from '../../redux/reducers/utils';
import SocketContext from '../../utils/SocketContext';
import CardDetailsView from '../detail/CardDetailsView';
import TeamView from '../team/TeamView';
const coverColor = '#ccc';

const CardsGalleryView = ({ stats, type, navigation }) => {
  const collection = useSelector(state => state.cricketCards.data);
  const clientInfo = useSelector(state => state.user.data);

  const socket = useContext(SocketContext);
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [selectedTeamCard, setSelectedTeamCard] = useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("show-preload", (args, cb) => {
      if (args) {
        ToastAndroid.show(args.error, ToastAndroid.SHORT)
      } else {
        navigation.navigate('PreGameLoader');
      }
    });
  }, []);

  const galleryHeader = () => {
    return (
      <View style={styles.galleryHeader}>
        <Text variant="titleLarge" style={styles.galleryLabel}>My Collection</Text>
      </View>
    )
  }

  const listData = useMemo(() => {
    return transformCollectionToList(collection && collection.backupCards, stats);
  }, [collection, stats])

  const renderList = () => {
    const vacantPlayerId = collection && findVacantPlayer(collection.playingCards);
    return <FlatList
      data={listData}
      numColumns={4}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: 10 }} />
      )}
      renderItem={({ item, index }) => {
        return (
          <>
            <GalleryItemComponent
              playerData={item}
              coverColor={coverColor}
              pressHandler={(id) => setSelectedCard(id)}
              canSelect={vacantPlayerId && !selectedCard ? true : false}
              animationStop={async (id) => {
                dispatch(addToTeam({ tmId: id, slotId: vacantPlayerId }));
              }}
            />
            <View style={{ width: 9 }} />
          </>
        )
      }}
      keyExtractor={item => item.TMID}
    />
  }
  const selectedPlayerData = useMemo(() => {
    return listData ? listData.find(card => card.TMID === selectedCard) : {}
  }, [selectedCard, selectedTeamCard]);

  const canStartPlay = useMemo(() => {
    return collection && Object.values(JSON.parse(JSON.stringify(collection.playingCards))).length <= 2
  }, [collection]);

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedCard(undefined)
        setSelectedTeamCard(undefined)
      }}
      activeOpacity={1}
      style={styles.background}
    >
      <ImageBackground source={require('./../../../assets/background4.png')} resizeMode="cover" style={styles.background}>
        <SafeAreaView style={styles.container}>
          <View style={styles.galleryLeft}>
            {galleryHeader()}
            {listData && listData.length ? renderList() :
              <Text style={styles.noCards}>No Cards Available!</Text>
            }
          </View>
          <View style={styles.galleryRight}>
            {
              selectedCard || selectedTeamCard ? (
                <CardDetailsView playerData={selectedPlayerData || selectedTeamCard} />
              ) : (
                <>
                  <TeamView stats={stats} socket={socket} onTeamCardSelect={(item) => setSelectedTeamCard(item)}/>
                  <TMButton
                    label="Play Now"
                    type={'success'}
                    style={styles.playNow}
                    disabled={canStartPlay}
                    labelStyle={styles.playNowLabel}
                    onPressHandler={() => {
                      socket.emit('new-game', {
                        gameState: {
                          availableCards: collection.playingCards
                        },
                        clientInfo
                      });
                    }}
                  />
                </>

              )
            }
          </View>
        </SafeAreaView>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  playNow: {
    width: "100%",
    marginTop: 25,
    color: '#ccc',
    backgroundColor: 'rgba(0,200,0,0.5)'
  },
  galleryLeft: {
    width: '50%'
  },
  galleryRight: {
    alignItems: 'center',
    width: '40%',
    marginRight: 15
  },
  playNowLabel: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  galleryItemContainer: {
    width: 80,
    height: 80
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  noCards: {
    fontStyle: 'italic',
    color: '#eee'
  },
  galleryHeader: {
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 10
  },
  galleryLabel: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#eee'
  }
})

export default CardsGalleryView;