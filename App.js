import { Provider as PaperProvider } from 'react-native-paper';

import PlayersView from "./src/views/cricket/players/PlayersView";

export default function App() {
  return (
    <PaperProvider>
      <PlayersView />
    </PaperProvider>
  );
}