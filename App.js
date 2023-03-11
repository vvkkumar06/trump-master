import store from './src/redux/store';
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import DashboardView from './src/views/dashboard/DashboardView';
export default function App() {
  
  return (
    <PaperProvider>
      <Provider store={store}>
        <DashboardView />
      </Provider>
    </PaperProvider>
  );
}