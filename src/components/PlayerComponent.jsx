import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { View } from 'react-native';

const PlayerComponent = ({ displayProps, playerData, coverColor }) => (
  <Card elevated key={playerData.PlayerName} style={styles.container} >
    <View style={styles.topLeftBox} />
    <Image
      style={styles.logo}
      source={require('./../../assets/images/app-icons/logo.png')}
    />
    <Text style={styles.id}>C#{playerData.TMID}</Text>
    <Card.Cover source={{ uri: playerData.Image }} style={{ ...styles.image, backgroundColor: coverColor, borderRadius: 0 }} resizeMode='contain' />
    <Text style={{
      textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold',
      backgroundColor: '#333', color: '#eee', fontStyle: 'italic'
    }}>{playerData.PlayerName}</Text>
    <View style={{
      justifyContent: 'space-between', flexDirection: 'row',
      padding: 0, flexWrap: 'wrap'
    }}>
      {
        displayProps ? Object.keys(displayProps).map(key => {

          return (
            <View style={{
              justifyContent: 'space-between', width: '50%',
              flexDirection: 'row', marginBottom: 2, borderWidth: 1, borderColor: '#666'
            }} key={key}>
              <Text variant="labelSmall" style={{
                width: '50%', fontWeight: 'bold',
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
    borderRadius: 0,
    position: 'relative',
    backgroundColor: '#999'
  },
  image: {
    height: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 55,
    borderRadius: 0
  },
  topLeftBox: {
    width: 150,
    height: 20,
    top: 0,
    backgroundColor: '#ccc',
    borderTopRightRadius: 55
  },
  id: {
    position: 'absolute',
    top: 70,
    left: 0,
    backgroundColor: '#aaa',
    color: '#111',
    width: 100,
    height: 40,
    fontWeight: 'bold',
    fontSize: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    zIndex: 1
  },
  logo: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 15,
    right: -6,
    zIndex: 1
  }
})



export default PlayerComponent;