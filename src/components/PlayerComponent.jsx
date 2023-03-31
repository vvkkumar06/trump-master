import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { View, Text } from 'react-native';

const getShortName = (name) => {
  name = name && name.split(' ');

  if (name && name.length > 1) {

    let fName = name[0].substr(0, 1);
    let lName = name[1];
    if (name.length === 3) {
      lName += ' ' + name[2];
    }
    return `${fName} ${lName}`;
  } else {
    return name;
  }
};
const getFontSize = (height, ref) => Math.floor((ref / 280) * height);

const PlayerComponent = ({ displayProps, playerData, coverColor, topStyle, idStyle, height, textVariant = "labelSmall", imageStyle, useShortName }) => (


  <Card elevated key={playerData.PlayerName} style={[styles.container]} >
    <View style={[styles.topLeftBox, topStyle]} />
    <Image
      style={[styles.logo, imageStyle]}
      source={require('./../../assets/images/app-icons/logo.png')}
    />
    <Text style={[styles.id, idStyle, { fontSize: getFontSize(height, 24) }]}>C#{playerData.TMID}</Text>
    <Card.Cover source={{ uri: playerData.Image }} style={{ ...styles.image, backgroundColor: coverColor, borderRadius: 0 }} resizeMode='contain' />
    <Text style={{
      textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold',
      backgroundColor: '#333', color: '#eee', fontStyle: 'italic',
      fontSize: getFontSize(height, 16),
    }}>{!useShortName ? playerData.PlayerName : getShortName(playerData.PlayerName)}</Text>
    <View style={{
      justifyContent: 'space-between', flexDirection: 'row', 
      flexWrap: 'wrap', backgroundColor: '#eee', alignContent: 'space-between', 
      padding: 1, paddingTop: 0, paddingBottom: 1,
      ...styles.statsContainer
    }}>
      {
        displayProps ? Object.keys(displayProps).map(key => {

          return (
            <View style={{
              ...styles.statsRow,
              justifyContent: 'space-between', width: '49%',
              flexDirection: 'row', height: '14%', alignSelf: 'center',
            }} key={key}>
              <Text style={{
                width: '48%',
                backgroundColor: '#333',
                fontFamily: 'ChangaOne-Italic',
                fontSize: getFontSize(height, 13),
                color: '#eee',
                borderWidth: 0.5, borderColor: '#000', borderColor: 'rgba(0,0,0,0.4)',
                height: '100%', textAlignVertical: 'center',
              }}> {displayProps[key]} </Text>
              <Text style={{
                textAlign: 'center',
                width: '48%',color: '#333', fontFamily: 'ChangaOne-Italic',
                fontSize: getFontSize(height, 12), 
                borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.4)', height: '100%', textAlignVertical: 'center',
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
    top: 1,
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