import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RoomsList from './components/RoomsList';
import AppContainer from './components/AppContainer';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <RoomsList />
      </AppContainer>
    </QueryClientProvider>
  );
};

export default App;
