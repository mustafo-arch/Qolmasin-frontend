import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes/Routes';


function App() {
  return (
    <>
    <div className='bg-[#f7f5f0]'>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;


