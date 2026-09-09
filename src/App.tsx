import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes/Routes';
// import { AuthProvider } from './context/AuthContext'; // Agar bo'lsa

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