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
    letterSpacing: 1.2,
  },
  topDesign: {
    width: '100%',
    height: 53,
    marginHorizontal: 20,
    top: -20,
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  topLeftLine: {
    height: '100%',
    width: '32%',
    borderWidth: 2,
    borderColor: 'orange',
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 100,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightLine: {
    height: '100%',
    width: '32%',
    borderWidth: 2,
    borderColor: 'orange',
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 100,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 10,
    paddingLeft: 5,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  centerLine: {
    height: '100%',
    width: '32%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderWidth: 2,
    borderColor: 'orange',
    borderBottomWidth: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  roundInfo1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: '30%',
    marginLeft: 5,
  },
  roundInfo2: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: '30%',
    marginLeft: 5
  },
  roundBadge: {
    margin: 2,
    borderWidth: 2,
    borderColor: '#ccc'
  }
});