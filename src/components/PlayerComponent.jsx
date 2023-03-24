import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { View } from 'react-native';
import { transform } from 'lodash';

const getShortName = (name) => {
  name = name.split(' ');
  let fName = name[0].substr(0, 1);
  let lName = name[1];
  if(name.length === 3) {
    lName += ' ' + name[2];
  }
  return `${fName} ${lName}`;
};
const getFontSize = (height, ref) =>  Math.floor((ref/280)*height);

const PlayerComponent = ({ displayProps, playerData, coverColor,topStyle, idStyle, height, textVariant="labelSmall", imageStyle, useShortName }) => (
  

  <Card elevated key={playerData.PlayerName} style={[styles.container]} >
    <View style={[styles.topLeftBox, topStyle]} />
    <Image
      style={[styles.logo, imageStyle]}
      source={require('./../../assets/images/app-icons/logo.png')}
    />
    <Text style={[styles.id, idStyle, {fontSize: getFontSize(height, 24)}]}>C#{playerData.TMID}</Text>
    <Card.Cover source={{ uri: playerData.Image }} style={{ ...styles.image, backgroundColor: coverColor, borderRadius: 0 }} resizeMode='contain' />
    <Text style={{
      textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold',
      backgroundColor: '#333', color: '#eee', fontStyle: 'italic',
      fontSize: getFontSize(height, 16),
    }}>{!useShortName ? playerData.PlayerName : getShortName(playerData.PlayerName)}</Text>
    <View style={{
      justifyContent: 'space-between', flexDirection: 'row',
      padding: 0, flexWrap: 'wrap',
      ...styles.statsContainer
    }}>
      {
        displayProps ? Object.keys(displayProps).map(key => {

          return (
            <View style={{
              ...styles.statsRow,
              justifyContent: 'space-between', width: '50%',
              flexDirection: 'row', borderWidth: 1, borderColor: '#666',
            }} key={key}>
              <Text  style={{
                width: '50%', fontWeight: 'bold',
                backgroundColor: '#333',
                fontSize: getFontSize(height, 13),
                color: '#eee'
              }}> {displayProps[key]} </Text>
              <Text style={{
                textAlign: 'center', fontWeight: 'bold', letterSpacing: 0.2,
                width: '50%', borderWidth: 1, borderColor: '#ccc',
                backgroundColor: '#ddd', color: '#333',
                fontSize: getFontSize(height, 12),
              }} >{playerData[key] ? playerData[key] : '-'} </Text>
            </View>)
        }) : []
      }
    </View>
  </Card>
);
// Min supported width 150
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    position: 'relative',
    backgroundColor: '#999'
  },
  image: {
    height: '38%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 55,
    borderRadius: 0
  },
  topLeftBox: {
    width: '68%',
    height: '7%',
    top: 0,
    backgroundColor: '#ccc',
    borderTopRightRadius: 55
  },
  id: {
    position: 'absolute',
    top: '25%',
    left: 0,
    backgroundColor: '#aaa',
    color: '#111',
    width: '45.5%',
    height: '14%',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    zIndex: 1
  },
  logo: {
    width: '22.7%',
    height: '18%',
    position: 'absolute',
    top: '5%',
    right: '-0.5%',
    zIndex: 1
  },
  statsRow: {
    height: "17%"
  },
  statsContainer: {
    height: '47%'
  }
})



export default PlayerComponent;