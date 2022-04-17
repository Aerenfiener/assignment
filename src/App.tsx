import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import useToken from './Hooks/Token';
import { Login } from './Pages/Login/Login'
import { Pages } from './Pages/Pages/Pages';
import { RequireRoute } from './Routes/RequireRoute';
import { LoginRoute } from './Routes/LoginRoute';

import './App.scss';


function App() {
  const { setToken } = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <LoginRoute>
            <Login setToken={ setToken } />
          </LoginRoute>
        }
        />
        <Route
          path="/" element={
            <RequireRoute>
              <Pages />
            </RequireRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
