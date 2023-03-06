import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import TMButton from '../../components/buttons/ButtonComponent';
import GalleryItemComponent from '../../components/GalleryItemComponent';
import { removeFromGallery } from '../../redux/features/gallery-slice';
import { addToTeam } from '../../redux/features/team-slice';
import { transformGalleryCardStateToList } from '../../redux/reducers/utils';
import { findVacantPlayer } from '../../redux/reducers/utils';
import CardDetailsView from '../detail/CardDetailsView';
import TeamView from '../team/TeamView';
const coverColor = '#ccc';

const CardsGalleryView = (props) => {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(undefined);
  const galleryCardState = useSelector((state) => state.galleryCards);
  const teamCardState = useSelector((state) => state.teamCards);
  const dispatch = useDispatch();

  useEffect(() => {
    setGalleryData(transformGalleryCardStateToList(galleryCardState));
  }, [galleryCardState]);

  const renderList = () => {
    const vacantPlayerId = findVacantPlayer(teamCardState);
    return <FlatList
      data={galleryData}
      numColumns={4}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: 10 }} />
      )}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      renderItem={({ item, index }) => {
        return (
          <GalleryItemComponent
            playerData={item}
            coverColor={coverColor}
            pressHandler={(id) => setSelectedCard(id)}
            canSelect={vacantPlayerId && !selectedCard ? true : false}
            animationStop={(id) => {
              dispatch(removeFromGallery({ id }));
              dispatch(addToTeam({ playerId: vacantPlayerId, id }));
            }}
          />
        )
      }}
      keyExtractor={item => item.TMID}
    />
  }
  const selectedPlayerData = useMemo(() => {
    return galleryData.find(card => card.TMID === selectedCard)
  }, [selectedCard]);

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedCard(undefined)
      }}
      activeOpacity={1}
      style={styles.background}
    >
      <ImageBackground source={require('./../../../assets/background1.png')} resizeMode="cover" style={styles.background}>
        <SafeAreaView style={styles.container}>
          <View style={styles.galleryLeft}>
            {galleryData && galleryData.length ? renderList() : <Text style={styles.noCards}>No Cards Available!</Text>}
          </View>
          <View style={styles.galleryRight}>
            {
              selectedCard ? (
                <CardDetailsView playerData={selectedPlayerData} />
              ) : (
                <>
                  <TeamView />
                  <TMButton
                    label="Play Now"
                    type={'success'}
                    style={styles.playNow}
                    labelStyle={styles.playNowLabel}
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
    marginTop: 15,
    color: '#ccc'
  },
  galleryLeft: {
    width: '50%'
  },
  galleryRight: {
    alignItems: 'center',
    width: '40%'
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
    fontStyle: 'italic'
  }
})

export default CardsGalleryView;