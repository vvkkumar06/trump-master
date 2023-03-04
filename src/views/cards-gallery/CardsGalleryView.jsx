import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native';
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
      <TeamView />
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
  }
})

export default CardsGalleryView;