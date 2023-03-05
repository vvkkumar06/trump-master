import React, { useRef, useState } from 'react';
import { Animated, PanResponder, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TMButton from '../../components/buttons/ButtonComponent';
import GalleryItemComponent from '../../components/GalleryItemComponent';
import TeamView from '../team/TeamView';
import dummyData from './../../../data/cricket-players';

const coverColor = '#ccc';

const CardsGalleryView = (props) => {

  const containerRefs = useRef([]);

  //@TODO: For future ref
  // const renderList = () => {
  //   return <FlatList
  //     data={dummyData}
  //     numColumns={4}
  //     renderItem={({ item }) => {
  //       return (
  //         <View style={{ margin: 5 }} 
  //         key={`gallery-item-container-${item.TMID}`}
  //         ref={(ref) => containerRefs.current[item.TMID] = ref}
  //         >
  //           <GalleryItemComponent
  //             playerData={item}
  //             coverColor={coverColor}
  //             onPressHandler={() => { }}
  //             zIndexHandler={(z, id) => {
  //               containerRefs.current[id].setNativeProps({
  //                 style: {
  //                  zIndex: z
  //                 }
  //               })}}
  //           />
  //         </View>)
  //     }}
  //     keyExtractor={item => item.TMID}
  //   />
  // }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 5, columnGap: 5 }}>
          {dummyData.map(item => (
            <View style={styles.galleryItemContainer}
              key={`gallery-item-container-${item.TMID}`}
              ref={(ref) => containerRefs.current[item.TMID] = ref}
            >
              <GalleryItemComponent
                key={item.TMID}
                playerData={item}
                coverColor={coverColor}
                onPressHandler={() => { }}
                zIndexHandler={(z, id) => {
                  containerRefs.current[id].setNativeProps({
                    style: {
                      zIndex: z
                    }
                  })
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
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
  }
})

export default CardsGalleryView;