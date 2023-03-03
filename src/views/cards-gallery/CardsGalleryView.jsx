import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';
import GalleryItemComponent from '../../components/GalleryItemComponent';
import dummyData from './../../../data/players';

const coverColor = '#ccc';

const CardsGalleryView = (props) => {

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyData}
        numColumns={4}
        renderItem={({ item }) => {
          return (
          <View style={{margin: 5 }}>
            <GalleryItemComponent
              playerData={item}
              coverColor={coverColor} />
          </View>)
        }}
        keyExtractor={item => item.Name}
      />
    </SafeAreaView>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 5
  }
})

export default CardsGalleryView;