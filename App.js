import { View } from 'react-native';
import store from './src/redux/store';
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import CardsGalleryView from './src/views/cards-gallery/CardsGalleryView';
// import { setupProfileImages } from './src/utils/player-images';

// import PlayersView from "./src/views/cricket/players/PlayersView";
// setupProfileImages();
export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <CardsGalleryView />
      </Provider>
    </PaperProvider>
  );
}