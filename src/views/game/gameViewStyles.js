import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    background: {
      flex: 1,
      justifyContent: 'center',
    },
    selectedContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: 160
    }, player1SelectedContainer: {
      borderWidth: 5,
      borderStyle: 'solid',
      borderColor: '#1e2',
      backgroundColor: 'rgba(0,255,0,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 110,
      height: 160
    },
    player2SelectedContainer: {
      borderWidth: 5,
      borderStyle: 'solid',
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 110,
      height: 160
    },
    cardContainer: {
      width: 110,
      margin: 2,
      height: 160
    },
    cardsContainer: {
      position: 'absolute',
      display: 'flex',
      bottom: -82,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      marginLeft: 20
    }
  });