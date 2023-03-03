import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';
import PlayerComponent from '../../../components/PlayerComponent';
import { CricketPlayerDisplayProps } from '../../../utils/display-properties';
import dummyData from './../../../../data/players';

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};

const PlayersView = (props) => {

  return( 
    <SafeAreaView style={styles.container}>
       <FlatList 
        data={dummyData}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        renderItem={({item}) => {
          return <View>  
            <PlayerComponent displayProps = {CricketPlayerDisplayProps} playerData={item} coverColor={generateColor()} />
          </View>
        }}
        keyExtractor={item => item.StrikerName}
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

export default PlayersView;