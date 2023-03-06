import * as React from 'react';
import { StyleSheet } from 'react-native';
import {Card, Text } from 'react-native-paper';
import { View } from 'react-native';

const PlayerComponent = ({displayProps, playerData, coverColor}) => (
  <Card elevated key={playerData.PlayerName} style={styles.container} >
    <Card.Cover source={{ uri: playerData.Image}} style={{...styles.image, backgroundColor: coverColor, borderRadius: 0}} resizeMode='contain' />
    <Text style={{ 
    textAlign: 'center', textTransform: 'uppercase', fontWeight: 900,
    backgroundColor: '#333', color: '#eee', fontStyle: 'italic'
    }}>{playerData.PlayerName}</Text>
    <View style={{justifyContent: 'space-between', flexDirection: 'row', 
    padding: 0,flexWrap: 'wrap'}}>
      {     
        displayProps ? Object.keys(displayProps).map( key => {
          
          return (
          <View style={{
            justifyContent: 'space-between', width: '50%', 
            flexDirection: 'row', marginBottom: 2, borderWidth: 1, borderColor: '#666'
            }} key={key}>
            <Text variant="labelSmall" style={{
              width: '50%',fontWeight: 900, 
              backgroundColor: '#333',
              color: '#eee'
              }}> {displayProps[key]} </Text>
            <Text variant="labelSmall" style={{
              textAlign: 'center', fontSize: 10,
              width: '50%', borderWidth: 1, borderColor: '#ccc'
            }} >{playerData[key] ? playerData[key] : '-'} </Text>
          </View>)
        }) : []
      }
      
    </View>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 0
  },
  image: {
    height: 120,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
})



export default PlayerComponent;