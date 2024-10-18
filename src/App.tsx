
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import AddRequest from './components/AddRequest';

function App() {
  return (
    <BrowserRouter>
          <Routes>
          <Route path='/' element={<Index/>} />
          <Route path='/add' element={<AddRequest/>} />
          <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
