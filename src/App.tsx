import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes/Routes';


function App() {
  return (
    // <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;

