
import { BrowserRouter, Route, Routes, } from 'react-router-dom';


import { Home } from './page/Home';
import { NewRoom } from './page/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './page/Room';
import { AdminRoom } from './page/AdminRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/rooms/new" element={<NewRoom/>} />
        <Route path="/rooms/:id" element={<Room/>} /> 
        <Route path="/admin/:id" element={<AdminRoom/>} /> 
     
    </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}


export default App;
