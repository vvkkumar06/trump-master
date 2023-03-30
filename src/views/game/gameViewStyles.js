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
    borderColor: '#ccc',
    backgroundColor: '#162',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 160,
    marginTop: 50
  },
  player2SelectedContainer: {
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: '#ccc',
    backgroundColor: '#612',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 160,
    marginTop: 50
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
  },
  roundText: {
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 1.2
  }
});