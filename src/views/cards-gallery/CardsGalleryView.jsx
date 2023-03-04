import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native';
import TMButton from '../../components/buttons/ButtonComponent';
import GalleryItemComponent from '../../components/GalleryItemComponent';
import TeamView from '../team/TeamView';
import dummyData from './../../../data/cricket-players';

const coverColor = '#ccc';

const CardsGalleryView = (props) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        numColumns={4}
        renderItem={({ item }) => {
          return (
            <View style={{ margin: 5 }}>
              <GalleryItemComponent
                playerData={item}
                coverColor={coverColor} />
            </View>)
        }}
        keyExtractor={item => item.TMID}
      />
      <View style={styles.galleryRight}>
        <TeamView />
        <TMButton 
          label="Play Now" 
          type={'success'}
          style={styles.playNow}
          labelStyle={styles.playNowLabel}
          />
      </View>
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  }
})

export default CardsGalleryView;