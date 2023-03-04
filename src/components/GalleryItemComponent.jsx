import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

const GalleryItemComponent = ({ playerData, coverColor }) => {
  let name = playerData.PlayerName.split(' ');
  let fName = name[0].substr(0,1);
  let lName = name[1];
  name = `${fName} ${lName}`;

  return (
    <Card elevated={5} key={playerData.TMID} style={styles.container} >
      <Card.Cover source={{ uri: playerData.Image}} style={{ ...styles.image, backgroundColor: coverColor }} resizeMode='contain' />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.id}>C#{playerData.TMID}</Text>
      <View style={styles.topLeftBox}/>
      <Image
        style={styles.logo}
        source={require('./../../assets/images/app-icons/logo.png')}
      />
    </Card>
    );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    position: 'relative',
    borderRadius: 0,
    backgroundColor: '#999',
    borderWidth: 0
  },
  image: {
    height: '90%',
    width: '100%',
    marginTop: '10%',
    borderTopLeftRadius: 35,
    borderRadius: 0
  },
  name: {
    textAlign: 'center', 
    textTransform: 'uppercase', 
    fontWeight: 900,
    backgroundColor: '#333',
    color: '#eee', 
    fontStyle: 'italic', 
    fontSize: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  id: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    backgroundColor: '#aaa',
    color: '#111',
    width: 40,
    height: 20,
    fontWeight: 900,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  topLeftBox: {
    width: 55,
    height: 10,
    position: 'absolute',
    top: 0,
    backgroundColor: '#ccc',
    borderTopRightRadius: 15
  },
  logo: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 5,
    right: -3
  },
})


export default GalleryItemComponent;

