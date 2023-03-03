import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

const GalleryItemComponent = ({ playerData, coverColor }) => {
  let name = playerData.Name.split(' ');
  let fName = name[0].substr(0,1);
  let lName = name[1];
  name = `${fName} ${lName}`;

  return (
    <Card elevated={5} key={playerData.Name} style={styles.container} >
      <Card.Cover source={{ uri: playerData.Image }} style={{ ...styles.image, backgroundColor: coverColor, borderRadius: 0 }} resizeMode='contain' />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.id}>#{playerData.PlayerId}</Text>
      <View style={styles.topLeftBox}/>
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
    borderWidth: 0,
    borderTopLeftRadius: 15
  },
  image: {
    height: '90%',
    width: '100%',
    marginTop: '10%',
    borderTopLeftRadius: 35
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
    width: 30,
    height: 20,
    fontWeight: 900,
    fontSize: 15,
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
  }
})


export default GalleryItemComponent;

