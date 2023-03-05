import React, { useEffect, useReducer, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView, FlatList, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import TMButton from '../../components/buttons/ButtonComponent';
import GalleryItemComponent from '../../components/GalleryItemComponent';
import { removeFromGallery } from '../../redux/features/gallery-slice';
import { addToTeam } from '../../redux/features/team-slice';
import { transformGalleryCardStateToList } from '../../redux/reducers/utils';
import { findVacantPlayer } from '../../redux/reducers/utils';
import TeamView from '../team/TeamView';
import dummyData from './../../../data/cricket-players';
const coverColor = '#ccc';

const CardsGalleryView = (props) => {
  const [galleryData, setGalleryData] = useState([]);
  const galleryCardState = useSelector((state) => state.galleryCards);
  const teamCardState = useSelector((state) => state.teamCards);
  const dispatch = useDispatch()

  const containerRefs = useRef([]);

  useEffect(() => {
    setGalleryData(transformGalleryCardStateToList(galleryCardState));
  }, [galleryCardState]);

  const renderList = () => {
    return <FlatList
      data={galleryData}
      numColumns={4}
      renderItem={({ item, index }) => {
        return (
          <View style={{ margin: 5 }}
            key={`gallery-item-container-${item.TMID}`}
            ref={(ref) => containerRefs.current[`${item.TMID}-${index}`] = ref}
          >
            <GalleryItemComponent
              playerData={item}
              coverColor={coverColor}
              longPressHandler={(id) => {
                containerRefs.current[`${id}-${index}`] && containerRefs.current[`${id}-${index}`].setNativeProps({
                  style: {
                    zIndex: 999
                  }
                })
              
              }}
              canSelect={findVacantPlayer(teamCardState) ? true : false}
              addAnimationEnd = {(id)=>{
                dispatch(removeFromGallery({id}));
                let vacantPlayerId = findVacantPlayer(teamCardState);
                dispatch(addToTeam({playerId: vacantPlayerId, id}));
                containerRefs.current[`${id}-${index}`] = undefined;
              }}
            />
          </View>)
      }}
      keyExtractor={item => item.TMID}
    />
  }
  return (
    <ImageBackground source={require('./../../../assets/background1.png')} resizeMode="cover" style={styles.background}>
      <SafeAreaView style={styles.container}>
        {galleryData && galleryData.length ? renderList() : <Text style={styles.noCards}>No Cards Available!</Text>}
        <View style={styles.galleryRight}>
          <TeamView />
          <TMButton
            label="Play Now"
            type={'success'}
            style={styles.playNow}
            labelStyle={styles.playNowLabel}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
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
  galleryRight: {
    alignItems: 'center'
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