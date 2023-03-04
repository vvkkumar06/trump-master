import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Surface, Text } from 'react-native-paper';

const TeamView = () => {
  return (
    <Surface style={styles.container} elevation={4}>
      <Text variant="titleLarge" style={styles.teamLabel}>Edit Team</Text>
      <View style={styles.teamContainer}>
        <Card id="player-1" style={{...styles.cardContainer, ...styles.player1}} mode={'outlined'}/>
        <Card id="player-2" style={{...styles.cardContainer, ...styles.player2}} mode={'outlined'}/>
        <Card id="player-3" style={{...styles.cardContainer, ...styles.player3}} mode={'outlined'}/>
        <Card id="player-4" style={{...styles.cardContainer, ...styles.player4}} mode={'outlined'}/>
        <Card id="player-5" style={{...styles.cardContainer, ...styles.player5}} mode={'outlined'}/>
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 220,
    backgroundColor: '#eee'
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    width: 80,
    height: 80,
    borderRadius: 0,
    margin: 5
  },
  teamLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#333',
    color: '#ccc',
    height: 30,
    fontStyle: 'italic',
    borderBottomColor: 'red'
  },
  player1: {
    borderWidth: 1,
    borderColor: '#EF5350',
    borderStyle: 'dashed'
  },
  player2: {
    borderWidth: 1,
    borderColor: '#AB47BC',
    borderStyle: 'dashed'
  },
  player3: {
    borderWidth: 1,
    borderColor: '#5C6BC0',
    borderStyle: 'dashed'
  },
  player4: {
    borderWidth: 1,
    borderColor: '#29B6F6',
    borderStyle: 'dashed'
  },
  player5: {
    borderWidth: 1,
    borderColor: '#66BB6A',
    borderStyle: 'dashed'
  },
})

export default TeamView;