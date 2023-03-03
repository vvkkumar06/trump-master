import { Provider as PaperProvider } from 'react-native-paper';
// import { setupProfileImages } from './src/utils/player-images';

import PlayersView from "./src/views/cricket/players/PlayersView";
// setupProfileImages();
export default function App() {
  return (
    <PaperProvider>
      <PlayersView />
    </PaperProvider>
  );
}